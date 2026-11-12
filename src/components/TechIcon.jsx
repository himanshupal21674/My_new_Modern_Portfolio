import { memo, useState } from "react"
import { getTechIcon } from "../utils/techIcons"

function TechIcon({ name, className = "h-8 w-8" }) {
  const src = getTechIcon(name)
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <span
        aria-hidden="true"
        className={`grid place-items-center rounded-md bg-indigo-500/10 text-[10px] font-semibold text-indigo-400 ${className}`}
      >
        {name.slice(0, 2).toUpperCase()}
      </span>
    )
  }

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={`object-contain ${className}`}
      loading="lazy"
      decoding="async"
      width="32"
      height="32"
      onError={() => setFailed(true)}
    />
  )
}

export default memo(TechIcon)
