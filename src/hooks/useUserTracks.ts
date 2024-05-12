import { useEffect, useState } from 'react';
import { getUserTracks } from '../services/spotifyService/spotifyService';
import useToken from './useToken';

interface Album {
  id: string;
  name: string;
  uri: string;
  [key: string]: any; // Allow any other properties
}

interface userTracks {
  added_at: string;
  album: Album;
  [key: string]: any; // Allow any other properties
}

const useUserTracks = () => {
  const { token, error: tokenError } = useToken();
  const [userTracks, setUserTracks] = useState<userTracks[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setError('No token available');
      return;
    }

    getUserTracks(token)
      .then((data) => {
        // console.log('scotttest data', data);
        setUserTracks(data.items);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [token]);

  return { userTracks: userTracks || [], error: error || tokenError };
};

export default useUserTracks;
