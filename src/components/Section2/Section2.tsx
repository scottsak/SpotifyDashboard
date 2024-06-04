import React from 'react';
import Alert from '../Alert';
import { PlaybackState } from '../../types/types';
import Album from './Album/Album';
import { EditPlaybackController } from '../../hooks/spotifyHooks/useEditPlayback';
import DefaultLayout from './DefaultLayout/DefaultLayout';

interface Section2Props {
  displayError: boolean;
  needsTokenRefresh: boolean;
  editPlayback: EditPlaybackController;
  playbackState: PlaybackState;
  layoutSelection: string;
}

const renderMainLayout = ({ layoutSelection, playbackState }: { layoutSelection: string; playbackState: any }) => {
  if (layoutSelection === 'default') {
    return <DefaultLayout />;
  } else if (layoutSelection === 'album') {
    return <Album playbackState={playbackState} />;
  }
};

const Section2: React.FC<Section2Props> = ({ displayError, needsTokenRefresh, layoutSelection, playbackState }) => {
  return (
    <div className='relative flex flex-col justify-between h-full'>
      {displayError && (
        <Alert
          message={needsTokenRefresh ? 'Your token has expired' : 'Welcome to Spotify Dashboard'}
          promptLogin={true}
        />
      )}
      {renderMainLayout({ layoutSelection, playbackState })}
    </div>
  );
};

export default Section2;
