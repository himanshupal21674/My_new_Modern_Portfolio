import { Award, BadgeCheck, Handshake, Mic } from "lucide-react"
import { achievements, certifications, sections } from "../data/data"
import Reveal from "../components/Reveal"
import SectionHeading from "../components/SectionHeading"

const TYPE_ICON = {
  Award: Award,
  Recognition: Handshake,
  Contribution: BadgeCheck,
  Talk: Mic,
  Certification: BadgeCheck,
}

export default function Achievements() {
  const copy = sections.achievements
  const certCards = certifications.map((cert) => ({
    id: cert.id,
    type: "Certification",
    title: cert.name,
    org: cert.issuer,
    year: cert.year,
    description: cert.credentialUrl ? `Credential: ${cert.issuer}` : cert.issuer,
    href: cert.credentialUrl,
  }))
  const items = [...achievements, ...certCards]
  if (!items.length) return null

  return (
    <section id="achievements" className="section-y relative">
      <div className="page-wrap">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item, i) => {
            const Icon = TYPE_ICON[item.type] || Award
            return (
              <Reveal key={item.id || item.title} delay={Math.min(i * 0.04, 0.2)}>
                <article className="surface lift-card h-full rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                      <Icon size={18} />
                    </div>
                    <span className="text-[11px] font-medium tracking-[0.08em] text-slate-400 uppercase">
                      {item.type} · {item.year}
                    </span>
                  </div>
                  <h3 className="mt-4 text-title font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-[var(--color-accent-soft)]">{item.org}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                    {item.description}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-xs font-medium text-[var(--color-accent)] hover:underline"
                    >
                      View credential
                    </a>
                  ) : null}
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
