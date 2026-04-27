"use client"

import { useLanguage } from "./language-provider"
import { SystemModule } from "./system-module"

const translations = {
  sectionLabel: {
    en: "PROJECTS",
    "pt-PT": "PROJECTOS",
    es: "PROYECTOS",
  },
  title: {
    en: "What I've Built",
    "pt-PT": "O Que Construí",
    es: "Lo Que He Construido",
  },
  moreProjects: {
    en: "MORE_PROJECTS_AVAILABLE",
    "pt-PT": "MAIS_PROJECTOS_DISPONIVEIS",
    es: "MAS_PROYECTOS_DISPONIBLES",
  },
  viewProject: {
    en: "View Project",
    "pt-PT": "Ver Projecto",
    es: "Ver Proyecto",
  },
  projects: {
    en: [
      {
        id: "SYS_001",
        title: "STARK",
        subtitle: "Local-first AI document assistant",
        url: undefined,
        tags: ["RAG", "Local-First", "Python", "Privacy"],
        description:
          "Local-first AI assistant for querying documents with citations. Works entirely on local files. Emphasis on privacy and traceable answers; every response shows its sources.",
        details: [
          { label: "ARCHITECTURE", value: "Local RAG" },
          { label: "CORE_FEATURE", value: "Citations" },
          { label: "PRIVACY", value: "On-device" },
          { label: "USE_CASE", value: "Document analysis" },
        ],
      },
      {
        id: "SYS_002",
        title: "Draft",
        subtitle: "RFP automation system",
        url: undefined,
        tags: ["RFP", "Automation", "Retrieval", "Workflow"],
        description:
          "Automates repetitive RFP responses using structured prompts and retrieval. Generates and structures responses from past proposals. Reduces manual drafting and repetition.",
        details: [
          { label: "PROBLEM", value: "Manual RFP writing" },
          { label: "SOLUTION", value: "AI + retrieval" },
          { label: "BENEFIT", value: "Faster workflows" },
          { label: "APPROACH", value: "Structured output" },
        ],
      },
      {
        id: "SYS_003",
        title: "CoderStein Events Platform",
        subtitle: "Production event management system",
        url: undefined,
        tags: ["Production", "Events", "Full-Stack", "Real-Users"],
        description:
          "Real production system managing events, users, and registrations. Handles real-world usage with actual users and operations. Not a side project; this runs events.",
        details: [
          { label: "SCALE", value: "Production" },
          { label: "USERS", value: "Active" },
          { label: "OPERATIONS", value: "Real registrations" },
          { label: "FOCUS", value: "Reliability" },
        ],
      },
    ],
    "pt-PT": [
      {
        id: "SYS_001",
        title: "STARK",
        subtitle: "Assistente de documentos com IA local-first",
        url: undefined,
        tags: ["RAG", "Local-First", "Python", "Privacidade"],
        description:
          "Assistente de IA local-first para consultar documentos com citações. Funciona inteiramente em ficheiros locais. Foco em privacidade e respostas rastreáveis; cada resposta mostra as suas fontes.",
        details: [
          { label: "ARQUITECTURA", value: "RAG local" },
          { label: "FUNCAO_CORE", value: "Citações" },
          { label: "PRIVACIDADE", value: "No dispositivo" },
          { label: "CASO_DE_USO", value: "Análise documental" },
        ],
      },
      {
        id: "SYS_002",
        title: "Draft",
        subtitle: "Sistema de automação de RFPs",
        url: undefined,
        tags: ["RFP", "Automação", "Retrieval", "Workflow"],
        description:
          "Automatiza respostas repetitivas a RFPs com prompts estruturados e retrieval. Gera e organiza respostas a partir de propostas anteriores. Reduz trabalho manual e repetição.",
        details: [
          { label: "PROBLEMA", value: "Escrita manual de RFPs" },
          { label: "SOLUCAO", value: "IA + retrieval" },
          { label: "BENEFICIO", value: "Workflows mais rápidos" },
          { label: "ABORDAGEM", value: "Saída estruturada" },
        ],
      },
      {
        id: "SYS_003",
        title: "CoderStein Events Platform",
        subtitle: "Sistema de gestão de eventos em produção",
        url: undefined,
        tags: ["Produção", "Eventos", "Full-Stack", "Utilizadores"],
        description:
          "Sistema real em produção para gerir eventos, utilizadores e inscrições. Suporta utilização real com operações e utilizadores activos. Não é um side project; corre eventos reais.",
        details: [
          { label: "ESCALA", value: "Produção" },
          { label: "UTILIZADORES", value: "Activos" },
          { label: "OPERACOES", value: "Inscrições reais" },
          { label: "FOCO", value: "Fiabilidade" },
        ],
      },
    ],
    es: [
      {
        id: "SYS_001",
        title: "STARK",
        subtitle: "Asistente de documentos con IA local-first",
        url: undefined,
        tags: ["RAG", "Local-First", "Python", "Privacidad"],
        description:
          "Asistente de IA local-first para consultar documentos con citas. Funciona completamente con archivos locales. Enfoque en privacidad y respuestas trazables; cada respuesta muestra sus fuentes.",
        details: [
          { label: "ARQUITECTURA", value: "RAG local" },
          { label: "FUNCION_CLAVE", value: "Citas" },
          { label: "PRIVACIDAD", value: "En dispositivo" },
          { label: "CASO_DE_USO", value: "Análisis documental" },
        ],
      },
      {
        id: "SYS_002",
        title: "Draft",
        subtitle: "Sistema de automatización de RFP",
        url: undefined,
        tags: ["RFP", "Automatización", "Retrieval", "Workflow"],
        description:
          "Automatiza respuestas repetitivas de RFP usando prompts estructurados y retrieval. Genera y organiza respuestas a partir de propuestas anteriores. Reduce redacción manual y repetición.",
        details: [
          { label: "PROBLEMA", value: "Redacción manual de RFP" },
          { label: "SOLUCION", value: "IA + retrieval" },
          { label: "BENEFICIO", value: "Flujos más rápidos" },
          { label: "ENFOQUE", value: "Salida estructurada" },
        ],
      },
      {
        id: "SYS_003",
        title: "CoderStein Events Platform",
        subtitle: "Sistema de gestión de eventos en producción",
        url: undefined,
        tags: ["Producción", "Eventos", "Full-Stack", "Usuarios"],
        description:
          "Sistema real en producción para gestionar eventos, usuarios e inscripciones. Soporta uso real con operaciones y usuarios activos. No es un side project; esto ejecuta eventos.",
        details: [
          { label: "ESCALA", value: "Producción" },
          { label: "USUARIOS", value: "Activos" },
          { label: "OPERACIONES", value: "Inscripciones reales" },
          { label: "FOCO", value: "Fiabilidad" },
        ],
      },
    ],
  },
}

