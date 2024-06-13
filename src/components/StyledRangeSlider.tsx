import React, { useRef } from 'react';
import { useRangeSlider } from '../hooks/useRangeSlider';

type ProgressBarProps = {
  commit: (percentage: number) => void;
  overridePct?: number;
  stateLoadingToAwait?: string;
  stateLoadingAfterEdit?: String;
  maximum: number;
  minimum: number;
};

const StyledProgressBar: React.FC<ProgressBarProps> = ({
  commit,
  stateLoadingToAwait,
  overridePct,
  stateLoadingAfterEdit,
  maximum,
  minimum,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { dragging, dragMouseDown, isHovered, dragPercentage } = useRangeSlider(ref, commit, false, maximum, minimum);
  const awaitingStateUpdate = stateLoadingToAwait && stateLoadingToAwait === stateLoadingAfterEdit;
  const useDragPercent = dragging || awaitingStateUpdate;
  const pctToUse = useDragPercent ? dragPercentage : overridePct;
  return (
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
  );
};

export default StyledProgressBar;
