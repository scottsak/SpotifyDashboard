import React from 'react';
import { EditPlaybackController } from '../../../hooks/spotifyHooks/useEditPlayback';
import { SpotifyItem } from '../../../types/types';

interface CardProps {
  editPlayback: EditPlaybackController;
  card: SpotifyItem
}

const Card: React.FC<CardProps> = ({ editPlayback, card }) => {
  const { startSpecificPlayback } = editPlayback
  const {
    id: trackId,
    uri,
    name,
    album: {
      images,
      uri: albumUri
    } = {}
  } = card
  return (
    <div
      key={trackId}
      className='inline-block mr-4 text-white rounded-lg hover:cursor-pointer'
      onClick={() => startSpecificPlayback({
        uris: [uri],
        ...!!albumUri && { contextUri: albumUri }
      })}>
      <img
        className='h-[80px]'
        src={((images || [])[0] || {}).url || ''}
        alt={name}
      />
    </div>
  );
};

export default Card;
