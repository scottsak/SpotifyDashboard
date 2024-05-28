import React from 'react';
import QueuedSongs from './QueuedSongs';
import { PlaybackState } from '../../types/types';
import { EditPlaybackController } from '../../hooks/spotifyHooks/useEditPlayback';

interface Section3Props {
  playbackState: PlaybackState;
  editPlayback: EditPlaybackController;
}

const Section3: React.FC<Section3Props> = ({ playbackState, editPlayback }) => {
  return (
    <div>
      <QueuedSongs playbackState={playbackState} editPlayback={editPlayback} />
    </div>
  );
};

export default Section3;
