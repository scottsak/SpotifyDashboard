import { useEffect, useState } from 'react';
import useCurrentUserProfile from './spotifyHooks/useCurrentUserProfile';

const useUserPreferredName = (): { name: string; setName: (name: string) => void } => {
  const [name, setName] = useState('');
  const [nameFromStorage, setNameFromStorage] = useState('');
  const { userProfile } = useCurrentUserProfile();
  const { display_name: nameFromSpotifyProfile } = userProfile || {};

  useEffect(() => {
    let isMounted = true;
    chrome.runtime.sendMessage({ type: 'getPreferredName' }, (response) => {
      if (!isMounted) {
        return;
      }
      if (response && response.preferredName) {
        setNameFromStorage(nameFromStorage);
        setName(response.preferredName);
      } else if (nameFromSpotifyProfile) {
        setName(nameFromSpotifyProfile);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [nameFromSpotifyProfile, nameFromStorage]);

  useEffect(() => {
    if (name && name !== nameFromStorage) {
      chrome.runtime.sendMessage({
        type: 'setPreferredName',
        payload: { preferredName: name },
      });
    }
  }, [name, nameFromStorage]);

  return { name, setName };
};

export default useUserPreferredName;
