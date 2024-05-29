import React from 'react';
import Row from './Row/Row';
import Alert from '../Alert';
import { EditPlaybackController } from '../../hooks/spotifyHooks/useEditPlayback';

interface Section2Props {
  displayError: boolean;
  needsTokenRefresh: boolean;
  editPlayback: EditPlaybackController;
}

const Section2: React.FC<Section2Props> = ({ displayError, needsTokenRefresh, editPlayback }) => {
  return (
    <div className='relative flex flex-col justify-between h-full'>
      {displayError && (
        <Alert
          message={
            needsTokenRefresh
              ? 'Your token has expired'
              : 'Welcome to Spotify Dashboard'
          }
          promptLogin={true}
        />
      )}
      <div>

      </div>
      <Row
        editPlayback={editPlayback}
      />
    </div>
  );
};

export default Section2;
