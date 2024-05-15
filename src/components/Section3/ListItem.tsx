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

interface ListItemProps {
  name: string;
  content: string;
  artist: Artists[];
  albumCover: AlbumCover[];
  key: string;
}

const ListItem: React.FC<ListItemProps> = (props) => {
  return (
    <div className='flex rounded-md shadow-md my-4'>
      <img
        src={((props.albumCover || [])[0] || {}).url || ''}
        alt='Album Cover'
        className='w-20 h-20 mr-2'
      />
      <div className='min-w-0'>
        <h2 className='text-base font-semibold truncate'>{props.name}</h2>
        <p className='text-gray-400'>
          {((props.artist || [])[0] || {}).name || ''}
        </p>
      </div>
    </div>
  );
};

export default ListItem;
