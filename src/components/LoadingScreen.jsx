import { AnimatePresence, m, useReducedMotion } from "framer-motion"
import { personalInfo } from "../data/data"
import { ease } from "../utils/motion"

// Curtain loader: initials draw in, a progress line fills, then the whole
// panel wipes upward (clip-path) to reveal the hero underneath.
export default function LoadingScreen({ visible }) {
  const reduce = useReducedMotion()
  const letters = Array.from(personalInfo.initials || "")

  return (
    <AnimatePresence>
      {visible ? (
        <m.div
          key="loader"
          className="fixed inset-0 z-[80] grid place-items-center bg-[var(--color-ink)] text-white"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={
            reduce
              ? { opacity: 0, transition: { duration: 0.15 } }
              : {
                  clipPath: "inset(0% 0% 100% 0%)",
                  transition: { duration: 0.75, ease: ease.inOut },
                }
          }
        >
          <m.div
            className="relative grid place-items-center"
            exit={reduce ? undefined : { y: -40, opacity: 0, transition: { duration: 0.4, ease: ease.inOut } }}
          >
            <div className="flex h-[4.5rem] min-w-[4.5rem] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 text-xl font-semibold tracking-[-0.05em]">
              {letters.map((ch, i) => (
                <m.span
                  key={`${ch}-${i}`}
                  className="inline-block"
                  initial={reduce ? false : { y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ delay: 0.05 + i * 0.07, duration: 0.5, ease: ease.expo }}
                >
                  {ch}
                </m.span>
              ))}
            </div>

            <div className="mt-5 h-px w-24 overflow-hidden rounded-full bg-white/10">
              <m.div
                className="h-full w-full origin-left bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-cyan)]"
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: ease.out }}
              />
            </div>
          </m.div>

          <p className="absolute bottom-16 text-[11px] font-medium tracking-[0.2em] text-zinc-500 uppercase">
            Loading
          </p>
        </m.div>
      ) : null}
    </AnimatePresence>
  )
}
