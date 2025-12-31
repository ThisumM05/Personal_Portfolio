import { motion } from 'framer-motion'
import { SectionHeader } from './SectionHeader'

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export function About() {
  return (
    <motion.section variants={sectionVariants} id="about" className="flex flex-col gap-4 flex justify-center text-center">
      <SectionHeader
        eyebrow="About"
        title="Engineering systems that stay reliable as they grow."
      />

      <div className="mt-4 ">
        <div className="card-surface relative overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900/50 p-6 shadow-lg shadow-black/40 backdrop-blur-lg transition duration-300 hover:-translate-y-1 hover:scale-[1.02]">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/15 via-slate-900/40 to-indigo-900/30" />
          <div className="relative flex justify-center text-center">
            <p className="max-w-2xl text-sm leading-relaxed text-slate-200">
              I enjoy breaking complex problems into clear, composable systems — focusing on clean architecture,
              predictable data flows, and interfaces that reflect the underlying design. I iterate fast, document
              decisions, and care deeply about long-term maintainability.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
