"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "./language-provider"

const links = [
  { label: "GitHub", href: "https://github.com/ricardomadeira93/" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ricardo-madeira-8ab393280/",
  },
  { label: "Email", href: "mailto:madeiragpersonal@gmail.com" },
]

const translations = {
  title: {
    en: "Open to new projects.",
    "pt-PT": "Disponível para novos projetos.",
    es: "Disponible para nuevos proyectos.",
  },
  body: {
    en: "Email is the quickest way to reach me. I answer in English, Portuguese or Spanish.",
    "pt-PT":
      "O e-mail é a forma mais rápida de me contactar. Respondo em português, inglês ou espanhol.",
    es: "El correo es la forma más rápida de contactarme. Respondo en español, portugués o inglés.",
  },
  rights: {
    en: "© 2026 Ricardo Madeira",
    "pt-PT": "© 2026 Ricardo Madeira",
    es: "© 2026 Ricardo Madeira",
  },
}

export function Footer() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const { language } = useLanguage()
  const t = translations

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <footer
      id="contact"
      ref={ref}
      className="scroll-mt-14 border-t border-border px-4 py-20 sm:px-6 md:px-12 md:py-24 lg:px-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <h2
              className={cn(
                "text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-5xl",
                isVisible ? "animate-mask-reveal delay-100" : "opacity-0"
              )}
              style={{ clipPath: isVisible ? undefined : "inset(0 100% 0 0)" }}
            >
              {t.title[language]}
            </h2>
            <p
              className={cn(
                "mt-6 max-w-md text-base leading-relaxed text-muted-foreground",
                isVisible ? "animate-offset-slide delay-200" : "opacity-0"
              )}
            >
              {t.body[language]}
            </p>
          </div>

          <nav className="flex flex-col justify-end">
            {links.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className={cn(
                  "flex items-center justify-between border-b border-border py-4 text-xl transition-colors duration-300",
                  hoveredLink === link.label && "border-accent text-accent",
                  isVisible ? "animate-offset-slide" : "opacity-0"
                )}
                style={{ animationDelay: `${300 + i * 100}ms` }}
                onMouseEnter={() => setHoveredLink(link.label)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <span>{link.label}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "transition-transform duration-300",
                    hoveredLink === link.label && "translate-x-1 -translate-y-1"
                  )}
                >
                  ↗
                </span>
              </a>
            ))}
          </nav>
        </div>

        <p
          className={cn(
            "mt-24 border-t border-border pt-8 text-sm text-muted-foreground",
            isVisible ? "animate-offset-slide delay-600" : "opacity-0"
          )}
        >
          {t.rights[language]}
        </p>
      </div>
    </footer>
  )
}
