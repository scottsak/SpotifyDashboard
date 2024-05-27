export { };

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: {
      Player: new (options: {
        name: string;
        getOAuthToken: (cb: (token: string) => void) => void;
        volume: number;
      }) => SpotifyPlayer;
    };
  }


  declare namespace Spotify {
    interface Player {
      addListener: (event: string, cb: (data: any) => void) => void;
      connect: () => Promise<void>;
      disconnect: () => void;
      pause: () => Promise<void>;
      resume: () => Promise<void>;
      togglePlay: () => Promise<void>;
    }
  }
}


