import { useEffect, useState } from 'react';
import { getUserTopTracks } from '../../services/spotifyService/spotifyService';
import useToken from '../useToken';
import { SpotifyItem } from '../../types/types';
import { TopItemsTimeFrames } from '../../types/types';

interface TopTracksResponse {
  loading: boolean;
  error: string;
  userTopTracks: SpotifyItem[];
}

const useUserTopTracks = ({ timeFrame }: { timeFrame?: TopItemsTimeFrames }): TopTracksResponse => {
  const { token, error: tokenError } = useToken();
  const [userTopTracks, setUserTopTracks] = useState<SpotifyItem[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!token) {
      setError('No token available');
      return;
    }
    setLoading(true);
    getUserTopTracks(token, { timeFrame })
      .then((data) => {
        setUserTopTracks(data.items);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, timeFrame]);

  return { userTopTracks: userTopTracks || [], error: error || tokenError, loading };
};

export default useUserTopTracks;
