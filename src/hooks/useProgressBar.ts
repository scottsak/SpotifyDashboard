import React, { RefObject, useCallback, useEffect, useState } from 'react';

type MouseActivity = React.MouseEvent<HTMLElement> | MouseEvent;

type ActivityEvent = MouseActivity | React.TouchEvent<HTMLElement> | TouchEvent;

type UseProgressBarReturn = {
  dragging: boolean;
  dragPercentage: Number;
  isHovered: boolean;
  dragMouseDown: (ev: ActivityEvent) => void;
};

export function makePercentageString(num: number) {
  return `${num.toFixed(2)}%`;
}

export function makePercentage(num: number) {
  return Number(Math.max(0, Math.min(num, 100)).toFixed(2));
}

function isClickEvent(evt: ActivityEvent): evt is React.MouseEvent<HTMLElement> | MouseEvent {
  return evt.type === 'mousedown' || evt.type === 'mouseup' || evt.type === 'mousemove';
}

const getEventX = (evt: ActivityEvent) => {
  return isClickEvent(evt) ? evt.pageX : evt.changedTouches[0].pageX;
};

export function useProgressBar(
  barRef: RefObject<HTMLElement>,
  commit: (percentage: number) => void,
  commitImmediately = false
): UseProgressBarReturn {
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const mouseMove = (ev: ActivityEvent) => {
      if (!mouseDown || !barRef.current) return;
      const rect = barRef.current.getBoundingClientRect();
      const pos = (getEventX(ev) - rect.left) / barRef.current.offsetWidth;
      setProgress(pos * 100);
      if (commitImmediately) commit(pos);
    };

    const mouseUp = (ev: ActivityEvent) => {
      if (!mouseDown) return;
      setMouseDown(false);

      if (!barRef.current) return;
      const rect = barRef.current.getBoundingClientRect();
      const pos = (getEventX(ev) - rect.left) / barRef.current.offsetWidth;
      commit(pos);
    };

    const mouseEnter = (ev: ActivityEvent) => {
      setIsHovered(true);
    };

    const mouseLeave = (ev: ActivityEvent) => {
      setIsHovered(false);
    };

    if (barRef.current) {
      barRef.current.addEventListener('mouseenter', mouseEnter);
      barRef.current.addEventListener('mouseleave', mouseLeave);
    }

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('touchmove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
    document.addEventListener('touchend', mouseUp);

    return () => {
      const _barRef = barRef;
      if (_barRef?.current) {
        _barRef.current.removeEventListener('mouseleave', mouseLeave);
        _barRef.current.removeEventListener('mouseenter', mouseEnter);
      }
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('touchmove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
      document.removeEventListener('touchend', mouseUp);
    };
  }, [mouseDown, barRef, commit, commitImmediately]);

  const dragMouseDown = useCallback(
    (ev: ActivityEvent) => {
      setMouseDown(true);
      if (!barRef.current) return;
      const rect = barRef.current.getBoundingClientRect();
      const pos = ((getEventX(ev) - rect.left) / barRef.current.offsetWidth) * 100;
      setProgress(pos);
    },
    [setProgress, barRef]
  );

  return {
    dragging: mouseDown,
    dragPercentage: progress,
    isHovered,
    dragMouseDown,
  };
}
