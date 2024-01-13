import { useEffect, useState } from 'react'

const Timer = ({ start }: { start: boolean }) => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    let intervalId: number
    if (start) {
      intervalId = setInterval(() => {
        setTime((time) => time + 0.1)
      }, 100)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [start])

  return <div>{time.toFixed(1)}</div>
}
export default Timer
