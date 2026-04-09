import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINES = [
  { code: 'import { Portfolio } from "./life"', delay: 0 },
  { code: 'const skills = await load("engineering")', delay: 0.4 },
  { code: 'const projects = compile(ideas)', delay: 0.8 },
  { code: 'bootstrap(Thanuja.Thisum)', delay: 1.2 },
]

function TypedLine({ text, startDelay }) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let i = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) clearInterval(interval)
      }, 28)
      return () => clearInterval(interval)
    }, startDelay * 1000)
    return () => clearTimeout(timeout)
  }, [text, startDelay])

  return (
    <div className="flex items-center gap-2 font-mono text-xs sm:text-sm leading-relaxed">
      <span className="text-indigo-400 select-none">{'>'}</span>
      <span className="text-slate-300">{displayed}</span>
      {displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-indigo-400 animate-pulse" />
      )}
    </div>
  )
}

export function Loader({ onDone }) {
  const [exiting, setExiting] = useState(false)

  // total duration: last line starts at 1.2s, ~0.85s to type → done ~2.1s, exit at 2.4s
  useEffect(() => {
    const t = setTimeout(() => setExiting(true), 2600)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!exiting) return
    const t = setTimeout(onDone, 700)
    return () => clearTimeout(t)
  }, [exiting, onDone])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 gap-8 px-6"
        >
          {/* glow blob */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-indigo-600/20 blur-[80px]"
              aria-hidden="true"
            />
          </div>

          {/* bracket icon */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 select-none"
          >
            <span className="text-4xl font-light text-indigo-400/70 font-mono">{'{'}</span>
            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-mono">initializing</span>
              {/* progress bar */}
              <div className="relative h-[2px] w-40 rounded-full bg-slate-800 overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-indigo-500 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.4, ease: 'linear' }}
                />
              </div>
            </div>
            <span className="text-4xl font-light text-indigo-400/70 font-mono">{'}'}</span>
          </motion.div>

          {/* typed lines */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="flex flex-col gap-2 min-w-0 w-full max-w-sm bg-slate-900/60 border border-slate-800/80 rounded-xl px-4 py-4 backdrop-blur-sm"
          >
            {/* window dots */}
            <div className="flex items-center gap-1.5 mb-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
            </div>

            {LINES.map((line, i) => (
              <TypedLine key={i} text={line.code} startDelay={line.delay} />
            ))}

            {/* blinking cursor at end */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.1 }}
              className="flex items-center gap-2 font-mono text-xs sm:text-sm"
            >
              <span className="text-green-400 select-none">✓</span>
              <span className="text-green-400/80">Ready.</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
