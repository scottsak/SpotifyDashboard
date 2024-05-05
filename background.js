chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('scotttest hits here');
  if (message.type === 'login') {
    console.log('scotttest here');

    const SPOTIFY_AUTHROIZE_ENDPOINT = 'https://accounts.spotify.com/authorize';
    const CLIENT_ID = '0621ab6a5f7b4e62ae8658a363731520';
    const REDIRECT_URI = chrome.identity.getRedirectURL('oauth2');
    const SCOPES = ['user-read-currently-playing', 'user-read-playback-state'];
    const SPACE_DELIMITER = '%20';
    const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

    const authUrl = `${SPOTIFY_AUTHROIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
    console.log('scotttest authUrl', authUrl);
    chrome.identity.launchWebAuthFlow(
      { url: authUrl, interactive: true },
      (redirectUri) => {
        console.log('scotttest redirectUri', redirectUri);
        token = redirectUri.split('&')[0].split('access_token=')[1];
        console.log('scotttest token', token);
        chrome.storage.local.set({ accessToken: token }, () => {
          console.log('Access token stored:', token);
        });
      }
    );
  }
  if (message.type === 'getToken') {
    chrome.storage.local.get('accessToken', (data) => {
      const accessToken = data.accessToken;
      sendResponse({ accessToken: accessToken });
    });
    return true;
  }
});
