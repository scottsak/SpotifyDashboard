## Dashify

<h3 align="center"><img src="https://sts-random-values.s3.us-west-2.amazonaws.com/dashifyHome.png" width="600px" style="border-radius: 5px" alt="dashify"></h3>
<p align="center">
  <a href="https://chromewebstore.google.com/detail/spotify-dashboard/hnokfmokdpjdllpejcjgobfljlgheebp" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/try%20it%20out-download-green"></a>
  <a href="https://buymeacoffee.com/dashify" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/buy_us_a-coffee-ff69b4.svg"></a>
</p>

View your Spotify statistics in a easily accessible format while controlling your Spotify player

#### What it does:

Overwrites the new tab page to be a controller for Spotify. Login to spotify and view your top artists and songs, control music playback, and navigate to your top websites.

### Running the App Locally

Clone the repository and install its dependencies running:

    $ npm install

### Using your own credentials

You will need to register your app and get your own credentials from the Spotify for Developers Dashboard.

To do so, go to [your Spotify for Developers Dashboard](https://beta.developer.spotify.com/dashboard) and create your application. In my own development process, I registered these Redirect URIs:

- http://localhost:3000 (needed for the implicit grant flow)
- http://localhost:3000/callback

Once you have created your app, load the `CLIENT_ID` and `CLIENT_SECRET` into a `.env` file.

In order to run the app, open the folder, and run:

    $ cd SpotifyDashboard
    $ npm run build

Then, open `http://localhost:3000` in a browser.
