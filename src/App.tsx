import React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import Layout from "./components/Layout"
import ProjectDetail from "./components/projects/ProjectDetails"

import "./index.css"

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route
          path="/project/:slug"
          element={<ProjectDetail />}
        />
      </Routes>
    </Router>
  )
}

export default App
