import { useEffect, useState } from 'react';
import { getUserQueue } from '../services/spotifyService/spotifyService';
import useToken from './useToken';

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

const useUserQueue = () => {
  const { token, error: tokenError } = useToken();
  const [userQueue, setUserQueue] = useState<userQueue[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setError('No token available');
      return;
    }

    getUserQueue(token)
      .then((data) => {
        setUserQueue(data.queue);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [token]);

  return { userQueue: userQueue || [], error: error || tokenError };
};

export default useUserQueue;
