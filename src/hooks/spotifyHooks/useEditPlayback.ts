import { useState } from 'react';
import {
  startPlayback as startPlaybackService,
  stopPlayback as stopPlaybackService,
  skipPlayback as skipPlaybackService,
  rewindPlayback as rewindPlaybackService,
  seekToPosition as seekToPositionService,
} from '../../services/spotifyService/spotifyService';
import useToken from '../useToken';

export interface EditPlaybackController {
  startPlayback: () => Promise<void>;
  stopPlayback: () => Promise<void>;
  skipPlayback: () => Promise<void>;
  rewindPlayback: () => Promise<void>;
  startSpecificPlayback: ({ uris, contextUri }: { uris: string[]; contextUri?: string }) => Promise<void>;
  seekToPosition: ({ position_ms, device_id }: { position_ms: number; device_id?: string }) => Promise<void>;
  loading: boolean;
  error: string | null;
}

// Should be used primary in usePlaybackState to ensure ui update after response
const useEditPlayback = (): EditPlaybackController => {
  const { token, error: tokenError } = useToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(tokenError);

  const runRequest = async (requestToRun: (token: string, body?: any) => void, body?: any): Promise<void> => {
    if (loading) {
      setError('Request already in flight');
      return;
    }

    if (!token) {
      setError('Token is not available.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await requestToRun(token, body);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const startPlayback = async () => {
    await runRequest(startPlaybackService);
  };

  const startSpecificPlayback = async ({ uris, contextUri }: { uris: string[]; contextUri?: string }) => {
    await runRequest(startPlaybackService, { uris: uris, ...(contextUri && { contextUri }) });
  };

  const stopPlayback = async () => {
    await runRequest(stopPlaybackService);
  };

  const skipPlayback = async () => {
    await runRequest(skipPlaybackService);
  };

  const rewindPlayback = async () => {
    await runRequest(rewindPlaybackService);
  };

  const seekToPosition = async ({ position_ms, device_id }: { position_ms: number; device_id?: string }) => {
    await runRequest(seekToPositionService, { position_ms, ...(device_id && { device_id }) });
  };

  return {
    startPlayback,
    startSpecificPlayback,
    stopPlayback,
    skipPlayback,
    rewindPlayback,
    seekToPosition,
    loading,
    error,
  };
};

export default useEditPlayback;
