import React from 'react';
import ScrollingText from '../ScrollingText';

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
      <div className='w-full'>
        <ScrollingText
          text={props.name}
          additionalClasses={'text-base font-semibold truncate'}
        />
        <ScrollingText
          text={((props.artist || [])[0] || {}).name || ''}
          additionalClasses={'text-gray-400'}
        />
      </div>
    </div>
  );
};

export default ListItem;
