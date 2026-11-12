import { Moon, Sun } from "lucide-react"
import { m, useReducedMotion } from "framer-motion"

export default function ThemeToggle({ theme, toggleTheme }) {
  const isDark = theme === "dark"
  const reduce = useReducedMotion()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-full text-slate-700 transition-colors hover:bg-slate-900/5 dark:text-zinc-200 dark:hover:bg-white/8"
    >
      <m.span
        key={theme}
        initial={reduce ? false : { rotate: -70, opacity: 0, y: 6 }}
        animate={{ rotate: 0, opacity: 1, y: 0 }}
        transition={reduce ? { duration: 0 } : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="grid place-items-center"
      >
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
      </m.span>
    </button>
  )
}
