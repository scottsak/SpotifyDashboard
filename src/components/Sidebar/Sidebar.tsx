import React from 'react';
import QueuedSongs from './QueuedSongs';
import { PlaybackState } from '../../types/types';
import { EditPlaybackController } from '../../hooks/spotifyHooks/useEditPlayback';

interface SidebarProps {
  playbackState: PlaybackState | null;
  editPlayback: EditPlaybackController;
}

const Sidebar: React.FC<SidebarProps> = ({ playbackState, editPlayback }) => {
  return (
    <div>
      <QueuedSongs playbackState={playbackState} editPlayback={editPlayback} />
    </div>
  );
};

export default Sidebar;
