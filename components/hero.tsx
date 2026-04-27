"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "./language-provider"
import { LanguageSwitcher } from "./language-switcher"
import { ThemeToggle } from "./theme-toggle"

const translations = {
  session: {
    en: "ACTIVE_SESSION",
    "pt-PT": "SESSAO_ACTIVA",
    es: "SESION_ACTIVA",
  },
  role: {
    en: "Fullstack Developer & AI Engineer",
    "pt-PT": "Programador Fullstack & Engenheiro de IA",
    es: "Desarrollador Fullstack e Ingeniero de IA",
  },
  description: {
    en: "I build RAG systems and production AI applications. Focus on traceability, clean interfaces, and systems that actually work in practice.",
    "pt-PT":
      "Construo sistemas RAG e aplicações de IA em produção. Foco em rastreabilidade, interfaces limpas e sistemas que funcionam na prática.",
    es: "Construyo sistemas RAG y aplicaciones de IA en producción. Enfoque en trazabilidad, interfaces limpias y sistemas que funcionan en la práctica.",
  },
  building: {
    en: "BUILDING",
    "pt-PT": "A_CONSTRUIR",
    es: "CONSTRUYENDO",
  },
  experience: {
    en: "EXPERIENCE",
    "pt-PT": "EXPERIENCIA",
    es: "EXPERIENCIA",
  },
  focus: {
    en: "FOCUS",
    "pt-PT": "FOCO",
    es: "ENFOQUE",
  },
  buildingItems: {
    en: ["RAG systems", "AI workflows", "production web apps"],
    "pt-PT": ["sistemas RAG", "workflows de IA", "apps web em produção"],
    es: ["sistemas RAG", "flujos de IA", "apps web en producción"],
  },
  focusItems: {
    en: ["traceable answers", "clean interfaces", "maintainable systems"],
    "pt-PT": ["respostas rastreáveis", "interfaces limpas", "sistemas sustentáveis"],
    es: ["respuestas trazables", "interfaces limpias", "sistemas mantenibles"],
  },
  scroll: {
    en: "SCROLL_TO_EXPLORE",
    "pt-PT": "SCROLL_PARA_EXPLORAR",
    es: "SCROLL_PARA_EXPLORAR",
  },
}

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const { language } = useLanguage()

  useEffect(() => {
    setMounted(true)
  }, [])

  const t = translations

  return (
    <section className="relative flex min-h-screen flex-col justify-between overflow-x-clip px-4 py-6 sm:px-6 sm:py-8 md:px-12 lg:px-24">
      {/* Top metadata bar */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div 
          className={`font-mono text-xs text-muted-foreground tracking-wider uppercase ${
            mounted ? "animate-offset-slide" : "opacity-0"
          }`}
        >
          <span className="text-accent">//</span> Ricardo.Madeira
        </div>
        <div 
          className={`flex flex-wrap items-center gap-2 sm:justify-end sm:gap-3 md:gap-4 ${
            mounted ? "animate-offset-slide delay-100" : "opacity-0"
          }`}
        >
          <LanguageSwitcher />
          <ThemeToggle />
          <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
            v1.0.0
          </span>
        </div>
      </header>

      {/* Main title block */}
      <div className="flex flex-1 flex-col justify-center py-16 sm:py-20 md:py-24">
        <div className="max-w-4xl">
          {/* System identifier */}
          <div 
            className={`font-mono text-xs text-muted-foreground mb-6 tracking-widest ${
              mounted ? "animate-offset-slide delay-200" : "opacity-0"
            }`}
          >
            <span className="inline-block w-2 h-2 bg-accent mr-2" />
            {t.session[language]}
          </div>

          {/* Name - editorial typography */}
          <h1 
            className={`mb-6 text-5xl leading-none font-light tracking-tight sm:text-6xl md:mb-8 md:text-8xl lg:text-9xl ${
              mounted ? "animate-mask-reveal delay-300" : "opacity-0"
            }`}
            style={{ clipPath: mounted ? undefined : "inset(0 100% 0 0)" }}
          >
            Ricardo
          </h1>

          {/* Role with offset border treatment */}
          <div 
            className={`relative inline-block max-w-full ${
              mounted ? "animate-offset-slide delay-500" : "opacity-0"
            }`}
          >
            <div className="border border-border bg-surface px-4 py-3 sm:px-6">
              <span className="block text-lg font-light tracking-wide sm:text-xl md:text-2xl">
                {t.role[language]}
              </span>
            </div>
            {/* Offset shadow border */}
            <div className="absolute -bottom-1 -right-1 w-full h-full border border-accent/30 -z-10" />
          </div>

          {/* Descriptor text */}
          <p 
            className={`mt-10 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base ${
              mounted ? "animate-offset-slide delay-600" : "opacity-0"
            }`}
          >
            {t.description[language]}
          </p>

          {/* Proof layer — system metadata */}
          <div
            className={`mt-10 border-t border-border pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl ${
              mounted ? "animate-offset-slide delay-700" : "opacity-0"
            }`}
          >
            <div>
              <div className="font-mono text-[10px] text-accent tracking-widest mb-2">
                {t.building[language]}
              </div>
              <ul className="space-y-1">
                {t.buildingItems[language].map((item) => (
                  <li key={item} className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                    <span className="text-accent/60">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-mono text-[10px] text-accent tracking-widest mb-2">
                {t.experience[language]}
              </div>
              <ul className="space-y-1">
                {["Betacode", "CoderStein", "Forma Studio"].map((item) => (
                  <li key={item} className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                    <span className="text-accent/60">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-mono text-[10px] text-accent tracking-widest mb-2">
                {t.focus[language]}
              </div>
              <ul className="space-y-1">
                {t.focusItems[language].map((item) => (
                  <li key={item} className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                    <span className="text-accent/60">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom navigation hints */}
      <footer className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div 
          className={`font-mono text-xs text-muted-foreground ${
            mounted ? "animate-offset-slide delay-700" : "opacity-0"
          }`}
        >
          <span className="text-accent">01</span> / 03
        </div>
        <div 
          className={`flex items-center gap-2 font-mono text-[10px] text-muted-foreground sm:text-xs ${
            mounted ? "animate-offset-slide delay-800" : "opacity-0"
          }`}
        >
          <span>{t.scroll[language]}</span>
          <span className="inline-block w-4 h-px bg-accent animate-pulse-line" />
        </div>
      </footer>
    </section>
  )
}
