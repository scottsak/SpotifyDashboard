import refreshAccessToken from './refreshToken';

const BASE_URL = 'https://api.spotify.com/v1';

const fetchSpotifyData = async (
  endpoint: string,
  token: string,
  retry: number = 0
): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      // Refresh token and retry request if accessToken is expired
      if (response.status === 401 && retry < 2) {
        const { access_token } = await refreshAccessToken();
        return await fetchSpotifyData(endpoint, access_token, retry + 1);
      }
      return { error: true, status: response.status, statusText: response.statusText }
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

export const getCurrentlyPlaying = async (token: string) => {
  return await fetchSpotifyData('me/player/currently-playing', token);
};

export const getPlaybackState = async (token: string) => {
  return await fetchSpotifyData('me/player', token);
};

export const getUserTracks = async (token: string) => {
  return await fetchSpotifyData('me/top/tracks', token);
};

export const getUserQueue = async (token: string) => {
  return await fetchSpotifyData('me/player/queue', token);
};
