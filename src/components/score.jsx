import { useContext } from 'react'
import { GameContext } from '../context'

export const Score = () => {
  const { toDescipher, desciphered, currentStep, accuracy, playing } = useContext(GameContext)

  if (!playing) return null

  return (
    <div className='results-area'>
      <div className='song-container'>
        {
          toDescipher.map((letter, index) => {
            const current = index === currentStep
            const correct = desciphered[index] === letter
            return (
              <div
                key={index}
                className={`letter ${current && 'current'} ${correct ? 'correct' : 'incorrect'}`}
              >
                {letter}
              </div>)
          })
        }
      </div>
      <p>
        <strong>Letter detected: </strong>
        {desciphered[currentStep]}
      </p>
      <p>
        <strong>Accuracy: </strong>
        {accuracy}
      </p>
    </div>
  )
}