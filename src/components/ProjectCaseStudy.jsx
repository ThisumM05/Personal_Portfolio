// Reusable case study layout for individual projects.
// This can be used in a routed page or modal when you expand a project.

export function ProjectCaseStudy({
  title,
  overview,
  problem,
  solution,
  architecture,
  features,
  screenshots,
  techStack,
  githubUrl,
}) {
  return (
    <article className="card-surface mx-auto max-w-4xl rounded-3xl p-6 md:p-8">
      <header className="flex flex-col gap-2 border-b border-slate-800 pb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-300">Case Study</p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">{title}</h1>
      </header>

      <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
        <div className="space-y-4 text-sm text-slate-300">
          {overview && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Overview</h2>
              <p className="mt-2 leading-relaxed">{overview}</p>
            </section>
          )}
          {problem && (
            <section className="mt-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Problem</h2>
              <p className="mt-2 leading-relaxed">{problem}</p>
            </section>
          )}
          {solution && (
            <section className="mt-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Solution</h2>
              <p className="mt-2 leading-relaxed">{solution}</p>
            </section>
          )}
          {architecture && (
            <section className="mt-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Architecture</h2>
              <p className="mt-2 leading-relaxed">{architecture}</p>
            </section>
          )}
        </div>

        <aside className="space-y-4 text-xs text-slate-300">
          {Array.isArray(features) && features.length > 0 && (
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                Key Features
              </h2>
              <ul className="mt-2 space-y-1.5">
                {features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="mt-[5px] h-[6px] w-[6px] flex-none rounded-full bg-indigo-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {Array.isArray(techStack) && techStack.length > 0 && (
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Tech Stack</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span key={tech} className="pill-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          )}

          {githubUrl && (
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Repository</h2>
              {/* Replace href with actual GitHub repository URL */}
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-900/60 px-4 py-1.5 text-xs font-medium text-slate-100 transition hover:border-indigo-400 hover:text-indigo-100"
              >
                View on GitHub
              </a>
            </section>
          )}
        </aside>
      </div>

      {Array.isArray(screenshots) && screenshots.length > 0 && (
        <section className="mt-8 border-t border-slate-800 pt-5">
          <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Screenshots</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {screenshots.map((src) => (
              <div
                key={src}
                className="card-surface relative h-40 overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/60"
              >
                {/* Replace this placeholder with actual <img> tags when screenshots are available */}
                <div className="flex h-full items-center justify-center text-[11px] text-slate-500">
                  Screenshot placeholder
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
