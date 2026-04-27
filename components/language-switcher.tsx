"use client"

import { cn } from "@/lib/utils"
import { languages, useLanguage } from "./language-provider"

const languageLabels: Record<(typeof languages)[number], string> = {
  en: "EN",
  "pt-PT": "PT-PT",
  es: "ES",
}

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      className={cn(
        "flex items-center gap-1 border border-border bg-surface px-1 py-1",
        "font-mono text-[11px] uppercase tracking-wider"
      )}
      aria-label="Language selector"
    >
      {languages.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLanguage(item)}
          className={cn(
            "px-2 py-1 transition-colors duration-300",
            language === item
              ? "bg-accent/10 text-accent"
              : "text-muted-foreground hover:text-foreground"
          )}
          aria-pressed={language === item}
        >
          {languageLabels[item]}
        </button>
      ))}
    </div>
  )
}
