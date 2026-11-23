"use client"

import { languages, useLanguage, type SiteLanguage } from "./language-provider"

const languageNames: Record<SiteLanguage, string> = {
  en: "English",
  "pt-PT": "Português",
  es: "Español",
}

const labels: Record<SiteLanguage, string> = {
  en: "Language",
  "pt-PT": "Idioma",
  es: "Idioma",
}

// A native select: the full language names are readable, the control is one
// target instead of three, and phones open their own picker.
export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <label className="relative inline-flex h-8 items-center">
      <span className="sr-only">{labels[language]}</span>
      <select
        value={language}
        onChange={(event) => setLanguage(event.target.value as SiteLanguage)}
        className="h-8 cursor-pointer appearance-none border border-border bg-surface pl-3 pr-8 font-mono text-xs text-foreground transition-colors duration-300 hover:border-accent/50 focus-visible:border-accent focus-visible:outline-none"
      >
        {languages.map((item) => (
          <option key={item} value={item} lang={item}>
            {languageNames[item]}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-2.5 h-3 w-3 text-muted-foreground"
        viewBox="0 0 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path d="M2 4.5 6 8.5 10 4.5" />
      </svg>
    </label>
  )
}
