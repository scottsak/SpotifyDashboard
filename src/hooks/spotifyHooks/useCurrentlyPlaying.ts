import { useEffect, useState } from 'react';
import { getCurrentlyPlaying } from '../../services/spotifyService'
import useToken from '../useToken';

const useCurrentlyPlaying = () => {
  const { token, error: tokenError } = useToken();
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Record<string, any>>({});
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setError('No token available');
      return;
    }

    try {
      getCurrentlyPlaying(token)
        .then((data) => {
          setCurrentlyPlaying(data);
        })
        .catch((err) => {
          setError(err.message);
        });
    } catch (err) {
      let message = 'Currently Playing: Unknown Error'
      if (err instanceof Error) {
        message = err.message
      }
      setError(message)
    }
  }, [token]);
  return { currentlyPlaying, error: error || tokenError };
};

export default useCurrentlyPlaying;