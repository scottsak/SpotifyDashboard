import React, { useCallback, useRef } from "react";
import { useProgressBar } from "../../hooks/useProgressBar";


type PlayerProgressProps = {
  progressPct: Number,
  setProgressPct: (pct: Number) => void
};


const PlayerProgress: React.FC<PlayerProgressProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const commit = useCallback(
    (percentage: number) => {
      const newPercentage = Math.min(Math.max(percentage, 0), 1);
      props.setProgressPct?.(newPercentage * 100);
    },
    [props],
  );
  const { dragging, dragMouseDown, isHovered } = useProgressBar(ref, commit, true);
  const { progressPct } = props
  return (
    <div
      className="h-1 rounded min-w-full bg-dark relative"
      ref={ref}
      onMouseDown={dragMouseDown}
      onTouchStart={dragMouseDown}>
      {/* Hover Dot */}
      {(isHovered || dragging) && <div className="w-2 h-2 rounded-full bg-white absolute top-1/2 -translate-y-1/2" style={{ left: `calc(${progressPct}% - 3px)` }} />}
      {/* Progress Bar */}
      <div className="h-1 rounded bg-white" style={{ width: `${progressPct}%` }} />
    </div>
  )
}

export default PlayerProgress