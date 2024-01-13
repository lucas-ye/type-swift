type Props = {
  isMatch: boolean
  keyLetter: string
  currentIndex: number
  index: number
}

const Letter = (props: Props) => {
  const { isMatch, keyLetter, currentIndex, index } = props
  const defaultStyle =
    'w-10 h-10 flex justify-center items-center text-xl cursor-default font-bold'
  if (index === currentIndex) {
    return (
      <div className="flex flex-col items-center relative">
        <div className={`${defaultStyle}  text-slate-700 `}>{keyLetter}</div>
        <div className="w-5 h-1 bg-slate-700 absolute bottom-1"></div>
      </div>
    )
  }
  if (index < currentIndex) {
    if (isMatch) {
      return (
        <div
          className={`${defaultStyle} text-green-600 bg-green-200 rounded-md border border-green-400`}
        >
          {keyLetter}
        </div>
      )
    }
    return (
      <div
        className={`${defaultStyle} text-red-600 bg-red-200 rounded-md border border-red-400`}
      >
        {keyLetter}
      </div>
    )
  }

  if (index > currentIndex) {
    return <div className={`${defaultStyle}`}>{keyLetter}</div>
  }
}
export default Letter
