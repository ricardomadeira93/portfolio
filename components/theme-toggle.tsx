"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-8 w-[56px] border border-border bg-surface/30 sm:w-[72px]" />
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "group relative flex h-8 items-center gap-1 border border-border bg-surface px-2.5 py-1.5 sm:px-3",
        "font-mono text-xs uppercase tracking-wider",
        "transition-colors duration-300",
        "hover:border-accent/50 hover:text-accent"
      )}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Sun icon */}
      <svg
        className={cn(
          "w-3.5 h-3.5 transition-all duration-300",
          isDark ? "opacity-50" : "opacity-100 text-accent"
        )}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>

      {/* Divider */}
      <span className="w-px h-3 bg-border mx-1" />

      {/* Moon icon */}
      <svg
        className={cn(
          "w-3.5 h-3.5 transition-all duration-300",
          isDark ? "opacity-100 text-accent" : "opacity-50"
        )}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>

      {/* Active indicator line */}
      <span 
        className={cn(
          "absolute bottom-0 left-0 h-px bg-accent transition-all duration-300",
          isDark ? "w-full" : "w-1/2"
        )}
      />
    </button>
  )
}
