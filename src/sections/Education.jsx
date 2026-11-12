import { education, sections } from "../data/data"
import Reveal from "../components/Reveal"
import SectionHeading from "../components/SectionHeading"

export default function Education() {
  const copy = sections.education
  if (!education.length) return null

  return (
    <section id="education" className="section-y relative">
      <div className="page-wrap">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute top-2 bottom-2 left-[11px] w-px bg-slate-200 md:left-[15px] dark:bg-white/10" />
          <div className="grid gap-6">
            {education.map((item, i) => (
              <Reveal key={item.id || item.school} delay={i * 0.06} className="relative pl-9 md:pl-11">
                <span className="absolute top-6 left-1.5 h-2.5 w-2.5 rounded-full bg-[var(--color-accent)] md:left-2.5" />
                <article className="surface rounded-2xl p-5 md:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[13px] font-medium text-slate-500 dark:text-zinc-400">
                      {item.duration}
                    </p>
                    <span className="chip">Diploma · 1-year bootcamp</span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-slate-900 dark:text-white">
                    {item.school}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-600 dark:text-zinc-300">
                    {item.degree}
                  </p>
                  {item.location ? (
                    <p className="mt-1 text-xs text-slate-400">{item.location}</p>
                  ) : null}
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                    {item.details}
                  </p>
                  {item.highlights?.length ? (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.highlights.map((h) => (
                        <span key={h} className="chip">
                          {h}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
