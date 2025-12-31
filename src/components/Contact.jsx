import { motion } from 'framer-motion'
import { SectionHeader } from './SectionHeader'

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

function Icon({ type }) {
  if (type === 'github') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.9-.63.07-.62.07-.62 1 .07 1.52 1.06 1.52 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.09 0-1.13.39-2.05 1.03-2.77-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05A9.18 9.18 0 0 1 12 6.34c.85 0 1.71.12 2.51.36 1.9-1.32 2.74-1.05 2.74-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.64 1.03 2.77 0 3.96-2.34 4.82-4.57 5.08.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.83 0 .26.18.58.69.48A10.02 10.02 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
        />
      </svg>
    )
  }

  if (type === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
        <path
          fill="currentColor"
          d="M20.45 20.45h-3.56v-5.3c0-1.27-.02-2.9-1.77-2.9-1.78 0-2.05 1.38-2.05 2.8v5.4H9.51V9.56h3.42v1.49h.05c.48-.9 1.66-1.85 3.43-1.85 3.67 0 4.35 2.42 4.35 5.57v5.68ZM5.34 8.07a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.79 12.38H3.54V9.56h3.59v10.89Z"
        />
      </svg>
    )
  }

  if (type === 'email') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
        <path
          fill="currentColor"
          d="M4 6.75A2.75 2.75 0 0 1 6.75 4h10.5A2.75 2.75 0 0 1 20 6.75v10.5A2.75 2.75 0 0 1 17.25 20H6.75A2.75 2.75 0 0 1 4 17.25V6.75Zm2.75-.25a.75.75 0 0 0-.53 1.28l5.25 5a.75.75 0 0 0 1.06 0l5.25-5a.75.75 0 0 0-.53-1.28H6.75Z"
        />
      </svg>
    )
  }

  return null
}

export function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')

    const recipient = 'thisummadappuli@gmail.com'
    const subject = encodeURIComponent('Portfolio contact')
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`
  }

  return (
    <motion.section variants={sectionVariants} id="contact" className="flex flex-col gap-6">
      <SectionHeader
        eyebrow="Contact"
        title="Let&apos;s talk about systems."
        kicker="Send a short note about the problems you&apos;re solving."
      />

      <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <form
          onSubmit={handleSubmit}
          className="card-surface rounded-2xl p-5 text-sm shadow-lg shadow-black/40"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-xs font-medium text-slate-300">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-xs text-slate-100 outline-none ring-0 transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-medium text-slate-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-xs text-slate-100 outline-none ring-0 transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs font-medium text-slate-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="resize-none rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-xs text-slate-100 outline-none ring-0 transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
              />
            </div>
            <div className="pt-1">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-5 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-500/30 transition hover:bg-indigo-400"
              >
                Send Message
              </button>
            </div>
          </div>
        </form>

        <div className="flex flex-col justify-between gap-6 text-xs text-slate-300">
          <p className="max-w-sm">
            Prefer a direct channel? Connect through GitHub, LinkedIn, or email. I&apos;m especially interested in work
            around system design, backend engineering, and clean interfaces.
          </p>
          <div className="flex flex-wrap gap-3">
            {/* Replace href values with your actual profiles and email */}
            <a
              href="https://github.com/ThisumM05"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-slate-100 transition hover:border-indigo-400 hover:text-indigo-100"
            >
              <Icon type="github" />
              <span>GitHub</span>
            </a>
            <a
              href="http://www.linkedin.com/in/thisum-madappuli"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-slate-100 transition hover:border-indigo-400 hover:text-indigo-100"
            >
              <Icon type="linkedin" />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:thisummadappuli@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-slate-100 transition hover:border-indigo-400 hover:text-indigo-100"
            >
              <Icon type="email" />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
