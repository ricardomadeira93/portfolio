"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "./language-provider"

const links = [
  { label: "GitHub", href: "https://github.com/ricardomadeira93/", id: "01" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ricardo-madeira-8ab393280/", id: "02" },
  { label: "Email", href: "mailto:madeiragpersonal@gmail.com", id: "03" },
]

const translations = {
  sectionLabel: {
    en: "INITIATE_CONTACT",
    "pt-PT": "INICIAR_CONTACTO",
    es: "INICIAR_CONTACTO",
  },
  title: {
    en: "Let's work\ntogether.",
    "pt-PT": "Vamos trabalhar\njuntos.",
    es: "Trabajemos\njuntos.",
  },
  externalLinks: {
    en: "EXTERNAL_LINKS",
    "pt-PT": "LINKS_EXTERNOS",
    es: "ENLACES_EXTERNOS",
  },
  open: {
    en: "OPEN →",
    "pt-PT": "ABRIR →",
    es: "ABRIR →",
  },
  builtWithClarity: {
    en: "2024 Ricardo Madeira. Built with clarity.",
    "pt-PT": "2024 Ricardo Madeira. Construído com clareza.",
    es: "2024 Ricardo Madeira. Construido con claridad.",
  },
  systemActive: {
    en: "SYSTEM_ACTIVE",
    "pt-PT": "SISTEMA_ACTIVO",
    es: "SISTEMA_ACTIVO",
  },
}

export function Footer() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const { language } = useLanguage()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const t = translations
  const titleLines = t.title[language].split("\n")

  return (
    <footer ref={ref} className="border-t border-border px-4 py-20 sm:px-6 md:px-12 md:py-24 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - CTA */}
          <div>
            <div 
              className={cn(
                "font-mono text-xs text-muted-foreground mb-6 tracking-widest",
                isVisible ? "animate-offset-slide" : "opacity-0"
              )}
            >
              <span className="text-accent">//</span> {t.sectionLabel[language]}
            </div>
            <h2 
              className={cn(
                "text-3xl font-light leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl",
                isVisible ? "animate-mask-reveal delay-100" : "opacity-0"
              )}
              style={{ clipPath: isVisible ? undefined : "inset(0 100% 0 0)" }}
            >
              {titleLines[0]}
              <br />
              <span className="text-accent">{titleLines[1]}</span>
            </h2>
          </div>

          {/* Right - Links */}
          <div className="flex flex-col justify-end">
            <div 
              className={cn(
                "font-mono text-xs text-muted-foreground mb-6 tracking-widest",
                isVisible ? "animate-offset-slide delay-200" : "opacity-0"
              )}
            >
              {t.externalLinks[language]}
            </div>
            <nav className="flex flex-col gap-4">
              {links.map((link, i) => (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className={cn(
                    "group relative flex flex-col items-start gap-2 border-b border-border py-4 transition-colors duration-300 sm:flex-row sm:items-center sm:justify-between",
                    hoveredLink === link.id && "border-accent",
                    isVisible ? "animate-offset-slide" : "opacity-0"
                  )}
                  style={{ animationDelay: `${300 + i * 100}ms` }}
                  onMouseEnter={() => setHoveredLink(link.id)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <span className="flex items-center gap-3 sm:gap-4">
                    <span className="font-mono text-xs text-muted-foreground">
                      {link.id}
                    </span>
                    <span className="text-xl font-light tracking-wide group-hover:text-accent transition-colors">
                      {link.label}
                    </span>
                  </span>
                  <span 
                    className={cn(
                      "font-mono text-xs text-muted-foreground transition-all duration-300",
                      "opacity-100 sm:-translate-x-2 sm:opacity-0",
                      hoveredLink === link.id && "sm:translate-x-0 sm:opacity-100"
                    )}
                  >
                    {t.open[language]}
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div 
          className={cn(
            "mt-24 pt-8 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4",
            isVisible ? "animate-offset-slide delay-600" : "opacity-0"
          )}
        >
          <div className="font-mono text-xs text-muted-foreground">
            <span className="text-accent">©</span> {t.builtWithClarity[language]}
          </div>
          <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-muted-foreground sm:gap-6">
            <span>
              <span className="text-accent">03</span> / 03
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-accent animate-pulse" />
              {t.systemActive[language]}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
