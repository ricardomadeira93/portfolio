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
    thumbnail:
      "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Example path to thumbnail image
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
