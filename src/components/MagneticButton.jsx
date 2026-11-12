import { useRef } from "react"
import { m, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { cx } from "../utils/helpers"
import { useMediaQuery } from "../hooks/useMediaQuery"

const variants = {
  primary:
    "bg-[var(--color-accent)] text-white shadow-[0_1px_2px_rgb(0_0_0/0.12),0_8px_20px_-10px_rgb(109_116_246/0.7)] hover:brightness-110 active:brightness-95",
  secondary:
    "surface text-slate-800 hover:border-slate-300 dark:text-white dark:hover:border-white/16",
  ghost:
    "border border-slate-200 text-slate-800 hover:bg-slate-900/4 dark:border-white/12 dark:text-white dark:hover:bg-white/5",
}

export default function MagneticButton({
  children,
  className = "",
  variant = "primary",
  href,
  onClick,
  type = "button",
  download,
  strength = 8,
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const isCoarse = useMediaQuery("(pointer: coarse)")
  const enableMagnetic = !reduce && !isCoarse

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.35 })
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.35 })

  const onMove = (e) => {
    const el = ref.current
    if (!el || !enableMagnetic) return
    const rect = el.getBoundingClientRect()
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * strength)
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const isExternal = typeof href === "string" && /^https?:\/\//.test(href)

  const classes = cx(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium tracking-[-0.01em] transition-[color,background-color,border-color,filter,box-shadow] duration-200 touch-manipulation",
    variants[variant] || variants.primary,
    className,
  )

  const extraLink = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {}

  if (!enableMagnetic) {
    if (href) {
      return (
        <a href={href} download={download} onClick={onClick} className={classes} {...extraLink}>
          {children}
        </a>
      )
    }
    return (
      <button type={type} onClick={onClick} className={classes}>
        {children}
      </button>
    )
  }

  const shared = {
    ref,
    style: { x: springX, y: springY },
    onMouseMove: onMove,
    onMouseLeave: reset,
    whileTap: { scale: 0.98 },
    className: classes,
  }

  if (href) {
    return (
      <m.a href={href} download={download} onClick={onClick} {...shared} {...extraLink}>
        {children}
      </m.a>
    )
  }

  return (
    <m.button type={type} onClick={onClick} {...shared}>
      {children}
    </m.button>
  )
}
