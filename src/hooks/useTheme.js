import { useCallback, useEffect, useState } from "react"
import { flushSync } from "react-dom"
import { siteConfig } from "../data/data"

function getInitialTheme() {
  if (typeof window === "undefined") return siteConfig.defaultTheme
  const stored = localStorage.getItem("theme")
  if (stored === "light" || stored === "dark") return stored
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : siteConfig.defaultTheme
}

function applyTheme(theme) {
  const root = document.documentElement
  root.classList.toggle("dark", theme === "dark")
  try {
    localStorage.setItem("theme", theme)
  } catch {
    /* storage unavailable — theme still applies for this visit */
  }
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute("content", theme === "dark" ? "#09090b" : "#f4f5f7")
}

// Where the circular reveal should start: the clicked button's centre
// (works for mouse, touch and keyboard), falling back to the pointer.
function originFrom(event) {
  const el = event?.currentTarget
  if (el && typeof el.getBoundingClientRect === "function") {
    const r = el.getBoundingClientRect()
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
  }
  if (event && typeof event.clientX === "number") return { x: event.clientX, y: event.clientY }
  return { x: window.innerWidth - 40, y: 40 }
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const toggleTheme = useCallback(
    (event) => {
      const next = theme === "dark" ? "light" : "dark"
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      // No View Transitions support (or reduced motion) → instant switch.
      if (!document.startViewTransition || reduce) {
        setTheme(next)
        return
      }

      const { x, y } = originFrom(event)
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      )

      const transition = document.startViewTransition(() => {
        flushSync(() => setTheme(next))
        applyTheme(next)
      })

      transition.ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${radius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 560,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              pseudoElement: "::view-transition-new(root)",
            },
          )
        })
        .catch(() => {})
    },
    [theme],
  )

  return { theme, toggleTheme, setTheme }
}
