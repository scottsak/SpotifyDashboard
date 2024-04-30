import { useEffect, useState } from "react"
import { Bookmark } from "../types/types";

type SetBookmarks = (bookmarks: Bookmark[] | null) => void;

const getBookmarks = async (setBookmarks: SetBookmarks) => {
  const bookmarks: Bookmark[] = await chrome.bookmarks.getTree();
  const [{ children }] = bookmarks || [{} as Bookmark];
  const barBookmarks = ((children || []).find(({ title }) => title === 'Bookmarks Bar') || {}).children;
  setBookmarks(barBookmarks || null);
};


const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[] | null>(null);

  useEffect(() => {
    getBookmarks(setBookmarks);
  }, []);

  return { bookmarks };
};

export default useBookmarks;