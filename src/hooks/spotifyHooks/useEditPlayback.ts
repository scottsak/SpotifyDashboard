import { useState } from 'react';
import {
  startPlayback as startPlaybackService,
  stopPlayback as stopPlaybackService,
  skipPlayback as skipPlaybackService,
  rewindPlayback as rewindPlaybackService,
  seekToPosition as seekToPositionService,
} from '../../services/spotifyService/spotifyService';
import useToken from '../useToken';
import { EDIT_TYPES } from '../../lib/enums';

export interface EditPlaybackController {
  startPlayback: () => Promise<void>;
  stopPlayback: () => Promise<void>;
  skipPlayback: () => Promise<void>;
  rewindPlayback: () => Promise<void>;
  startSpecificPlayback: ({ uris, contextUri }: { uris: string[]; contextUri?: string }) => Promise<void>;
  seekToPosition: ({ position_ms, device_id }: { position_ms: number; device_id?: string }) => Promise<void>;
  loading: boolean;
  error: string | null;
  inflightEdit: string;
}

// Should be used primary in usePlaybackState to ensure ui update after response
const useEditPlayback = (): EditPlaybackController => {
  const { token, error: tokenError } = useToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(tokenError);
  const [inflightEdit, setInflightEdit] = useState<string>('');

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
      setInflightEdit('');
      setLoading(false);
    }
  };

  const startPlayback = async () => {
    setInflightEdit(EDIT_TYPES.START_PLAYBACK);
    await runRequest(startPlaybackService);
  };

  const startSpecificPlayback = async ({ uris, contextUri }: { uris: string[]; contextUri?: string }) => {
    setInflightEdit(EDIT_TYPES.START_SPECIFIC_PLAYBACK);
    await runRequest(startPlaybackService, { uris: uris, ...(contextUri && { contextUri }) });
  };

  const stopPlayback = async () => {
    setInflightEdit(EDIT_TYPES.STOP_PLAYBACK);
    await runRequest(stopPlaybackService);
  };

  const skipPlayback = async () => {
    setInflightEdit(EDIT_TYPES.SKIP_PLAYBACK);
    await runRequest(skipPlaybackService);
  };

  const rewindPlayback = async () => {
    setInflightEdit(EDIT_TYPES.REWIND_PLAYBACK);
    await runRequest(rewindPlaybackService);
  };

  const seekToPosition = async ({ position_ms, device_id }: { position_ms: number; device_id?: string }) => {
    setInflightEdit(EDIT_TYPES.SEEK_TO_POSITION);
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
    inflightEdit,
  };
};

export default useEditPlayback;
