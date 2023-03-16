import * as tmImage from "@teachablemachine/image";
import { useEffect, useState } from "react";
import useTimer from "./useTimer";

export const useTeachable = (URL) => {
  const [probabilities, setProbabilities] = useState([]);
  const [model, setModel] = useState(null);
  const [webcam, setWebcam] = useState(null);
  const [stopped, setStopped] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  useEffect(() => {
    webcam && setupCamera();
  }, [webcam]);

  async function setupCamera() {
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);
    setIsOn(true);
    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
  }

  // Load the image model and setup the webcam
  async function init() {
    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    setStopped(false);
    setModel(await tmImage.load(modelURL, metadataURL));

    // Convenience function to setup a webcam
    setWebcam(new tmImage.Webcam(300, 300, true)); // width, height, flip
  }

  async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    console.log("loop");
    window.requestAnimationFrame(loop);
  }

  // run the webcam image through the image model
  async function predict() {
    // predict can take in an image, video or canvas html element

    const prediction = await model.predict(webcam.canvas);
    setProbabilities(prediction);
  }

  async function stop() {
    await webcam.stop();
    setProbabilities([]);
    setStopped(true);
    document.getElementById("webcam-container")?.removeChild(webcam.canvas);
    setIsOn(false);
  }

  return {
    init,
    stop,
    stopped,
    probabilities,
    isOn,
  };
};
