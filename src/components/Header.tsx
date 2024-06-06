import React from 'react';
import useBookmarks from '../hooks/useBookmarks';
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
          <div className='bg-dark p-3 rounded-full mx-2'>
            <img src={faviconUrl} alt={`Favicon for ${url}`} className='w-6 contain' />
          </div>
        </a>
      );
    });

const LinkSection: React.FC<{
  links: Array<TopSite | Bookmark>;
  marginTop: boolean;
}> = ({ links, marginTop }) => (
  <div className={`flex w-full justify-center bg-darker p-4 rounded ${marginTop && 'mt-2'}`}>
    <div className='flex md:w-3/4 w-full justify-around'>{renderLinks(links)}</div>
  </div>
);

type HeaderProps = {};
const Header: React.FC<HeaderProps> = () => {
  const { bookmarks } = useBookmarks();
  const { topSites } = useTopSites();
  return (
    <>
      {/* {bookmarks && <LinkSection links={bookmarks} marginTop={false} />} */}
      {topSites && <LinkSection links={topSites} marginTop={!!bookmarks} />}
    </>
  );
};

export default Header;
