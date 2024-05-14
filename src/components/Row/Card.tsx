import React from 'react';

interface AlbumCover {
  height: number;
  url: string;
  width: number;
}

interface Artists {
  id: string;
  name: string;
  uri: string;
  [key: string]: any; // Allow any other properties
}

interface CardProps {
  name: string;
  content: string;
  artist: Artists[];
  albumCover: AlbumCover[];
  key: string;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <div key={props.key} className='max-w-xs overflow-hidden shadow-lg'>
      <img
        className='h-52'
        src={((props.albumCover || [])[0] || {}).url || ''}
        alt={props.name}
      />
      <div className='px-6 py-4'>
        <div className='font-bold text-xs mb-2 overflow-hidden whitespace-nowrap'>
          {props.name}
        </div>
        <p className='text-gray-700 text-xs overflow-hidden whitespace-nowrap'>
          {((props.artist || [])[0] || {}).name || ''}
        </p>
      </div>
    </div>
  );
};

export default Card;
