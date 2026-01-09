import { motion, useReducedMotion } from 'framer-motion'

import { MagneticButton } from './MagneticButton'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: () => ({
    opacity: 1,
    y: 0,
    transition: {  },
  }),
}

const MotionSection = motion.section

export function ProjectCard({ project, index }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.article
      className="project-card card-surface group flex flex-col justify-between rounded-2xl p-4 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-400 focus-within:ring-offset-2 focus-within:ring-offset-slate-950"
      custom={index}
      variants={cardVariants}
      whileHover={shouldReduceMotion ? undefined : { y: -6 }}
    >
      <div>
        <div className="mb-4 overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/70">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="h-32 w-full object-cover"
            />
          ) : (
            <div className="flex h-40 items-center justify-center text-[11px] text-slate-500">
              {/* Add a project image by setting project.imageUrl in data/projects.js */}
              Project visual placeholder
            </div>
          )}
        </div>

        <h3 className="text-base font-semibold tracking-tight text-slate-50">
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-slate-300">{project.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="pill-badge transition-colors group-hover:border-indigo-400 group-hover:bg-indigo-500/10 group-hover:text-indigo-100"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3 text-xs font-medium">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-900/60 px-4 py-1.5 text-slate-100 transition hover:border-indigo-400 hover:text-indigo-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          aria-label={`Open GitHub repository for ${project.title}`}
        >
          GitHub Repository
        </a>
        <MagneticButton
          as="a"
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open live demo or case study for ${project.title}`}
          className="inline-flex items-center justify-center rounded-full bg-indigo-500/90 px-4 py-1.5 text-indigo-50 shadow-sm transition hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          Live Demo / Case Study
        </MagneticButton>
      </div>
    </motion.article>
  )
}
