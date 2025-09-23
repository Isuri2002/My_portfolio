'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaCode, FaLaptopCode, FaGraduationCap } from 'react-icons/fa'
import { fadeInUp, staggerContainer, cardHover } from '@/utils/animations'

interface Skill {
  _id: string
  name: string
  category: "Frontend" | "Backend" | "Tools"
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills`)
      .then(res => res.json())
      .then(data => setSkills(data))
      .catch(err => console.error("Error fetching skills:", err))
  }, [])

  const grouped = {
    Frontend: skills.filter(s => s.category === "Frontend"),
    Backend: skills.filter(s => s.category === "Backend"),
    Tools: skills.filter(s => s.category === "Tools"),
  }

  return (
    <div className="container max-w-7xl mx-auto py-12">
      <motion.h1 className="text-4xl font-bold mb-8 text-center" {...fadeInUp}>
        Skills
      </motion.h1>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Frontend */}
        <motion.div className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md" variants={fadeInUp} {...cardHover}>
          <FaCode className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-4">Frontend</h3>
          <div className="flex flex-wrap gap-2">
            {grouped.Frontend.map(skill => (
              <span key={skill._id} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                {skill.name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Backend */}
        <motion.div className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md" variants={fadeInUp} {...cardHover}>
          <FaLaptopCode className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-4">Backend</h3>
          <div className="flex flex-wrap gap-2">
            {grouped.Backend.map(skill => (
              <span key={skill._id} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                {skill.name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Tools */}
        <motion.div className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md" variants={fadeInUp} {...cardHover}>
          <FaGraduationCap className="h-8 w-8 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-4">Tools & Others</h3>
          <div className="flex flex-wrap gap-2">
            {grouped.Tools.map(skill => (
              <span key={skill._id} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                {skill.name}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
