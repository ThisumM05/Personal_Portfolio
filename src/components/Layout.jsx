import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import cvPdf from '../assets/Thanuja Thisum Madappuli.pdf'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}
const MotionSection = motion.section


export function Layout({ children }) {
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.35])

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-animated-gradient opacity-80" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-noise-overlay opacity-40 mix-blend-soft-light"
          aria-hidden="true"
        />
        <motion.div
          aria-hidden="true"
          className="hero-glow absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 opacity-80"
          style={shouldReduceMotion ? undefined : { opacity: glowOpacity }}
        />
        <div className="gradient-border h-full w-full opacity-55 mix-blend-screen" aria-hidden="true" />
      </div>

      <header className="sticky top-0 z-30 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-sm font-medium tracking-tight text-slate-200">
            <span className="h-7 w-7 rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-300" />
            <div className="leading-tight">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Portfolio</div>
              <div>Thanuja Thisum Madappuli</div>
            </div>
          </div>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-6 text-xs font-medium text-slate-300 md:flex"
          >
            <a
              href="#projects"
              className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Projects
            </a>
            <a
              href="#skills"
              className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Skills
            </a>
            <a
              href="#experience"
              className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Experience
            </a>
            <a
              href="#contact"
              className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Contact
            </a>
            <a
              href={cvPdf}
              download
              className="rounded-full border border-indigo-400/60 bg-indigo-500/20 px-4 py-1.5 text-xs font-semibold text-indigo-100 shadow-sm transition hover:bg-indigo-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              aria-label="Download CV as PDF"
            >
              Download CV
            </a>
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto flex max-w-6xl flex-col gap-24 px-6 py-16 md:gap-28 md:py-20"
        >
          {children}
        </motion.div>
      </main>

      <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/80 py-6 text-xs text-slate-500">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 md:flex-row">
          <p>
            © {new Date().getFullYear()} Thanuja Thisum Madappuli. All rights reserved.
          </p>
          <p className="text-[11px]">Built with React, Tailwind CSS, and Framer Motion.</p>
        </div>
      </footer>
    </div>
  )
}
