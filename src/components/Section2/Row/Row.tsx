import React from 'react';
import Card from './Card';
import useUserTracks from '../../../hooks/spotifyHooks/useUserTracks';
import { EditPlaybackController } from '../../../hooks/spotifyHooks/useEditPlayback';


interface RowOfCardsProps {
  editPlayback: EditPlaybackController
}

const RowOfCards: React.FC<RowOfCardsProps> = ({ editPlayback }) => {
  const { userTracks } = useUserTracks();
  return (
    <div className='overflow-x-scroll whitespace-nowrap p-4 bg-transparent'>
      {userTracks.map((card) => (
        <Card
          card={card}
          key={card.id}
          editPlayback={editPlayback}
        />
      ))}
    </div>
  );
};

export default RowOfCards;
