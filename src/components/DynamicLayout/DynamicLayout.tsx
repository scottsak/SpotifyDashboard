import React from 'react';
import Alert from '../Alert';
import { PlaybackState } from '../../types/types';
import { EditPlaybackController } from '../../hooks/spotifyHooks/useEditPlayback';
import AlbumLayout from './AlbumLayout/AlbumLayout';
import DefaultLayout from './DefaultLayout/DefaultLayout';

interface DynamicLayoutProps {
  displayError: boolean;
  needsTokenRefresh: boolean;
  editPlayback: EditPlaybackController;
  playbackState: PlaybackState | null;
  layoutSelection: string;
}

const renderLayout = ({
  layoutSelection,
  playbackState,
  editPlayback,
}: {
  layoutSelection: string;
  playbackState: any;
  editPlayback: EditPlaybackController;
}) => {
  if (layoutSelection === 'default') {
    return <DefaultLayout editPlayback={editPlayback} playbackState={playbackState} />;
  } else if (layoutSelection === 'album') {
    return <AlbumLayout playbackState={playbackState} />;
  }
};

const DynamicLayout: React.FC<DynamicLayoutProps> = ({
  displayError,
  needsTokenRefresh,
  layoutSelection,
  playbackState,
  editPlayback,
}) => {
  return (
    <div className='relative flex flex-col justify-between h-full'>
      {displayError && (
        <Alert
          message={needsTokenRefresh ? 'Your token has expired' : 'Welcome to Spotify Dashboard'}
          promptLogin={true}
        />
      )}
      {renderLayout({ layoutSelection, playbackState, editPlayback })}
    </div>
  );
};

export default DynamicLayout;
