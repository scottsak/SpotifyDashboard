import React, { Suspense } from 'react';
import Alert from '../Alert';
import { PlaybackState } from '../../types/types';
import { EditPlaybackController } from '../../hooks/spotifyHooks/useEditPlayback';

// Lazy loaded layouts
const Stats = React.lazy(() => import('./Stats/Stats'));
const AlbumLayout = React.lazy(() => import('./AlbumLayout/AlbumLayout'));
const DefaultLayout = React.lazy(() => import('./DefaultLayout/DefaultLayout'));

interface DynamicLayoutProps {
  displayError: boolean;
  needsTokenRefresh: boolean;
  editPlayback: EditPlaybackController;
  playbackState: PlaybackState | null;
  layoutSelection: string;
  loadingAfterEditPlayback: string;
}

const renderLayout = ({
  layoutSelection,
  playbackState,
  editPlayback,
  loadingAfterEditPlayback,
}: {
  layoutSelection: string;
  playbackState: PlaybackState | null;
  editPlayback: EditPlaybackController;
  loadingAfterEditPlayback: string;
}): JSX.Element => {
  if (layoutSelection === 'default') {
    return <DefaultLayout editPlayback={editPlayback} playbackState={playbackState} />;
  } else if (layoutSelection === 'album') {
    return <AlbumLayout playbackState={playbackState} loadingAfterEditPlayback={loadingAfterEditPlayback} />;
  } else if (layoutSelection === 'stats') {
    return <Stats playbackState={playbackState} editPlayback={editPlayback} />;
  }
  return <div></div>;
};

const DynamicLayout: React.FC<DynamicLayoutProps> = ({
  displayError,
  needsTokenRefresh,
  layoutSelection,
  playbackState,
  loadingAfterEditPlayback,
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
      <Suspense fallback={<div></div>}>
        {renderLayout({ layoutSelection, playbackState, editPlayback, loadingAfterEditPlayback })}
      </Suspense>
    </div>
  );
};

export default DynamicLayout;
