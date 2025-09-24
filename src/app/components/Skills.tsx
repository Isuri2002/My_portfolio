'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaCode, FaLaptopCode, FaDatabase, FaMicrochip, FaGraduationCap } from 'react-icons/fa'
import { fadeInUp, staggerContainer, cardHover } from '@/utils/animations'

interface Skill {
  _id: string
  name: string
  category: string
}

// Icon mapping (extendable)
const categoryIcons: Record<string, React.ReactNode> = {
  Frontend: <FaCode className="h-8 w-8 text-primary mb-4" />,
  Backend: <FaLaptopCode className="h-8 w-8 text-primary mb-4" />,
  Database: <FaDatabase className="h-8 w-8 text-primary mb-4" />,
  "Programming Languages": <FaCode className="h-8 w-8 text-primary mb-4" />,
  "Hardware & IoT": <FaMicrochip className="h-8 w-8 text-primary mb-4" />,
  Tools: <FaGraduationCap className="h-8 w-8 text-primary mb-4" />
}


export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([])

  useEffect(() => {
    fetch("/api/skills")
      .then(res => res.json())
      .then(data => setSkills(data))
      .catch(err => console.error("Error fetching skills:", err))
  }, [])

  // Group dynamically by category
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {})

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
        {Object.keys(grouped).map((category, idx) => (
          <motion.div
            key={idx}
            className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md"
            variants={fadeInUp}
            {...cardHover}
          >
            {categoryIcons[category] ?? <FaGraduationCap className="h-8 w-8 text-primary mb-4" />}
            <h3 className="text-xl font-semibold mb-4">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {grouped[category].map(skill => (
                <span
                  key={skill._id}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
