import React from 'react';
import useUserQueue from '../../hooks/spotifyHooks/useUserQueue';
import ListItem from './ListItem';
import { PlaybackState } from '../../types/types';
import SidebarCardLoader from '../SkeletonLoaders/SidebarCardLoader';

interface QueuedSongsProps {
  playbackState: PlaybackState
}

const renderSkeletons = () => Array(12).fill('').map(_ =>
  <div className='my-4'>
    <SidebarCardLoader imgSize={80} />
  </div>
)

const QueuedSongs: React.FC<QueuedSongsProps> = (props) => {
  const { playbackState } = props || {}
  const {
    item: {
      id: currentSongId = ''
    } = {}
  } = playbackState || {}
  const { userQueue, loading } = useUserQueue({ currentSongId });

  return (
    <div className='p-4'>
      <h2 className='text-lg font-semibold'>Playing Next: </h2>
      {loading && !userQueue.length && renderSkeletons()}
      {userQueue.map((item) => (
        <ListItem
          key={item.id}
          name={item.name}
          content={item.id}
          artist={item.artists}
          albumCover={item.album.images}
        />
      ))}
    </div>
  );
};

export default QueuedSongs;
