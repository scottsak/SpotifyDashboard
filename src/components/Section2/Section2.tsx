import React from 'react';
import Alert from '../Alert';
import { EditPlaybackController } from '../../hooks/spotifyHooks/useEditPlayback';
import DefaultLayout from './DefaultLayout/DefaultLayout';

interface Section2Props {
  displayError: boolean;
  needsTokenRefresh: boolean;
  editPlayback: EditPlaybackController;
  layoutSelection: string;
}

const renderMainLayout = ({ layoutSelection }: { layoutSelection: string }) => {
  if (layoutSelection === 'default') {
    return <DefaultLayout />;
  }
};

const Section2: React.FC<Section2Props> = ({ displayError, needsTokenRefresh, editPlayback, layoutSelection }) => {
  return (
    <div className='relative flex flex-col justify-between h-full'>
      {displayError && (
        <Alert
          message={needsTokenRefresh ? 'Your token has expired' : 'Welcome to Spotify Dashboard'}
          promptLogin={true}
        />
      )}
      {/* Main Layouts */}
      {renderMainLayout({ layoutSelection })}
    </div>
  );
};

export default Section2;
