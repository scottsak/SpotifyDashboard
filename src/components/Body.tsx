import React from 'react';
import Row from './Row/Row';
import TopSites from './TopSites';
import QueuedSongs from './Section3/QueuedSongs';

type BodyProps = {};

const Body: React.FC<BodyProps> = (props) => {
  //   console.log('scotttest props row', props);
  return (
    <div className='flex flex-wrap justify-center h-full w-screen'>
      <div className='w-1/8 bg-black h-full'>
        <TopSites />
      </div>
      <div className='flex-1 g-gray-300 h-full overflow-y-auto'>
        {/* <Row /> */}
      </div>
      <div className='w-1/4 bg-darker h-full overflow-y-auto'>
        <QueuedSongs />
      </div>
    </div>
  );
};

export default Body;
