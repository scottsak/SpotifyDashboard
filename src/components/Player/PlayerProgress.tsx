import React, { useCallback, useRef } from 'react';
import { useProgressBar } from '../../hooks/useProgressBar';
import formatMs from '../../util/msFormatted';

type PlayerProgressProps = {
  progressPct: number;
  setProgressPct: (pct: number) => void;
  duration: number;
  progress: number;
};

const PlayerProgress: React.FC<PlayerProgressProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const commit = useCallback(
    (percentage: number) => {
      const newPercentage = Math.min(Math.max(percentage, 0), 1);
      props.setProgressPct?.(newPercentage * 100);
    },
    [props]
  );
  const { dragging, dragMouseDown, isHovered } = useProgressBar(ref, commit, true);
  const { progressPct, duration, progress } = props;
  const formattedDuration = formatMs(duration);
  const formattedProgress = formatMs(progress);
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
            className='w-2 h-2 rounded-full bg-white absolute top-1/2 -translate-y-1/2 transition-left transition-slowest ease'
            style={{ left: `calc(${progressPct}% - 3px)` }}
          />
        )}
        {/* Progress Bar */}
        <div
          className='h-1 rounded bg-white transition-width transition-slowest ease'
          style={{ width: `${progressPct}%` }}
        />
      </div>
      <p>{formattedDuration}</p>
    </div>
  );
};

export default PlayerProgress;
