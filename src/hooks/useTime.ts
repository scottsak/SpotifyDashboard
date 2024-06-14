import { useEffect, useState } from 'react';

interface Time {
  date: Date;
  hours: number;
  minutes: number;
  seconds: number;
  day: string;
  formattedTime: string;
  formattedDate: string;
  timeFrame: string;
}

const formatTime = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes.toString().padStart(2, '0');
  return `${hours}:${minutesStr} ${ampm}`;
};

const getTimeFrame = (date: Date): string => {
  const hours = date.getHours();
  if (hours >= 4 && hours < 12) {
    return 'Morning';
  } else if (hours >= 12 && hours < 17) {
    return 'Afternoon';
  } else {
    return 'Evening';
  }
};

const formatDate = (date: Date): string =>
  date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

const useTime = (): Time => {
  const now = new Date();
  const [time, setTime] = useState<Time>({
    date: now,
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
    day: now.toLocaleDateString('en-US', { weekday: 'long' }),
    formattedTime: formatTime(now),
    formattedDate: formatDate(now),
    timeFrame: getTimeFrame(now),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const _now = new Date();
      setTime({
        date: _now,
        hours: _now.getHours(),
        minutes: _now.getMinutes(),
        seconds: _now.getSeconds(),
        day: _now.toLocaleDateString('en-US', { weekday: 'long' }),
        formattedTime: formatTime(_now),
        formattedDate: formatDate(_now),
        timeFrame: getTimeFrame(_now),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return time;
};

export default useTime;
