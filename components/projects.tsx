"use client"

import { SystemModule } from "./system-module"

const projects = [
  {
    id: "SYS_001",
    title: "STARK",
    subtitle: "Local-first AI document assistant",
    tags: ["RAG", "Local-First", "Python", "Privacy"],
    description:
      "Local-first AI assistant for querying documents with citations. Works entirely on local files. Emphasis on privacy and traceable answers—every response shows its sources.",
    details: [
      { label: "ARCHITECTURE", value: "Local RAG" },
      { label: "CORE_FEATURE", value: "Citations" },
      { label: "PRIVACY", value: "On-device" },
      { label: "USE_CASE", value: "Document analysis" },
    ],
  },
  {
    id: "SYS_002",
    title: "Draft",
    subtitle: "RFP automation system",
    tags: ["RFP", "Automation", "Retrieval", "Workflow"],
    description:
      "Automates repetitive RFP responses using structured prompts and retrieval. Generates and structures responses from past proposals. Reduces manual drafting and repetition.",
    details: [
      { label: "PROBLEM", value: "Manual RFP writing" },
      { label: "SOLUTION", value: "AI + retrieval" },
      { label: "BENEFIT", value: "Faster workflows" },
      { label: "APPROACH", value: "Structured output" },
    ],
  },
  {
    id: "SYS_003",
    title: "CoderStein Events Platform",
    subtitle: "Production event management system",
    tags: ["Production", "Events", "Full-Stack", "Real-Users"],
    description:
      "Real production system managing events, users, and registrations. Handles real-world usage with actual users and operations. Not a side project—this runs events.",
    details: [
      { label: "SCALE", value: "Production" },
      { label: "USERS", value: "Active" },
      { label: "OPERATIONS", value: "Real registrations" },
      { label: "FOCUS", value: "Reliability" },
    ],
  },
]

export function Projects() {
  return (
    <section className="px-6 py-24 md:px-12 lg:px-24">
      {/* Section header */}
      <div className="mb-16">
        <div className="font-mono text-xs text-muted-foreground mb-4 tracking-widest">
          <span className="text-accent">//</span> PROJECTS
        </div>
        <h2 className="text-4xl md:text-5xl font-light tracking-tight">
          What I've Built
        </h2>
        <div className="mt-4 w-24 h-px bg-accent" />
      </div>

      {/* Projects grid - asymmetric layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* First project - spans more columns */}
        <div className="lg:col-span-7">
          <SystemModule {...projects[0]} />
        </div>

        {/* Second project - offset right */}
        <div className="lg:col-span-5 lg:mt-24">
          <SystemModule {...projects[1]} />
        </div>

        {/* Third project - full width with different treatment */}
        <div className="lg:col-span-8 lg:col-start-3">
          <SystemModule {...projects[2]} />
        </div>
      </div>

      {/* Bottom metadata */}
      <div className="mt-16 flex items-center justify-between font-mono text-xs text-muted-foreground">
        <span>
          <span className="text-accent">02</span> / 03
        </span>
        <span>MORE_PROJECTS_AVAILABLE</span>
      </div>
    </section>
  )
}
