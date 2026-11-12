import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"

export default function TypingText({ words = [], className = "" }) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState("")
  const [deleting, setDeleting] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!words.length || reduce || done) return undefined

    const current = words[index % words.length]
    let delay = deleting ? 38 : 72
    if (!deleting && text === current) delay = 1400
    if (deleting && text === "") delay = 180

    const tick = setTimeout(() => {
      if (!deleting && text === current) {
        // Single role: type once and stop to avoid perpetual main-thread work
        if (words.length === 1) {
          setDone(true)
          return
        }
        setDeleting(true)
        return
      }
      if (deleting && text === "") {
        setDeleting(false)
        setIndex((i) => (i + 1) % words.length)
        return
      }
      setText((prev) =>
        deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
      )
    }, delay)

    return () => clearTimeout(tick)
  }, [text, deleting, index, words, reduce, done])

  if (!words.length) return null

  if (reduce) {
    return <span className={className}>{words[0]}</span>
  }

  return (
    <span className={className}>
      {text}
      {!done ? (
        <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.12em] animate-pulse bg-cyan-400" />
      ) : null}
    </span>
  )
}
