import { song1 as signOrder } from '../songs'
import { useEffect, useState } from 'react'

export function useResult (arr) {
  const [accuracy, setAccuracy] = useState(0)

  useEffect(() => {
    // Compare two arrays
    if (arr.length !== signOrder.length) {
      setAccuracy(0)
    } else {
      let count = 0
      for (let i = 0; i < signOrder.length; i++) {
        if (arr[i] === signOrder[i]) count++
      }
      setAccuracy((count / arr.length) * 100)
    }
  }, [arr])

  if (accuracy === null) {
    return 'Calculando...'
  }
  return accuracy
}
