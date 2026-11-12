import { m } from "framer-motion"
import { aboutHighlights, personalInfo, sections, stats } from "../data/data"
import ScrollRevealText from "../components/ScrollRevealText"
import { ease } from "../utils/motion"
import AnimatedCounter from "../components/AnimatedCounter"
import Reveal from "../components/Reveal"
import SectionHeading from "../components/SectionHeading"

export default function About() {
  const copy = sections.about

  return (
    <section id="about" className="section-y relative">
      <div className="page-wrap">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />

        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <m.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="relative mx-auto w-full max-w-sm">
              <m.div
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 1, delay: 0.3 } } }}
                className="absolute -inset-3 rounded-[1.5rem] bg-[var(--color-accent)]/12 blur-2xl"
              />
              {/* Photo is wiped in from the left while it settles from a zoom */}
              <m.div
                variants={{
                  hidden: { clipPath: "inset(0% 100% 0% 0% round 1.35rem)" },
                  show: {
                    clipPath: "inset(0% 0% 0% 0% round 1.35rem)",
                    transition: { duration: 1.1, ease: ease.expo },
                  },
                }}
                className="relative overflow-hidden rounded-[1.35rem] border border-white/15 shadow-xl shadow-slate-900/10"
              >
                <m.img
                  variants={{
                    hidden: { scale: 1.3 },
                    show: { scale: 1, transition: { duration: 1.4, ease: ease.expo } },
                  }}
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={480}
                  height={600}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
                <div className="absolute right-3 bottom-3 left-3 rounded-xl border border-white/10 bg-white/92 px-4 py-3 dark:bg-black/70">
                  <p className="text-base font-semibold tracking-[-0.02em] text-slate-900 dark:text-white">
                    {personalInfo.name}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-zinc-300">{personalInfo.title}</p>
                </div>
              </m.div>
            </div>
          </m.div>

          <div>
            <ScrollRevealText
              text={personalInfo.bio}
              className="text-[1.05rem] leading-relaxed font-medium tracking-[-0.01em] text-slate-800 md:text-lg dark:text-zinc-100"
            />

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.05}>
                  <div className="surface rounded-2xl px-3 py-4 text-center">
                    <p className="text-2xl font-semibold tracking-[-0.04em] text-slate-900 dark:text-white">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-1 text-[11px] leading-snug text-slate-500 dark:text-zinc-500">
                      {stat.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {aboutHighlights.map((item, i) => (
                <Reveal key={item.title} delay={0.06 * i}>
                  <div className="rounded-2xl border border-slate-200/80 p-4 dark:border-white/8">
                    <p className="text-sm font-semibold tracking-[-0.02em] text-slate-900 dark:text-white">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-zinc-400">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
