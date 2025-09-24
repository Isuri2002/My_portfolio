export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  githubLink: string
  demoLink: string
  image: string
}

export interface Skill {
  id: string
  name: string
  category: string // e.g. "Frontend", "Backend", "Database"
}
