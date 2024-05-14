import React from 'react';
import { Bookmark } from '../types/types';
import useTopSites, { TopSite } from '../hooks/useFrequentlyVisited';

const renderLinks = (links: Array<TopSite | Bookmark>) =>
  links
    .filter(({ url, faviconUrl }) => url && faviconUrl)
    .slice(0, 5)
    .map((link) => {
      const { faviconUrl, url } = link || {};
      return (
        <a href={url} key={url} aria-label={`Link to ${url}`}>
          <div className='bg-black p-4 my-2 justify-center'>
            <img
              src={faviconUrl}
              alt={`Favicon for ${url}`}
              className='w-6 contain'
            />
          </div>
        </a>
      );
    });

const LinkSection: React.FC<{
  links: Array<TopSite | Bookmark>;
}> = ({ links }) => (
  <div className={`columns-${links.length}`}>
    {renderLinks(links)}
  </div>
);

type HeaderProps = {};
const Header: React.FC<HeaderProps> = () => {
  const { topSites } = useTopSites();
  return <>{topSites && <LinkSection links={topSites} />}</>;
};

export default Header;
