import { useMemo } from "react"
import { navLinks } from "../data/data"
import { useTheme } from "../hooks/useTheme"
import { useActiveSection } from "../hooks/useActiveSection"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import ScrollToTop from "../components/ScrollToTop"
import ScrollProgress from "../components/ScrollProgress"

export default function MainLayout({ children }) {
  const { theme, toggleTheme } = useTheme()
  const ids = useMemo(
    () => navLinks.map((link) => link.href.replace("#", "")).filter(Boolean),
    [],
  )
  const activeSection = useActiveSection(ids)

  return (
    <div className="relative min-h-svh overflow-x-clip bg-mist text-slate-700 dark:bg-ink dark:text-zinc-400">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-slate-900"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar theme={theme} toggleTheme={toggleTheme} activeSection={activeSection} />
      <main id="content">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
