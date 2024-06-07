import React, { useCallback, useRef } from 'react';
import { useProgressBar } from '../../hooks/useProgressBar';
import formatMs from '../../util/msFormatted';

type PlayerProgressProps = {
  progressPct: number;
  duration: number;
  progress: number;
  seekToPosition: ({ position_ms, device_id }: { position_ms: number; device_id?: string }) => void;
  stateLoadingAfterEdit: boolean;
};

const PlayerProgress: React.FC<PlayerProgressProps> = (props) => {
  const { progressPct, duration, progress, seekToPosition, stateLoadingAfterEdit } = props;
  const ref = useRef<HTMLDivElement>(null);
  const commit = useCallback(
    (percentage: number) => {
      const position_ms = Math.round(duration * percentage);
      seekToPosition({ position_ms });
    },
    [duration, seekToPosition]
  );
  const { dragging, dragMouseDown, isHovered, dragPercentage } = useProgressBar(ref, commit, false);

  const formattedDuration = formatMs(duration);
  const formattedProgress = formatMs(progress);
  const pctToUse = dragging || stateLoadingAfterEdit ? dragPercentage : progressPct;
  return (
    <div className='flex items-center'>
      <p>{formattedProgress}</p>
      <div
        className='h-1 w-full rounded bg-dark relative mx-2'
        ref={ref}
        onMouseDown={dragMouseDown}
        onTouchStart={dragMouseDown}
      >
        {/* Hover Dot */}
        {(isHovered || dragging) && (
          <div
            className={`w-2 h-2 rounded-full bg-white absolute top-1/2 -translate-y-1/2 ${
              !dragging && 'transition-left transition-slowest ease'
            }`}
            style={{ left: `calc(${pctToUse}% - 3px)` }}
          />
        )}
        {/* Progress Bar */}
        <div
          className={`h-1 rounded bg-white ${!dragging && 'transition-slowest ease transition-width'}`}
          style={{ width: `${pctToUse}%` }}
        />
      </div>
      <p>{formattedDuration}</p>
    </div>
  );
};

export default PlayerProgress;
