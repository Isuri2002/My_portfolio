export interface Project {
  _id?: string;  // MongoDB ObjectId
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  demoLink: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Skill {
  _id?: string;   // MongoDB ObjectId
  name: string;   // e.g. "React"
  category: string; // e.g. "Frontend"
  icon?: string;  // optional field for icons/logos
  createdAt?: string;
  updatedAt?: string;
}
