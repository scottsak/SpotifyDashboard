import React from 'react';
import Row from './Row/Row';
import TopSites from './TopSites';
import QueuedSongs from './Section3/QueuedSongs';

type BodyProps = {};

const Body: React.FC<BodyProps> = (props) => {
  return (
    <div className='grid-cols-12 grid-flow-row-dense grid h-full w-screen p-0'>
      <div className='col-span-1 bg-black h-full'>
        <TopSites />
      </div>
      <div className='col-span-8 lg:col-span-8 g-gray-300 h-full overflow-y-auto'>
        {/* <Row /> */}
      </div>
      <div className='col-span-3 lg:col-span-3 bg-darker h-full overflow-y-auto'>
        <QueuedSongs />
      </div>
    </div>
  );
};

export default Body;
