import React from 'react';
import Card from './Card';
import { CardItem } from '../../../types/types';

interface RowOfCardsProps {
  cards: CardItem[];
}

const RowOfCards: React.FC<RowOfCardsProps> = ({ cards }) => {
  return (
    <div className='overflow-x-scroll whitespace-nowrap p-4 bg-transparent'>
      {(cards || []).map((card, idx) => (
        <Card card={card} key={card.id} idx={idx} />
      ))}
    </div>
  );
};

export default RowOfCards;
