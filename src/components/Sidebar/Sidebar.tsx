import React from 'react';
import QueuedSongs from './QueuedSongs';
import { PlaybackState } from '../../types/types';
import { EditPlaybackController } from '../../hooks/spotifyHooks/useEditPlayback';
import InformationPopover from './InformationPopover';

interface SidebarProps {
  playbackState: PlaybackState | null;
  editPlayback: EditPlaybackController;
}

const Sidebar: React.FC<SidebarProps> = ({ playbackState, editPlayback }) => {
  return (
    <div className='relative'>
      <InformationPopover />
      <QueuedSongs playbackState={playbackState} editPlayback={editPlayback} />
    </div>
  );
};

export default Sidebar;
