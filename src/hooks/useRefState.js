import { useRef, useState } from 'react'

export function useRefState (initialValue) {
  const [value, setValue] = useState(initialValue)
  const ref = useRef(value)

  const setValueWithRef = (newValue) => {
    ref.current = newValue
    setValue(newValue)
  }

  return [value, setValueWithRef, ref.current]
}