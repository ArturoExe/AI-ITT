import useLetter from "../hooks/useLetter"
import { useTeachable } from "../hooks/useTeachable"
import CameraSkeleton from "./CameraSkeleton"

export const Vanilla = () => {
  // More API functions here:
  // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image
  // the link to your model provided by Teachable Machine export panel
  const { init, stop, probabilities, stopped } = useTeachable(
    "https://teachablemachine.withgoogle.com/models/DoT35G9In/"
  )

  const letter = useLetter(probabilities)

  return (
    <div className="vanilla-container">
      <div>
        <button onClick={init} className="btn-primary">
          Start
        </button>
        <button onClick={stop} className="btn-secondary">
          Stop
        </button>
      </div>

      {stopped && <CameraSkeleton />}
      <div id="webcam-container" style={{ borderRadius: "30px" }}></div>
      {/* <ul>
        {probabilities?.map(({ className, probability }) => (
          <li key={className}>{`${className}: ${probability.toFixed(2)}`}</li>
        ))}
      </ul> */}

      {!stopped ? (
        <h2 className="letter">
          Detecting letter <span>{letter}</span>
        </h2>
      ) : (
        <h4 style={{ fontWeight: "lighter" }}>
          Let us start detecting some handsigns
        </h4>
      )}
    </div>
  )
}