export function Projects() {
  const { language } = useLanguage()
  const t = translations
  const projects = t.projects[language]

  return (
    <section className="px-6 py-24 md:px-12 lg:px-24">
      {/* Section header */}
      <div className="mb-16">
        <div className="font-mono text-xs text-muted-foreground mb-4 tracking-widest">
          <span className="text-accent">//</span> {t.sectionLabel[language]}
        </div>
        <h2 className="text-4xl md:text-5xl font-light tracking-tight">
          {t.title[language]}
        </h2>
        <div className="mt-4 w-24 h-px bg-accent" />
      </div>

      {/* Projects grid - asymmetric layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* First project - spans more columns */}
        <div className="lg:col-span-7">
          <SystemModule {...projects[0]} ctaLabel={t.viewProject[language]} />
        </div>

        {/* Second project - offset right */}
        <div className="lg:col-span-5 lg:mt-24">
          <SystemModule {...projects[1]} ctaLabel={t.viewProject[language]} />
        </div>

        {/* Third project - full width with different treatment */}
        <div className="lg:col-span-8 lg:col-start-3">
          <SystemModule {...projects[2]} ctaLabel={t.viewProject[language]} />
        </div>
      </div>

      {/* Bottom metadata */}
      <div className="mt-16 flex items-center justify-between font-mono text-xs text-muted-foreground">
        <span>
          <span className="text-accent">02</span> / 03
        </span>
        <span>{t.moreProjects[language]}</span>
      </div>
    </section>
  )
}
