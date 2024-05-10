

const BASE_URL = 'https://api.spotify.com/v1';

const fetchSpotifyData = async (endpoint: string, token: string) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Spotify API error: ${response.status} - ${response.statusText}`);
  }

  // Return empty object for no content responses
  const { status }: { status: number } = response || {}
  if (status === 204) {
    return {}
  }

  return response.json();
};

export const getCurrentlyPlaying = async (token: string) => {
  return await fetchSpotifyData('me/player/currently-playing', token);
};

export const getPlaybackState = async (token: string) => {
  return await fetchSpotifyData('me/player', token);
};
