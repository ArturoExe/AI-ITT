import { useEffect, useState } from "react";

export default function useTimer(time) {
  const [seconds, setSeconds] = useState(time);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
        } else {
          setRunning(false);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [seconds, running]);

  return seconds;
}
