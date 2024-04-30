import useBookmarks from "../hooks/useBookmarks"


type HeaderProps = {};
const Header: React.FC<HeaderProps> = () => {
  const { bookmarks } = useBookmarks()
  return (
    <h1 className="text-xl text-primary font-bold">Spotif12332y App</h1>
  )
}

export default Header