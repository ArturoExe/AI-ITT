import { GameScreen } from './pages'
import { GameProvider } from './context'

export default function App () {
  return (
    <GameProvider>
      <GameScreen />
    </GameProvider>
  )
}
