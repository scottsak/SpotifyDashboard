import React from 'react';
import TopSites from './TopSites';
import Section3 from './Section3/Section3';
import Section2 from './Section2/Section2';
import { PlaybackState } from '../types/types';
import { EditPlaybackController } from '../hooks/spotifyHooks/useEditPlayback';

type BodyProps = {
  playbackState: PlaybackState;
  editPlayback: EditPlaybackController;
};

const Body: React.FC<BodyProps> = (props) => {
  const { playbackState, editPlayback } = props;
  return (
    <div className='grid-cols-12 grid-flow-row-dense grid h-full w-screen p-0'>
      <div className='col-span-1 bg-black h-full'>
        <TopSites />
      </div>
      <div className='col-span-8 lg:col-span-8 g-gray-300 h-full overflow-y-auto'>
        <Section2 />
      </div>
      <div className='col-span-3 lg:col-span-3 bg-darker h-full overflow-y-auto'>
        <Section3 playbackState={playbackState} editPlayback={editPlayback} />
      </div>
    </div>
  );
};

export default Body;
