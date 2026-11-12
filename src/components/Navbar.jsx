import { useEffect, useState } from "react"
import { AnimatePresence, m, useReducedMotion } from "framer-motion"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { navLinks, personalInfo } from "../data/data"
import ThemeToggle from "./ThemeToggle"
import MagneticButton from "./MagneticButton"

export default function Navbar({ theme, toggleTheme, activeSection }) {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!open) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="page-wrap mt-3 md:mt-4">
        <nav
          className="glass flex items-center justify-between rounded-full px-2 py-1.5 shadow-sm shadow-slate-900/5 md:px-3"
          aria-label="Primary"
        >
          <a
            href="#home"
            className="flex items-center gap-2.5 rounded-full py-1 pr-2 pl-1 transition-opacity hover:opacity-90"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-900 text-[11px] font-semibold tracking-[-0.04em] text-white dark:bg-white dark:text-slate-900">
              {personalInfo.initials}
            </span>
            <span className="hidden text-[15px] font-semibold tracking-[-0.03em] text-slate-900 sm:block dark:text-white">
              {personalInfo.name}
            </span>
          </a>

          <div className="hidden items-center xl:flex">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "")
              const active = activeSection === id
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-2.5 py-2 text-[13px] font-medium tracking-[-0.01em] transition-colors duration-200 ${
                    active
                      ? "text-slate-900 dark:text-white"
                      : "text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white"
                  }`}
                >
                  {active ? (
                    <m.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-slate-900/6 dark:bg-white/8"
                      transition={
                        reduce
                          ? { duration: 0.15 }
                          : { type: "spring", stiffness: 420, damping: 32 }
                      }
                    />
                  ) : null}
                  <span className="relative z-10">{link.label}</span>
                </a>
              )
            })}
          </div>

          <div className="flex items-center gap-1.5">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            {personalInfo.resume ? (
              <MagneticButton
                href={personalInfo.resume}
                download
                variant="primary"
                className="hidden !min-h-0 !px-3.5 !py-2 text-[13px] md:inline-flex"
                strength={6}
              >
                Resume <ArrowUpRight size={14} />
              </MagneticButton>
            ) : null}
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full text-slate-700 transition-colors hover:bg-slate-900/5 xl:hidden dark:text-white dark:hover:bg-white/8"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <m.button
              type="button"
              aria-label="Close menu overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0.12 : 0.2 }}
              className="fixed inset-0 z-40 bg-slate-950/50 xl:hidden"
              onClick={() => setOpen(false)}
            />
            <m.div
              id="mobile-nav"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: reduce ? 0.12 : 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="page-wrap relative z-50 mt-2 xl:hidden"
            >
              <div className="glass rounded-2xl p-2 shadow-xl shadow-slate-900/10">
                <div className="grid">
                  {navLinks.map((link) => {
                    const id = link.href.replace("#", "")
                    const active = activeSection === id
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`rounded-xl px-4 py-3.5 text-[15px] font-medium tracking-[-0.01em] transition-colors ${
                          active
                            ? "bg-slate-900/6 text-slate-900 dark:bg-white/8 dark:text-white"
                            : "text-slate-700 hover:bg-slate-900/4 dark:text-zinc-200 dark:hover:bg-white/5"
                        }`}
                      >
                        {link.label}
                      </a>
                    )
                  })}
                </div>
                {personalInfo.resume ? (
                  <a
                    href={personalInfo.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="mt-1 flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-[var(--color-accent)] px-4 py-3 text-sm font-medium text-white"
                  >
                    Resume <ArrowUpRight size={14} />
                  </a>
                ) : null}
              </div>
            </m.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
