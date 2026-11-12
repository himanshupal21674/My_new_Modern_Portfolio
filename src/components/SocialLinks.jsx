import { Mail } from "lucide-react"
import { personalInfo, socialLinks } from "../data/data"
import { getSocialHref } from "../utils/helpers"
import { GitHubIcon, LinkedInIcon, TwitterIcon } from "./BrandIcons"

const ICONS = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  twitter: TwitterIcon,
  email: Mail,
}

export default function SocialLinks({ className = "" }) {
  const items = socialLinks
    .map((item) => ({
      ...item,
      href: getSocialHref(personalInfo, item.hrefKey),
      Icon: ICONS[item.id],
    }))
    .filter((item) => item.href && item.Icon)

  if (!items.length) return null

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {items.map(({ id, href, label, Icon }) => (
        <a
          key={id}
          href={href}
          target={id === "email" ? undefined : "_blank"}
          rel={id === "email" ? undefined : "noopener noreferrer"}
          aria-label={label}
          className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white/80 text-slate-600 transition-colors duration-200 hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:border-white/20 dark:hover:text-white"
        >
          <Icon size={16} />
        </a>
      ))}
    </div>
  )
}
