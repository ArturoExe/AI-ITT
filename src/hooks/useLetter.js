import { useState, useEffect } from "react";

export default function useLetter(probabilities) {
  const [letter, setLetter] = useState();

  useEffect(() => {
    if (probabilities[1]?.probability > 0.55) {
      setLetter("A");
    }
    if (probabilities[2]?.probability > 0.55) {
      setLetter("B");
    }
    if (probabilities[0]?.probability > 0.55) {
      setLetter("C");
    }
    if (probabilities[3]?.probability > 0.55) {
      setLetter("E");
    }
    if (probabilities[4]?.probability > 0.55) {
      setLetter("F");
    }
  }, [probabilities]);

  return letter;
}
