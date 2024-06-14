import React, { useState } from 'react';
import { PlaybackState, SpotifyItem, TopItemsTimeFrames } from '../../../types/types';
import { transformSpotifyItem } from '../../../util/transformSpotifyItem';
import useUserTopTracks from '../../../hooks/spotifyHooks/useUserTopTracks';
import SidebarCardLoader from '../../SkeletonLoaders/SidebarCardLoader';
import ScrollingText from '../../ScrollingText';
import { TIME_FRAME_STRINGS } from '../../../lib/enums';
import { EditPlaybackController } from '../../../hooks/spotifyHooks/useEditPlayback';

interface TopSongsProps {
  editPlayback: EditPlaybackController;
  playbackState: PlaybackState;
}

const TopItem: React.FC<{ item: SpotifyItem; editPlayback: EditPlaybackController; playbackState: PlaybackState }> = ({
  item,
  editPlayback,
  playbackState,
}) => {
  const transformedItem = transformSpotifyItem(item);
  const { startSpecificPlayback } = editPlayback;
  const { smallAlbumImage, name, albumName = '', uri } = transformedItem || {};
  const { device } = playbackState || {};

  const unwrappedItem = (
    <div
      className='flex rounded-md shadow-md my-4 hover:cursor-pointer mx-2'
      onClick={() => startSpecificPlayback({ uris: [uri] })}
    >
      <img src={smallAlbumImage} alt='Album Cover' className='w-[64px] h-[64px] mr-2' />
      <div className='w-full'>
        <ScrollingText text={name} additionalClasses={'text-sm font-sans font-light'} />
        <ScrollingText text={albumName} additionalClasses={'text-xs font-thin'} />
      </div>
    </div>
  );
  return !device ? <a href={uri}>{unwrappedItem}</a> : unwrappedItem;
};

const TopSongs: React.FC<TopSongsProps> = ({ editPlayback, playbackState }) => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<TopItemsTimeFrames>('short_term');
  const { userTopTracks, loading: topTracksLoading } = useUserTopTracks({ timeFrame: selectedTimeFrame });

  const handleTimeFrameClick = () => {
    if (selectedTimeFrame === 'medium_term') setSelectedTimeFrame('long_term');
    else if (selectedTimeFrame === 'long_term') setSelectedTimeFrame('short_term');
    else setSelectedTimeFrame('medium_term');
  };
  return (
    <div className='w-full max-w-[450px] mt-20'>
      <p className='text-muted'>
        Your Top Songs{' '}
        <span className='hover:text-primary hover:cursor-pointer' onClick={handleTimeFrameClick}>
          {TIME_FRAME_STRINGS[selectedTimeFrame]}
        </span>
      </p>
      <div className='w-full grid grid-cols-2'>
        {!topTracksLoading &&
          userTopTracks
            .slice(0, 4)
            .map((item) => <TopItem item={item} editPlayback={editPlayback} playbackState={playbackState} />)}
        {(topTracksLoading || !userTopTracks.length) &&
          Array(4)
            .fill('')
            .map(() => (
              <div className='my-4'>
                <SidebarCardLoader imgSize={64} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default TopSongs;
