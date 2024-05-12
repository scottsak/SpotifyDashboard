import { useEffect, useState } from 'react';
import { getPlaybackState } from '../../services/spotifyService/spotifyService';
import useToken from '../useToken';
import { PlaybackState } from '../../types/types';
import useTabFocus from '../useTabFocused';

const PLAYING_INTERVAL: number = 1000
const IDLE_INTERVAL: number = 5000

const usePlaybackState = () => {
  const { token, error: tokenError } = useToken();
  const tabFocused: boolean = useTabFocus()
  const [playbackState, setPlaybackState] = useState<PlaybackState | null>(null);
  const [error, setError] = useState<string>('');
  const [pollingInterval, setPollingInterval] = useState<number>(5000);

  useEffect(() => {
    let isMounted = true;
    let intervalId: NodeJS.Timer | undefined;

    const fetchPlaybackState = async () => {
      if (!token) {
        setError('No token available');
        return;
      }

      try {
        const playbackStateData = await getPlaybackState(token);
        if (isMounted) {
          setPlaybackState(playbackStateData);
          const newInterval = playbackStateData.is_playing ? PLAYING_INTERVAL : IDLE_INTERVAL;
          if (pollingInterval !== newInterval) {
            setPollingInterval(newInterval);
          }
        }
      } catch (error) {
        if (isMounted) {
          const message = error instanceof Error ? error.message : 'Unknown error';
          setError(message);
          clearInterval(intervalId)
        }
      }
    };

    // Stop polling if tab isn't focused
    if (tabFocused) {
      fetchPlaybackState();
      intervalId = setInterval(fetchPlaybackState, pollingInterval);
    }

    return () => {
      isMounted = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [token, pollingInterval, tabFocused]);

  return { playbackState, error: error || tokenError };
};

export default usePlaybackState;
