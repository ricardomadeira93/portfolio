import React from "react"
import { Link } from "react-router-dom"
import { Project } from "../../data/projectsData"

const ProjectCard: React.FC<Project> = ({
  id,
  slug,
  thumbnail,
  name,
  description,
  skills,
}) => {
  return (
    <div className="relative group border rounded-lg overflow-hidden shadow-md">
      <img
        src={thumbnail}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
        <h3 className="text-xl font-bold mb-2">
          {name}
        </h3>
        <p className="text-center mb-2">
          {description}
        </p>
        <p className="text-center mb-2 text-sm italic">
          Card Description
        </p>
        <div className="flex flex-wrap justify-center">
          {skills.map((skill) => (
            <span
              key={skill}
              className="bg-gray-800 text-gray-300 py-1 px-2 rounded-full text-sm mr-2 mb-2"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <Link
        to={`/project/${slug}`}
        className="absolute inset-0"
        aria-label={`View details for ${name}`}
      ></Link>
    </div>
  )
}

export default ProjectCard
