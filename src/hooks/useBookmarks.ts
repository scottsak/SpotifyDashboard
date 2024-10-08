import { useEffect, useState } from 'react';
import { Bookmark } from '../types/types';
import { getFaviconUrl } from '../util/getFaviconUrl';

type SetBookmarks = (bookmarks: Bookmark[] | null) => void;
type SetError = (error: Boolean) => void;
type SetLoading = (loading: Boolean) => void;
type UseBookmarksReturnValue = {
  bookmarks: Array<Bookmark> | null;
  error: Boolean;
  loading: Boolean;
};

const getBookmarks = async (setBookmarks: SetBookmarks, setError: SetError, setLoading: SetLoading) => {
  try {
    setLoading(true);
    const bookmarks = await chrome.bookmarks.getTree();
    const [{ children }] = bookmarks || [{} as Bookmark];

    const barBookmarks = ((children || []).find(({ title }) => title === 'Bookmarks Bar') || {}).children || [];
    const bookmarksWithFavicon: Array<Bookmark> = barBookmarks.map((bookmark: Bookmark) => ({
      ...bookmark,
      faviconUrl: getFaviconUrl(bookmark.url),
    }));
    setBookmarks(bookmarksWithFavicon || null);
  } catch (err) {
    setError(true);
  } finally {
    setLoading(false);
  }
};

const useBookmarks = (): UseBookmarksReturnValue => {
  const [bookmarks, setBookmarks] = useState<Bookmark[] | null>(null);
  const [error, setError] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    getBookmarks(setBookmarks, setError, setLoading);
  }, []);

  return { bookmarks, error, loading };
};

export default useBookmarks;
