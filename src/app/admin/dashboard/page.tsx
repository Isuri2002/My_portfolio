"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  fadeInUp,
  fadeIn,
  slideInLeft,
  slideInRight,
  staggerContainer,
} from "@/utils/animations";

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
}

interface Skill {
  _id: string;
  name: string;
  category: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"projects" | "skills">("projects");

  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: "",
  });

  const [newSkill, setNewSkill] = useState({
    name: "",
    category: "",
  });

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // redirect if not logged in
  useEffect(() => {
    if (!token) {
      window.location.href = "/admin/login";
    }
  }, [token]);

  // fetch data
  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`);
      setProjects(await res.json());
    };
    const fetchSkills = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills`);
      setSkills(await res.json());
    };
    fetchProjects();
    fetchSkills();
  }, []);

  // PROJECT CRUD
  const addProject = async () => {
    if (!token) return;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...newProject,
        technologies: newProject.technologies.split(",").map((t) => t.trim()),
      }),
    });
    const data = await res.json();
    setProjects([...projects, data]);
    setNewProject({ title: "", description: "", technologies: "" });
  };

  const deleteProject = async (id: string) => {
    if (!token) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setProjects(projects.filter((p) => p._id !== id));
  };

  const updateProject = async () => {
    if (!token || !editingProject) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${editingProject._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingProject),
      }
    );
    const data = await res.json();
    setProjects(
      projects.map((p) => (p._id === data._id ? { ...p, ...data } : p))
    );
    setEditingProject(null);
  };

  // SKILL CRUD
  const addSkill = async () => {
    if (!token) return;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newSkill),
    });
    const data = await res.json();
    setSkills([...skills, data]);
    setNewSkill({ name: "", category: "" });
  };

  const deleteSkill = async (id: string) => {
    if (!token) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setSkills(skills.filter((s) => s._id !== id));
  };

  const updateSkill = async () => {
    if (!token || !editingSkill) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/skills/${editingSkill._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingSkill),
      }
    );
    const data = await res.json();
    setSkills(skills.map((s) => (s._id === data._id ? { ...s, ...data } : s)));
    setEditingSkill(null);
  };

  return (
    <motion.div
      className="p-6 max-w-5xl mx-auto"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.h1 className="text-4xl font-bold mb-6 text-center" {...fadeInUp}>
        Admin Dashboard
      </motion.h1>

      {/* Tabs */}
      <motion.div className="flex gap-4 mb-8 justify-center" {...fadeInUp}>
        <button
          onClick={() => setActiveTab("projects")}
          className={`px-6 py-2 rounded-lg font-semibold shadow ${
            activeTab === "projects"
              ? "bg-primary text-white"
              : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          }`}
        >
          Projects
        </button>
        <button
          onClick={() => setActiveTab("skills")}
          className={`px-6 py-2 rounded-lg font-semibold shadow ${
            activeTab === "skills"
              ? "bg-primary text-white"
              : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          }`}
        >
          Skills
        </button>
      </motion.div>

      {/* PROJECTS TAB */}
      {activeTab === "projects" && (
        <motion.div {...fadeInUp}>
          <h2 className="text-2xl font-semibold mb-4">Manage Projects</h2>
          <div className="bg-white dark:bg-dark/10 p-6 rounded-lg shadow-md mb-6">
            <input
              type="text"
              placeholder="Title"
              className="border p-2 w-full mb-2 rounded"
              value={newProject.title}
              onChange={(e) =>
                setNewProject({ ...newProject, title: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              className="border p-2 w-full mb-2 rounded"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Technologies (comma separated)"
              className="border p-2 w-full mb-2 rounded"
              value={newProject.technologies}
              onChange={(e) =>
                setNewProject({ ...newProject, technologies: e.target.value })
              }
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addProject}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Project
            </motion.button>
          </div>

          <ul className="space-y-4">
            {projects.map((p) => (
              <motion.li
                key={p._id}
                className="bg-white dark:bg-dark/50 border p-4 rounded-lg shadow-md flex justify-between items-center"
                {...fadeInUp}
              >
                {editingProject?._id === p._id ? (
                  <div className="flex-1 mr-4">
                    <input
                      className="border p-2 w-full mb-2 rounded"
                      value={editingProject.title}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          title: e.target.value,
                        })
                      }
                    />
                    <textarea
                      className="border p-2 w-full mb-2 rounded"
                      value={editingProject.description}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          description: e.target.value,
                        })
                      }
                    />
                    <input
                      className="border p-2 w-full mb-2 rounded"
                      value={editingProject.technologies.join(", ")}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          technologies: e.target.value.split(","),
                        })
                      }
                    />
                    <button
                      onClick={updateProject}
                      className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingProject(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <div>
                      <h3 className="font-bold text-lg">{p.title}</h3>
                      <p className="text-secondary">{p.description}</p>
                      <p className="text-sm text-gray-500">
                        {p.technologies?.join(", ")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingProject(p)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProject(p._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* SKILLS TAB */}
      {activeTab === "skills" && (
        <motion.div {...fadeInUp}>
          <h2 className="text-2xl font-semibold mb-4">Manage Skills</h2>
          <div className="bg-white dark:bg-dark/10 p-6 rounded-lg shadow-md mb-6">
            <input
              type="text"
              placeholder="Skill Name"
              className="border p-2 w-full mb-2 rounded"
              value={newSkill.name}
              onChange={(e) =>
                setNewSkill({ ...newSkill, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Category"
              className="border p-2 w-full mb-2 rounded"
              value={newSkill.category}
              onChange={(e) =>
                setNewSkill({ ...newSkill, category: e.target.value })
              }
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addSkill}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Skill
            </motion.button>
          </div>

          <ul className="space-y-4">
            {skills.map((s) => (
              <motion.li
                key={s._id}
                className="bg-white dark:bg-dark/50 border p-4 rounded-lg shadow-md flex justify-between items-center"
                {...fadeInUp}
              >
                {editingSkill?._id === s._id ? (
                  <div className="flex-1 mr-4">
                    <input
                      className="border p-2 w-full mb-2 rounded"
                      value={editingSkill.name}
                      onChange={(e) =>
                        setEditingSkill({
                          ...editingSkill,
                          name: e.target.value,
                        })
                      }
                    />
                    <input
                      className="border p-2 w-full mb-2 rounded"
                      value={editingSkill.category}
                      onChange={(e) =>
                        setEditingSkill({
                          ...editingSkill,
                          category: e.target.value,
                        })
                      }
                    />
                    <button
                      onClick={updateSkill}
                      className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingSkill(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <div>
                      <h3 className="font-bold text-lg">{s.name}</h3>
                      <p className="text-sm text-secondary">{s.category}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingSkill(s)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteSkill(s._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
}
