import React from 'react';
import Card from './Card';
import useUserTracks from '../../../hooks/spotifyHooks/useUserTracks';

interface Album {
  id: string;
  name: string;
  uri: string;
  [key: string]: any; // Allow any other properties
}

interface CardData {
  added_at: string;
  album: Album;
  [key: string]: any; // Allow any other properties
}

interface RowOfCardsProps {}

const RowOfCards: React.FC<RowOfCardsProps> = () => {
  const { userTracks } = useUserTracks();
  return (
    <div className='overflow-x-scroll whitespace-nowrap p-4 bg-transparent'>
      {userTracks.map((card) => (
        <Card
          key={card.id}
          name={card.album.name}
          content={card.album.id}
          artist={card.album.artists}
          albumCover={card.album.images}
        />
      ))}
    </div>
  );
};

export default RowOfCards;
