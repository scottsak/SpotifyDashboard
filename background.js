// @ts-nocheck
/* eslint-disable no-undef */
const SPOTIFY_AUTHROIZE_ENDPOINT = 'https://accounts.spotify.com/authorize';
const CLIENT_ID = '0621ab6a5f7b4e62ae8658a363731520';
const REDIRECT_URI = chrome.identity.getRedirectURL('oauth2');
const SCOPES = ['user-read-currently-playing', 'user-read-playback-state'];
const SPACE_DELIMITER = '%20';
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const logError = (event, error) => console.error(`Error handling event: ${event}`, error)

const login = () => {
  const authUrl = `${SPOTIFY_AUTHROIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
  chrome.identity.launchWebAuthFlow(
    { url: authUrl, interactive: true },
    (redirectUri) => {
      const token = redirectUri?.split('&')[0].split('access_token=')[1];
      chrome.storage.local.set({ accessToken: token }, () => { });
    }
  );
}

const getToken = ({ sendResponse }) => {
  chrome.storage.local.get('accessToken', (data) => {
    const accessToken = data.accessToken;
    sendResponse({ accessToken: accessToken });
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  try {
    if (message.type === 'login') {
      login()
    }
    if (message.type === 'getToken') {
      getToken({ sendResponse })
      return true;
    }
  } catch (err) {
    logError(message, err)
    sendResponse({ error: err?.message || `Unknown error occurred for event: ${message}` })
  }
});