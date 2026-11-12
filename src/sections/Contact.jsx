import { useState } from "react"
import { Mail, MapPin, Phone, CheckCircle2 } from "lucide-react"
import { contactForm, personalInfo, sections } from "../data/data"
import { isValidEmail } from "../utils/helpers"
import MagneticButton from "../components/MagneticButton"
import Reveal from "../components/Reveal"
import SectionHeading from "../components/SectionHeading"
import SocialLinks from "../components/SocialLinks"

const empty = { name: "", email: "", subject: "", message: "" }

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40 dark:border-white/10 dark:bg-white/4 dark:text-white"

function validate(values) {
  const errors = {}
  const { fields } = contactForm
  if (fields.name.required && values.name.trim().length < (fields.name.minLength || 1)) {
    errors.name = `Please enter at least ${fields.name.minLength || 1} characters.`
  }
  if (fields.email.required && !isValidEmail(values.email)) {
    errors.email = "Enter a valid email address."
  }
  if (fields.subject.required && values.subject.trim().length < (fields.subject.minLength || 1)) {
    errors.subject = "A short subject helps me respond faster."
  }
  if (fields.message.required && values.message.trim().length < (fields.message.minLength || 1)) {
    errors.message = `Please add a bit more detail (${fields.message.minLength}+ characters).`
  }
  return errors
}

export default function Contact() {
  const copy = sections.contact
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState("idle")

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const next = validate(values)
    setErrors(next)
    if (Object.keys(next).length) {
      setStatus("error")
      return
    }
    setStatus("sending")
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`,
    )
    const subject = encodeURIComponent(values.subject)
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`
    setTimeout(() => {
      setStatus("success")
      setValues(empty)
    }, 400)
  }

  const details = [
    personalInfo.email && { icon: Mail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    personalInfo.phone && { icon: Phone, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone.replace(/\s/g, "")}` },
    personalInfo.location && { icon: MapPin, label: "Location", value: personalInfo.location },
  ].filter(Boolean)

  return (
    <section id="contact" className="section-y relative">
      <div className="page-wrap">
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
          <Reveal>
            <div className="surface rounded-2xl p-5 md:p-7">
              <div className="space-y-2">
                {details.map((item) => {
                  const Icon = item.icon
                  const inner = (
                    <>
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                        <Icon size={18} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[11px] font-medium tracking-[0.14em] text-slate-400 uppercase">
                          {item.label}
                        </span>
                        <span className="block text-sm break-all text-slate-800 dark:text-white">
                          {item.value}
                        </span>
                      </span>
                    </>
                  )
                  return item.href ? (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-3.5 rounded-xl p-2 transition-colors hover:bg-slate-900/4 dark:hover:bg-white/4"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={item.label} className="flex items-center gap-3.5 p-2">
                      {inner}
                    </div>
                  )
                })}
              </div>
              <SocialLinks className="mt-7" />
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <form onSubmit={onSubmit} noValidate className="surface rounded-2xl p-5 md:p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {["name", "email"].map((key) => (
                  <label key={key} className="block text-sm">
                    <span className="mb-1.5 block text-slate-500 dark:text-zinc-400">
                      {contactForm.fields[key].label}
                    </span>
                    <input
                      name={key}
                      type={key === "email" ? "email" : "text"}
                      value={values[key]}
                      onChange={onChange}
                      placeholder={contactForm.fields[key].placeholder}
                      autoComplete={key === "email" ? "email" : "name"}
                      className={inputClass}
                    />
                    {errors[key] ? (
                      <span className="mt-1 block text-xs text-rose-400">{errors[key]}</span>
                    ) : null}
                  </label>
                ))}
              </div>
              <label className="mt-4 block text-sm">
                <span className="mb-1.5 block text-slate-500 dark:text-zinc-400">
                  {contactForm.fields.subject.label}
                </span>
                <input
                  name="subject"
                  value={values.subject}
                  onChange={onChange}
                  placeholder={contactForm.fields.subject.placeholder}
                  className={inputClass}
                />
                {errors.subject ? (
                  <span className="mt-1 block text-xs text-rose-400">{errors.subject}</span>
                ) : null}
              </label>
              <label className="mt-4 block text-sm">
                <span className="mb-1.5 block text-slate-500 dark:text-zinc-400">
                  {contactForm.fields.message.label}
                </span>
                <textarea
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={onChange}
                  placeholder={contactForm.fields.message.placeholder}
                  className={`${inputClass} resize-none`}
                />
                {errors.message ? (
                  <span className="mt-1 block text-xs text-rose-400">{errors.message}</span>
                ) : null}
              </label>

              {status === "error" ? (
                <p className="mt-3 text-sm text-rose-400">{contactForm.errorMessage}</p>
              ) : null}
              {status === "success" ? (
                <p className="mt-3 inline-flex items-center gap-2 text-sm text-emerald-500">
                  <CheckCircle2 size={16} /> {contactForm.successMessage}
                </p>
              ) : null}

              <div className="mt-6">
                <MagneticButton type="submit" variant="primary" className="w-full sm:w-auto">
                  {status === "sending" ? contactForm.sendingLabel : contactForm.submitLabel}
                </MagneticButton>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
