import { lazy, Suspense } from "react"
import Hero from "../sections/Hero"
import {
  achievements,
  certifications,
  education,
  experiences,
  projects,
  skills,
  testimonials,
} from "../data/data"

const About = lazy(() => import("../sections/About"))
const Skills = lazy(() => import("../sections/Skills"))
const Experience = lazy(() => import("../sections/Experience"))
const Projects = lazy(() => import("../sections/Projects"))
const Achievements = lazy(() => import("../sections/Achievements"))
const Education = lazy(() => import("../sections/Education"))
const Testimonials = lazy(() => import("../sections/Testimonials"))
const Contact = lazy(() => import("../sections/Contact"))

function SectionFallback() {
  return <div className="min-h-[30vh]" aria-hidden="true" />
}

export default function Home({ ready = true }) {
  const hasAchievements = achievements.length > 0 || certifications.length > 0

  return (
    <>
      <Hero ready={ready} />
      <Suspense fallback={<SectionFallback />}>
        <About />
        {skills.length > 0 ? <Skills /> : null}
        {experiences.length > 0 ? <Experience /> : null}
        {projects.length > 0 ? <Projects /> : null}
        {hasAchievements ? <Achievements /> : null}
        {education.length > 0 ? <Education /> : null}
        {testimonials.length > 0 ? <Testimonials /> : null}
        <Contact />
      </Suspense>
    </>
  )
}
