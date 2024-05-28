import { useEffect, useState } from 'react';
import { getUserTracks } from '../../services/spotifyService/spotifyService';
import useToken from '../useToken';
import { SpotifyItem } from '../../types/types';

const useUserTracks = () => {
  const { token, error: tokenError } = useToken();
  const [userTracks, setUserTracks] = useState<SpotifyItem[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setError('No token available');
      return;
    }

    getUserTracks(token)
      .then((data) => {
        setUserTracks(data.items);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [token]);

  return { userTracks: userTracks || [], error: error || tokenError };
};

export default useUserTracks;
