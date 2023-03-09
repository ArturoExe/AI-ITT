import signOrder from "./song1"

let emptyOrder = []

export default function getLetter (params) {
  params.map((le) => {
    if (le.probability > 0.8) {
      emptyOrder = [...emptyOrder, le.className]
    }
  })

  return emptyOrder
}
