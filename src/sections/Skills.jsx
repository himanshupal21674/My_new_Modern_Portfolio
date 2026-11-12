import { memo, useCallback, useEffect, useMemo, useRef } from "react"
import { m, useInView } from "framer-motion"
import { sections, skillCategories, skills } from "../data/data"
import SectionHeading from "../components/SectionHeading"
import TechIcon from "../components/TechIcon"
import { getTechColor } from "../utils/techIcons"
import { ease } from "../utils/motion"

/* ── Entrance choreography: grid → cards → skill rows ─────────────── */
const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: ease.expo,
      staggerChildren: 0.04,
      delayChildren: 0.15,
    },
  },
}

const rowVariants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: ease.out } },
}

/* ── One skill row. All hover motion is pure CSS (see index.css) ─── */
const SkillTile = memo(function SkillTile({ skill }) {
  const level = Math.max(0, Math.min(100, Number(skill.level) || 0))
  const style = { "--brand": getTechColor(skill.name), "--level": level }

  return (
    <m.li variants={rowVariants}>
      <div
        className="skill-tile"
        style={style}
        tabIndex={0}
        aria-label={level ? `${skill.name}, ${level}% proficiency` : skill.name}
      >
        <span className="skill-icon" aria-hidden="true">
          <svg className="skill-ring" viewBox="0 0 40 40">
            <circle className="skill-ring-track" cx="20" cy="20" r="18.5" pathLength="100" />
            <circle className="skill-ring-fill" cx="20" cy="20" r="18.5" pathLength="100" />
          </svg>
          <span className="skill-glyph">
            <TechIcon name={skill.name} className="h-[18px] w-[18px]" />
          </span>
        </span>
        <span className="skill-name">{skill.name}</span>
        {level ? <span className="skill-level" aria-hidden="true" /> : null}
      </div>
    </m.li>
  )
})

/* ── Auto-scrolling strip of every skill (paused when off screen) ── */
function SkillMarquee() {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: "100px" })
  const loop = useMemo(() => [...skills, ...skills], [])

  return (
    <div
      ref={ref}
      className="skills-marquee mb-8 md:mb-10"
      data-paused={inView ? "false" : "true"}
      aria-hidden="true"
    >
      <div className="skills-marquee-track">
        {loop.map((skill, i) => (
          <span
            key={`${skill.name}-${i}`}
            className="skills-marquee-item"
            style={{ "--brand": getTechColor(skill.name) }}
          >
            <TechIcon name={skill.name} className="h-4 w-4" />
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  const copy = sections.skills
  const gridRef = useRef(null)
  const frame = useRef(0)

  const groups = useMemo(() => {
    const list = skillCategories
      .map((category) => ({
        category,
        items: skills.filter((s) => s.category === category),
      }))
      .filter((group) => group.items.length)
    const largest = Math.max(0, ...list.map((g) => g.items.length))
    // The biggest category becomes a wide "bento" card.
    return list.map((g) => ({ ...g, wide: g.items.length === largest && largest > 6 }))
  }, [])

  // Cursor spotlight: one listener for the whole grid, batched into a single
  // animation frame. Reads all rects first, then writes — no layout thrash,
  // and no React re-renders on mouse move.
  const onPointerMove = useCallback((e) => {
    if (e.pointerType !== "mouse") return
    const { clientX, clientY } = e
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const cards = gridRef.current?.querySelectorAll("[data-spot]")
      if (!cards) return
      const rects = Array.from(cards, (card) => card.getBoundingClientRect())
      cards.forEach((card, i) => {
        card.style.setProperty("--x", `${clientX - rects[i].left}px`)
        card.style.setProperty("--y", `${clientY - rects[i].top}px`)
      })
    })
  }, [])

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  if (!skills.length) return null

  return (
    <section id="skills" className="section-y relative">
      <div className="page-wrap">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />

        <SkillMarquee />

        <m.div
          ref={gridRef}
          onPointerMove={onPointerMove}
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="spot-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {groups.map((group) => (
            <m.article
              key={group.category}
              data-spot=""
              variants={cardVariants}
              className={`spot-card surface rounded-2xl p-4 sm:p-5 ${
                group.wide ? "sm:col-span-2" : ""
              }`}
            >
              <header className="mb-3 flex items-center justify-between gap-3 px-1">
                <h3 className="text-[13px] font-semibold tracking-[-0.01em] text-slate-900 dark:text-white">
                  {group.category}
                </h3>
                <span className="chip tabular-nums">
                  {group.items.length} {group.items.length === 1 ? "skill" : "skills"}
                </span>
              </header>
              <ul className={`grid gap-1 ${group.wide ? "sm:grid-cols-2 sm:gap-x-3" : ""}`}>
                {group.items.map((skill) => (
                  <SkillTile key={skill.name} skill={skill} />
                ))}
              </ul>
            </m.article>
          ))}
        </m.div>

        <p className="mt-6 text-center text-xs text-slate-500 dark:text-zinc-500">
          Hover or tap a skill to see proficiency
        </p>
      </div>
    </section>
  )
}
