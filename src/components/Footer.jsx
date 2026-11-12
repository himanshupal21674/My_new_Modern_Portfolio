import { personalInfo, navLinks, footerContent } from "../data/data"
import { yearNow } from "../utils/helpers"
import SocialLinks from "./SocialLinks"

export default function Footer() {
  const year = yearNow()

  return (
    <footer className="relative border-t border-slate-200/80 pt-14 pb-8 dark:border-white/8">
      <div className="page-wrap grid gap-10 md:grid-cols-[1.3fr_1fr_1fr] md:gap-12">
        <div>
          <p className="text-lg font-semibold tracking-[-0.03em] text-slate-900 dark:text-white">
            {personalInfo.name}
          </p>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-zinc-400">{personalInfo.title}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-zinc-400">
            {footerContent.tagline}
          </p>
        </div>

        <div>
          <p className="text-[11px] font-medium tracking-[0.16em] text-slate-400 uppercase">
            Quick links
          </p>
          <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-600 transition-colors duration-200 hover:text-slate-900 dark:text-zinc-300 dark:hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-medium tracking-[0.16em] text-slate-400 uppercase">
            Connect
          </p>
          <SocialLinks className="mt-4" />
          {personalInfo.email ? (
            <a
              href={`mailto:${personalInfo.email}`}
              className="mt-4 block text-sm break-all text-slate-600 transition-colors hover:text-slate-900 dark:text-zinc-300 dark:hover:text-white"
            >
              {personalInfo.email}
            </a>
          ) : null}
        </div>
      </div>

      <div className="page-wrap mt-12 flex flex-col items-center justify-between gap-2 border-t border-slate-200/80 pt-6 text-xs text-slate-500 md:flex-row dark:border-white/8">
        <p>
          © {year} {personalInfo.name}. {footerContent.copyright}
        </p>
        <p>{personalInfo.location}</p>
      </div>
    </footer>
  )
}
