import React from 'react';
import { PlaybackState } from '../../../types/types';

interface Album {
  playbackState: PlaybackState;
}

const RowOfCards: React.FC<Album> = ({ playbackState }) => {
  const img = (((((playbackState || {}).item || {}).album || {}).images || [])[0] || {}).url || '';
  return (
    <div className='overflow-x-scroll whitespace-nowrap p-4 bg-transparent h-7/8'>
      {img && <img src={img} alt='album image' className='h-full mx-auto my-auto' />}
    </div>
  );
};

export default RowOfCards;
