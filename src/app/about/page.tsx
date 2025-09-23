'use client'

import { motion } from 'framer-motion'
import { fadeInUp, fadeInDown } from '@/utils/animations'

export default function About() {
  return (
    <div className="container max-w-7xl mx-auto py-12">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center"
        {...fadeInDown}
      >
        About Me
      </motion.h1>
      
      {/* Bio Section */}
      <motion.section 
        className="mb-16"
        {...fadeInUp}
      >
        <p className="text-lg text-secondary max-w-3xl mx-auto text-center">
          I&apos;m a self-motivated and enthusiastic learner passionate about software engineering, aiming to 
          build a successful career in the IT industry. Committed to developing strong technical skills, a 
          growth mindset, and a professional attitude to become a well rounded IT professional.
        </p>
      </motion.section>

      {/* Education Section */}
      <motion.section
        {...fadeInUp}
        transition={{ delay: 0.4 }}
      >
        <motion.h2 
          className="section-title"
          {...fadeInUp}
        >
          Education
        </motion.h2>
        <motion.div 
          className="max-w-3xl mx-auto"
        >
          <motion.div 
            className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md mb-6"
            {...fadeInUp}
          >
            <h3 className="text-xl font-semibold mb-2">
              Underraduate of Bachelor of Science in Informaation technology
            </h3>
            <p className="text-primary mb-2">University of Moratuwa • 2023 - 2027</p>
            <p className="text-secondary">
              Graduate with honors. Focused on software engineering and web development.
            </p>
          </motion.div>
          <motion.div 
            className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md mb-6"
            {...fadeInUp}
          >
            <h3 className="text-xl font-semibold mb-2">
              G.C.E. Advanced Level
            </h3>
            <p className="text-primary mb-2">Taxila Central College, Horana • 2021 - 2022</p>
            <p className="text-secondary">
              Completed with AAC for Physics, Chemistry and Combined Mathematics along with z-score of 1.69. 
            </p>
          </motion.div>
          
        </motion.div>
      </motion.section>
    </div>
  )
}
