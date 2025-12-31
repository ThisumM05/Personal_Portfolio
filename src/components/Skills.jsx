import { motion } from 'framer-motion'
import { FaJava, FaPython, FaReact, FaHtml5, FaCss3Alt, FaGitAlt } from 'react-icons/fa'
import { SectionHeader } from './SectionHeader'

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const categories = [
  {
    name: 'Backend & Languages',
    items: ['C#', '.NET 8', 'Java', 'Python'],
  },
  {
    name: 'Frontend',
    items: ['React', 'HTML', 'CSS', 'JavaFX'],
  },
  {
    name: 'Databases',
    items: ['MySQL', 'SQL Server'],
  },
  {
    name: 'Tools & Cloud',
    items: ['Git', 'AWS', 'GCP'],
  },
]

function SkillLogo({ name }) {
  const baseClass =
    'flex h-6 w-6 items-center justify-center rounded-md text-[13px] text-slate-50 bg-slate-800/80'

  switch (name) {
    case 'Java':
      return (
        <div className={`${baseClass} bg-orange-500`}>
          <FaJava />
        </div>
      )
    case 'Python':
      return (
        <div className={`${baseClass} bg-yellow-500`}>
          <FaPython />
        </div>
      )
    case 'React':
      return (
        <div className={`${baseClass} bg-cyan-500`}>
          <FaReact />
        </div>
      )
    case 'HTML':
      return (
        <div className={`${baseClass} bg-orange-400`}>
          <FaHtml5 />
        </div>
      )
    case 'CSS':
      return (
        <div className={`${baseClass} bg-blue-500`}>
          <FaCss3Alt />
        </div>
      )
    case 'Git':
      return (
        <div className={`${baseClass} bg-orange-500`}>
          <FaGitAlt />
        </div>
      )
    default:
      return (
        <div className={baseClass}>
          <span className="text-[10px] font-semibold">{name[0] || '?'}</span>
        </div>
      )
  }
}

export function Skills() {
  return (
    <motion.section variants={sectionVariants} className="flex flex-col gap-6" id="skills">
      <SectionHeader eyebrow="Skills" title="Engineering stack" kicker="Balanced across backend, frontend, and data." />

      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <motion.article
            key={category.name}
            whileHover={{ y: -3, scale: 1.01 }}
            className="card-surface rounded-2xl p-4 transition-transform"
          >
            <h3 className="text-sm font-semibold text-slate-50">{category.name}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {category.items.map((item) => (
                <span key={item} className="pill-badge gap-2">
                  <SkillLogo name={item} />
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  )
}
