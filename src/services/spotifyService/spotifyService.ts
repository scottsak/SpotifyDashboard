import refreshAccessToken from "./refreshToken";

const BASE_URL = 'https://api.spotify.com/v1';

const fetchSpotifyData = async (endpoint: string, token: string, retry: number = 0): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      // Refresh token and retry request if accessToken is expired
      if (response.status === 401 && retry < 2) {
        const { access_token, refresh_token } = await refreshAccessToken();
        chrome.runtime.sendMessage({ type: 'setTokens', payload: { access_token, refresh_token } })
        return await fetchSpotifyData(endpoint, access_token, retry + 1);
      }
      // default throw
      throw new Error(`Spotify API error: ${response.status} - ${response.statusText}`);
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
