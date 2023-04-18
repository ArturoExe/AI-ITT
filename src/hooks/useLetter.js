import { useState, useEffect, useRef } from 'react'

export function useLetter (probabilities, stopped) {
  const [letter, setLetter] = useState()
  const [arr, setArr] = useState([])
  const letterRef = useRef()

  // Sets the ref of the letter every time it detects it
  // an sets the letter ref
  useEffect(() => {
    if (!stopped) {
      const detectedLetter = probabilities.find((p) => p.probability > 0.55)
      if (detectedLetter) {
        letterRef.current = detectedLetter.className
        setLetter(detectedLetter.className)
      }
    }
  }, [probabilities, stopped])

  // Adds the letter to the array every 5 seconds using the ref of the
  // main detection
  useEffect(() => {
    let intervalId
    if (!stopped) {
      intervalId = setInterval(() => {
        if (arr.length < 10) {
          setArr(prevLetter => [...prevLetter, letterRef.current])
        } else {
          console.log('END on array:', arr.length)
          clearInterval(intervalId)
        }
      }, 5000)
    }
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [arr, stopped])

  // must return the array to alter the UI
  return { letter, arr }
}
