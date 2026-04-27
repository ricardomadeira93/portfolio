"use client"

import { useEffect, useState } from "react"
import { ThemeToggle } from "./theme-toggle"

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-between px-6 py-8 md:px-12 lg:px-24">
      {/* Top metadata bar */}
      <header className="flex items-start justify-between">
        <div 
          className={`font-mono text-xs text-muted-foreground tracking-wider uppercase ${
            mounted ? "animate-offset-slide" : "opacity-0"
          }`}
        >
          <span className="text-accent">//</span> Ricardo.Madeira
        </div>
        <div 
          className={`flex items-center gap-4 ${
            mounted ? "animate-offset-slide delay-100" : "opacity-0"
          }`}
        >
          <ThemeToggle />
          <span className="font-mono text-xs text-muted-foreground">
            v1.0.0
          </span>
        </div>
      </header>

      {/* Main title block */}
      <div className="flex-1 flex flex-col justify-center py-24">
        <div className="max-w-4xl">
          {/* System identifier */}
          <div 
            className={`font-mono text-xs text-muted-foreground mb-6 tracking-widest ${
              mounted ? "animate-offset-slide delay-200" : "opacity-0"
            }`}
          >
            <span className="inline-block w-2 h-2 bg-accent mr-2" />
            ACTIVE_SESSION
          </div>

          {/* Name - editorial typography */}
          <h1 
            className={`text-6xl md:text-8xl lg:text-9xl font-light tracking-tight leading-none mb-8 ${
              mounted ? "animate-mask-reveal delay-300" : "opacity-0"
            }`}
            style={{ clipPath: mounted ? undefined : "inset(0 100% 0 0)" }}
          >
            Ricardo
          </h1>

          {/* Role with offset border treatment */}
          <div 
            className={`relative inline-block ${
              mounted ? "animate-offset-slide delay-500" : "opacity-0"
            }`}
          >
            <div className="border border-border bg-surface px-6 py-3">
              <span className="text-xl md:text-2xl font-light tracking-wide">
                Fullstack Developer & AI Engineer
              </span>
            </div>
            {/* Offset shadow border */}
            <div className="absolute -bottom-1 -right-1 w-full h-full border border-accent/30 -z-10" />
          </div>

          {/* Descriptor text */}
          <p 
            className={`mt-12 text-muted-foreground max-w-xl leading-relaxed ${
              mounted ? "animate-offset-slide delay-600" : "opacity-0"
            }`}
          >
            I build RAG systems and production AI applications. Focus on traceability, 
            clean interfaces, and systems that actually work in practice.
          </p>

          {/* Proof layer — system metadata */}
          <div
            className={`mt-10 border-t border-border pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl ${
              mounted ? "animate-offset-slide delay-700" : "opacity-0"
            }`}
          >
            <div>
              <div className="font-mono text-[10px] text-accent tracking-widest mb-2">
                BUILDING
              </div>
              <ul className="space-y-1">
                {["RAG systems", "AI workflows", "production web apps"].map((item) => (
                  <li key={item} className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                    <span className="text-accent/60">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-mono text-[10px] text-accent tracking-widest mb-2">
                EXPERIENCE
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
                FOCUS
              </div>
              <ul className="space-y-1">
                {["traceable answers", "clean interfaces", "maintainable systems"].map((item) => (
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
      <footer className="flex items-end justify-between">
        <div 
          className={`font-mono text-xs text-muted-foreground ${
            mounted ? "animate-offset-slide delay-700" : "opacity-0"
          }`}
        >
          <span className="text-accent">01</span> / 03
        </div>
        <div 
          className={`flex items-center gap-2 font-mono text-xs text-muted-foreground ${
            mounted ? "animate-offset-slide delay-800" : "opacity-0"
          }`}
        >
          <span>SCROLL_TO_EXPLORE</span>
          <span className="inline-block w-4 h-px bg-accent animate-pulse-line" />
        </div>
      </footer>
    </section>
  )
}
