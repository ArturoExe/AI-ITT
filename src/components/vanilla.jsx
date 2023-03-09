import { useTeachable } from '../hooks/useTeachable'

export const Vanilla = () => {
  // More API functions here:
  // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

  // the link to your model provided by Teachable Machine export panel
  const { init, stop, probabilities } = useTeachable("https://teachablemachine.withgoogle.com/models/DoT35G9In/")

  return (
    <div>
      <button onClick={init}>
        Start
      </button>
      <button onClick={stop}>
        Stop
      </button>
      <div id="webcam-container"></div>
      <ul>
        {probabilities?.map(({ className, probability }) => (
          <li key={className}>
            {`${className}: ${probability.toFixed(2)}`}
          </li>
        ))}
      </ul>
    </div>
  )
}
