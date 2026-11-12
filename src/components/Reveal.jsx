import { m, useReducedMotion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1]

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 18,
  once = true,
  as: Component = m.div,
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-64px" }}
      transition={{ duration: 0.4, delay, ease }}
    >
      {children}
    </Component>
  )
}
