import React from 'react';
import useTime from '../../../hooks/useTime';
import EditableName from './EditableName';
import TopSongs from './TopSongs';
import { EditPlaybackController } from '../../../hooks/spotifyHooks/useEditPlayback';
import { PlaybackState } from '../../../types/types';

interface DefaultLayoutProps {
  editPlayback: EditPlaybackController;
  playbackState: PlaybackState;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ editPlayback, playbackState }) => {
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
      <TopSongs editPlayback={editPlayback} playbackState={playbackState} />
    </div>
  );
};

export default DefaultLayout;
