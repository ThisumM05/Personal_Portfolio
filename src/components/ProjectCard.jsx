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
      className="project-card card-surface group flex flex-col justify-between rounded-xl p-3 h-full focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-400 focus-within:ring-offset-2 focus-within:ring-offset-slate-950"
      custom={index}
      variants={cardVariants}
      draggable={false}
    >
      <div>
        <div
          className="mb-3 overflow-hidden rounded-lg border border-slate-800/80 bg-slate-900/70"
          style={{ aspectRatio: "16/9" }}
        >
          {project.animUrl ? (
            <img
              src={project.animUrl}
              alt={project.title}
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[11px] text-slate-500">
              Project visual placeholder
            </div>
          )}
        </div>

        <h3 className="text-sm font-semibold tracking-tight text-slate-50 line-clamp-1">
          {project.title}
        </h3>
        <p className="mt-1.5 text-[11px] leading-relaxed text-slate-300 line-clamp-2">
          {project.summary}
        </p>

        <div className="mt-2.5 flex flex-wrap gap-1">
          {project.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="pill-badge !px-1.5 !py-0.5 !text-[9px] !tracking-normal transition-colors group-hover:border-indigo-400 group-hover:bg-indigo-500/10 group-hover:text-indigo-100"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="pill-badge !px-1.5 !py-0.5 !text-[9px] !tracking-normal text-slate-400">
              +{project.tech.length - 3}
            </span>
          )}
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] font-medium">
        {project.githubUrl !== "#" && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-900/60 px-3 py-1 text-slate-100 transition hover:border-indigo-400 hover:text-indigo-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
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
            className="inline-flex items-center justify-center rounded-full bg-indigo-500/90 px-3 py-1 text-indigo-50 shadow-sm transition hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Live Demo
          </MagneticButton>
        )}
        {project.githubUrl === "#" && project.liveUrl === "#" && (
          <span className="text-[10px] text-slate-500 italic">Coming soon</span>
        )}
      </div>
    </motion.article>
  );
}
