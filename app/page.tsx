import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { RAGDemo } from "@/components/rag-demo"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Projects />
      <RAGDemo />
      <Footer />
    </main>
  )
}
