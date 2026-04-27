"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface SystemModuleProps {
  id: string
  title: string
  subtitle?: string
  tags: string[]
  description: string
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
      <div className="flex items-start justify-between p-6 border-b border-border">
        <div>
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
              "text-2xl md:text-3xl font-light tracking-tight",
              isVisible ? "animate-mask-reveal delay-100" : "opacity-0"
            )}
            style={{ clipPath: isVisible ? undefined : "inset(0 100% 0 0)" }}
          >
            {title}
          </h3>
          {subtitle && (
            <p 
              className={cn(
                "text-muted-foreground mt-1",
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
          "flex flex-wrap gap-2 px-6 py-4 border-b border-border",
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
      <div className="p-6">
        <p 
          className={cn(
            "text-muted-foreground leading-relaxed",
            isVisible ? "animate-offset-slide delay-300" : "opacity-0"
          )}
        >
          {description}
        </p>

        {/* Details panel - reveals on hover */}
        {details && (
          <div 
            className={cn(
              "mt-6 pt-6 border-t border-border overflow-hidden transition-all duration-500",
              isHovered ? "max-h-96 opacity-100" : "max-h-0 opacity-0 border-transparent"
            )}
          >
            <div className="grid grid-cols-2 gap-4">
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
          "absolute bottom-0 left-0 right-0 h-px bg-accent transform origin-left transition-transform duration-500",
          isHovered ? "scale-x-100" : "scale-x-0"
        )} 
      />
    </div>
  )
}
