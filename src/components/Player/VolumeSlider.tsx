import React from 'react';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';
import { EDIT_TYPES } from '../../lib/enums';
import StyledRangeSlider from '../StyledRangeSlider';

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
  const renderSpeakerIcon = () => {
    if (!supports_volume || !spotifyVolume) {
      return <SpeakerXMarkIcon className={`h-5 w-5 ${supports_volume ? 'text-gray-500' : 'text-gray-600'}`} />;
    }
    return <SpeakerWaveIcon className='h-5 w-5 text-gray-400' />;
  };

  const commit = (pct: number) => {
    editPlaybackVolume({ percentage: Math.round(pct) });
  };
  return (
    <div className='p-2 flex items-center text-right'>
      {renderSpeakerIcon()}
      <div className='w-[100px]'>
        <StyledRangeSlider
          commit={commit}
          overridePct={supports_volume ? spotifyVolume : 0}
          stateLoadingToAwait={EDIT_TYPES.UPDATE_VOLUME}
          stateLoadingAfterEdit={stateLoadingAfterEdit}
          maximum={100}
          minimum={0}
        />
      </div>
    </div>
  );
};

export default VolumeSlider;
