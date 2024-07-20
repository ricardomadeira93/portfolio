export interface Project {
  id: string
  slug: string
  name: string
  description: string
  thumbnail: string
  logo: string
  skills: string[]
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "project-one",
    name: "Project One",
    description: "Details about Project One",
    thumbnail: "/path/to/thumbnail1.jpg", // Example path to thumbnail image
    logo: "/path/to/logo1.png", // Example path to logo image
    skills: [
      "React",
      "TypeScript",
      "Tailwind CSS",
    ], // Example skills
  },
  {
    id: "2",
    slug: "project-two",
    name: "Project Two",
    description: "Details about Project Two",
    thumbnail: "/path/to/thumbnail2.jpg", // Example path to thumbnail image
    logo: "/path/to/logo2.png", // Example path to logo image
    skills: ["Next.js", "JavaScript", "CSS"], // Example skills
  },
  // Add more projects here
]

export default projects
