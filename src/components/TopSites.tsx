import React from 'react';
import { Bookmark } from '../types/types';
import useTopSites, { TopSite } from '../hooks/useFrequentlyVisited';
import { Cog8ToothIcon } from '@heroicons/react/24/solid';
import { LAYOUT_SELECTIONS } from '../lib/enums';

const renderLinks = (links: Array<TopSite | Bookmark>) =>
  links
    .filter(({ url, faviconUrl }) => url && faviconUrl)
    .slice(0, 5)
    .map((link) => {
      const { faviconUrl, url } = link || {};
      return (
        <a href={url} key={url} aria-label={`Link to ${url}`}>
          <div className='bg-black p-4 my-2 justify-center'>
            <img src={faviconUrl} alt={`Favicon for ${url}`} className='w-6 contain' />
          </div>
        </a>
      );
    });

const renderPopover = (layoutSelection: string, setLayoutSelection: (selection: string) => void) => (
  <div
    data-popover
    id='popover-click'
    role='tooltip'
    className='absolute z-10 invisible inline-block w-48 text-sm text-white transition-opacity duration-300 bg-medium rounded-lg shadow-sm opacity-0'
  >
    <div className='px-3 py-2 bg-medium rounded-t-lg text-center fs-large'>
      <h3 className='text-white font-bold'>Layout</h3>
    </div>
    <div className='px-3 py-2'>
      {LAYOUT_SELECTIONS.map((selection) => (
        <p key={selection} onClick={() => setLayoutSelection(selection)} className='p-2 hover:cursor-pointer relative'>
          {selection === layoutSelection && (
            <span className='w-1 h-1 bg-primary rounded-full absolute block -left-1 top-1/2 -translate-y-1/2' />
          )}
          {selection.charAt(0).toUpperCase() + selection.slice(1)}
        </p>
      ))}
    </div>
    <div data-popper-arrow></div>
  </div>
);

const LinkSection: React.FC<{
  links: Array<TopSite | Bookmark>;
}> = ({ links }) => <div className={`columns-${links.length}`}>{renderLinks(links)}</div>;

type HeaderProps = {
  layoutSelection: string;
  setLayoutSelection: (layout: string) => void;
};
const Header: React.FC<HeaderProps> = ({ layoutSelection, setLayoutSelection }) => {
  const { topSites } = useTopSites();
  return (
    <div className='flex flex-col justify-between h-full'>
      <div>{topSites && <LinkSection links={topSites} />}</div>
      <Cog8ToothIcon
        data-popover-target='popover-click'
        data-popover-trigger='click'
        className='w-10 m-4 text-dark hover:cursor-pointer border-none'
      />
      {renderPopover(layoutSelection, setLayoutSelection)}
    </div>
  );
};

export default Header;
