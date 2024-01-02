import { useEffect, useState } from 'react'

const Timer = () => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((time) => time + 1)
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  })

  return <div>{time}</div>
}
export default Timer
