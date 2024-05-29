import React from 'react';
import useUserQueue from '../../hooks/spotifyHooks/useUserQueue';
import ListItem from './ListItem';
import { PlaybackState } from '../../types/types';
import SidebarCardLoader from '../SkeletonLoaders/SidebarCardLoader';
import { EditPlaybackController } from '../../hooks/spotifyHooks/useEditPlayback';

interface QueuedSongsProps {
  playbackState: PlaybackState;
  editPlayback: EditPlaybackController;
}

const renderSkeletons = () =>
  Array(12)
    .fill('')
    .map((_) => (
      <div className='my-4'>
        <SidebarCardLoader imgSize={64} />
      </div>
    ));

const QueuedSongs: React.FC<QueuedSongsProps> = (props) => {
  const { playbackState, editPlayback } = props || {};
  const { item: { id: currentSongId = '' } = {} } = playbackState || {};
  const { userQueue, currentlyPlaying, loading } = useUserQueue({
    currentSongId,
  });

  return (
    <div className='p-4'>
      {currentlyPlaying && (
        <div>
          <h2 className='text-base font-semibold'>Now Playing </h2>
          <ListItem
            key={currentlyPlaying.id}
            name={currentlyPlaying.name}
            content={currentlyPlaying.id}
            artist={currentlyPlaying.artists}
            albumCover={currentlyPlaying.album.images}
            userQueue={[currentlyPlaying]}
            editPlayback={editPlayback}
          />
        </div>
      )}
      <h2 className='text-base font-semibold'>Playing Next </h2>
      {loading && !userQueue.length && renderSkeletons()}
      {userQueue.map((item) => (
        <ListItem
          key={item.id}
          name={item.name}
          content={item.id}
          artist={item.artists}
          albumCover={item.album.images}
          userQueue={userQueue}
          editPlayback={editPlayback}
        />
      ))}
    </div>
  );
};

export default QueuedSongs;
