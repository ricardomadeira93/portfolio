"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "./language-provider"

const translations = {
  role: {
    en: "Full Stack Developer",
    "pt-PT": "Full Stack Developer",
    es: "Full Stack Developer",
  },
  location: {
    en: "Portugal, remote",
    "pt-PT": "Portugal, remoto",
    es: "Portugal, remoto",
  },
  description: {
    en: "Full stack developer with four years building web applications that run in production. React, Next.js and TypeScript on the front end; Python, FastAPI and .NET on the back end. I have delivered RAG pipelines and LLM features, a geospatial portal for the public administration, and payment and back-office systems.",
    "pt-PT":
      "Full stack developer com quatro anos a construir aplicações web em produção. React, Next.js e TypeScript no frontend; Python, FastAPI e .NET no backend. Entreguei pipelines RAG e funcionalidades de LLM, um portal geoespacial para a administração pública e sistemas de pagamentos e backoffice.",
    es: "Full stack developer con cuatro años construyendo aplicaciones web en producción. React, Next.js y TypeScript en el frontend; Python, FastAPI y .NET en el backend. He entregado pipelines RAG y funcionalidades de LLM, un portal geoespacial para la administración pública y sistemas de pagos y backoffice.",
  },
  workTitle: {
    en: "Where I've worked",
    "pt-PT": "Onde trabalhei",
    es: "Dónde he trabajado",
  },
  seeWork: {
    en: "See the work",
    "pt-PT": "Ver os projetos",
    es: "Ver los proyectos",
  },
}

const employers = ["Winning", "Betacode", "CoderStein"]

const columns = [
  {
    label: { en: "Domains", "pt-PT": "Áreas", es: "Áreas" },
    items: {
      en: ["RAG and LLM features", "Geospatial portals (GIS)", "Payments and back offices"],
      "pt-PT": ["RAG e funcionalidades de LLM", "Portais geoespaciais (GIS)", "Pagamentos e backoffices"],
      es: ["RAG y funcionalidades de LLM", "Portales geoespaciales (GIS)", "Pagos y backoffices"],
    },
  },
  {
    label: { en: "Experience", "pt-PT": "Experiência", es: "Experiencia" },
    items: { en: employers, "pt-PT": employers, es: employers },
  },
  {
    label: { en: "Stack", "pt-PT": "Stack", es: "Stack" },
    items: {
      en: ["React, Next.js, TypeScript", "Python, FastAPI, .NET", "PostgreSQL, SQL Server"],
      "pt-PT": ["React, Next.js, TypeScript", "Python, FastAPI, .NET", "PostgreSQL, SQL Server"],
      es: ["React, Next.js, TypeScript", "Python, FastAPI, .NET", "PostgreSQL, SQL Server"],
    },
  },
] as const

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const { language } = useLanguage()
  const t = translations

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative flex min-h-[calc(100svh-3.5rem)] flex-col justify-center overflow-x-clip px-4 py-6 sm:px-6 sm:py-8 md:px-12 lg:px-24">
      <div className="flex flex-1 flex-col justify-center py-16 sm:py-20 md:py-24">
        <div className="max-w-4xl">
          <h1
            className={`text-5xl font-semibold leading-tight tracking-tight sm:text-6xl md:text-8xl ${
              mounted ? "animate-mask-reveal delay-300" : "opacity-0"
            }`}
            style={{ clipPath: mounted ? undefined : "inset(0 100% 0 0)" }}
          >
            Ricardo
          </h1>
          <div
            className={`relative mt-4 inline-block max-w-full ${
              mounted ? "animate-offset-slide delay-500" : "opacity-0"
            }`}
          >
            <div className="border border-border bg-surface px-4 py-3 sm:px-6">
              <span className="block text-lg font-light tracking-wide sm:text-xl md:text-2xl">
                {t.role[language]}
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 -z-10 h-full w-full border border-accent/30" />
          </div>
          <p
            className={`mt-4 text-base text-muted-foreground ${
              mounted ? "animate-offset-slide delay-500" : "opacity-0"
            }`}
          >
            {t.location[language]}
          </p>

          <p
            className={`mt-10 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg ${
              mounted ? "animate-offset-slide delay-600" : "opacity-0"
            }`}
          >
            {t.description[language]}
          </p>

          <a
            href="#projects"
            className={`mt-8 inline-block border border-foreground px-5 py-2.5 text-base text-foreground transition-colors duration-300 hover:border-accent hover:text-accent ${
              mounted ? "animate-offset-slide delay-600" : "opacity-0"
            }`}
          >
            {t.seeWork[language]}
          </a>

          <div
            className={`mt-14 grid max-w-2xl grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-3 ${
              mounted ? "animate-offset-slide delay-700" : "opacity-0"
            }`}
          >
            {columns.map((column) => (
              <div key={column.label.en}>
                <div className="mb-2 font-mono text-[10px] tracking-widest text-accent">
                  {column.label[language]}
                </div>
                <ul className="space-y-1">
                  {column.items[language].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 font-mono text-xs text-muted-foreground"
                    >
                      <span className="text-accent/60">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
