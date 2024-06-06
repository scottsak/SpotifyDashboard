import React, { useRef, useEffect, useState } from 'react';

type ScrollingTextProps = {
  text: string;
  additionalClasses?: string;
};

const ScrollingText: React.FC<ScrollingTextProps> = ({ text, additionalClasses }) => {
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef?.current?.offsetWidth || 0;
      const textWidth = textRef?.current?.offsetWidth || 0;
      setIsOverflowing(containerWidth < textWidth);
    }
  }, [containerRef, text]);

  return (
    <div className='overflow-hidden relative w-full h-5' ref={containerRef}>
      <div
        className={`absolute whitespace-nowrap ${isOverflowing && 'animate-scrolling'} ${additionalClasses || ''}`}
        ref={textRef}
      >
        {text}
      </div>
    </div>
  );
};

export default ScrollingText;
