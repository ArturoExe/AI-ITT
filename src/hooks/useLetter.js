import { useState, useEffect, useRef } from "react";

export default function useLetter(probabilities) {
  const [letter, setLetter] = useState();
  const [arr, setArr] = useState([]);
  const letterRef = useRef();

  //Sets the ref of the letter every time it detects it
  // an sets the letter ref
  useEffect(() => {
    if (probabilities[1]?.probability > 0.55) {
      letterRef.current = "A";
      setLetter("A");
    }
    if (probabilities[2]?.probability > 0.55) {
      letterRef.current = "B";
      setLetter("B");
    }
    if (probabilities[0]?.probability > 0.55) {
      letterRef.current = "C";
      setLetter("C");
    }
    if (probabilities[3]?.probability > 0.55) {
      letterRef.current = "E";
      setLetter("E");
    }
    if (probabilities[4]?.probability > 0.55) {
      letterRef.current = "F";
      setLetter("F");
    }
  }, [probabilities]);

  // Adds the letter to the array every 5 seconds using the ref of the
  // main detection
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log(letterRef.current);

      if (arr.length < 10) {
        setArr((prevLetter) => [...prevLetter, letterRef.current]);
      } else {
        console.log("END on array:", arr.length);
      }
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [arr]);

  useEffect(() => {
    console.log(arr);
  }, [arr]);

  //must return the array to alter the UI
  return { letter, arr };
}
