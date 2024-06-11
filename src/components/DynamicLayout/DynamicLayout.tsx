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

const renderLayout = ({ layoutSelection, playbackState }: { layoutSelection: string; playbackState: any }) => {
  if (layoutSelection === 'default') {
    return <DefaultLayout />;
  } else if (layoutSelection === 'album') {
    return <AlbumLayout playbackState={playbackState} />;
  }
};

const DynamicLayout: React.FC<DynamicLayoutProps> = ({
  displayError,
  needsTokenRefresh,
  layoutSelection,
  playbackState,
}) => {
  return (
    <div className='relative flex flex-col justify-between h-full'>
      {displayError && (
        <Alert
          message={needsTokenRefresh ? 'Your token has expired' : 'Welcome to Spotify Dashboard'}
          promptLogin={true}
        />
      )}
      {renderLayout({ layoutSelection, playbackState })}
    </div>
  );
};

export default DynamicLayout;
