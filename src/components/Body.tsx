import React from 'react';
import TopSites from './TopSites';
import Section3 from './Section3/Section3';
import Section2 from './Section2/Section2';
import { PlaybackState } from '../types/types';
import { EditPlaybackController } from '../hooks/spotifyHooks/useEditPlayback';

type BodyProps = {
  playbackState: PlaybackState;
  editPlayback: EditPlaybackController;
  displayError: boolean;
  needsTokenRefresh: boolean;
};

const Body: React.FC<BodyProps> = (props) => {
  const { playbackState, editPlayback, displayError, needsTokenRefresh } = props;
  return (
    <div className='flex h-full w-screen'>
      <div className='flex-none bg-black h-full'>
        <TopSites />
      </div>
      <div className='flex-grow g-gray-300 h-full overflow-y-auto'>
        <Section2
          displayError={displayError}
          needsTokenRefresh={needsTokenRefresh}
          editPlayback={editPlayback}
        />
      </div>
      <div className='flex-none w-[300px] bg-darker h-full overflow-y-scroll'>
        <Section3 playbackState={playbackState} editPlayback={editPlayback} />
      </div>
    </div>
  );
};

export default Body;
