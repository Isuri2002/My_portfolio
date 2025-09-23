"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCode, FaLaptopCode, FaGraduationCap } from "react-icons/fa";
import { fadeInUp, staggerContainer, cardHover } from "@/utils/animations";

interface Skill {
  _id: string;
  name: string;
  category: string;
  icon?: string;
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills`)
      .then((res) => res.json())
      .then((data) => {
        console.log("API response:", data); // ✅ Debugging
        // Ensure we always get an array
        if (Array.isArray(data)) {
          setSkills(data);
        } else if (data && Array.isArray(data.skills)) {
          setSkills(data.skills);
        } else {
          setSkills([]); // fallback if API sends something unexpected
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching skills:", err);
        setSkills([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center py-12">Loading skills...</p>;
  }

  // Group skills safely
  const categories = (Array.isArray(skills) ? skills : []).reduce<
    Record<string, Skill[]>
  >((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  // Default icons per category
  const categoryIcons: Record<string, React.ReactNode> = {
    Frontend: <FaCode className="h-8 w-8 text-primary mb-4" />,
    Backend: <FaLaptopCode className="h-8 w-8 text-primary mb-4" />,
    Tools: <FaGraduationCap className="h-8 w-8 text-primary mb-4" />,
  };

  return (
    <div className="container max-w-7xl mx-auto py-12">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        {...fadeInUp}
      >
        Skills
      </motion.h1>

      {Object.keys(categories).length === 0 ? (
        <p className="text-center text-gray-500">No skills found.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {Object.keys(categories).map((category) => (
            <motion.div
              key={category}
              className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md"
              variants={fadeInUp}
              {...cardHover}
            >
              {/* Category Icon */}
              {categoryIcons[category] ?? (
                <FaGraduationCap className="h-8 w-8 text-primary mb-4" />
              )}

              {/* Category Title */}
              <h3 className="text-xl font-semibold mb-4">{category}</h3>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {categories[category].map((skill) => (
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
      )}
    </div>
  );
}
