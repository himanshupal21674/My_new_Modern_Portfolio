import { useEffect } from "react"
import { siteConfig, personalInfo } from "../data/data"

export default function SEO() {
  useEffect(() => {
    document.title = siteConfig.title
    document.documentElement.lang = siteConfig.lang || "en"

    const setMeta = (selector, attr, value) => {
      if (!value) return
      let el = document.querySelector(selector)
      if (!el) {
        el = document.createElement("meta")
        const isProperty = selector.includes("property")
        if (isProperty) {
          el.setAttribute("property", selector.match(/property="([^"]+)"/)[1])
        } else {
          el.setAttribute("name", selector.match(/name="([^"]+)"/)[1])
        }
        document.head.appendChild(el)
      }
      el.setAttribute(attr, value)
    }

    setMeta('meta[name="description"]', "content", siteConfig.description)
    setMeta('meta[name="keywords"]', "content", siteConfig.keywords.join(", "))
    setMeta('meta[name="author"]', "content", personalInfo.name)
    setMeta('meta[property="og:title"]', "content", siteConfig.title)
    setMeta('meta[property="og:description"]', "content", siteConfig.description)
    setMeta('meta[property="og:type"]', "content", "website")
    setMeta('meta[property="og:url"]', "content", siteConfig.url)
    setMeta('meta[property="og:image"]', "content", siteConfig.ogImage)
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image")
    setMeta('meta[name="twitter:title"]', "content", siteConfig.title)
    setMeta('meta[name="twitter:description"]', "content", siteConfig.description)
    setMeta('meta[name="twitter:image"]', "content", siteConfig.ogImage)

    const existing = document.querySelector('script[data-seo="person"]')
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: personalInfo.name,
      jobTitle: personalInfo.title,
      email: personalInfo.email,
      telephone: personalInfo.phone,
      address: { "@type": "PostalAddress", addressLocality: personalInfo.location },
      url: siteConfig.url,
      sameAs: [personalInfo.github, personalInfo.linkedin, personalInfo.twitter].filter(Boolean),
      description: siteConfig.description,
    }

    if (existing) {
      existing.textContent = JSON.stringify(jsonLd)
    } else {
      const script = document.createElement("script")
      script.type = "application/ld+json"
      script.dataset.seo = "person"
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }
  }, [])

  return null
}
