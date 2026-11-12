import { useEffect, useState } from "react"

function getMatches(query) {
  if (typeof window === "undefined") return false
  return window.matchMedia(query).matches
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => getMatches(query))

  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [query])

  return matches
}
