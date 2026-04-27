"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface SystemModuleProps {
  id: string
  title: string
  subtitle?: string
  tags: string[]
  description: string
  url?: string
  ctaLabel?: string
  details?: {
    label: string
    value: string
  }[]
  className?: string
}

export function SystemModule({
  id,
  title,
  subtitle,
  tags,
  description,
  url,
  ctaLabel = "View Project",
  details,
  className,
}: SystemModuleProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

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
    <div
      ref={ref}
      className={cn(
        "group relative border border-border bg-surface transition-colors duration-300",
        isHovered && "border-accent/50",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Offset border accent */}
      <div 
        className={cn(
          "absolute -bottom-1 -right-1 w-full h-full border border-accent/20 -z-10 transition-all duration-500",
          isHovered && "border-accent/40 -bottom-2 -right-2"
        )} 
      />

      {/* Module header */}
      <div className="flex items-start justify-between gap-4 p-5 sm:p-6 border-b border-border">
        <div className="min-w-0">
          <div 
            className={cn(
              "font-mono text-xs text-muted-foreground mb-2 tracking-wider",
              isVisible ? "animate-offset-slide" : "opacity-0"
            )}
          >
            <span className="text-accent">{id}</span>
          </div>
          <h3 
            className={cn(
              "text-2xl font-light tracking-tight md:text-3xl",
              isVisible ? "animate-mask-reveal delay-100" : "opacity-0"
            )}
            style={{ clipPath: isVisible ? undefined : "inset(0 100% 0 0)" }}
          >
            {title}
          </h3>
          {subtitle && (
            <p 
              className={cn(
                "mt-1 text-sm text-muted-foreground sm:text-base",
                isVisible ? "animate-offset-slide delay-200" : "opacity-0"
              )}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Status indicator */}
        <div 
          className={cn(
            "flex items-center gap-2",
            isVisible ? "animate-offset-slide delay-100" : "opacity-0"
          )}
        >
          <span className={cn(
            "w-2 h-2 transition-colors duration-300",
            isHovered ? "bg-accent" : "bg-muted-foreground/50"
          )} />
        </div>
      </div>

      {/* Tags row */}
      <div 
        className={cn(
          "flex flex-wrap gap-2 px-5 py-4 sm:px-6 border-b border-border",
          isVisible ? "animate-offset-slide delay-200" : "opacity-0"
        )}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs px-2 py-1 border border-border text-muted-foreground hover:border-accent/50 hover:text-foreground transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Description */}
      <div className="p-5 sm:p-6">
        <p 
          className={cn(
            "text-sm leading-relaxed text-muted-foreground sm:text-base",
            isVisible ? "animate-offset-slide delay-300" : "opacity-0"
          )}
        >
          {description}
        </p>

        {url && (
          <div
            className={cn(
              "mt-6",
              isVisible ? "animate-offset-slide delay-400" : "opacity-0"
            )}
          >
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 border border-border bg-surface px-4 py-2 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              <span>{ctaLabel}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        )}

        {/* Details panel - reveals on hover */}
        {details && (
          <div 
            className={cn(
              "mt-6 max-h-[32rem] overflow-hidden border-t border-border pt-6 opacity-100 transition-all duration-500",
              "md:max-h-0 md:opacity-0 md:border-transparent",
              isHovered && "md:max-h-96 md:opacity-100 md:border-border"
            )}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {details.map((detail) => (
                <div key={detail.label}>
                  <div className="font-mono text-xs text-muted-foreground mb-1">
                    {detail.label}
                  </div>
                  <div className="text-sm">{detail.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interactive prompt */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 h-px bg-accent origin-left transition-transform duration-500",
          "scale-x-100 md:scale-x-0",
          isHovered && "md:scale-x-100"
        )} 
      />
    </div>
  )
}
