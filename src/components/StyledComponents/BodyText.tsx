type BodyTextProps = {
  text: string
}

const BodyText = (props: BodyTextProps) => {
  const { text } = props
  return (
    <p className="text-sm font-sans font-light">{text}</p>
  )
}
export default BodyText