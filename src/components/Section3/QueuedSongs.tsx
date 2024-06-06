import React from 'react';
import useUserQueue from '../../hooks/spotifyHooks/useUserQueue';
import ListItem from './ListItem';
import { PlaybackState, SpotifyItem } from '../../types/types';
import SidebarCardLoader from '../SkeletonLoaders/SidebarCardLoader';
import { EditPlaybackController } from '../../hooks/spotifyHooks/useEditPlayback';
import useUserTopTracks from '../../hooks/spotifyHooks/useUserTopTracks';

interface QueuedSongsProps {
  playbackState: PlaybackState;
  editPlayback: EditPlaybackController;
}

const renderSkeletons = () =>
  Array(20)
    .fill('')
    .map((_) => (
      <div className='my-4'>
        <SidebarCardLoader imgSize={64} />
      </div>
    ));

const QueuedSongs: React.FC<QueuedSongsProps> = (props) => {
  const { userTopTracks, loading: topTracksLoading } = useUserTopTracks();
  const { playbackState, editPlayback } = props || {};
  const { item } = playbackState || {};
  const currentSongId = (item || {}).id || '';
  const {
    userQueue,
    currentlyPlaying,
    loading: queueLoading,
  } = useUserQueue({
    currentSongId,
  });

  const isLoading = (topTracksLoading || queueLoading) && !userQueue.length;
  const shouldRenderTopTracks = userTopTracks.length && !isLoading && !userQueue.length;
  return (
    <div className='p-4'>
      {currentlyPlaying && (
        <div>
          <h2 className='text-base font-semibold'>Now Playing </h2>
          <ListItem item={currentlyPlaying} userQueue={[currentlyPlaying]} editPlayback={editPlayback} index={0} />
        </div>
      )}
      {!isLoading && (
        <h2 className='text-base font-semibold'>{shouldRenderTopTracks ? 'Jump Right In' : 'Playing Next'}</h2>
      )}
      {isLoading && renderSkeletons()}
      {userQueue.map((item, index) => (
        <ListItem item={item} userQueue={userQueue} editPlayback={editPlayback} index={index} />
      ))}
      {shouldRenderTopTracks &&
        userTopTracks.map((item, index) => (
          <ListItem item={item} userQueue={userQueue} editPlayback={editPlayback} linkToSpotify={true} index={index} />
        ))}
    </div>
  );
};

export default QueuedSongs;
