import React, { useContext } from "react";
import { GameContext } from "../context";
import { useEffect } from "react";
const LevelSelector = () => {
  const { setDifficulty, difficulty } = useContext(GameContext);
  useEffect(() => {
    console.log(difficulty);
  }, [difficulty]);
  return (
    <div>
      <button
        className="btn btn-easy"
        onClick={() => {
          setDifficulty("novice");
        }}
      >
        Novice
      </button>
      <button
        className="btn btn-intermediate"
        onClick={() => setDifficulty("intermediate")}
      >
        Intermediate
      </button>
      <button
        className="btn btn-advance"
        onClick={() => setDifficulty("advanced")}
      >
        Advanced
      </button>
    </div>
  );
};

export default LevelSelector;
