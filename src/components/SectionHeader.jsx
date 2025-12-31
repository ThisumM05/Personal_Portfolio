import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

export function SectionHeader({ eyebrow, title, kicker, id }) {
  const ref = useRef(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.1'] })
  const y = useTransform(scrollYProgress, [0, 1], [12, -12])

  return (
    <motion.div
      id={id}
      ref={ref}
      className="flex flex-col gap-3"
      style={shouldReduceMotion ? undefined : { y }}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-300">
          {eyebrow}
        </p>
      )}
      <h2 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
        {title}
      </h2>
      {kicker && <p className="max-w-xl text-sm text-slate-400">{kicker}</p>}
    </motion.div>
  )
}
