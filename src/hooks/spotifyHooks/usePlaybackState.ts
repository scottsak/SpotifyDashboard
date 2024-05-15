import { useEffect, useState } from 'react';
import { getPlaybackState } from '../../services/spotifyService/spotifyService';
import useToken from '../useToken';
import { PlaybackState } from '../../types/types';
import useTabFocus from '../useTabFocused';

// Different interval lengths based on whether music is playing
const PLAYING_INTERVAL: number = 1000
const IDLE_INTERVAL: number = 5000

const usePlaybackState = (): {
  playbackState: any,
  error?: string,
  errorStatus?: number | null,
  displayError: boolean,
  needsTokenRefresh: boolean
} => {
  const { token, error: tokenError } = useToken();
  const tabFocused: boolean = useTabFocus()
  const [playbackState, setPlaybackState] = useState<PlaybackState | null>(null);
  const [pollingInterval, setPollingInterval] = useState<number>(5000);
  const [error, setError] = useState<string>('');
  const [errorStatus, setErrorStatus] = useState<number | null>(null)
  const [consecutiveErrors, setConsecutiveErrors] = useState<number>(0)

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
        if (playbackStateData.error) {
          setConsecutiveErrors(consecutiveErrors + 1)
          setErrorStatus(playbackStateData.status)
        }
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

    // Stop polling if tab isn't focused or there are 3 consecutive errors
    if (tabFocused || consecutiveErrors > 2) {
      fetchPlaybackState();
      intervalId = setInterval(fetchPlaybackState, pollingInterval);
    }

    return () => {
      isMounted = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [token, pollingInterval, tabFocused, consecutiveErrors]);

  return {
    playbackState,
    error: error || tokenError,
    errorStatus,
    displayError: !!tokenError || consecutiveErrors > 2,
    needsTokenRefresh: errorStatus === 401 && consecutiveErrors > 2
  };
};

export default usePlaybackState;
