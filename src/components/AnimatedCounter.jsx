import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "framer-motion"

export default function AnimatedCounter({ value = 0, suffix = "", duration = 1400 }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [display, setDisplay] = useState(reduce ? value : 0)

  useEffect(() => {
    if (reduce) {
      setDisplay(value)
      return undefined
    }
    if (!inView) return undefined

    const start = performance.now()
    let frame
    let lastPaint = 0

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      // ~30fps state updates instead of every animation frame
      if (now - lastPaint >= 32 || progress >= 1) {
        lastPaint = now
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplay(Math.round(eased * value))
      }
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, duration, reduce])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}
