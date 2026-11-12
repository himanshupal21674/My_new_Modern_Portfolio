import { memo, useCallback, useEffect, useRef } from "react"
import { m } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { GitHubIcon } from "./BrandIcons"
import { optimizeImageUrl } from "../utils/helpers"
import { ease, spring } from "../utils/motion"

const morph = spring.morph

function hasImage(src) {
  return typeof src === "string" && /^https?:\/\//.test(src)
}

function ProjectCard({ project, layoutKey, onOpen, ref }) {
  const validImage = hasImage(project.image)
  const imageSrc = validImage ? optimizeImageUrl(project.image, 800) : ""
  const tiltRef = useRef(null)
  const frame = useRef(0)

  // Tilt + spotlight via CSS variables on one plain element (no re-renders).
  const onPointerMove = useCallback((e) => {
    if (e.pointerType !== "mouse") return
    const { clientX, clientY } = e
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const el = tiltRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const x = clientX - r.left
      const y = clientY - r.top
      el.style.setProperty("--x", `${x}px`)
      el.style.setProperty("--y", `${y}px`)
      el.style.setProperty("--rx", `${((0.5 - y / r.height) * 6).toFixed(2)}deg`)
      el.style.setProperty("--ry", `${((x / r.width - 0.5) * 8).toFixed(2)}deg`)
    })
  }, [])

  const resetTilt = useCallback(() => {
    cancelAnimationFrame(frame.current)
    const el = tiltRef.current
    if (!el) return
    el.style.setProperty("--rx", "0deg")
    el.style.setProperty("--ry", "0deg")
  }, [])

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  const open = () => {
    resetTilt()
    onOpen(project)
  }

  return (
    <m.article
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.4, ease: ease.out, layout: morph }}
      className="h-full"
    >
      <div
        ref={tiltRef}
        onPointerMove={onPointerMove}
        onPointerLeave={resetTilt}
        className="tilt-card h-full"
      >
        <m.div
          layoutId={`project-frame-${layoutKey}`}
          transition={morph}
          style={{ borderRadius: 16 }}
          className="group surface spot-card spot-solo flex h-full flex-col overflow-hidden"
        >
          <button type="button" onClick={open} className="block w-full text-left">
            <m.div
              layoutId={`project-image-${layoutKey}`}
              transition={morph}
              className="img-zoom relative aspect-[16/10] overflow-hidden bg-slate-200 dark:bg-zinc-800"
            >
              {validImage ? (
                <m.img
                  layout
                  transition={morph}
                  src={imageSrc}
                  alt={`${project.title} preview`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="grid h-full w-full place-items-center bg-gradient-to-br from-slate-200 to-slate-100 text-sm text-slate-500 dark:from-zinc-800 dark:to-zinc-900 dark:text-zinc-500">
                  {project.title}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
              <span className="absolute top-3 left-3 rounded-full bg-white/92 px-2.5 py-1 text-[11px] font-medium text-slate-800">
                {project.category}
              </span>
            </m.div>
            <m.div layout="position" transition={morph} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-title font-semibold text-slate-900 dark:text-white">{project.title}</h3>
                <span className="mt-0.5 text-slate-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-accent)] dark:text-zinc-500">
                  <ArrowUpRight size={16} />
                </span>
              </div>
              {project.role ? (
                <p className="mt-1 text-xs font-medium text-[var(--color-accent-soft)]">{project.role}</p>
              ) : null}
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                {project.description}
              </p>
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {project.tech.slice(0, 4).map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
                {project.tech.length > 4 ? <span className="chip">+{project.tech.length - 4}</span> : null}
              </div>
            </m.div>
          </button>
          <div className="mt-auto flex items-center gap-4 border-t border-slate-200/80 px-5 py-3 dark:border-white/8">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-[var(--color-accent)] hover:underline"
              >
                Live
              </a>
            ) : null}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <GitHubIcon size={12} /> Code
              </a>
            ) : null}
          </div>
        </m.div>
      </div>
    </m.article>
  )
}

export default memo(ProjectCard)
