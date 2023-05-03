import * as tmImage from '@teachablemachine/image'
import { useContext, useEffect, useRef, useState } from 'react'
import { GameContext } from '../context'

export const useTeachable = (url) => {
  const { setPlaying, reset, setProbabilities, playingRef } = useContext(GameContext)
  const [data, setData] = useState({
    model: null,
    webcam: null
  })
  const urls = {
    modelURL: url + 'model.json',
    metadataURL: url + 'metadata.json'
  }
  const animation = useRef(null)

  useEffect(() => {
    data.webcam && setupCamera()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  async function setupCamera () {
    const { webcam } = data
    await webcam.setup()
    await webcam.play()
    setPlaying(true)
    animation.current = window.requestAnimationFrame(loop)
    document.getElementById('webcam-container').appendChild(webcam.canvas)
  }

  async function init () {
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
    if (!playingRef) animation.current = window.requestAnimationFrame(loop)
    else {
      window.cancelAnimationFrame(animation.current)
      animation.current = null
    }
  }

  async function stop () {
    const { webcam } = data
    if (animation.current) window.cancelAnimationFrame(animation.current)
    if (webcam) {
      await webcam.stop()
      webcam.canvas?.remove()
    }
    setPlaying(false)
    reset()
  }

  return {
    init,
    stop
  }
}
