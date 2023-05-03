import { createContext, useEffect, useState } from 'react'
import { song1 } from '../songs'
import { useRefState } from '../hooks'

export const GameContext = createContext({
  seconds: 10,
  currentStep: 0,
  toDescipher: [],
  desciphered: [],
  accuracy: 0,
  playing: false,
  playingRef: false,
  reset: () => { },
  setPlaying: () => { },
  setToDescipher: () => { },
  setDesciphered: () => { },
  setProbabilities: () => { }
})

export function GameProvider ({ children }) {
  const [playing, setPlaying, playingRef] = useRefState(false)
  const [seconds, setSeconds] = useState(10)
  const [currentStep, setCurrentStep] = useState(0)
  const [toDescipher, setToDescipher] = useState(song1)
  const [desciphered, setDesciphered] = useState([])
  const [probabilities, setProbabilities] = useState()

  useEffect(() => {
    let interval
    if (playing) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1)
      }, 1000)
    }
    return () => playing && clearInterval(interval)
  }, [playing])

  useEffect(() => {
    if (seconds === 0) {
      setCurrentStep(currentStep => currentStep + 1)
      // setCurrentStep(-1)
      setSeconds(10)
    }
  }, [seconds])

  useEffect(() => {
    console.log('desciphered', desciphered)
    console.log('toDescipher', toDescipher[currentStep])
    if (seconds > 0 && desciphered[currentStep] === toDescipher[currentStep]) {
      setCurrentStep(currentStep => currentStep + 1)
      setDesciphered(prev => [...prev, desciphered])
      setSeconds(10)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [desciphered])

  useEffect(() => {
    const detectedLetter = probabilities?.find((p) => p.probability > 0.55)
    if (detectedLetter) {
      const prevDesciphered = desciphered
      prevDesciphered[currentStep] = detectedLetter.className
      setDesciphered(prevDesciphered)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [probabilities])

  const getAccuracy = () => {
    let correct = 0
    for (let i = 0; i < toDescipher.length; i++) {
      if (toDescipher[i] === desciphered[i]) {
        correct++
      }
    }
    return (correct / toDescipher.length) * 100
  }

  const reset = () => {
    setSeconds(10)
    setCurrentStep(0)
    setToDescipher(song1)
    setDesciphered([])
  }

  const value = {
    seconds,
    playing,
    playingRef,
    currentStep,
    toDescipher,
    desciphered,
    accuracy: getAccuracy(),
    setToDescipher,
    setDesciphered,
    setPlaying,
    setProbabilities,
    reset
  }
  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}
