type Props = {
  keyLetter: string
  isPressed: boolean
  className?: string
}
const Key = (props: Props) => {
  {
    return props.className ? (
      <div
        className={`${
          props.className
        } border-slate-500 border rounded-md flex items-center justify-center cursor-default ${
          props.isPressed ? 'bg-slate-400' : ''
        }`}
      >
        {props.keyLetter}
      </div>
    ) : (
      <div
        className={` w-14 border-slate-500 border rounded-md flex items-center justify-center cursor-default ${
          props.isPressed ? 'bg-slate-400' : ''
        }`}
      >
        {props.keyLetter}
      </div>
    )
  }
}
export default Key
