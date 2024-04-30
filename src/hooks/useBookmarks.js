import { useEffect, useState } from "react"


const getBookmarks = async () => {
  const bm = await chrome.bookmarks.getTree()
  console.log(bm, 'bm CE:TEST');
  return bm
}

const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState(null)
  useEffect(() => {
    const bookmarks = getBookmarks()
    setBookmarks(bookmarks)
  }, [])

  return { bookmarks }
}

export default useBookmarks