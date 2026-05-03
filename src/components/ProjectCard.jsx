import { motion, useReducedMotion } from "framer-motion";

import { MagneticButton } from "./MagneticButton";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: () => ({
    opacity: 1,
    y: 0,
    transition: {},
  }),
};

const MotionSection = motion.section;

export function ProjectCard({ project, index }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      className="project-card group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/80 p-4 shadow-xl backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-indigo-500/50 hover:bg-slate-800/90 hover:shadow-[0_10px_30px_rgba(99,102,241,0.2)]"
      custom={index}
      variants={cardVariants}
      draggable={false}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      <div className="relative z-10">
        <div
          className="mb-4 overflow-hidden rounded-xl border border-slate-700/50 bg-slate-950/50 shadow-inner p-2"
          style={{ aspectRatio: "16/9" }}
        >
          {project.animUrl ? (
            <img
              src={project.animUrl}
              alt={project.title}
              className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[11px] text-slate-500">
              Project visual placeholder
            </div>
          )}
        </div>

        <h3 className="text-base font-bold tracking-tight text-slate-100 line-clamp-1 transition-colors group-hover:text-indigo-300">
          {project.title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-400 line-clamp-2">
          {project.summary}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-slate-700/50 bg-slate-800/50 px-2 py-0.5 text-[10px] font-medium text-slate-300 transition-colors group-hover:border-indigo-500/30 group-hover:bg-indigo-500/10 group-hover:text-indigo-200"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="rounded-md border border-slate-700/50 bg-slate-800/50 px-2 py-0.5 text-[10px] font-medium text-slate-400">
              +{project.tech.length - 3}
            </span>
          )}
        </div>
      </div>

      <div className="relative z-10 mt-4 flex flex-wrap gap-2 text-[11px] font-semibold w-full">
        {project.githubUrl !== "#" && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center rounded-lg border border-slate-600 bg-slate-800/80 px-2 py-2 text-slate-200 transition-all hover:border-indigo-400 hover:bg-slate-700 hover:text-indigo-100"
            aria-label={`Open GitHub repository for ${project.title}`}
          >
            GitHub
          </a>
        )}
        {project.liveUrl !== "#" && (
          <MagneticButton
            as="a"
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open live demo or case study for ${project.title}`}
            className="flex-1 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-2 py-2 text-white shadow-md shadow-indigo-500/20 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40"
          >
            Live Demo
          </MagneticButton>
        )}
        {project.githubUrl === "#" && project.liveUrl === "#" && (
          <span className="flex-1 inline-flex items-center justify-center rounded-lg border border-slate-700/50 bg-slate-800/30 px-3 py-2 text-slate-500 italic">Coming soon</span>
        )}
      </div>
    </motion.article>
  );
}
