import { TopItemsTimeFrames } from '../../types/types';
import {
  PlaybackState,
  SpotifyItem,
  SpotifyProfile,
  SpotifyUserTopSongs,
  SpotifyUserTopArtists,
  RecentlyPlayedData,
} from '../../types/types';
import refreshAccessToken from './refreshToken';

const BASE_URL = 'https://api.spotify.com/v1';

/**
 * Fetches data from the Spotify API, with optional caching and token refresh.
 *
 * @param {Object} params - The parameters for the fetch request.
 * @param {string} params.endpoint - The API endpoint to call.
 * @param {string} params.token - The access token for authentication.
 * @param {number} [params.retryCount=0] - The number of times the request has been retried.
 * @param {string} [params.method] - The HTTP method to use for the request.
 * @param {any} [params.body] - The body of the request, if applicable.
 * @param {boolean} [params.tryCache=false] - Whether to attempt to use cached data.
 * @param {number} [params.cacheExpiry=1800000] - The cache expiry time in milliseconds.
 * @returns {Promise<any>} The data returned by the API, or an error object.
 */
const fetchSpotifyData = async ({
  endpoint,
  token,
  retryCount = 0,
  method,
  body,
  tryCache = false,
  cacheExpiry = 1800000, // milliseconds (default 30 minutes)
}: {
  endpoint: string;
  token: string;
  retryCount?: number;
  method?: string | undefined;
  body?: any;
  tryCache?: boolean;
  cacheExpiry?: number;
}): Promise<any> => {
  try {
    if (tryCache) {
      try {
        const storageResponse = await chrome.runtime.sendMessage({
          type: 'getCachedData',
          payload: { endpoint },
        });
        if (storageResponse && storageResponse.cacheExpiration > new Date().getTime()) {
          return storageResponse;
        }
      } catch (err) {
        // do nothing - continue to hit API
      }
    }

    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      ...(!!method && { method }),
      ...(!!body && { body: JSON.stringify(body) }),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      // Refresh token and retry request if accessToken is expired
      if (response.status === 401 && retryCount < 2) {
        const { access_token } = await refreshAccessToken();
        return await fetchSpotifyData({ endpoint, token: access_token, retryCount: retryCount + 1, method });
      }
      return { error: true, status: response.status, statusText: response.statusText };
    }
    // Return empty object for no content responses
    const { status }: { status: number } = response || {};
    if (status === 204) {
      return {};
    }
    const data = await response.json();
    if (tryCache) {
      chrome.runtime.sendMessage({
        type: 'setCachedData',
        payload: { endpoint, data, cacheExpiration: new Date().getTime() + cacheExpiry },
      });
    }
    return data;
  } catch (err) {
    console.error('Error fetching Spotify data:', err);
    throw err;
  }
};

// fetch data functions
export const getCurrentlyPlaying = async (token: string): Promise<SpotifyItem> => {
  return fetchSpotifyData({ endpoint: 'me/player/currently-playing', token });
};

export const getPlaybackState = async (token: string): Promise<PlaybackState> => {
  return fetchSpotifyData({ endpoint: 'me/player?additional_types=track%2Cepisode', token });
};

export const getUserTopTracks = async (token: string, body?: any): Promise<SpotifyUserTopSongs> => {
  const { timeFrame }: { timeFrame: TopItemsTimeFrames } = body || {};
  return fetchSpotifyData({
    endpoint: `me/top/tracks?${timeFrame ? `time_range=${timeFrame}` : ''}`,
    token,
    tryCache: true,
  });
};

export const getUserTopArtists = async (
  token: string,
  body: { time_range: string; limit?: string }
): Promise<SpotifyUserTopArtists> => {
  const { time_range, limit } = body;
  return fetchSpotifyData({
    endpoint: `me/top/artists${time_range ? `?time_range=${time_range}` : ''}`,
    token,
    tryCache: true,
  });
};

export const getUserQueue = async (token: string) => {
  return fetchSpotifyData({ endpoint: 'me/player/queue', token });
};

export const getRecentlyPlayedTracks = async (
  token: string,
  body?: { limit?: number; after?: number; before?: number }
): Promise<RecentlyPlayedData> => {
  const { limit, after, before } = body || {};
  return await fetchSpotifyData({
    endpoint: `me/player/recently-played?limit=${limit ? limit : 50}${after ? `&after=${after}` : ''}${
      before ? `&before=${before}` : ''
    }`,
    token,
  });
};

export const getCurrentUserProfile = async (token: string): Promise<SpotifyProfile> => {
  return fetchSpotifyData({ endpoint: 'me', token, tryCache: true });
};

// Edit playback functions
export const startPlayback = async (token: string, body?: any): Promise<void> => {
  return fetchSpotifyData({ method: 'PUT', endpoint: 'me/player/play', token, body });
};

export const stopPlayback = async (token: string): Promise<void> => {
  return fetchSpotifyData({ method: 'PUT', endpoint: 'me/player/pause', token });
};

export const skipPlayback = async (token: string): Promise<void> => {
  return fetchSpotifyData({ method: 'POST', endpoint: 'me/player/next', token });
};

export const rewindPlayback = async (token: string): Promise<void> => {
  return await fetchSpotifyData({ method: 'POST', endpoint: 'me/player/previous', token });
};

export const getAvailableDevices = async (token: string) => {
  return await fetchSpotifyData({ endpoint: 'me/player/devices', token });
};

export const updateDevice = async (token: string, body: { device_id: string }): Promise<void> => {
  const { device_id } = body || {};
  return fetchSpotifyData({
    method: 'PUT',
    endpoint: 'me/player',
    token,
    body: { device_ids: [device_id] },
  });
};

export const setPlaybackVolume = async (
  token: string,
  body: { percentage: number; device_id?: string }
): Promise<void> => {
  const { percentage, device_id } = body || {};
  return await fetchSpotifyData({
    method: 'PUT',
    endpoint: `me/player/volume?volume_percent=${percentage}${device_id ? `&device_id=${device_id}` : ''}`,
    token,
  });
};

export const seekToPosition = async (
  token: string,
  body: { position_ms: number; device_id?: string }
): Promise<void> => {
  const { position_ms, device_id } = body || {};
  return fetchSpotifyData({
    method: 'PUT',
    endpoint: `me/player/seek?position_ms=${position_ms}${device_id ? `&device_id=${device_id}` : ''}`,
    token,
  });
};
