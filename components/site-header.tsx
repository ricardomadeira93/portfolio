"use client"

import Link from "next/link"
import { useLanguage } from "./language-provider"
import { LanguageSwitcher } from "./language-switcher"
import { ThemeToggle } from "./theme-toggle"

const links = {
  projects: { en: "Projects", "pt-PT": "Projetos", es: "Proyectos" },
  contact: { en: "Contact", "pt-PT": "Contacto", es: "Contacto" },
}

// Stays at the top while scrolling. A solid background and one hairline, nothing
// translucent, so text never shows through it. The links point at the home page
// so they also work from the case study pages.
export function SiteHeader() {
  const { language } = useLanguage()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="flex h-14 items-center justify-end gap-4 px-4 sm:px-6 md:px-12 lg:px-24">
        <nav className="hidden items-center gap-6 text-sm sm:flex" aria-label="Main">
          <Link
            href="/#projects"
            className="text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            {links.projects[language]}
          </Link>
          <Link
            href="/#contact"
            className="text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            {links.contact[language]}
          </Link>
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
