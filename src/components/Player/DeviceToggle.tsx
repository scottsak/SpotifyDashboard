import React from 'react';
import { RadioIcon } from '@heroicons/react/24/outline';
import useDevicePlayback from '../../hooks/spotifyHooks/useDevicePlayback';
import { DevicePhoneMobileIcon, ComputerDesktopIcon } from '@heroicons/react/24/solid';

type DeviceToggleProps = {
  changeDevice: ({ device_id }: { device_id: string }) => void;
  deviceId: string;
};

const renderIcon = (deviceType: string) => {
  if (deviceType === 'Computer') {
    return <ComputerDesktopIcon className='h-5 w-5' />;
  } else if (deviceType === 'Speaker') {
    return <RadioIcon className='h-5 w-5' />;
  } else if (deviceType === 'Smartphone') {
    return <DevicePhoneMobileIcon className='h-5 w-5' />;
  }
};

const DeviceToggle: React.FC<DeviceToggleProps> = ({ changeDevice, deviceId }) => {
  const { availableDevices, activeDevice } = useDevicePlayback({ deviceId });
  return (
    <>
      <button className='p-2 focus:outline-none' data-popover-target='device-popover' data-popover-trigger='click'>
        <RadioIcon className='h-5 w-5 text-gray-400' />
      </button>
      <div
        data-popover
        id='device-popover'
        role='tooltip'
        data-popover-trigger='click'
        className='absolute z-10 invisible inline-block w-64 text-sm transition-opacity duration-300 bg-medium rounded-lg'
      >
        <div className='p-6 rounded-t-lg'>
          {(activeDevice || []).map((selection) => (
            <>
              <h3 className='font-semibold text-white pb-4'>Current Device</h3>
              <h3 className='relative flex items-center font-semibold text-primary'>
                <span className='text-primary'>{renderIcon(selection.type)}</span>
                <span className='ml-2'>{selection.name}</span>
              </h3>
            </>
          ))}
          <h3 className='pt-4 font-semibold text-white'>Available Devices</h3>
          {(availableDevices || []).map((selection) => (
            <p
              key={selection.id}
              onClick={() => changeDevice({ device_id: selection.id })}
              className={`p-4 hover:cursor-pointer relative flex items-center ${
                selection.is_active ? 'bg-primary' : 'hover:bg-light'
              }`}
            >
              {renderIcon(selection.type)}
              <span className='ml-2'>{selection.name}</span>
            </p>
          ))}
        </div>
        <div data-popper-arrow></div>
      </div>
    </>
  );
};

export default DeviceToggle;
