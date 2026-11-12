import { useEffect, useRef, useState } from "react"
import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { sections, testimonials } from "../data/data"
import SectionHeading from "../components/SectionHeading"
import { optimizeImageUrl } from "../utils/helpers"

export default function Testimonials() {
  const copy = sections.testimonials
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = testimonials.length
  const reduce = useReducedMotion()
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { margin: "-10% 0px" })

  useEffect(() => {
    if (!total || paused || reduce || !inView) return undefined
    const id = setInterval(() => setIndex((i) => (i + 1) % total), 6000)
    return () => clearInterval(id)
  }, [total, paused, reduce, inView])

  if (!total) return null
  const item = testimonials[index]

  return (
    <section id="testimonials" ref={sectionRef} className="section-y relative">
      <div className="page-wrap">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />

        <div
          className="relative mx-auto max-w-2xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
        >
          <div className="surface overflow-hidden rounded-2xl p-6 md:p-10">
            <Quote className="text-[var(--color-accent)]/50" size={22} />
            <AnimatePresence mode="wait">
              <m.div
                key={item.id || item.name}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: reduce ? 0.12 : 0.28 }}
              >
                <p className="mt-4 text-base leading-relaxed text-slate-800 md:text-lg dark:text-zinc-100">
                  “{item.quote}”
                </p>
                <div className="mt-7 flex items-center gap-3.5">
                  <img
                    src={optimizeImageUrl(item.avatar, 128)}
                    alt={item.name}
                    className="h-12 w-12 rounded-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={48}
                    height={48}
                  />
                  <div>
                    <p className="text-sm font-semibold tracking-[-0.02em] text-slate-900 dark:text-white">
                      {item.name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-zinc-400">
                      {item.role}, {item.company}
                    </p>
                  </div>
                </div>
              </m.div>
            </AnimatePresence>
          </div>

          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => setIndex((i) => (i - 1 + total) % total)}
              className="grid h-11 w-11 place-items-center rounded-full surface"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((t, i) => (
                <button
                  key={t.id || t.name}
                  type="button"
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    i === index ? "w-7 bg-[var(--color-accent)]" : "w-2 bg-slate-300 dark:bg-white/20"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => setIndex((i) => (i + 1) % total)}
              className="grid h-11 w-11 place-items-center rounded-full surface"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
