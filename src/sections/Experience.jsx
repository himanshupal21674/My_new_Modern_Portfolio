import { useRef } from "react"
import { m, useReducedMotion, useScroll, useSpring } from "framer-motion"
import { experiences, sections } from "../data/data"
import SectionHeading from "../components/SectionHeading"
import { ease, spring } from "../utils/motion"

export default function Experience() {
  const copy = sections.experience
  const listRef = useRef(null)
  const reduce = useReducedMotion()

  // Timeline fill follows scroll through the list (transform only).
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.75", "end 0.6"] })
  const fill = useSpring(scrollYProgress, spring.bar)

  if (!experiences.length) return null

  return (
    <section id="experience" className="section-y relative">
      <div className="page-wrap">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />

        <div ref={listRef} className="relative mx-auto max-w-3xl">
          {/* Track + scroll-drawn fill */}
          <div className="absolute top-2 bottom-2 left-[11px] w-px bg-slate-200 md:left-[15px] dark:bg-white/10" />
          <m.div
            aria-hidden="true"
            style={{ scaleY: reduce ? 1 : fill }}
            className="absolute top-2 bottom-2 left-[11px] w-px origin-top bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-fuchsia)] to-[var(--color-cyan)] md:left-[15px]"
          />

          <div className="grid gap-6">
            {experiences.map((job, i) => (
              <div key={job.id || job.company} className="relative pl-9 md:pl-11">
                {/* Dot lights up while its card is in the middle of the screen */}
                <m.span
                  aria-hidden="true"
                  initial={{ scale: 0.6, opacity: 0.35 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ margin: "-40% 0px -40% 0px" }}
                  transition={{ duration: 0.35, ease: ease.out }}
                  className="absolute top-6 left-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[var(--color-accent)] shadow-[0_0_0_4px_rgb(109_116_246/0.18)] md:left-2.5 dark:border-[var(--color-ink)]"
                />

                <m.article
                  initial={{ opacity: 0, x: i % 2 ? 36 : -36 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: ease.expo }}
                  className="surface rounded-2xl p-5 md:p-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[13px] font-medium text-slate-500 dark:text-zinc-400">
                      {job.duration}
                      {job.period ? <span className="text-slate-400"> · {job.period}</span> : null}
                    </p>
                    <span className="chip">{job.type}</span>
                  </div>
                  <h3 className="mt-2.5 text-xl font-semibold tracking-[-0.03em] text-slate-900 dark:text-white">
                    {job.role}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-600 dark:text-zinc-300">
                    {job.company}
                    {job.location ? ` · ${job.location}` : ""}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                    {job.responsibilities.map((item, r) => (
                      <m.li
                        key={item}
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.45, delay: 0.15 + r * 0.05, ease: ease.out }}
                        className="flex gap-2.5"
                      >
                        <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]/70" />
                        <span>{item}</span>
                      </m.li>
                    ))}
                  </ul>
                  {job.technologies?.length ? (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {job.technologies.map((tech) => (
                        <span key={tech} className="chip">
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </m.article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
