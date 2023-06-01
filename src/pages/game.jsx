import { useTeachable } from "../hooks";
import { CameraSkeleton, Clock, Score } from "../components";
import "../styles/game.css";
import { useContext } from "react";
import { GameContext } from "../context";
import Mimic from "../components/Mimic";
import LevelSelector from "../components/levelSelector";

export const GameScreen = () => {
  const { init, stop } = useTeachable(
    "https://teachablemachine.withgoogle.com/models/TilonXR9Q/"
  );
  const { playing, difficulty } = useContext(GameContext);

  return (
    <section className="game-container">
      {!playing ? (
        <>
          <LevelSelector />
          {difficulty === "novice" && (
            <p>
              <spanc className="dif-name"> Novice:</spanc> This mode provides
              visual feedback, the "how to" mimic the sign and his name
            </p>
          )}

          {difficulty === "intermediate" && (
            <p>
              <span className="dif-name">Intermediate:</span> This mode provides
              DOES NOT provide visual feedback on how to mimic the sign
            </p>
          )}

          {difficulty === "advanced" && (
            <p>
              <span className="dif-name"> Advanced:</span> Gamemode for the big
              boys, NO visual feedback at all, You Vs The accuracy, can you make
              it?
            </p>
          )}
        </>
      ) : (
        <></>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "row ",
          alignItems: "center",
          gap: "8rem",
        }}
      >
        <div className="sign-container">
          {difficulty === "intermediate" ? <></> : <Mimic></Mimic>}
        </div>
        <div className="controller-container">
          <div>
            <button
              disabled={playing}
              onClick={init}
              className="btn btn-primary"
            >
              Start
            </button>
            <button
              disabled={!playing}
              onClick={stop}
              className="btn btn-secondary"
            >
              Stop
            </button>
          </div>

          <Clock />

          {!playing && <CameraSkeleton />}
          <div id="webcam-container" />

          {difficulty === "advanced" ? <></> : <Score />}
        </div>
      </div>
    </section>
  );
};
