"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "./language-provider"
import { LanguageSwitcher } from "./language-switcher"
import { ThemeToggle } from "./theme-toggle"

const translations = {
  session: {
    en: "ACTIVE_SESSION",
    "pt-PT": "SESSÃO_ATIVA",
    es: "SESIÓN_ACTIVA",
  },
  role: {
    en: "AI Systems Architect & Fullstack Engineer",
    "pt-PT": "Arquiteto de Sistemas de IA & Engenheiro Fullstack",
    es: "Arquitecto de Sistemas de IA e Ingeniero Fullstack",
  },
  description: {
    en: "I architect production grade RAG systems and LLM workflows with a focus on observability, deterministic grounding, and privacy first implementation.",
    "pt-PT":
      "Desenho arquiteturas de RAG e workflows de LLM para produção, com foco em observabilidade, respostas determinísticas e implementação de privacidade.",
    es: "Diseño arquitecturas de RAG y flujos de LLM para producción, con enfoque en observabilidad, respuestas deterministas e implementación de privacidad.",
  },
  building: {
    en: "ORCHESTRATING",
    "pt-PT": "ORQUESTRANDO",
    es: "ORQUESTANDO",
  },
  experience: {
    en: "ECOSYSTEM",
    "pt-PT": "ECOSSISTEMA",
    es: "ECOSISTEMA",
  },
  focus: {
    en: "CORE_PRINCIPLES",
    "pt-PT": "PRINCÍPIOS_BASE",
    es: "PRINCIPIOS_BASE",
  },
  buildingItems: {
    en: ["RAG Architectures", "LLM Workflows", "Production Platforms"],
    "pt-PT": ["Arquiteturas RAG", "Workflows de LLM", "Plataformas em Produção"],
    es: ["Arquitecturas RAG", "Flujos de LLM", "Plataformas en Producción"],
  },
  focusItems: {
    en: ["Traceable Answers", "Intuitive Design", "Maintainable Code"],
    "pt-PT": ["Respostas Rastreáveis", "Design Intuitivo", "Código Sustentável"],
    es: ["Respuestas Trazables", "Diseño Intuitivo", "Código Mantenible"],
  },
  scroll: {
    en: "EXPLORE_SYSTEM",
    "pt-PT": "EXPLORAR_SISTEMA",
    es: "EXPLORAR_SISTEMA",
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
