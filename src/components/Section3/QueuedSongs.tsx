import React from 'react';
import useUserQueue from '../../hooks/useUserQueue';
import ListItem from './ListItem';

interface QueuedSongsProps {}

const QueuedSongs: React.FC<QueuedSongsProps> = () => {
  const { userQueue } = useUserQueue();
  return (
    <div className='p-4'>
      <h2 className='text-lg font-semibold'>Playing Next: </h2>
      {userQueue.map((item) => (
        <ListItem
          key={item.id}
          name={item.album.name}
          content={item.album.id}
          artist={item.album.artists}
          albumCover={item.album.images}
        />
      ))}
    </div>
  );
};

export default QueuedSongs;
