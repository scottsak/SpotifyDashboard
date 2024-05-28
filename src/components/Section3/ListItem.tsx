import React from 'react';
import ScrollingText from '../ScrollingText';
import { EditPlaybackController } from '../../hooks/spotifyHooks/useEditPlayback';

interface AlbumCover {
  height: number;
  url: string;
  width: number;
}

interface UserQueue {
  [key: string]: any;
}

interface Artists {
  id: string;
  name: string;
  uri: string;
  [key: string]: any; // Allow any other properties
}

interface ListItemProps {
  name: string;
  content: string;
  artist: Artists[];
  albumCover: AlbumCover[];
  key: string;
  userQueue: UserQueue[];
  editPlayback: EditPlaybackController;
}

const skipToSong = (
  queue: UserQueue[],
  id: String,
  skipPlayback: { (): void; (): void }
) => {
  const songToSkipTo: number = (queue || []).findIndex(
    (song) => song.id === id
  );
  for (let x = 0; x <= songToSkipTo; x++) {
    skipPlayback();
  }
};

const ListItem: React.FC<ListItemProps> = (props) => {
  const { userQueue, content, editPlayback, albumCover, name, artist } = props;
  const { skipPlayback = () => {} } = editPlayback;
  return (
    <div
      className='flex rounded-md shadow-md my-4'
      onClick={() => skipToSong(userQueue, content, skipPlayback)}
    >
      <img
        src={((albumCover || [])[0] || {}).url || ''}
        alt='Album Cover'
        className='w-20 h-20 mr-2'
      />
      <div className='w-full'>
        <ScrollingText
          text={name}
          additionalClasses={'text-base font-semibold truncate'}
        />
        <ScrollingText
          text={((artist || [])[0] || {}).name || ''}
          additionalClasses={'text-gray-400'}
        />
      </div>
    </div>
  );
};

export default ListItem;
