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
        subtitle: "Privacy Centric Local RAG Assistant",
        url: "https://stark-snowy.vercel.app/",
        tags: ["RAG", "Local First", "Python", "Privacy"],
        description:
          "A privacy centric assistant that processes sensitive documents entirely on-device. Features deterministic source tracing and verifiable response grounding.",
        details: [
          { label: "ARCHITECTURE", value: "Local RAG" },
          { label: "CORE_FEATURE", value: "Source Tracing" },
          { label: "PRIVACY", value: "On-device" },
          { label: "USE_CASE", value: "Document Analysis" },
        ],
      },
      {
        id: "SYS_002",
        title: "Draft",
        subtitle: "High Precision RFP Automation",
        url: "https://draft-pink.vercel.app",
        tags: ["RFP Automation", "Semantic Search", "LLM Workflows"],
        description:
          "Automates complex RFP workflows leveraging structured retrieval from legacy proposal data. Optimizes drafting efficiency while maintaining technical consistency.",
        details: [
          { label: "PROBLEM", value: "Manual RFP Writing" },
          { label: "SOLUTION", value: "Structured Retrieval" },
          { label: "BENEFIT", value: "Workflow Efficiency" },
          { label: "APPROACH", value: "Deterministic Output" },
        ],
      },
      {
        id: "SYS_003",
        title: "CoderStein Events",
        subtitle: "Enterprise Event Management Platform",
        url: undefined,
        tags: ["Production", "Enterprise", "Fullstack", "High Availability"],
        description:
          "Mission critical platform managing thousands of concurrent registrations and live operations. Built for high availability and robust transactional integrity.",
        details: [
          { label: "SCALE", value: "Enterprise" },
          { label: "USERS", value: "High Volume" },
          { label: "OPERATIONS", value: "Real-time Registrations" },
          { label: "FOCUS", value: "Reliability" },
        ],
      },
    ],
    "pt-PT": [
      {
        id: "SYS_001",
        title: "STARK",
        subtitle: "Assistente de RAG Local com Foco em Privacidade",
        url: "https://stark-snowy.vercel.app/",
        tags: ["RAG", "Local First", "Python", "Privacidade"],
        description:
          "Assistente focado em privacidade que processa documentos sensíveis inteiramente no dispositivo. Inclui rastreio determinístico de fontes e respostas verificáveis.",
        details: [
          { label: "ARQUITETURA", value: "RAG Local" },
          { label: "FUNÇÃO_CORE", value: "Rastreio de Fontes" },
          { label: "PRIVACIDADE", value: "No dispositivo" },
          { label: "CASO_DE_USO", value: "Análise Documental" },
        ],
      },
      {
        id: "SYS_002",
        title: "Draft",
        subtitle: "Automação de RFPs de Alta Precisão",
        url: "https://draft-pink.vercel.app",
        tags: ["Automação RFP", "Pesquisa Semântica", "Workflows LLM"],
        description:
          "Automatiza workflows complexos de RFPs através de retrieval estruturado de propostas anteriores. Optimiza a eficiência de escrita mantendo a consistência técnica.",
        details: [
          { label: "PROBLEMA", value: "Escrita Manual de RFPs" },
          { label: "SOLUÇÃO", value: "Retrieval Estruturado" },
          { label: "BENEFÍCIO", value: "Eficiência de Workflow" },
          { label: "ABORDAGEM", value: "Saída Determinística" },
        ],
      },
      {
        id: "SYS_003",
        title: "CoderStein Events",
        subtitle: "Plataforma Enterprise de Gestão de Eventos",
        url: undefined,
        tags: ["Produção", "Enterprise", "Fullstack", "Alta Disponibilidade"],
        description:
          "Plataforma de missão crítica que gere milhares de inscrições simultâneas e operações ao vivo. Construída para alta disponibilidade e integridade transacional.",
        details: [
          { label: "ESCALA", value: "Enterprise" },
          { label: "UTILIZADORES", value: "Alto Volume" },
          { label: "OPERAÇÕES", value: "Inscrições em Tempo Real" },
          { label: "FOCO", value: "Fiabilidade" },
        ],
      },
    ],
    es: [
      {
        id: "SYS_001",
        title: "STARK",
        subtitle: "Asistente de RAG Local con Enfoque en Privacidad",
        url: "https://stark-snowy.vercel.app/",
        tags: ["RAG", "Local First", "Python", "Privacidad"],
        description:
          "Asistente centrado en la privacidad que procesa documentos sensibles íntegramente en el dispositivo. Incluye rastreo determinista de fuentes y respuestas verificables.",
        details: [
          { label: "ARQUITECTURA", value: "RAG Local" },
          { label: "FUNCIÓN_CLAVE", value: "Rastreo de Fuentes" },
          { label: "PRIVACIDAD", value: "En el dispositivo" },
          { label: "CASO_DE_USO", value: "Análisis Documental" },
        ],
      },
      {
        id: "SYS_002",
        title: "Draft",
        subtitle: "Automatización de RFPs de Alta Precisión",
        url: "https://draft-pink.vercel.app",
        tags: ["Automatización RFP", "Búsqueda Semántica", "Flujos LLM"],
        description:
          "Automatiza flujos complejos de RFP mediante recuperación estructurada de propuestas anteriores. Optimiza la eficiencia de redacción manteniendo la consistencia técnica.",
        details: [
          { label: "PROBLEMA", value: "Redacción Manual de RFP" },
          { label: "SOLUCIÓN", value: "Recuperación Estructurada" },
          { label: "BENEFICIO", value: "Eficiencia de Flujo" },
          { label: "ENFOQUE", value: "Salida Determinista" },
        ],
      },
      {
        id: "SYS_003",
        title: "CoderStein Events",
        subtitle: "Plataforma Enterprise de Gestión de Eventos",
        url: undefined,
        tags: ["Producción", "Enterprise", "Fullstack", "Alta Disponibilidad"],
        description:
          "Plataforma de misión crítica que gestiona miles de registros simultáneos y operaciones en vivo. Construida para alta disponibilidad e integridad transaccional.",
        details: [
          { label: "ESCALA", value: "Enterprise" },
          { label: "USUARIOS", value: "Alto Volumen" },
          { label: "OPERACIONES", value: "Registros en Tiempo Real" },
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
    <section className="px-4 py-20 sm:px-6 md:px-12 md:py-24 lg:px-24">
      {/* Section header */}
      <div className="mb-16">
        <div className="font-mono text-xs text-muted-foreground mb-4 tracking-widest">
          <span className="text-accent">//</span> {t.sectionLabel[language]}
        </div>
        <h2 className="text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
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
      <div className="mt-16 flex flex-col gap-2 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>
          <span className="text-accent">02</span> / 03
        </span>
        <span className="sm:text-right">{t.moreProjects[language]}</span>
      </div>
    </section>
  )
}
