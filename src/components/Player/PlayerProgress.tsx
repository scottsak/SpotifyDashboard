import React, { useCallback } from 'react';
import formatMs from '../../util/msFormatted';
import StyledProgressBar from '../StyledRangeSlider';
import { EDIT_TYPES } from '../../lib/enums';

type PlayerProgressProps = {
  progressPct: number;
  duration: number;
  progress: number;
  seekToPosition: ({ position_ms, device_id }: { position_ms: number; device_id?: string }) => void;
  stateLoadingAfterEdit: string;
};

const PlayerProgress: React.FC<PlayerProgressProps> = (props) => {
  const { progressPct, duration, progress, seekToPosition, stateLoadingAfterEdit } = props;
  const commit = useCallback(
    (percentage: number) => {
      const position_ms = Math.round(duration * (percentage / 100));
      seekToPosition({ position_ms });
    },
    [duration, seekToPosition]
  );

  const formattedDuration = formatMs(duration);
  const formattedProgress = formatMs(progress);
  return (
    <div className='flex items-center'>
      <p>{formattedProgress}</p>
      <StyledProgressBar
        commit={commit}
        stateLoadingToAwait={EDIT_TYPES.SEEK_TO_POSITION}
        overridePct={progressPct}
        stateLoadingAfterEdit={stateLoadingAfterEdit}
        maximum={100}
        minimum={0}
      />
      <p>{formattedDuration}</p>
    </div>
  );
};

export default PlayerProgress;
