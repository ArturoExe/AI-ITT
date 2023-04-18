import {
  useTeachable,
  useLetter,
  useResult
} from '../hooks'
import { song1 } from '../songs'
import { CameraSkeleton } from '../components'
import '../styles/game.css'

export const GameScreen = () => {
  const { init, stop, probabilities, stopped } = useTeachable(
    'https://teachablemachine.withgoogle.com/models/DoT35G9In/'
  )

  const { letter, arr } = useLetter(probabilities, stopped)

  const accuracy = useResult(arr)

  return (
    <section className="vanilla-container">
      <div>
        <button onClick={init} className="btn btn-primary">
          Start
        </button>
        <button onClick={stop} className="btn btn-secondary">
          Stop
        </button>
      </div>

      {stopped && <CameraSkeleton />}
      <div id="webcam-container" />
      {
        !stopped &&
        <div className='results-area'>
          <p>
            <strong>Letter detected: </strong>
            {letter}
          </p>
          <p>
            <strong>Letter to detect: </strong>
            {song1[arr.lenght ?? 0]}
          </p>
          <p>
            <strong>Accuracy: </strong>
            {accuracy}
          </p>
        </div>
      }
    </section>
  )
}
