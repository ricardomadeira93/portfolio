import React from "react"
import Projects from "./projects/Projects"
import Hero from "./Hero"
import Header from "./Header"

const Layout: React.FC = () => {
  return (
    <>
      <div className="">
        <div className="container mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 py-6">
          <Header />
          <Hero />
          <Projects />
        </div>
      </div>
    </>
  )
}

export default Layout
