import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { APP_NAME, BUY_COFFEE_LINK, FEATURED_CONTRIBUTORS } from '../../lib/enums';

const renderPopover = (): JSX.Element => (
  <div
    data-popover
    id='popover-hover'
    role='tooltip'
    className='absolute z-10 invisible inline-block w-fit text-sm text-white transition-opacity duration-300 bg-medium rounded-lg shadow-sm opacity-0'
  >
    <div className='px-3 py-2'>
      <p className='text-xs font-thin mb-2'>Made with ❤️ by our contributors</p>
      {FEATURED_CONTRIBUTORS.map(({ name, url }) => (
        <p className='text-xs font-thin'>
          <a href={url} className='hover:text-primary'>
            {name}
          </a>
        </p>
      ))}
      <p className='mt-2 text-xs font-thin'>
        Enjoying {APP_NAME}?{' '}
        <a href={BUY_COFFEE_LINK} className='hover:text-primary'>
          Buy us a coffee!
        </a>
      </p>
    </div>
    <div data-popper-arrow></div>
  </div>
);

const InformationPopover: React.FC = () => {
  return (
    <>
      <InformationCircleIcon
        className='size-5 text-white absolute right-2 top-2'
        data-popover-target='popover-hover'
        data-popover-trigger='hover'
      />
      {renderPopover()}
    </>
  );
};

export default InformationPopover;
