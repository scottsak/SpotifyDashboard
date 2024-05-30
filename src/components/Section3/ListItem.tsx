import React from 'react';
import ScrollingText from '../ScrollingText';
import { EditPlaybackController } from '../../hooks/spotifyHooks/useEditPlayback';
import { SpotifyItem } from '../../types/types';

interface UserQueue {
  [key: string]: any;
}

interface ListItemProps {
  item: SpotifyItem;
  userQueue: UserQueue[];
  editPlayback: EditPlaybackController;
}

const skipToSong = (queue: UserQueue[], id: String, skipPlayback: { (): void; (): void }) => {
  const songToSkipTo: number = (queue || []).findIndex((song) => song.id === id);
  for (let x = 0; x <= songToSkipTo; x++) {
    skipPlayback();
  }
};

const ListItem: React.FC<ListItemProps> = (props) => {
  const { userQueue, editPlayback, item } = props;
  const { id, album, name, artists } = item || {};
  const { skipPlayback = () => {} } = editPlayback;
  return (
    <div
      className='flex rounded-md shadow-md my-4 hover:cursor-pointer'
      onClick={() => skipToSong(userQueue, id, skipPlayback)}
    >
      <img
        src={
          (((album || {}).images || []).find(({ height }) => height === 64) || ((album || {}).images || [])[0] || {})
            .url || ''
        }
        alt='Album Cover'
        className='w-[64px] h-[64px] mr-2'
      />
      <div className='w-full'>
        <ScrollingText text={name} additionalClasses={'text-sm font-sans font-light'} />
        <ScrollingText text={((artists || [])[0] || {}).name || ''} additionalClasses={'text-xs font-thin'} />
      </div>
    </div>
  );
};

export default ListItem;
