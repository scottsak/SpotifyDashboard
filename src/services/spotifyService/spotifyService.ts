import refreshAccessToken from './refreshToken';

const BASE_URL = 'https://api.spotify.com/v1';

const fetchSpotifyData = async ({ endpoint, token, retryCount = 0, method, body }: {
  endpoint: string,
  token: string,
  retryCount?: number,
  method?: string | undefined,
  body?: any
}): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      ...!!method && { method },
      ...!!body && { body: JSON.stringify(body) },
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
  return await fetchSpotifyData({ endpoint: 'me/player/currently-playing', token });
};

export const getPlaybackState = async (token: string) => {
  return await fetchSpotifyData({ endpoint: 'me/player', token });
};

export const getUserTracks = async (token: string) => {
  return await fetchSpotifyData({ endpoint: 'me/top/tracks', token });
};

export const getUserQueue = async (token: string) => {
  return await fetchSpotifyData({ endpoint: 'me/player/queue', token });
};

export const startPlayback = async (token: string, body?: any) => {
  return await fetchSpotifyData({ method: 'PUT', endpoint: 'me/player/play', token, body })
}

export const stopPlayback = async (token: string) => {
  return await fetchSpotifyData({ method: 'PUT', endpoint: 'me/player/pause', token })
}

export const skipPlayback = async (token: string) => {
  return await fetchSpotifyData({ method: 'POST', endpoint: 'me/player/next', token })
}

export const rewindPlayback = async (token: string) => {
  return await fetchSpotifyData({ method: 'POST', endpoint: 'me/player/previous', token })
}