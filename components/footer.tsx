"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const links = [
  { label: "GitHub", href: "#", id: "01" },
  { label: "LinkedIn", href: "#", id: "02" },
  { label: "Email", href: "mailto:hello@example.com", id: "03" },
]

export function Footer() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

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
              <span className="text-accent">//</span> INITIATE_CONTACT
            </div>
            <h2 
              className={cn(
                "text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight",
                isVisible ? "animate-mask-reveal delay-100" : "opacity-0"
              )}
              style={{ clipPath: isVisible ? undefined : "inset(0 100% 0 0)" }}
            >
              Let&apos;s work
              <br />
              <span className="text-accent">together.</span>
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
              EXTERNAL_LINKS
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
                    OPEN →
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
            <span className="text-accent">©</span> 2024 Ricardo Madeira. Built with clarity.
          </div>
          <div className="flex items-center gap-6 font-mono text-xs text-muted-foreground">
            <span>
              <span className="text-accent">03</span> / 03
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-accent animate-pulse" />
              SYSTEM_ACTIVE
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
