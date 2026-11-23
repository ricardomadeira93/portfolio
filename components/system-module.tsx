"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface SystemModuleProps {
  title: string
  subtitle?: string
  meta?: string
  highlights?: string[]
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
  title,
  subtitle,
  highlights,
  tags,
  description,
  url,
  ctaLabel = "View project",
  details,
  className,
}: SystemModuleProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

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
    <article
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
          "absolute -bottom-1 -right-1 -z-10 h-full w-full border border-accent/20 transition-all duration-500",
          isHovered && "-bottom-2 -right-2 border-accent/40"
        )}
      />

      <header className="flex items-start justify-between gap-4 border-b border-border p-5 sm:p-6">
        <div className="min-w-0">
          <h3
            className={cn(
              "text-2xl font-medium tracking-tight md:text-3xl",
              isVisible ? "animate-mask-reveal delay-100" : "opacity-0"
            )}
            style={{ clipPath: isVisible ? undefined : "inset(0 100% 0 0)" }}
          >
            {title}
          </h3>
          {subtitle && (
            <p
              className={cn(
                "mt-1 text-base text-muted-foreground",
                isVisible ? "animate-offset-slide delay-200" : "opacity-0"
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
        <span
          aria-hidden="true"
          className={cn(
            "mt-2 h-2 w-2 shrink-0 transition-colors duration-300",
            isHovered ? "bg-accent" : "bg-muted-foreground/50"
          )}
        />
      </header>

      <ul
        className={cn(
          "flex flex-wrap gap-2 border-b border-border px-5 py-4 sm:px-6",
          isVisible ? "animate-offset-slide delay-200" : "opacity-0"
        )}
      >
        {tags.map((tag) => (
          <li
            key={tag}
            className="border border-border px-2 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
          >
            {tag}
          </li>
        ))}
      </ul>

      <div className="p-5 sm:p-6">
        {highlights && highlights.length > 0 && (
          <ul
            className={cn(
              "mb-5 space-y-2",
              isVisible ? "animate-offset-slide delay-300" : "opacity-0"
            )}
          >
            {highlights.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-base font-medium leading-snug text-foreground"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 bg-accent"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        <p
          className={cn(
            "text-base leading-relaxed text-muted-foreground",
            isVisible ? "animate-offset-slide delay-300" : "opacity-0"
          )}
        >
          {description}
        </p>

        {details && (
          <dl
            className={cn(
              "mt-6 grid grid-cols-1 gap-x-6 gap-y-4 border-t border-border pt-6 sm:grid-cols-2",
              isVisible ? "animate-offset-slide delay-400" : "opacity-0"
            )}
          >
            {details.map((detail) => (
              <div key={detail.label}>
                <dt className="mb-1 text-sm font-medium text-foreground">
                  {detail.label}
                </dt>
                <dd className="text-sm leading-relaxed text-muted-foreground">
                  {detail.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "mt-6 inline-flex items-center gap-2 border border-border px-4 py-2 text-sm text-foreground transition-colors duration-300 hover:border-accent hover:text-accent",
              isVisible ? "animate-offset-slide delay-400" : "opacity-0"
            )}
          >
            <span>{ctaLabel}</span>
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>

      {/* Bottom line that draws in on hover */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500",
          isHovered && "scale-x-100"
        )}
      />
    </article>
  )
}
