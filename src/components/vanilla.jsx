import { useTeachable } from '../hooks/useTeachable'

export const Vanilla = () => {
  // the link to your model provided by Teachable Machine export panel
  const { init, stop, probabilities, stopped } = useTeachable("https://teachablemachine.withgoogle.com/models/DoT35G9In/")

  return (
    <div>
      <button onClick={init}>
        Start
      </button>
      <button onClick={stop}>
        Stop
      </button>
      <div id="webcam-container" />
      <ul>
        {
          !stopped && probabilities?.map(({ className, probability }, i) => (
            <li key={i}>
              {`${className}: ${probability.toFixed(2)}`}
            </li>
          ))}
      </ul>
    </div>
  )
}
