import React from 'react';
import TopSites from './TopSites';
import Sidebar from './Sidebar/Section3';
import DynamicLayout from './DynamicLayout/DynamicLayout';
import { PlaybackState } from '../types/types';
import { EditPlaybackController } from '../hooks/spotifyHooks/useEditPlayback';
import useLayoutSelection from '../hooks/useLayoutSelection';

type BodyProps = {
  playbackState: PlaybackState | null;
  editPlayback: EditPlaybackController;
  displayError: boolean;
  needsTokenRefresh: boolean;
};

const Body: React.FC<BodyProps> = (props) => {
  const { layoutSelection, setLayoutSelection } = useLayoutSelection();
  const { playbackState, editPlayback, displayError, needsTokenRefresh } = props;
  return (
    <div className='flex h-full w-screen'>
      <div className='flex-none bg-black h-full'>
        <TopSites layoutSelection={layoutSelection} setLayoutSelection={setLayoutSelection} />
      </div>
      <div className='flex-grow g-gray-300 h-full overflow-y-auto'>
        <DynamicLayout
          displayError={displayError}
          needsTokenRefresh={needsTokenRefresh}
          editPlayback={editPlayback}
          playbackState={playbackState}
          layoutSelection={layoutSelection}
        />
      </div>
      <div className='flex-none w-[300px] bg-darker h-full overflow-y-scroll'>
        <Sidebar playbackState={playbackState} editPlayback={editPlayback} />
      </div>
    </div>
  );
};

export default Body;
