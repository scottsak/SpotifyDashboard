import React from 'react';
import { CardItem } from '../../../types/types';
import ScrollingText from '../../ScrollingText';

interface CardProps {
  card: CardItem;
  idx: number;
}

const Card: React.FC<CardProps> = ({ card, idx }) => {
  const { uri, images = [], primaryText, secondaryText } = card;
  return (
    <div className='inline-block mr-4 text-white rounded-lg hover:cursor-pointer'>
      <a href={uri} target='_blank' rel='noopener noreferrer'>
        <img className='w-32 h-32 object-cover mb-4' src={((images || [])[0] || {}).url || ''} alt={`${primaryText}`} />
      </a>
      <div className='text-left'>
        <a href={uri} target='_blank' rel='noopener noreferrer'>
          <ScrollingText text={`${idx + 1}. ${primaryText}`} additionalClasses={'text-sm font-sans font-light'} />
          <ScrollingText text={secondaryText || ''} additionalClasses={'text-xs font-thin'} />
        </a>
      </div>
    </div>
  );
};

export default Card;
