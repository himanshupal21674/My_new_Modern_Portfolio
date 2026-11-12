import { useCallback, useMemo, useState } from "react"
import { AnimatePresence, LayoutGroup, m } from "framer-motion"
import { projects, sections } from "../data/data"
import { uniqueTechs } from "../utils/helpers"
import ProjectCard from "../components/ProjectCard"
import ProjectModal from "../components/ProjectModal"
import Reveal from "../components/Reveal"
import SectionHeading from "../components/SectionHeading"
import { spring } from "../utils/motion"

const projectKey = (project) => String(project.id || project.title)

export default function Projects() {
  const copy = sections.projects
  const filters = useMemo(() => uniqueTechs(projects), [])
  const [filter, setFilter] = useState("All")
  const [active, setActive] = useState(null)

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.tech.includes(filter))),
    [filter],
  )

  const close = useCallback(() => setActive(null), [])

  if (!projects.length) return null

  return (
    <section id="projects" className="section-y relative">
      <div className="page-wrap">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />

        <Reveal>
          <div
            role="toolbar"
            aria-label="Filter projects by technology"
            className="mb-8 -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
          >
            {filters.map((item) => {
              const selected = filter === item
              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setFilter(item)}
                  className={`relative shrink-0 rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-200 ${
                    selected
                      ? "text-white dark:text-slate-900"
                      : "surface text-slate-600 hover:text-slate-900 dark:text-zinc-300 dark:hover:text-white"
                  }`}
                >
                  {/* The active pill slides between filters */}
                  {selected ? (
                    <m.span
                      layoutId="project-filter-pill"
                      transition={spring.snappy}
                      className="absolute inset-0 rounded-full bg-slate-900 dark:bg-white"
                    />
                  ) : null}
                  <span className="relative">{item}</span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Cards glide to their new spots when the filter changes; the opened
            card's frame and image morph into the details panel (shared layoutId). */}
        <LayoutGroup id="projects">
          <m.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((project) => (
                <ProjectCard
                  key={projectKey(project)}
                  layoutKey={projectKey(project)}
                  project={project}
                  onOpen={setActive}
                />
              ))}
            </AnimatePresence>
          </m.div>
          <ProjectModal
            project={active}
            layoutKey={active ? projectKey(active) : null}
            onClose={close}
          />
        </LayoutGroup>
      </div>
    </section>
  )
}
