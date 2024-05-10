import { useEffect, useState } from 'react';
import { getPlaybackState } from '../../services/spotifyService';
import useToken from '../useToken';
import { PlaybackState } from '../../types/types';

const PLAYING_INTERVAL: number = 1000
const IDLE_INTERVAL: number = 5000

const usePlaybackState = () => {
  const { token, error: tokenError } = useToken();
  const [playbackState, setPlaybackState] = useState<PlaybackState | null>(null);
  const [error, setError] = useState<string>('');
  const [intervalState, setIntervalState] = useState<number>(5000);

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
          if (intervalState !== newInterval) {
            setIntervalState(newInterval);
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

    fetchPlaybackState();
    intervalId = setInterval(fetchPlaybackState, intervalState);

    return () => {
      isMounted = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [token, intervalState]);

  return { playbackState, error: error || tokenError };
};

export default usePlaybackState;
