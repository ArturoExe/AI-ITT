import React, { useContext, useEffect, useState } from "react";
import "../styles/game.css";
import { GameContext } from "../context";
import { images } from "../utils/imagesHelper";

const Mimic = () => {
  const { toDescipher, currentStep, playing } = useContext(GameContext);
  const [whatToFind, setWhatToFind] = useState(toDescipher[currentStep]);
  const [dire, setDire] = useState("");

  useEffect(() => {
    let img = images.find((i) => i.letter === whatToFind);
    setDire(img ? img.dir : "");
  }, [whatToFind]);

  useEffect(() => {
    setWhatToFind(toDescipher[currentStep]);
    console.log(toDescipher[currentStep]);
  }, [currentStep]);

  return (
    <div className="image-container">
      {playing ? (
        <img src={dire} alt="sign to mimic" />
      ) : (
        <>Let us begin detecting</>
      )}
    </div>
  );
};

export default Mimic;
