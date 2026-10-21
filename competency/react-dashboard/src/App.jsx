
import { useState } from "react";
import "./App.css";

function Header() {
  return (
    <header className="header">
      <h1>My Project Dashboard</h1>
      <p>Organize your projects and track your progress.</p>
    </header>
  );
}

function ProjectCard({ project, onToggle, onDelete }) {
  return (
    <div className="project-card">
      <div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
        <span className={project.completed ? "done" : "active"}>
          {project.completed ? "Completed" : "In Progress"}
        </span>
      </div>

      <div className="actions">
        <button onClick={() => onToggle(project.id)}>
          {project.completed ? "Reopen" : "Complete"}
        </button>
        <button
          className="delete"
          onClick={() => onDelete(project.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function AddProject({ onAdd }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim()) return;

    onAdd({
      id: crypto.randomUUID(),
      name: name.trim(),
      description: description.trim(),
      completed: false
    });

    setName("");
    setDescription("");
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <h2>Add a Project</h2>

      <input
        type="text"
        placeholder="Project name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Add Project</button>
    </form>
  );
}

export default function App() {
  const [projects, setProjects] = useState([
    {
      id: "1",
      name: "Learn React Basics",
      description: "Practice components and state",
      completed: true
    },
    {
      id: "2",
      name: "Build a Portfolio",
      description: "Create a personal website",
      completed: false
    },
    {
      id: "3",
      name: "Learn TypeScript",
      description: "Understand types and interfaces",
      completed: false
    }
  ]);

  const [filter, setFilter] = useState("all");

  function addProject(project) {
    setProjects(prev => [...prev, project]);
  }

  function toggleProject(id) {
    setProjects(prev =>
      prev.map(project =>
        project.id === id
          ? { ...project, completed: !project.completed }
          : project
      )
    );
  }

  function deleteProject(id) {
    setProjects(prev =>
      prev.filter(project => project.id !== id)
    );
  }

  const completed = projects.filter(p => p.completed).length;

  const visibleProjects = projects.filter(project => {
    if (filter === "completed") return project.completed;
    if (filter === "active") return !project.completed;
    return true;
  });

  return (
    <main className="container">
      <Header />

      <section className="stats">
        <div>
          <h2>{projects.length}</h2>
          <p>Total Projects</p>
        </div>
        <div>
          <h2>{completed}</h2>
          <p>Completed</p>
        </div>
        <div>
          <h2>{projects.length - completed}</h2>
          <p>In Progress</p>
        </div>
      </section>

      <AddProject onAdd={addProject} />

      <section>
        <h2>Your Projects</h2>

        <div className="filters">
          {["all", "active", "completed"].map(option => (
            <button
              key={option}
              className={filter === option ? "selected" : ""}
              onClick={() => setFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>

        {visibleProjects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          visibleProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onToggle={toggleProject}
              onDelete={deleteProject}
            />
          ))
        )}
      </section>
    </main>
  );
}
