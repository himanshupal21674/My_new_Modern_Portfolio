import { useEffect, useRef } from "react"
import { AnimatePresence, m, useReducedMotion } from "framer-motion"
import { ExternalLink, X } from "lucide-react"
import { GitHubIcon } from "./BrandIcons"
import { optimizeImageUrl } from "../utils/helpers"
import { ease, spring } from "../utils/motion"

function hasImage(src) {
  return typeof src === "string" && /^https?:\/\//.test(src)
}

const morph = spring.morph

const contentVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.18, duration: 0.4, ease: ease.out, staggerChildren: 0.04, delayChildren: 0.22 },
  },
  exit: { opacity: 0, transition: { duration: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: ease.out } },
}

// The panel shares layoutIds with the clicked card, so the card's frame and
// image morph into this panel and back again on close.
export default function ProjectModal({ project, layoutKey, onClose }) {
  const reduce = useReducedMotion()
  const closeRef = useRef(null)

  useEffect(() => {
    if (!project) return undefined
    const onKey = (e) => {
      if (e.key === "Escape") onClose()
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    const focusTimer = window.setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 50)
    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
  }, [project, onClose])

  const validImage = project && hasImage(project.image)

  return (
    <AnimatePresence>
      {project ? (
        <div key="project-modal" className="fixed inset-0 z-[60] grid place-items-end p-0 sm:place-items-center sm:p-4">
          <m.button
            type="button"
            aria-label="Close project details"
            className="absolute inset-0 bg-slate-950/80 md:bg-slate-950/72"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0.12 : 0.3 }}
          />
          <m.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            layoutId={`project-frame-${layoutKey}`}
            transition={morph}
            style={{ borderRadius: 16 }}
            className="relative z-10 max-h-[92svh] w-full max-w-2xl overflow-x-hidden overflow-y-auto bg-white shadow-2xl sm:max-h-[88vh] dark:bg-[var(--color-ink-soft)]"
          >
            <m.div
              layoutId={`project-image-${layoutKey}`}
              transition={morph}
              className="relative h-44 overflow-hidden bg-slate-200 sm:h-56 md:h-64 dark:bg-zinc-800"
            >
              {validImage ? (
                <m.img
                  layout
                  transition={morph}
                  src={optimizeImageUrl(project.image, 1200)}
                  alt=""
                  className="h-full w-full object-cover"
                  decoding="async"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-slate-200 to-slate-100 dark:from-zinc-800 dark:to-zinc-900" />
              )}
            </m.div>

            <m.button
              ref={closeRef}
              type="button"
              onClick={onClose}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: 0.25, ...spring.snappy } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="absolute top-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-black/55 text-white"
              aria-label="Close"
            >
              <X size={16} />
            </m.button>

            <m.div variants={contentVariants} initial="hidden" animate="show" exit="exit" className="p-5 sm:p-7">
              <m.p
                variants={itemVariants}
                className="text-[11px] font-medium tracking-[0.16em] text-[var(--color-accent-soft)] uppercase"
              >
                {project.category}
              </m.p>
              <m.h3
                variants={itemVariants}
                id="project-modal-title"
                className="mt-1.5 text-2xl font-semibold tracking-[-0.03em] text-slate-900 dark:text-white"
              >
                {project.title}
              </m.h3>
              {project.role ? (
                <m.p variants={itemVariants} className="mt-1 text-sm font-medium text-slate-500 dark:text-zinc-400">
                  {project.role}
                </m.p>
              ) : null}
              <m.p variants={itemVariants} className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                {project.longDescription || project.description}
              </m.p>
              {project.features?.length ? (
                <ul className="mt-5 grid gap-2">
                  {project.features.map((feature) => (
                    <m.li
                      variants={itemVariants}
                      key={feature}
                      className="rounded-xl bg-slate-50 px-3.5 py-2.5 text-sm leading-relaxed text-slate-700 dark:bg-white/5 dark:text-zinc-300"
                    >
                      {feature}
                    </m.li>
                  ))}
                </ul>
              ) : null}
              <m.div variants={itemVariants} className="mt-5 flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </m.div>
              <m.div
                variants={itemVariants}
                className="mt-6 flex flex-wrap gap-2.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
              >
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white"
                  >
                    Live preview <ExternalLink size={14} />
                  </a>
                ) : null}
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium dark:border-white/12"
                  >
                    <GitHubIcon size={14} /> Source
                  </a>
                ) : null}
              </m.div>
            </m.div>
          </m.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
