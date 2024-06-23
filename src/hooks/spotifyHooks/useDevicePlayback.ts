import { useEffect, useState } from 'react';
import { getAvailableDevices } from '../../services/spotifyService/spotifyService';
import { Device } from '../../types/types';
import useToken from '../useToken';

interface DevicesReponse {
  error: string;
  devices: Device[] | null;
  skipPlayback: () => Promise<void>;
}

const useDevicePlayback = ({ deviceId }: { deviceId: string }) => {
  const { token, error: tokenError } = useToken();
  const [availableDevices, setAvailableDevices] = useState<Device[] | null>([]);
  const [activeDevice, setActiveDevice] = useState<Device[]>([]);
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
        const data: DevicesReponse = await getAvailableDevices(token);
        const availableDevicesArr = (data.devices || []).filter((device) => !device.is_active);
        const activeDeviceArr = (data.devices || []).filter((device) => !!device.is_active);
        setAvailableDevices(availableDevicesArr);
        setActiveDevice(activeDeviceArr);
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
  }, [token, deviceId]);
  // Refresh data when currently playing song changes

  return {
    availableDevices,
    activeDevice,
    error: error || tokenError,
    loading,
  };
};

export default useDevicePlayback;
