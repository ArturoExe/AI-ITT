import { useEffect, useState } from 'react'
// timer must decrease by 1 every second
// timer must restart when time is 0
// hook must expose time, and a function to reset time
export const useTimer = (initialTime = 0, callback) => {
  const [timer, setTimer] = useState(initialTime)

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer === 0) {
        clearInterval(interval)
        callback()
      } else {
        setTimer(timer - 1)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [timer, callback])

  const resetTimer = () => {
    setTimer(initialTime)
  }

  return { timer, resetTimer }
}
