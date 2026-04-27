"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

export const languages = ["en", "pt-PT", "es"] as const

export type SiteLanguage = (typeof languages)[number]

interface LanguageContextValue {
  language: SiteLanguage
  setLanguage: (language: SiteLanguage) => void
}

const STORAGE_KEY = "site-language"

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<SiteLanguage>("en")

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem(STORAGE_KEY)

    if (storedLanguage && languages.includes(storedLanguage as SiteLanguage)) {
      setLanguage(storedLanguage as SiteLanguage)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }

  return context
}
