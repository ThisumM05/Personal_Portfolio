import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

import { SectionHeader } from './SectionHeader'
import { projects } from '../data/projects'
import { ProjectCard } from './ProjectCard'

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] },
  },
}

export function Projects() {
  return (
    <motion.section
      variants={sectionVariants}
      id="projects"
      className="flex flex-col gap-6"
      aria-label="Featured projects"
    >
      <SectionHeader
        eyebrow="Projects"
        title="Selected work"
        kicker="Systems-focused projects with clear responsibilities and clean architecture."
      />

      <div className="mt-2">
        <Swiper
          spaceBetween={16}
          slidesPerView={1.1}
          loop
          speed={1600}
          modules={[Autoplay]}
          autoplay={{ delay: 1200, disableOnInteraction: false }}
          centeredSlides
          aria-label="Projects carousel"
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2.7 },
          }}
        >
          {projects.map((project, index) => (
            <SwiperSlide key={project.slug}>
              <ProjectCard project={project} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </motion.section>
  )
}
