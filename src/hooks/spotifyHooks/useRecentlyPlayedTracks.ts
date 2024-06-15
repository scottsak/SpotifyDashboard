import { useEffect, useState } from 'react';
import { getRecentlyPlayedTracks } from '../../services/spotifyService/spotifyService';
import { RecentlyPlayedData, ArtistsStats } from '../../types/types';
import useToken from '../useToken';

const useRecentlyPlayedTracks = () => {
  const { token, error: tokenError } = useToken();
  const [recentlyPlayedStats, setRecentlyPlayedStats] = useState<ArtistsStats[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted: boolean = true;
    if (!token) {
      setError('No token available');
      return;
    }
    const fetchRecentlyPlayedTracks = async () => {
      try {
        setLoading(true);
        const data: RecentlyPlayedData = await getRecentlyPlayedTracks(token);
        const artistsLogged = (data.items || []).reduce((acc: any, item) => {
          const artist = item.track.artists[0];
          const { name, id, href, uri } = artist;

          const currentCountForArtist = (acc[id] || {}).count || 0;
          const currentTimeForArtist = Number((acc[id] || {}).time || 0);
          acc[id] = {
            name,
            id,
            href,
            uri,
            count: Number(currentCountForArtist) + 1,
            time: Number(Number(currentTimeForArtist + Number(item.track.duration_ms) / 1000).toFixed(2)),
          };
          return acc;
        }, {});
        setRecentlyPlayedStats(Object.values(artistsLogged));
      } catch (err) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Unknown error';
          setError(message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecentlyPlayedTracks();

    return () => {
      isMounted = false;
    };
  }, [token]);
  // Refresh data when currently playing song changes

  return {
    recentlyPlayedStats: recentlyPlayedStats || [],
    error: error || tokenError,
    loading,
  };
};

export default useRecentlyPlayedTracks;
