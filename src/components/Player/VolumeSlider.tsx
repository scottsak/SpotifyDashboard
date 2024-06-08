import React, { useEffect, useState } from 'react';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';
import { EDIT_TYPES } from '../../lib/enums';

interface VolumeSliderProps {
  spotifyVolume: number;
  supports_volume: boolean;
  editPlaybackVolume:
    | (({ percentage, device_id }: { percentage: number; device_id?: string | undefined }) => Promise<void>)
    | (() => void);
  stateLoadingAfterEdit: string;
}

const VolumeSlider: React.FC<VolumeSliderProps> = ({
  spotifyVolume,
  supports_volume,
  editPlaybackVolume,
  stateLoadingAfterEdit,
}) => {
  const [playbackVolumeState, setPlaybackVolume] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const seekLoading = stateLoadingAfterEdit === EDIT_TYPES.UPDATE_VOLUME;
  const [waitingForUpdate, setWaitingForUpdate] = useState<boolean>(false);

  if (waitingForUpdate) {
    if (playbackVolumeState == spotifyVolume) {
      setWaitingForUpdate(false);
    }
  }

  useEffect(() => {
    if (seekLoading) {
      setWaitingForUpdate(true);
      setIsDragging(false);
    }
  }, [stateLoadingAfterEdit]);

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDragging(true);
    setPlaybackVolume(Number(event.target.value));
  };

  const handleVolumeChangeEnd = (event: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
    editPlaybackVolume({ percentage: Number(playbackVolumeState || 0) });
  };

  const renderSpeakerIcon = () => {
    if (!supports_volume || (!spotifyVolume && !playbackVolumeState)) {
      return <SpeakerXMarkIcon className={`h-6 w-6 ${supports_volume ? 'text-gray-500' : 'text-gray-600'}`} />;
    }
    return <SpeakerWaveIcon className='h-6 w-6 text-gray-400' />;
  };

  const renderVolumePercentage = (): number => {
    if (!supports_volume) {
      return 0;
    } else if (isDragging || seekLoading || waitingForUpdate) {
      return playbackVolumeState;
    } else {
      return spotifyVolume;
    }
  };

  return (
    <div className='p-2 flex items-center space-x-2'>
      {renderSpeakerIcon()}
      <input
        type='range'
        min='0'
        max='100'
        disabled={!supports_volume}
        value={renderVolumePercentage()}
        onChange={handleVolumeChange}
        onTouchEnd={handleVolumeChangeEnd}
        onMouseUp={handleVolumeChangeEnd}
        className='w-full h-2 accent-green-500 bg-gray-200 dark:bg-gray-700'
      />
    </div>
  );
};

export default VolumeSlider;
