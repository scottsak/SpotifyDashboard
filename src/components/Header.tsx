import useBookmarks from "../hooks/useBookmarks"

const Header = () => {
  // console.log(chrome, 'chrome CE:TEST');
  const { bookmarks } = useBookmarks()
  console.log(bookmarks, 'bookmarks CE:TEST');
  return (
    <h1 className="text-xl text-primary font-bold">Spotif12332y App</h1>
  )
}

export default Header