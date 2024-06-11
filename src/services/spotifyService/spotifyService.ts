import { PlaybackState, SpotifyItem, SpotifyProfile, SpotifyUserTopSongs } from '../../types/types';
import refreshAccessToken from './refreshToken';

const BASE_URL = 'https://api.spotify.com/v1';

const fetchSpotifyData = async ({
  endpoint,
  token,
  retryCount = 0,
  method,
  body,
}: {
  endpoint: string;
  token: string;
  retryCount?: number;
  method?: string | undefined;
  body?: any;
}): Promise<any> => {
  try {
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
    return response.json();
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

export const getUserTopTracks = async (token: string): Promise<SpotifyUserTopSongs> => {
  return fetchSpotifyData({ endpoint: 'me/top/tracks', token });
};

export const getUserQueue = async (token: string) => {
  return fetchSpotifyData({ endpoint: 'me/player/queue', token });
};

export const getCurrentUserProfile = async (token: string): Promise<SpotifyProfile> => {
  return fetchSpotifyData({ endpoint: 'me', token });
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
