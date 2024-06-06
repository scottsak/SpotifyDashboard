import React from 'react';
import Card from './Card';
import useUserTopTracks from '../../../hooks/spotifyHooks/useUserTopTracks';
import { EditPlaybackController } from '../../../hooks/spotifyHooks/useEditPlayback';

interface RowOfCardsProps {
  editPlayback: EditPlaybackController;
}

const RowOfCards: React.FC<RowOfCardsProps> = ({ editPlayback }) => {
  const { userTopTracks } = useUserTopTracks();
  return (
    <div className='overflow-x-scroll whitespace-nowrap p-4 bg-transparent'>
      {userTopTracks.map((card) => (
        <Card card={card} key={card.id} editPlayback={editPlayback} />
      ))}
    </div>
  );
};

export default RowOfCards;
