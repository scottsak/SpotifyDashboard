import React from 'react';
import QueuedSongs from './QueuedSongs';
import { PlaybackState } from '../../types/types';

interface Section3Props {
  playbackState: PlaybackState
}

const Section3: React.FC<Section3Props> = ({ playbackState }) => {
  return (
    <div>
      <QueuedSongs
        playbackState={playbackState}
      />
    </div>
  );
};

export default Section3;
