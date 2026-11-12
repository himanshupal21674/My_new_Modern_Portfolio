import { Fragment, useCallback, useEffect, useRef } from "react"
import {
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { ArrowDown, Download, Mail, LayoutGrid } from "lucide-react"
import { heroContent, personalInfo } from "../data/data"
import MagneticButton from "../components/MagneticButton"
import TypingText from "../components/TypingText"
import SocialLinks from "../components/SocialLinks"
import { useMediaQuery } from "../hooks/useMediaQuery"
import { ease, spring } from "../utils/motion"

const CTA_ICONS = {
  resume: Download,
  contact: Mail,
  projects: LayoutGrid,
}

const CTA_HREF = {
  resume: personalInfo.resume,
  contact: "#contact",
  projects: "#projects",
}

const SHOW = { opacity: 1, y: 0 }

// Timeline (seconds after the loader lifts)
const T = {
  badge: 0,
  greeting: 0.05,
  name: 0.15,
  photo: 0.25,
  roles: 0.55,
  headline: 0.62,
  description: 0.68,
  ctas: 0.74,
  socials: 0.82,
}

/* Name rises letter by letter from behind a mask, words never break apart. */
function SplitName({ text, ready, reduce, delay }) {
  const words = text.split(" ")

  return (
    <span aria-hidden="true">
      {words.map((word, w) => {
        const offset = words.slice(0, w).join("").length
        return (
          <Fragment key={`${word}-${w}`}>
            <span className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-top whitespace-nowrap">
              {Array.from(word).map((ch, c) => (
                <m.span
                  key={`${ch}-${c}`}
                  className="inline-block origin-bottom-left"
                  initial={reduce ? false : { y: "110%", rotate: 8 }}
                  animate={ready ? { y: "0%", rotate: 0 } : undefined}
                  transition={{ delay: delay + (offset + c) * 0.035, duration: 0.8, ease: ease.expo }}
                >
                  {ch}
                </m.span>
              ))}
            </span>
            {w < words.length - 1 ? " " : null}
          </Fragment>
        )
      })}
    </span>
  )
}

export default function Hero({ ready = true }) {
  const reduce = useReducedMotion()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const isWide = useMediaQuery("(min-width: 1024px)")
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)")
  const enableParallax = isDesktop && !reduce
  const enablePointer = enableParallax && finePointer

  /* Scroll parallax */
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], enableParallax ? [0, 56] : [0, 0])
  const y2 = useTransform(scrollY, [0, 500], enableParallax ? [0, -28] : [0, 0])
  const opacity = useTransform(scrollY, [0, 380], enableParallax ? [1, 0] : [1, 1])

  /* Pointer: normalised -0.5 → 0.5. Motion values never re-render React. */
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const tiltX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), spring.soft)
  const tiltY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), spring.soft)
  const glareX = useSpring(useTransform(px, [-0.5, 0.5], ["-35%", "35%"]), spring.soft)
  const glareY = useSpring(useTransform(py, [-0.5, 0.5], ["-35%", "35%"]), spring.soft)

  const sectionRef = useRef(null)
  const fxRef = useRef(null)
  const frame = useRef(0)

  // One rAF-batched listener drives the spotlight (CSS vars on a small
  // effects layer only) and the photo tilt (motion values).
  const onPointerMove = useCallback(
    (e) => {
      if (!enablePointer || e.pointerType !== "mouse") return
      const { clientX, clientY } = e
      cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(() => {
        const section = sectionRef.current
        const fx = fxRef.current
        if (!section || !fx) return
        const rect = section.getBoundingClientRect()
        const x = clientX - rect.left
        const y = clientY - rect.top
        fx.style.setProperty("--mx", `${x}px`)
        fx.style.setProperty("--my", `${y}px`)
        px.set(x / rect.width - 0.5)
        py.set(y / rect.height - 0.5)
      })
    },
    [enablePointer, px, py],
  )

  const onPointerLeave = useCallback(() => {
    cancelAnimationFrame(frame.current)
    px.set(0)
    py.set(0)
  }, [px, py])

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  const enter = (delay, from = { opacity: 0, y: 12 }, duration = 0.5) => ({
    initial: reduce ? false : from,
    animate: ready ? SHOW : undefined,
    transition: { delay: reduce ? 0 : delay, duration, ease: ease.out },
  })

  return (
    <section
      id="home"
      ref={sectionRef}
      onPointerMove={enablePointer ? onPointerMove : undefined}
      onPointerLeave={enablePointer ? onPointerLeave : undefined}
      className="relative flex min-h-svh items-center overflow-hidden pt-28 pb-16 sm:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 hero-mesh" />
      {isDesktop ? <div className="pointer-events-none absolute inset-0 bg-grid" /> : null}
      <div className="pointer-events-none absolute inset-0 noise" />

      {/* Cursor-reactive layer: soft light + grid lines that brighten under the pointer */}
      {enablePointer ? (
        <div ref={fxRef} className="hero-fx pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="hero-grid-glow absolute inset-0" />
          <div className="hero-spot" />
        </div>
      ) : null}

      <m.div
        style={enableParallax ? { y: y1 } : undefined}
        className={`pointer-events-none absolute -top-16 left-[12%] h-48 w-48 rounded-full bg-[var(--color-accent)]/25 blur-[56px] md:h-72 md:w-72 md:blur-[88px] ${
          isDesktop && !reduce ? "animate-mesh" : ""
        }`}
      />
      <m.div
        style={enableParallax ? { y: y2 } : undefined}
        className="pointer-events-none absolute right-[8%] bottom-8 h-40 w-40 rounded-full bg-cyan-400/12 blur-[48px] md:h-64 md:w-64 md:blur-[80px]"
      />

      <m.div style={enableParallax ? { opacity } : undefined} className="page-wrap relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          <div className="min-w-0">
            {personalInfo.availability ? (
              <m.p
                {...enter(T.badge, { opacity: 0, y: 10 })}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/8 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300"
              >
                <span className="relative flex h-1.5 w-1.5">
                  {isDesktop && !reduce ? (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  ) : null}
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                {personalInfo.availability}
              </m.p>
            ) : null}

            <m.p
              {...enter(T.greeting)}
              className="text-sm font-medium text-slate-500 dark:text-zinc-400"
            >
              {heroContent.greeting}
            </m.p>

            <h1 className="brand-name mt-2 text-slate-900 dark:text-white">
              <span className="sr-only">{personalInfo.name}</span>
              <SplitName text={personalInfo.name} ready={ready} reduce={reduce} delay={T.name} />
            </h1>

            <m.div
              {...enter(T.roles, { opacity: 0, y: 14 })}
              className="mt-3 text-lg font-medium tracking-[-0.02em] text-slate-600 md:text-xl dark:text-zinc-300"
            >
              <TypingText words={heroContent.roles} className="text-gradient" />
            </m.div>

            {heroContent.headline ? (
              <m.p
                {...enter(T.headline)}
                className="mt-5 max-w-xl text-[1.05rem] leading-snug font-medium tracking-[-0.02em] text-slate-800 md:text-xl dark:text-zinc-100"
              >
                {heroContent.headline}
              </m.p>
            ) : null}

            <m.p
              {...enter(T.description)}
              className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-slate-600 md:text-base dark:text-zinc-400"
            >
              {heroContent.description}
            </m.p>

            <m.div
              {...enter(T.ctas)}
              className="mt-8 flex w-full flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center"
            >
              {heroContent.ctas.map((cta) => {
                const Icon = CTA_ICONS[cta.action]
                const href = CTA_HREF[cta.action]
                return (
                  <MagneticButton
                    key={cta.label}
                    href={href}
                    download={cta.action === "resume" ? true : undefined}
                    variant={cta.variant}
                    strength={6}
                    className="w-full sm:w-auto"
                  >
                    {Icon ? <Icon size={15} /> : null}
                    {cta.label}
                  </MagneticButton>
                )
              })}
            </m.div>

            <m.div {...enter(T.socials, { opacity: 0, y: 8 })} className="mt-8">
              <SocialLinks />
            </m.div>
          </div>

          {isWide && personalInfo.profileImage ? (
            <m.div
              {...enter(T.photo, { opacity: 0, y: 30 }, 0.7)}
              className="relative mx-auto w-full max-w-sm"
            >
              <div className="absolute -inset-5 rounded-[1.75rem] bg-[var(--color-accent)]/15 blur-2xl" />

              {/* 3D tilt toward the cursor */}
              <m.div
                style={
                  enablePointer
                    ? { rotateX: tiltX, rotateY: tiltY, transformPerspective: 1000 }
                    : undefined
                }
                className="relative"
              >
                <div className={reduce ? "" : "animate-float"}>
                  {/* Wipe-up reveal of the photo */}
                  <m.div
                    initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0% round 1.5rem)" }}
                    animate={ready ? { clipPath: "inset(0% 0% 0% 0% round 1.5rem)" } : undefined}
                    transition={{ delay: T.photo + 0.1, duration: 1, ease: ease.expo }}
                    className="relative overflow-hidden rounded-[1.5rem] border border-white/10 shadow-2xl shadow-black/20"
                  >
                    <m.img
                      src={personalInfo.profileImage}
                      alt={personalInfo.name}
                      className="aspect-[4/5] w-full object-cover"
                      width={480}
                      height={600}
                      decoding="async"
                      fetchPriority="high"
                      initial={reduce ? false : { scale: 1.25 }}
                      animate={ready ? { scale: 1 } : undefined}
                      transition={{ delay: T.photo + 0.1, duration: 1.4, ease: ease.expo }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />

                    {enablePointer ? (
                      <m.div
                        aria-hidden="true"
                        style={{ x: glareX, y: glareY }}
                        className="hero-glare pointer-events-none absolute -inset-1/2"
                      />
                    ) : null}

                    <div className="absolute right-4 bottom-4 left-4 rounded-xl border border-white/10 bg-black/45 px-4 py-3">
                      <p className="text-sm font-semibold tracking-[-0.02em] text-white">
                        {personalInfo.title}
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-300">{personalInfo.location}</p>
                    </div>
                  </m.div>
                </div>
              </m.div>
            </m.div>
          ) : null}
        </div>
      </m.div>

      <a
        href="#about"
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-[11px] font-medium tracking-[0.16em] text-slate-500 uppercase md:flex"
      >
        Scroll
        <m.span
          animate={reduce ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </m.span>
      </a>
    </section>
  )
}
