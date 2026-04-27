"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "./language-provider"

const links = [
  { label: "GitHub", href: "#", id: "01" },
  { label: "LinkedIn", href: "#", id: "02" },
  { label: "Email", href: "mailto:hello@example.com", id: "03" },
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
    <footer ref={ref} className="px-6 py-24 md:px-12 lg:px-24 border-t border-border">
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
                "text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight",
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
                  className={cn(
                    "group relative flex items-center justify-between py-4 border-b border-border transition-colors duration-300",
                    hoveredLink === link.id && "border-accent",
                    isVisible ? "animate-offset-slide" : "opacity-0"
                  )}
                  style={{ animationDelay: `${300 + i * 100}ms` }}
                  onMouseEnter={() => setHoveredLink(link.id)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <span className="flex items-center gap-4">
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
                      hoveredLink === link.id ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
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
          <div className="flex items-center gap-6 font-mono text-xs text-muted-foreground">
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
