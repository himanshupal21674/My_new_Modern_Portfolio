import { useEffect, useState } from "react"
import { LazyMotion, MotionConfig, domMax } from "framer-motion"
import SEO from "./components/SEO"
import LoadingScreen from "./components/LoadingScreen"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"

const MIN_LOADER_MS = 500
const MAX_LOADER_MS = 900

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let dismissed = false
    let settleTimer
    const start = performance.now()

    const dismiss = () => {
      if (dismissed) return
      dismissed = true
      setLoading(false)
    }

    const finish = () => {
      const elapsed = performance.now() - start
      const wait = Math.max(0, MIN_LOADER_MS - elapsed)
      settleTimer = window.setTimeout(dismiss, wait)
    }

    const maxTimer = window.setTimeout(dismiss, MAX_LOADER_MS)

    if (document.readyState === "complete") {
      finish()
    } else {
      window.addEventListener("load", finish, { once: true })
    }

    return () => {
      window.clearTimeout(maxTimer)
      window.clearTimeout(settleTimer)
      window.removeEventListener("load", finish)
    }
  }, [])

  return (
    // LazyMotion + `m` components ship only the animation features we use,
    // instead of the full framer-motion bundle. domMax keeps layout/layoutId support.
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">
        <SEO />
        <LoadingScreen visible={loading} />
        <MainLayout>
          <Home ready={!loading} />
        </MainLayout>
      </MotionConfig>
    </LazyMotion>
  )
}
