import { useEffect, useState } from "react";
import { Bookmark } from "../types/types";

type SetBookmarks = (bookmarks: Bookmark[] | null) => void;


const getFaviconUrl = (bookmarkUrl: string | undefined): string => {
  if (!bookmarkUrl) {
    return '';
  }
  const url = new URL(chrome.runtime.getURL('/_favicon/'));
  url.searchParams.set('pageUrl', bookmarkUrl);
  url.searchParams.set('size', '32');
  return url.toString();
};

const getBookmarks = async (setBookmarks: SetBookmarks) => {
  const bookmarks = await chrome.bookmarks.getTree();
  const [{ children }] = bookmarks || [{} as Bookmark];

  const barBookmarks = ((children || []).find(({ title }) => title === 'Bookmarks Bar') || {}).children || [];
  const bookmarksWithFavicon: Bookmark[] =
    barBookmarks.map((bookmark: Bookmark) => ({
      ...bookmark,
      faviconUrl: getFaviconUrl(bookmark.url),
    }))

  setBookmarks(bookmarksWithFavicon || null);
};

const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[] | null>(null);

  useEffect(() => {
    getBookmarks(setBookmarks);
  }, []);

  return { bookmarks };
};

export default useBookmarks;