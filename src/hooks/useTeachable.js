import * as tmImage from "@teachablemachine/image"
import { useCallback, useEffect, useRef, useState } from 'react'

export const useTeachable = (url) => {
  const [probabilities, setProbabilities] = useState([])
  const [model, setModel] = useState(null)
  const [webcam, setWebcam] = useState(null)
  const [stopped, setStopped] = useState(false)
  const modelURL = url + "model.json"
  const metadataURL = url + "metadata.json"
  const animation = useRef(null)
  const stopAnimation = useRef(false)

  useEffect(() => {
    webcam &&
      setupCamera()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcam])

  useEffect(() => {
    console.log("stopped", stopped)
    !stopped && setProbabilities([])
  }, [stopped])

  async function setupCamera () {
    await webcam.setup()
    await webcam.play()
    stopAnimation.current = false
    animation.current = requestAnimationFrame(loop)
    document.getElementById("webcam-container").appendChild(webcam.canvas)
  }

  async function init () {
    setStopped(false)
    setModel(await tmImage.load(modelURL, metadataURL))
    setWebcam(new tmImage.Webcam(200, 200, true)) // width, height, flip
  }

  const loop = useCallback(async () => {
    webcam.update()
    const prediction = await model.predict(webcam.canvas)
    setProbabilities(prediction)
    cancelAnimationFrame(animation.current)
    if (!stopAnimation.current)
      animation.current = requestAnimationFrame(loop)
  }, [webcam, model])

  async function stop () {
    await webcam.stop()
    setStopped(true)
    stopAnimation.current = true
    document.getElementById("webcam-container")?.removeChild(webcam.canvas)
  }

  return {
    init,
    stop,
    webcam,
    stopped,
    probabilities
  }
}