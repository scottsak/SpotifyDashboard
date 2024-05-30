import { useEffect, useState } from 'react';
import { getUserQueue } from '../../services/spotifyService/spotifyService';
import { SpotifyArtist, SpotifyAlbum, SpotifyItem } from '../../types/types';
import useToken from '../useToken';

interface CurrentlyPlaying extends SpotifyItem {}

interface UserQueueData {
  queue: SpotifyItem[];
  currently_playing: CurrentlyPlaying;
}

const useUserQueue = ({ currentSongId }: { currentSongId: string }) => {
  const { token, error: tokenError } = useToken();
  const [userQueue, setUserQueue] = useState<SpotifyItem[]>([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<CurrentlyPlaying | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted: boolean = true;
    if (!token) {
      setError('No token available');
      return;
    }
    const fetchUserQueue = async () => {
      try {
        setLoading(true);
        const data: UserQueueData = await getUserQueue(token);
        setUserQueue(data.queue);
        setCurrentlyPlaying(data.currently_playing);
      } catch (err) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Unknown error';
          setError(message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserQueue();

    return () => {
      isMounted = false;
    };
  }, [token, currentSongId]);
  // Refresh data when currently playing song changes

  return {
    userQueue: userQueue || [],
    currentlyPlaying,
    error: error || tokenError,
    loading,
  };
};

export default useUserQueue;
