import React from "react"

const ProjectCardSkeleton: React.FC = () => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md animate-pulse">
      <div className="w-full h-48 bg-gray-300" />
      <div className="p-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full mb-4" />
        <div className="h-6 bg-gray-300 mb-2 w-3/4" />
        <div className="h-4 bg-gray-300 mb-2 w-5/6" />
        <div className="flex flex-wrap">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-300 py-1 px-2 rounded-full text-sm mr-2 mb-2 w-20"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectCardSkeleton
