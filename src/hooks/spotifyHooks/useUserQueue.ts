import { useEffect, useState } from 'react';
import { getUserQueue } from '../../services/spotifyService/spotifyService';
import useToken from '../useToken';

interface Album {
  id: string;
  name: string;
  uri: string;
  [key: string]: any; // Allow any other properties
}

interface userQueue {
  added_at: string;
  album: Album;
  [key: string]: any; // Allow any other properties
}

const useUserQueue = ({ currentSongId }: { currentSongId: string }) => {
  const { token, error: tokenError } = useToken();
  const [userQueue, setUserQueue] = useState<userQueue[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    let isMounted: boolean = true
    if (!token) {
      setError('No token available');
      return;
    }
    const fetchUserQueue = async () => {
      try {
        setLoading(true)
        const data = await getUserQueue(token);
        setUserQueue(data.queue)
      } catch (err) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Unknown error';
          setError(message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUserQueue();

    return () => {
      isMounted = false;
    }
  }, [token, currentSongId]);
  // Refresh data when currently playing song changes

  return {
    userQueue: userQueue || [],
    error: error || tokenError,
    loading
  };
};

export default useUserQueue;
