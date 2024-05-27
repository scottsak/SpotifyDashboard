// @ts-nocheck
/* eslint-disable no-undef */
const SPOTIFY_AUTHROIZE_ENDPOINT = 'https://accounts.spotify.com/authorize';
// TODO - find a way to securely store this
// for some reason process.env is undefined here
const CLIENT_ID = '0621ab6a5f7b4e62ae8658a363731520';
const CLIENT_SECRET = 'd43bdb36bce64ca8932fcf97ef6c272a';
const REDIRECT_URI = chrome.identity.getRedirectURL('oauth2');
const SCOPES = ['user-read-currently-playing', 'user-read-playback-state', 'user-modify-playback-state', 'streaming'];
const SPACE_DELIMITER = '%20';
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);
const AUTH_URL = `${SPOTIFY_AUTHROIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL_PARAM}&response_type=code&show_dialog=true`;

const logError = (event, error) =>
  console.error(`Error handling event: ${event}`, error);

const setTokens = (accessToken, refreshToken) => {
  chrome.storage.local.set({
    accessToken,
    ...(!!refreshToken && { refreshToken }),
  });
};

const exchangeCodeForToken = async (code) => {
  const requestBody = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  });
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: requestBody,
  });
  if (!res.ok) {
    throw new Error('Failed to exchange authorization code for token');
  }
  return res.json();
};

const login = () => {
  chrome.identity.launchWebAuthFlow(
    { url: AUTH_URL, interactive: true },
    (redirectUri) => {
      const code = redirectUri?.split('?code=')[1];
      if (code) {
        exchangeCodeForToken(code)
          .then(({ access_token, refresh_token }) => {
            setTokens(access_token, refresh_token);
          })
          .catch((error) => {
            console.error('Error exchanging code for token:', error);
          });
      }
    }
  );
};

const getToken = ({ sendResponse }) => {
  chrome.storage.local.get('accessToken', (data) => {
    const accessToken = data.accessToken;
    sendResponse({ accessToken: accessToken });
  });
};

const getRefreshToken = ({ sendResponse }) => {
  chrome.storage.local.get('refreshToken', (data) => {
    const refreshToken = data.refreshToken;
    sendResponse({ refreshToken });
  });
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  try {
    if (message.type === 'login') {
      login();
    }
    if (message.type === 'getToken') {
      getToken({ sendResponse });
      return true;
    }
    if (message.type === 'setTokens') {
      const { token, refreshToken } = message.payload || {};
      if (token) {
        setTokens(token, refreshToken);
      }
    }
    if (message.type === 'getRefreshToken') {
      getRefreshToken({ sendResponse });
      return true;
    }
  } catch (err) {
    logError(message, err);
    sendResponse({
      error: err?.message || `Unknown error occurred for event: ${message}`,
    });
  }
});
