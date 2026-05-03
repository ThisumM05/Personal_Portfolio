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

      <div className="mt-8 flex justify-center">
        <div className="group relative w-full max-w-4xl rounded-3xl bg-slate-950/40 p-[1px] shadow-2xl transition-all duration-500 hover:shadow-indigo-500/20">
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-indigo-500/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/80 p-8 sm:p-12 backdrop-blur-xl">
            <div className="pointer-events-none absolute -inset-1/2 bg-gradient-to-tr from-indigo-500/10 via-transparent to-sky-400/10 opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
            
            <div className="relative mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-500/10 shadow-[0_0_30px_rgba(99,102,241,0.2)] group-hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] transition-all duration-500">
              <svg className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>

            <p className="max-w-3xl text-center text-base sm:text-lg leading-relaxed text-slate-300">
              I enjoy breaking complex problems into clear, composable systems — focusing on <span className="font-semibold text-indigo-300">clean architecture</span>, <span className="font-semibold text-sky-300">predictable data flows</span>, and interfaces that reflect the underlying design. I iterate fast, document decisions, and care deeply about <span className="font-semibold text-slate-100">long-term maintainability</span>.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
