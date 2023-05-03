import { useContext } from 'react'
import { GameContext } from '../context'

export const Clock = () => {
  const { seconds, playing, currentStep } = useContext(GameContext)
  if (!playing) return null
  return (
    <>
      <p>
        Remaining time: {seconds}s
      </p>
      {seconds === 0 && <h1>Time's up!</h1>}

      <p>
        Current step: {currentStep + 1}
      </p>
    </>
  )
}