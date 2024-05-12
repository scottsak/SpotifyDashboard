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
  // console.log('scotttest props', props);
  return (
    <div className='flex p-4 rounded-md shadow-md'>
      <img
        src={((props.albumCover || [])[0] || {}).url || ''}
        alt='Album Cover'
        className='w-24 h-24 mr-4'
      />
      <div>
        <h2 className='text-lg font-semibold'>{props.name}</h2>
        <p className='text-gray-400'>
          {((props.artist || [])[0] || {}).name || ''}
        </p>
      </div>
    </div>
  );
};

export default Card;
