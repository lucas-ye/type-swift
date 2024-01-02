type Props = {
  isMatch: boolean
  keyLetter: string
  currentIndex: number
  index: number
}

const Letter = (props: Props) => {
  const { isMatch, keyLetter, currentIndex, index } = props
  const defaultStyle =
    'w-12 h-12 flex justify-center items-center text-lg cursor-default font-bold'
  if (index === currentIndex) {
    return (
      <div className={`${defaultStyle} text-slate-500 underline `}>
        {keyLetter}
      </div>
    )
  }
  if (index < currentIndex) {
    if (isMatch) {
      return <div className={`${defaultStyle} text-green-600`}>{keyLetter}</div>
    }
    return <div className={`${defaultStyle} text-red-600`}>{keyLetter}</div>
  }

  if (index > currentIndex) {
    return <div className={`${defaultStyle} text-slate-500`}>{keyLetter}</div>
  }
}
export default Letter
