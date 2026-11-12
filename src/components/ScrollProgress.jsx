import { m, useReducedMotion, useScroll, useSpring } from "framer-motion"
import { spring } from "../utils/motion"

// Thin gradient bar at the top that fills as you scroll.
// Runs entirely on a transform (scaleX) — no layout or paint per frame.
export default function ScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, spring.bar)

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX: reduce ? scrollYProgress : smooth }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[var(--color-accent)] via-[var(--color-fuchsia)] to-[var(--color-cyan)]"
    />
  )
}
