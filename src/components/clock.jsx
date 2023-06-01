import { useContext } from "react";
import { GameContext } from "../context";
// import { useTeachable } from "../hooks";

export const Clock = () => {
  const { seconds, playing, currentStep } = useContext(GameContext);

  // const { stop } = useTeachable();
  // useEffect(() => {
  //   if (currentStep >= 9) {
  //     setPlaying(false);
  //     stop();
  //     reset();
  //   }
  // }, [[playing]]);

  if (!playing) return null;
  return (
    <>
      <p>Remaining time: {seconds}s</p>
      {seconds === 0 && <h1>Time's up!</h1>}

      <p>Current step: {currentStep + 1}</p>
    </>
  );
};
