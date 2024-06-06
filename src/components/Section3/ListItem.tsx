import React from 'react';
import ScrollingText from '../ScrollingText';
import { EditPlaybackController } from '../../hooks/spotifyHooks/useEditPlayback';
import { SpotifyItem } from '../../types/types';

interface ListItemProps {
  item: SpotifyItem;
  userQueue: SpotifyItem[];
  editPlayback: EditPlaybackController;
  linkToSpotify?: boolean;
  index: number;
}

const getQueueUris = (userQueue: SpotifyItem[], currentIndex: number) =>
  userQueue.slice(currentIndex).map((item: SpotifyItem) => (item || {}).uri);

const ListItem: React.FC<ListItemProps> = (props) => {
  const { userQueue, editPlayback, item, linkToSpotify, index } = props;
  const { album, name, artists, type, images, show, uri } = item || {};
  const { startSpecificPlayback } = editPlayback;
  const isSong = type === 'track';
  const queueImages = isSong ? (album || {}).images : images;
  const subSection = isSong ? (artists || [])[0] : show;

  const handleClick = () => {
    if (!linkToSpotify) {
      startSpecificPlayback({ uris: getQueueUris(userQueue, index) });
    }
  };

  const renderBody = () => (
    <div className='flex rounded-md shadow-md my-4 hover:cursor-pointer' onClick={handleClick}>
      <img
        src={
          ((queueImages || []).find(({ height }) => height === 640) || ((album || {}).images || [])[0] || {}).url || ''
        }
        alt='Album Cover'
        className='w-[64px] h-[64px] mr-2'
      />
      <div className='w-full'>
        <ScrollingText text={name} additionalClasses={'text-sm font-sans font-light'} />
        <ScrollingText text={(subSection || {}).name || ''} additionalClasses={'text-xs font-thin'} />
      </div>
    </div>
  );

  // If we want to route to spotify, we wrap in anchor tag, otherwise we handle actions Via API
  return linkToSpotify ? <a href={uri}>{renderBody()}</a> : renderBody();
};

export default ListItem;
