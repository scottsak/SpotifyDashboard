import React from 'react';
import useTime from '../../../hooks/useTime';
import EditableName from './EditableName';

interface DefaultLayoutProps {}

const DefaultLayout: React.FC<DefaultLayoutProps> = () => {
  const { formattedTime, formattedDate, timeFrame } = useTime();
  return (
    <div className='flex flex-col items-center justify-center h-full select-none'>
      <div className='flex flex-col justify-center items-center'>
        <p className='text-3xl'>{formattedDate}</p>
        <p className='text-8xl'>{formattedTime}</p>
        <p className='text-3xl mt-5'>
          Good {timeFrame}, <span className='relative'>{<EditableName />}</span>
        </p>
      </div>
    </div>
  );
};

export default DefaultLayout;
