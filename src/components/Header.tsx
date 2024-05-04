import React from "react";
import useBookmarks from "../hooks/useBookmarks"
import { Bookmark } from "../types/types";


type HeaderProps = {};
const Header: React.FC<HeaderProps> = () => {
  const { bookmarks } = useBookmarks()
  return (
    <>
      <div className="flex w-full justify-center bg-darker p-4 rounded">
        <div className="flex md:w-3/4 w-full justify-around">
          {
            bookmarks?.filter(({ url, faviconUrl }) => url && faviconUrl).slice(0, 5).map((bookmark: Bookmark) => {
              const { faviconUrl, url } = bookmark || {}
              return (
                <a href={url}>
                  <div className="bg-dark p-3 rounded-full mx-2">
                    <img src={faviconUrl} alt={url} className="w-6 contain" />
                  </div>
                </a>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default Header