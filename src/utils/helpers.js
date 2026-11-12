export function cx(...classes) {
  return classes.filter(Boolean).join(" ")
}

/** Shrink Unsplash URLs for cards/modals without changing non-Unsplash assets. */
export function optimizeImageUrl(url, width = 800) {
  if (!url || typeof url !== "string") return url
  if (!url.includes("images.unsplash.com")) return url
  try {
    const parsed = new URL(url)
    parsed.searchParams.set("auto", "format")
    parsed.searchParams.set("fit", "crop")
    parsed.searchParams.set("w", String(width))
    parsed.searchParams.set("q", "75")
    return parsed.toString()
  } catch {
    return url
  }
}

export function uniqueTechs(projects = []) {
  const set = new Set()
  projects.forEach((project) => {
    project.tech?.forEach((item) => set.add(item))
  })
  return ["All", ...Array.from(set)]
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function getSocialHref(personalInfo, hrefKey) {
  if (hrefKey === "email") {
    return personalInfo.email ? `mailto:${personalInfo.email}` : ""
  }
  return personalInfo[hrefKey] || ""
}

export function yearNow() {
  return new Date().getFullYear()
}

export function scrollToId(id) {
  const el = document.getElementById(id.replace("#", ""))
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
}
