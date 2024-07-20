import React from "react"
import { useParams, Link } from "react-router-dom"
import { projects } from "../../data/projectsData"

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>() // Extract the slug from the URL
  const project = projects.find(
    (p) => p.slug === slug
  ) // Find the project by slug

  if (!project) {
    return <div>Project not found</div> // Display a message if project is not found
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">
        {project.name}
      </h1>
      <p className="text-lg mt-2">
        {project.description}
      </p>
      {/* Add more details or styling as needed */}
      <Link
        to="/"
        className="text-blue-500 mt-4 block"
      >
        Back to Projects
      </Link>
    </div>
  )
}

export default ProjectDetail
