import {
  useTeachable,
} from '../hooks'
import { CameraSkeleton, Clock, Score } from '../components'
import '../styles/game.css'
import { useContext } from 'react'
import { GameContext } from '../context'

export const GameScreen = () => {
  const { init, stop } = useTeachable(
    'https://teachablemachine.withgoogle.com/models/DoT35G9In/'
  )
  const { playing } = useContext(GameContext)

  return (
    <section className="game-container">
      <div>
        <button disabled={playing} onClick={init} className="btn btn-primary">
          Start
        </button>
        <button disabled={!playing} onClick={stop} className="btn btn-secondary">
          Stop
        </button>
      </div>

      <Clock />

      {!playing && <CameraSkeleton />}
      <div id="webcam-container" />
      <Score />
    </section>
  )
}
