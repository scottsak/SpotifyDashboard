import { useEffect, useState } from 'react';
import { getUserTracks } from '../../services/spotifyService/spotifyService';
import useToken from '../useToken';
import { SpotifyItem } from '../../types/types';

interface TopTracksResponse {
  loading: Boolean;
  error: string;
  userTopTracks: SpotifyItem[];
}

const useUserTopTracks = (): TopTracksResponse => {
  const { token, error: tokenError } = useToken();
  const [userTopTracks, setUserTracks] = useState<SpotifyItem[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!token) {
      setError('No token available');
      return;
    }
    setLoading(true);
    getUserTracks(token)
      .then((data) => {
        setUserTracks(data.items);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  return { userTopTracks: userTopTracks || [], error: error || tokenError, loading };
};

export default useUserTopTracks;
