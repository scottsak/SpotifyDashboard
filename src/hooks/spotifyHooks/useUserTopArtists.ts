import { useEffect, useState } from 'react';
import { getUserTopArtists } from '../../services/spotifyService/spotifyService';
import useToken from '../useToken';
import { SpotifyArtist } from '../../types/types';

interface TopArtistsResponse {
  loading: Boolean;
  error: string;
  userTopArtists: SpotifyArtist[];
}

const useUserTopArtists = (): TopArtistsResponse => {
  const { token, error: tokenError } = useToken();
  const [userTopArtists, setUserArtists] = useState<SpotifyArtist[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!token) {
      setError('No token available');
      return;
    }
    setLoading(true);
    getUserTopArtists(token, { time_range: 'short_term' })
      .then((data) => {
        setUserArtists(data.items);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  return { userTopArtists: userTopArtists || [], error: error || tokenError, loading };
};

export default useUserTopArtists;
