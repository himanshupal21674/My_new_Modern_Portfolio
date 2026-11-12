import { useRef } from "react"
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion"

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.22, 1])
  return (
    <m.span style={{ opacity }} className="inline">
      {children}
    </m.span>
  )
}

// Paragraph whose words brighten one by one as it scrolls through the viewport.
// Opacity-only, driven by a single scroll listener shared by every word.
export default function ScrollRevealText({ text = "", className = "" }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] })

  if (reduce) return <p className={className}>{text}</p>

  const words = text.split(" ")
  const n = words.length

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <Word key={`${w}-${i}`} progress={scrollYProgress} range={[i / n, (i + 1) / n]}>
            {w}
            {i < n - 1 ? " " : ""}
          </Word>
        ))}
      </span>
    </p>
  )
}
