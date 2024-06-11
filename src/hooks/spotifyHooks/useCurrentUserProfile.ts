import { useEffect, useState } from 'react';
import { getCurrentUserProfile } from '../../services/spotifyService/spotifyService';
import { SpotifyProfile } from '../../types/types';
import useToken from '../useToken';

const useCurrentUserProfile = (): { userProfile: SpotifyProfile | null; error: string; loading: boolean } => {
  const { token, error: tokenError } = useToken();
  const [userProfile, setUserProfile] = useState<SpotifyProfile | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted: boolean = true;
    if (!token) {
      setError('No token available');
      return;
    }
    const fetchCurrentUserProfile = async () => {
      try {
        setLoading(true);
        const userProfileResponse: SpotifyProfile = await getCurrentUserProfile(token);
        setUserProfile(userProfileResponse);
      } catch (err) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Unknown error';
          setError(message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentUserProfile();
    return () => {
      isMounted = false;
    };
  }, [token]);

  return {
    userProfile: userProfile,
    error: error || tokenError,
    loading,
  };
};

export default useCurrentUserProfile;
