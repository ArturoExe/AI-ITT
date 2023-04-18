import * as tmImage from '@teachablemachine/image'
import { useEffect, useRef, useState } from 'react'

export const useTeachable = (url) => {
  const [data, setData] = useState({
    model: null,
    webcam: null
  })
  const [probabilities, setProbabilities] = useState([])
  const [stopped, setStopped] = useState(true)
  const urls = {
    modelURL: url + 'model.json',
    metadataURL: url + 'metadata.json'
  }
  const animation = useRef(null)

  useEffect(() => {
    data.webcam && setupCamera()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    console.log('stopped', stopped)
    !stopped && setProbabilities([])
  }, [stopped])

  async function setupCamera () {
    const { webcam } = data
    await webcam.setup()
    await webcam.play()
    animation.current = requestAnimationFrame(loop)
    document.getElementById('webcam-container').appendChild(webcam.canvas)
  }

  async function init () {
    setStopped(false)
    const { modelURL, metadataURL } = urls
    setData({
      model: await tmImage.load(modelURL, metadataURL),
      webcam: new tmImage.Webcam(300, 300, true)
    })
  }

  const loop = async _ => {
    const { model, webcam } = data
    webcam.update()
    setProbabilities(await model.predict(webcam.canvas))
    animation.current = requestAnimationFrame(loop)
  }

  async function stop () {
    const { webcam } = data
    if (animation.current) cancelAnimationFrame(animation.current)
    if (webcam) {
      await webcam.stop()
      webcam.canvas?.remove()
    }
    setStopped(true)
  }

  return {
    init,
    stop,
    stopped,
    probabilities
  }
}
