type SidebarCardProps = {
  imgSize: number
}

const SidebarCard = (props: SidebarCardProps) => {
  const { imgSize } = props
  return (
    <div className="flex">
      {/* Img placeholder */}
      <div
        className={`rounded bg-dark mr-2`}
        style={{ width: `${imgSize}px`, height: `${imgSize}px` }}
      />
      {/* Text placeholders */}
      <div>
        <div className="w-20 h-3 bg-dark rounded" />
        <div className="w-14 h-2 bg-dark rounded mt-2" />
        <div />
      </div>
    </div>
  )
}
export default SidebarCard