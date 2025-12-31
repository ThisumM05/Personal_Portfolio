import { motion } from 'framer-motion'
import { SectionHeader } from './SectionHeader'
import { MagneticButton } from './MagneticButton'
import cvPdf from '../assets/Thanuja Thisum Madappuli.pdf'

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] },
  },
}

export function Experience() {
  return (
    <motion.section
      variants={sectionVariants}
      id="experience"
      className="flex flex-col gap-5"
      aria-label="Professional experience timeline"
    >
      <SectionHeader eyebrow="Experience" title="Intern Software Engineer" />

      <div className="mt-2 flex flex-col gap-6">
        <div className="relative pl-6">
          <div className="absolute left-1 top-1 h-4 w-4 -translate-x-1/2 rounded-full border border-indigo-400/70 bg-slate-950" />
          <div className="absolute left-1 top-5 h-full w-px -translate-x-1/2 bg-slate-800/70" aria-hidden="true" />

          <article className="card-surface relative rounded-2xl border border-slate-800/80 bg-slate-900/70 p-5 shadow-lg shadow-black/40">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-sm font-semibold tracking-tight text-slate-50">Intern Software Engineer</h3>
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Real-world systems</p>
            </div>

            <ul className="mt-3 space-y-1.5 text-sm text-slate-300">
              <li>Contributed to production features and fixes in an existing codebase.</li>
              <li>Worked on data flows and system integrations used by real users.</li>
              <li>Collaborated on code reviews, debugging, and documentation.</li>
            </ul>

            <div className="mt-4 flex flex-wrap gap-3 text-xs font-medium">
              <MagneticButton
                as="a"
                href="/Thanuja Thisum Madappuli Service Letter.pdf"
                download
                aria-label="Download Service Letter as PDF"
                className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Download Service Letter
              </MagneticButton>
              <a
                href={cvPdf}
                download
                aria-label="Download CV as PDF"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/60 px-5 py-2 text-xs font-semibold text-slate-100 shadow-sm transition hover:border-indigo-400 hover:text-indigo-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Download CV
              </a>
            </div>
          </article>
        </div>
      </div>
    </motion.section>
  )
}
