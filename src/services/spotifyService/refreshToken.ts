interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}

const CLIENT_ID: string = process.env.CLIENT_ID || '';
const CLIENT_SECRET: string = process.env.CLIENT_SECRET || '';

function getRefreshToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type: 'getRefreshToken' }, (response) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
      } else {
        resolve(response.refreshToken);
      }
    });
  });
}

async function refreshAccessToken(): Promise<TokenResponse> {
  const refreshToken: string = await getRefreshToken();
  const requestBody = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken || '',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  }).toString();

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: requestBody,
  });

  if (!response.ok) {
    throw new Error('refresh token failed');
  }

  const tokenResponse: TokenResponse = await response.json();

  // No refreshToken in response, but doesn't seem to be an issue???
  const { access_token, refresh_token } = tokenResponse || {};
  chrome.runtime.sendMessage({
    type: 'setTokens',
    payload: {
      token: access_token,
      refreshToken: refresh_token,
    },
  });
  return tokenResponse;
}

export default refreshAccessToken;
