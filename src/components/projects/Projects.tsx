import React from "react"
import ProjectCard from "./ProjectCard"
import { projects } from "../../data/projectsData"

const Projects: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Projects</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            slug={project.slug}
            thumbnail={project.thumbnail}
            logo={project.logo}
            name={project.name}
            description={project.description}
            skills={project.skills}
          />
        ))}
      </div>
    </div>
  )
}

export default Projects
