import React from 'react';
import Card from './Card';
import { CardItem } from '../../../types/types';
import TopItemsCard from '../../SkeletonLoaders/TopItemsLoader';

interface RowOfCardsProps {
  cards: CardItem[];
  loadingUserTracks: Boolean;
  loadingUserArtists: Boolean;
}

const renderSkeletons = () =>
  Array(10)
    .fill('')
    .map((_) => (
      <div className='inline-block mr-4 text-white rounded-lg hover:cursor-pointer'>
        <TopItemsCard imgSize={32} />
      </div>
    ));

const RowOfCards: React.FC<RowOfCardsProps> = ({ cards, loadingUserTracks, loadingUserArtists }) => {
  return (
    <div className='overflow-x-scroll whitespace-nowrap p-4 bg-transparent'>
      {loadingUserTracks && loadingUserArtists
        ? renderSkeletons()
        : (cards || []).map((card, idx) => <Card card={card} key={card.id} idx={idx} />)}
    </div>
  );
};

export default RowOfCards;
