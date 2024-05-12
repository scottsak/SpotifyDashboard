import { useEffect, useState } from 'react';
import { getCurrentlyPlaying } from '../services/spotifyService/spotifyService';
import useToken from './useToken';

const useCurrentlyPlaying = () => {
  const { token, error: tokenError } = useToken();
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setError('No token available');
      return;
    }

    getCurrentlyPlaying(token)
      .then((data) => {
        setCurrentlyPlaying(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [token]);

  return { currentlyPlaying, error: error || tokenError };
};

export default useCurrentlyPlaying;
