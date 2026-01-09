import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Typewriter } from 'react-simple-typewriter'

import { MagneticButton } from './MagneticButton'
import profileImage from '../assets/images.jpeg'
import cvPdf from '../assets/Thanuja Thisum Madappuli.pdf'

const heroVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] } },
}

const MotionDiv = motion.div

const stats = [
  { label: 'Months of experience', value: 6 },
  { label: 'Projects delivered', value: 4 },
]

function Stat({ label, value }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let current = 0
    const duration = 1200
    const frameDuration = 1000 / 60
    const totalFrames = Math.round(duration / frameDuration)
    const increment = value / totalFrames

    const interval = setInterval(() => {
      current += increment
      if (current >= value) {
        current = value
        clearInterval(interval)
      }
      setCount(Math.round(current))
    }, frameDuration)

    return () => clearInterval(interval)
  }, [value])

  return (
    <div className="flex flex-col">
      <span className="text-lg font-semibold text-slate-50">
        {count}
        <span className="text-indigo-300">+</span>
      </span>
      <span className="mt-1 text-[11px] uppercase tracking-[0.18em] text-slate-400">{label}</span>
    </div>
  )
}

export function Hero() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center">
      <MotionDiv variants={heroVariants}>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-300">
          Software Engineer × Designer
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
          <span className="block text-sm font-normal text-indigo-200 sm:text-base">Hi, I&apos;m</span>
          <span className="block">
            <Typewriter
              words={['Thanuja Thisum Madappuli']}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
              loop={false}
            />
          </span>
        </h1>
        <p className="mt-2 text-sm font-medium text-indigo-200">Software Engineer</p>
        <p className="mt-4 max-w-xl text-sm text-slate-300">
          I design and build reliable systems with clean, maintainable architectures — from backend services to
          interfaces that stay out of the way.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <MagneticButton
            as="a"
            href={cvPdf}
            download
            aria-label="Download CV as PDF"
            className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-6 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Download CV
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#projects"
            aria-label="Skip to projects section"
            className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/50 px-5 py-2 text-xs font-semibold text-slate-100 shadow-sm transition hover:border-indigo-400 hover:text-indigo-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            View Projects
          </MagneticButton>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full border border-transparent px-4 py-2 text-xs font-normal text-slate-300 underline-offset-4 hover:text-indigo-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Contact
          </a>
        </div>

        <div className="mt-6 flex flex-wrap gap-8 text-xs text-slate-300">
          {stats.map((stat) => (
            <Stat key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>
      </MotionDiv>

      <MotionDiv
        variants={heroVariants}
        className="relative max-w-md justify-self-center md:justify-self-end"
      >
        <div className="flex justify-center">
          <MotionDiv
            initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 1.05 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/80 shadow-xl shadow-black/60"
          >
            <img
              src={profileImage}
              alt="Portrait of Thanuja Thisum Madappuli"
              className="h-72 w-full object-cover sm:h-80"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent" />
          </MotionDiv>
        </div>
      </MotionDiv>
    </section>
  )
}
