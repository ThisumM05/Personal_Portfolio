import { motion } from "framer-motion";
import {
  FaJava,
  FaPython,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
} from "react-icons/fa";
import { SiDotnet, SiMysql, SiMongodb, SiGooglecloud, SiOracle } from "react-icons/si";
import { TbBrandCSharp, TbSql, TbBrandReactNative } from "react-icons/tb";
import { SectionHeader } from "./SectionHeader";

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const categories = [
  {
    name: "Backend & Languages",
    items: ["C#", ".NET 8", "Java", "Python"],
  },
  {
    name: "Frontend",
    items: ["React", "HTML", "CSS", "JavaFX", "React Native"],
  },
  {
    name: "Databases",
    items: ["MySQL", "SQL Server", "MongoDB", "Oracle"],
  },
  {
    name: "Tools & Cloud",
    items: ["Git", "GCP"],
  },
];

function SkillLogo({ name }) {
  const baseClass = 'text-xl shrink-0'

  switch (name) {
    case 'C#':        return <TbBrandCSharp  className={`${baseClass} text-purple-400`} />
    case '.NET 8':    return <SiDotnet       className={`${baseClass} text-violet-400`} />
    case 'Java':      return <FaJava         className={`${baseClass} text-orange-400`} />
    case 'Python':    return <FaPython       className={`${baseClass} text-yellow-400`} />
    case 'React':     return <FaReact           className={`${baseClass} text-cyan-400`} />
    case 'React Native':return <TbBrandReactNative className={`${baseClass} text-cyan-300`} />
    case 'HTML':      return <FaHtml5        className={`${baseClass} text-orange-500`} />
    case 'CSS':       return <FaCss3Alt      className={`${baseClass} text-blue-400`} />
    case 'JavaFX':    return <FaJava         className={`${baseClass} text-orange-300`} />
    case 'MySQL':     return <SiMysql        className={`${baseClass} text-sky-400`} />
    case 'SQL Server':return <TbSql          className={`${baseClass} text-red-400`} />
    case 'MongoDB':   return <SiMongodb      className={`${baseClass} text-green-500`} />
    case 'Oracle':    return <SiOracle       className={`${baseClass} text-red-500`} />
    case 'Git':       return <FaGitAlt       className={`${baseClass} text-orange-500`} />
    case 'GCP':       return <SiGooglecloud  className={`${baseClass} text-blue-400`} />
    default:
      return <span className="text-[10px] font-semibold text-slate-400">{name[0] || '?'}</span>
  }
}

export function Skills() {
  return (
    <motion.section
      variants={sectionVariants}
      className="flex flex-col gap-6"
      id="skills"
    >
      <SectionHeader
        eyebrow="Skills"
        title="Engineering stack"
        kicker="Balanced across backend, frontend, and data."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <motion.article
            key={category.name}
            whileHover={{ y: -3, scale: 1.01 }}
            className="card-surface rounded-2xl p-4 transition-transform"
          >
            <h3 className="text-sm font-semibold text-slate-50">
              {category.name}
            </h3>
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
  );
}
