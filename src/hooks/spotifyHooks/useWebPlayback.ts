import { useEffect, useState } from 'react';
import useToken from '../useToken';

const useWebPlayback = () => {
  const { token, error: tokenError } = useToken();
  const [error, setError] = useState<string>('');
  const [player, setPlayer] = useState<Spotify.Player | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    const hasScript: boolean = !!document.getElementById('spotify-sdk-script');

    if (token && mounted && !hasScript) {
      const script = document.createElement('script');
      script.src = chrome.runtime.getURL('spotifySDK.js');
      script.async = true;
      script.id = 'spotify-sdk-script';

      document.body.appendChild(script);
      if (!window.onSpotifyWebPlaybackSDKReady) {
        window.onSpotifyWebPlaybackSDKReady = () => {
          const player: Spotify.Player = new window.Spotify.Player({
            name: 'Web Playback SDK',
            getOAuthToken: (cb: (token: string) => void) => {
              cb(token);
            },
            volume: 0.5,
          });

          setPlayer(player);

          player.addListener('ready', ({ device_id }: { device_id: string }) => {
            // console.log('Ready with Device ID', device_id);
            setLoading(false);
          });

          player.addListener('player_state_changed', ({ position, duration, track_window: { current_track } }) => {
            // console.log('Currently Playing', current_track);
            // console.log('Position in Song', position);
            // console.log('Duration of Song', duration);
          });

          player.addListener('not_ready', ({ device_id }: { device_id: string }) => {
            // console.log('Device ID has gone offline', device_id);
          });

          player.connect();
        };
      }

      script.onerror = () => {
        if (mounted) {
          setError('Failed to load Spotify Web Playback SDK script');
          setLoading(false);
        }
      };

      return () => {
        mounted = false;
        if (player) {
          player.disconnect();
        }
      };
    } else {
      setLoading(false);
    }
  }, [token, player]);

  return {
    error: error || tokenError,
    loading,
    player,
  };
};

export default useWebPlayback;
