import { m } from "framer-motion"
import { ease } from "../utils/motion"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const fade = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: ease.out } },
}

const line = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.7, ease: ease.out } },
}

const word = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.8, ease: ease.expo } },
}

// Eyebrow lines draw in, title words rise from behind a mask, subtitle fades up.
export default function SectionHeading({ eyebrow, title, subtitle, align = "center" }) {
  const centered = align !== "left"
  const alignment = centered ? "text-center items-center mx-auto" : "text-left items-start"
  const words = typeof title === "string" ? title.split(" ") : null

  return (
    <m.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-64px" }}
      className={`mb-10 flex max-w-2xl flex-col gap-3 md:mb-14 ${alignment}`}
    >
      {eyebrow ? (
        <m.p
          variants={fade}
          className="flex items-center gap-2.5 text-[11px] font-medium tracking-[0.18em] text-[var(--color-accent)] uppercase"
        >
          {centered ? (
            <m.span variants={line} aria-hidden="true" className="h-px w-6 origin-right bg-current opacity-60" />
          ) : null}
          {eyebrow}
          <m.span variants={line} aria-hidden="true" className="h-px w-6 origin-left bg-current opacity-60" />
        </m.p>
      ) : null}

      {title ? (
        <h2 className="text-section font-semibold text-slate-900 dark:text-zinc-50">
          {words ? (
            <>
              <span className="sr-only">{title}</span>
              <span aria-hidden="true">
                {words.map((w, i) => (
                  <span key={`${w}-${i}`}>
                    <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top">
                      <m.span variants={word} className="inline-block">
                        {w}
                      </m.span>
                    </span>
                    {i < words.length - 1 ? " " : null}
                  </span>
                ))}
              </span>
            </>
          ) : (
            title
          )}
        </h2>
      ) : null}

      {subtitle ? (
        <m.p
          variants={fade}
          className="max-w-xl text-[0.9375rem] leading-relaxed text-slate-600 md:text-base dark:text-zinc-400"
        >
          {subtitle}
        </m.p>
      ) : null}
    </m.div>
  )
}
