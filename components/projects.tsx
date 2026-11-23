"use client"

import { useLanguage, type SiteLanguage } from "./language-provider"
import { SystemModule } from "./system-module"

interface Project {
  title: string
  subtitle: string
  meta?: string
  url?: string
  caseHref?: string
  tags: string[]
  description: string
  details: { label: string; value: string }[]
}

const translations = {
  title: {
    en: "What I've built",
    "pt-PT": "O que construí",
    es: "Lo que he construido",
  },
  moreProjects: {
    en: "More projects on request",
    "pt-PT": "Mais projetos sob consulta",
    es: "Más proyectos bajo consulta",
  },
  context: {
    en: "Context",
    "pt-PT": "Contexto",
    es: "Contexto",
  },
  caseStudy: {
    en: "Read the case study",
    "pt-PT": "Ler o caso de estudo",
    es: "Leer el caso de estudio",
  },
  viewProject: {
    en: "View project",
    "pt-PT": "Ver projeto",
    es: "Ver proyecto",
  },
}

const projects: Record<SiteLanguage, Project[]> = {
  en: [
    {
      title: "GIS Project",
      subtitle: "Geospatial portal for the public administration",
      meta: "Winning, May 2026 to present",
      tags: ["React", "TypeScript", ".NET 10", "PostGIS", "GeoServer"],
      description:
        "A publicly accessible geospatial portal. I work on both sides: React, TypeScript and Vite on the front end, .NET 10 on the back end, with PostgreSQL/PostGIS and SQL Server underneath. The geoportal lets people search and filter map layers, read dynamic legends and generate documents for print.",
      details: [
        {
          label: "Geospatial services",
          value:
            "GeoServer (WMS and layer groups), GeoNetwork for metadata, pygeoapi and Martin, with ScalarGIS as the viewer, all wired together in Docker Compose.",
        },
        {
          label: "Back office",
          value:
            "Manages the layers and the records of territorial and planning restrictions: easements, restrictions and land-use plans.",
        },
        {
          label: "Legacy data",
          value: "Migration of data from an older GeoMedia system.",
        },
        {
          label: "Layer order",
          value:
            "It comes from the GeoServer layer group and the front end follows GetCapabilities, instead of re-sorting on the client.",
        },
        {
          label: "Testing",
          value:
            "Vitest, Playwright and xUnit, CI pipelines on Azure DevOps, and acceptance criteria checked with the client.",
        },
      ],
    },
    {
      title: "Aorus Tale",
      subtitle: "Website and operations system for an online game",
      meta: "Since May 2026",
      url: "https://www.aorustale.com/",
      caseHref: "/case-studies/payment-retries",
      tags: ["Next.js", "TypeScript", "Supabase", "Mercado Pago", "SQL Server"],
      description:
        "The website and operations system around an online game. Players get a dashboard, forum, clan pages, a store and voice rooms. Staff get a back office for orders, support, moderation and content. I built it end to end, including the service that lets the site read and act on the game's databases.",
      details: [
        {
          label: "Size",
          value: "71 pages, 233 API routes and 59 database migrations.",
        },
        {
          label: "Game data",
          value:
            "The game's databases are reached only through a signed HTTP service with a fixed list of actions, never directly from the site.",
        },
        {
          label: "Payments",
          value:
            "Mercado Pago with signature-checked webhooks. A declined retry no longer cancels an order that is approved later. Freight quotes through the Melhor Envio API. Order status updates over Supabase Realtime channels.",
        },
        {
          label: "Back office",
          value:
            "About 35 pages: users, bans, coupons, orders, reconciliation, shipments, tickets, CMS and moderation.",
        },
        {
          label: "Analytics",
          value:
            "Admin charts in Recharts for active players and revenue. A separate 5-minute sampler keeps peak history from being overwritten.",
        },
        {
          label: "Voice rooms",
          value:
            "WebRTC rooms on LiveKit. The server issues short-lived room tokens and the browser joins with livekit-client, with screen share, Krisp noise suppression, chat and moderation.",
        },
      ],
    },
    {
      title: "STARK",
      subtitle: "Local document assistant",
      url: "https://stark-snowy.vercel.app/",
      tags: ["RAG", "Next.js", "FastAPI", "ChromaDB", "Ollama"],
      description:
        "A document assistant that works on private files entirely on the device, with a full RAG pipeline for searching and answering over them.",
      details: [
        {
          label: "Retrieval",
          value: "Hybrid: semantic search, BM25 and a cross-encoder reranker.",
        },
        {
          label: "Inputs",
          value:
            "OCR, Whisper audio transcription, several document formats and persistent memory.",
        },
        {
          label: "Runs locally",
          value:
            "Through Ollama, with no API cost and no data leaving the machine.",
        },
      ],
    },
    {
      title: "Draft",
      subtitle: "RFP and security questionnaire automation",
      url: "https://draft-pink.vercel.app",
      tags: ["LangChain", "Pinecone", "Next.js", "FastAPI"],
      description:
        "An AI-assisted workflow for filling in RFPs and security questionnaires from a company knowledge base: document retrieval and answer generation with LangChain, embeddings and vector search.",
      details: [
        {
          label: "Embeddings",
          value: "Cloud and local flows, with Groq in production and Ollama locally.",
        },
        {
          label: "Delivery",
          value: "CI/CD with GitHub Actions, deployed on Vercel and Render.",
        },
      ],
    },
    {
      title: "CoderStein Events",
      subtitle: "Enterprise event management platform",
      meta: "CoderStein Portugal, July 2023 to July 2024",
      tags: ["React", "Next.js", "Astro", "TypeScript", "Tailwind CSS"],
      description:
        "A large-scale event management platform used in complex workflows. I built and maintained reusable UI components and added LangChain-based AI features to the production interfaces.",
      details: [
        {
          label: "Testing",
          value: "Unit and end-to-end tests with Jest, to cut regressions.",
        },
        {
          label: "Team",
          value:
            "A fully remote engineering team, with code reviews and iterative delivery.",
        },
      ],
    },
  ],
  "pt-PT": [
    {
      title: "Projeto GIS",
      subtitle: "Portal geoespacial para a administração pública",
      meta: "Winning, desde maio de 2026",
      tags: ["React", "TypeScript", ".NET 10", "PostGIS", "GeoServer"],
      description:
        "Portal geoespacial de acesso público. Trabalho nas duas pontas: React, TypeScript e Vite no frontend, .NET 10 no backend, com PostgreSQL/PostGIS e SQL Server por baixo. O geoportal permite pesquisar e filtrar camadas, ver legendas dinâmicas e gerar documentos para impressão.",
      details: [
        {
          label: "Serviços geoespaciais",
          value:
            "GeoServer (WMS e grupos de camadas), GeoNetwork para metadados, pygeoapi e Martin, com o ScalarGIS como visualizador, tudo integrado em Docker Compose.",
        },
        {
          label: "Backoffice",
          value:
            "Gere as camadas e os registos de condicionantes territoriais e de planeamento: servidões, restrições e planos de ordenamento.",
        },
        {
          label: "Dados legados",
          value: "Migração de dados de um sistema GeoMedia anterior.",
        },
        {
          label: "Ordem das camadas",
          value:
            "Vem do grupo de camadas do GeoServer e o frontend segue o GetCapabilities, em vez de reordenar no cliente.",
        },
        {
          label: "Testes",
          value:
            "Vitest, Playwright e xUnit, pipelines de CI no Azure DevOps e validação dos critérios de aceitação junto do cliente.",
        },
      ],
    },
    {
      title: "Aorus Tale",
      subtitle: "Site e sistema de operações para um jogo online",
      meta: "Desde maio de 2026",
      url: "https://www.aorustale.com/",
      caseHref: "/case-studies/payment-retries",
      tags: ["Next.js", "TypeScript", "Supabase", "Mercado Pago", "SQL Server"],
      description:
        "O site e o sistema de operações à volta de um jogo online. Os jogadores têm dashboard, fórum, páginas de clãs, loja e salas de voz. A equipa tem um backoffice para pedidos, suporte, moderação e conteúdo. Construí tudo de ponta a ponta, incluindo o serviço que permite ao site ler e agir sobre as bases de dados do jogo.",
      details: [
        {
          label: "Dimensão",
          value: "71 páginas, 233 rotas de API e 59 migrações de base de dados.",
        },
        {
          label: "Dados do jogo",
          value:
            "As bases de dados do jogo só são acedidas através de um serviço HTTP assinado com uma lista fixa de ações, nunca diretamente a partir do site.",
        },
        {
          label: "Pagamentos",
          value:
            "Mercado Pago com webhooks de assinatura verificada. Uma nova tentativa recusada já não cancela um pedido aprovado mais tarde. Cotações de frete pela API do Melhor Envio. Estado dos pedidos atualizado por canais Supabase Realtime.",
        },
        {
          label: "Backoffice",
          value:
            "Cerca de 35 páginas: utilizadores, banimentos, cupões, pedidos, reconciliação, envios, tickets, CMS e moderação.",
        },
        {
          label: "Analítica",
          value:
            "Gráficos de administração em Recharts para jogadores ativos e receita. Um amostrador separado, de 5 em 5 minutos, impede que o histórico de picos seja apagado.",
        },
        {
          label: "Salas de voz",
          value:
            "Salas WebRTC em LiveKit. O servidor emite tokens de sala de curta duração e o browser entra com livekit-client, com partilha de ecrã, supressão de ruído Krisp, chat e moderação.",
        },
      ],
    },
    {
      title: "STARK",
      subtitle: "Assistente de documentos local",
      url: "https://stark-snowy.vercel.app/",
      tags: ["RAG", "Next.js", "FastAPI", "ChromaDB", "Ollama"],
      description:
        "Assistente de documentos que trabalha sobre ficheiros privados inteiramente no dispositivo, com um pipeline RAG completo para pesquisar e responder.",
      details: [
        {
          label: "Recuperação",
          value:
            "Híbrida: pesquisa semântica, BM25 e reranking com cross-encoder.",
        },
        {
          label: "Entradas",
          value:
            "OCR, transcrição de áudio com Whisper, vários formatos de documento e memória persistente.",
        },
        {
          label: "Corre localmente",
          value:
            "Através do Ollama, sem custos de API e sem que os dados saiam da máquina.",
        },
      ],
    },
    {
      title: "Draft",
      subtitle: "Automação de RFPs e questionários de segurança",
      url: "https://draft-pink.vercel.app",
      tags: ["LangChain", "Pinecone", "Next.js", "FastAPI"],
      description:
        "Fluxo assistido por IA para preencher RFPs e questionários de segurança a partir de uma base de conhecimento da empresa: recuperação de documentos e geração de respostas com LangChain, embeddings e pesquisa vetorial.",
      details: [
        {
          label: "Embeddings",
          value:
            "Fluxos na cloud e locais, com Groq em produção e Ollama em ambiente local.",
        },
        {
          label: "Entrega",
          value: "CI/CD com GitHub Actions, deploy na Vercel e na Render.",
        },
      ],
    },
    {
      title: "CoderStein Events",
      subtitle: "Plataforma empresarial de gestão de eventos",
      meta: "CoderStein Portugal, julho de 2023 a julho de 2024",
      tags: ["React", "Next.js", "Astro", "TypeScript", "Tailwind CSS"],
      description:
        "Plataforma de gestão de eventos de grande escala, usada em fluxos de trabalho complexos. Desenvolvi e mantive componentes de UI reutilizáveis e integrei funcionalidades de IA baseadas em LangChain nas interfaces em produção.",
      details: [
        {
          label: "Testes",
          value:
            "Testes unitários e end-to-end com Jest, para reduzir regressões.",
        },
        {
          label: "Equipa",
          value:
            "Equipa de engenharia totalmente remota, com revisões de código e entregas iterativas.",
        },
      ],
    },
  ],
  es: [
    {
      title: "Proyecto GIS",
      subtitle: "Portal geoespacial para la administración pública",
      meta: "Winning, desde mayo de 2026",
      tags: ["React", "TypeScript", ".NET 10", "PostGIS", "GeoServer"],
      description:
        "Portal geoespacial de acceso público. Trabajo en las dos puntas: React, TypeScript y Vite en el frontend, .NET 10 en el backend, con PostgreSQL/PostGIS y SQL Server debajo. El geoportal permite buscar y filtrar capas, ver leyendas dinámicas y generar documentos para impresión.",
      details: [
        {
          label: "Servicios geoespaciales",
          value:
            "GeoServer (WMS y grupos de capas), GeoNetwork para metadatos, pygeoapi y Martin, con ScalarGIS como visor, todo integrado en Docker Compose.",
        },
        {
          label: "Backoffice",
          value:
            "Gestiona las capas y los registros de condicionantes territoriales y de planeamiento: servidumbres, restricciones y planes de ordenación.",
        },
        {
          label: "Datos heredados",
          value: "Migración de datos desde un sistema GeoMedia anterior.",
        },
        {
          label: "Orden de las capas",
          value:
            "Viene del grupo de capas de GeoServer y el frontend sigue el GetCapabilities, en lugar de reordenar en el cliente.",
        },
        {
          label: "Pruebas",
          value:
            "Vitest, Playwright y xUnit, pipelines de CI en Azure DevOps y validación de los criterios de aceptación con el cliente.",
        },
      ],
    },
    {
      title: "Aorus Tale",
      subtitle: "Sitio y sistema de operaciones para un juego online",
      meta: "Desde mayo de 2026",
      url: "https://www.aorustale.com/",
      caseHref: "/case-studies/payment-retries",
      tags: ["Next.js", "TypeScript", "Supabase", "Mercado Pago", "SQL Server"],
      description:
        "El sitio web y el sistema de operaciones alrededor de un juego online. Los jugadores tienen panel, foro, páginas de clanes, tienda y salas de voz. El equipo tiene un backoffice para pedidos, soporte, moderación y contenido. Lo construí de punta a punta, incluido el servicio que permite al sitio leer y actuar sobre las bases de datos del juego.",
      details: [
        {
          label: "Tamaño",
          value: "71 páginas, 233 rutas de API y 59 migraciones de base de datos.",
        },
        {
          label: "Datos del juego",
          value:
            "Las bases de datos del juego solo se alcanzan a través de un servicio HTTP firmado con una lista fija de acciones, nunca directamente desde el sitio.",
        },
        {
          label: "Pagos",
          value:
            "Mercado Pago con webhooks de firma verificada. Un reintento rechazado ya no cancela un pedido aprobado más tarde. Cotizaciones de envío con la API de Melhor Envio. Estado de los pedidos actualizado por canales de Supabase Realtime.",
        },
        {
          label: "Backoffice",
          value:
            "Unas 35 páginas: usuarios, bloqueos, cupones, pedidos, conciliación, envíos, tickets, CMS y moderación.",
        },
        {
          label: "Analítica",
          value:
            "Gráficos de administración en Recharts de jugadores activos e ingresos. Un muestreador aparte, cada 5 minutos, evita que se sobrescriba el historial de picos.",
        },
        {
          label: "Salas de voz",
          value:
            "Salas WebRTC en LiveKit. El servidor emite tokens de sala de corta duración y el navegador entra con livekit-client, con pantalla compartida, supresión de ruido Krisp, chat y moderación.",
        },
      ],
    },
    {
      title: "STARK",
      subtitle: "Asistente de documentos local",
      url: "https://stark-snowy.vercel.app/",
      tags: ["RAG", "Next.js", "FastAPI", "ChromaDB", "Ollama"],
      description:
        "Asistente de documentos que trabaja sobre archivos privados íntegramente en el dispositivo, con un pipeline RAG completo para buscar y responder.",
      details: [
        {
          label: "Recuperación",
          value:
            "Híbrida: búsqueda semántica, BM25 y reranking con cross-encoder.",
        },
        {
          label: "Entradas",
          value:
            "OCR, transcripción de audio con Whisper, varios formatos de documento y memoria persistente.",
        },
        {
          label: "Se ejecuta en local",
          value:
            "Con Ollama, sin costes de API y sin que los datos salgan de la máquina.",
        },
      ],
    },
    {
      title: "Draft",
      subtitle: "Automatización de RFP y cuestionarios de seguridad",
      url: "https://draft-pink.vercel.app",
      tags: ["LangChain", "Pinecone", "Next.js", "FastAPI"],
      description:
        "Flujo asistido por IA para completar RFP y cuestionarios de seguridad a partir de una base de conocimiento de la empresa: recuperación de documentos y generación de respuestas con LangChain, embeddings y búsqueda vectorial.",
      details: [
        {
          label: "Embeddings",
          value:
            "Flujos en la nube y locales, con Groq en producción y Ollama en local.",
        },
        {
          label: "Entrega",
          value: "CI/CD con GitHub Actions, despliegue en Vercel y Render.",
        },
      ],
    },
    {
      title: "CoderStein Events",
      subtitle: "Plataforma empresarial de gestión de eventos",
      meta: "CoderStein Portugal, de julio de 2023 a julio de 2024",
      tags: ["React", "Next.js", "Astro", "TypeScript", "Tailwind CSS"],
      description:
        "Plataforma de gestión de eventos de gran escala, usada en flujos de trabajo complejos. Desarrollé y mantuve componentes de UI reutilizables e integré funcionalidades de IA basadas en LangChain en las interfaces en producción.",
      details: [
        {
          label: "Pruebas",
          value:
            "Pruebas unitarias y end-to-end con Jest, para reducir regresiones.",
        },
        {
          label: "Equipo",
          value:
            "Equipo de ingeniería totalmente remoto, con revisiones de código y entregas iterativas.",
        },
      ],
    },
  ],
}

// The few things a recruiter should not miss, per project. Every line repeats
// a fact that is already in the card or in the CV.
const highlights: Record<SiteLanguage, Record<string, string[]>> = {
  en: {
    "GIS Project": [
      "React geoportal on GeoServer WMS and layer groups",
      "Layer order read from WMS GetCapabilities, not re-sorted in the client",
      "PostGIS and SQL Server behind a .NET 10 API, GeoMedia data migrated",
      "Vitest, Playwright and xUnit, CI on Azure DevOps",
    ],
    "Aorus Tale": [
      "Voice rooms on LiveKit, with screen share and Krisp noise suppression",
      "Mercado Pago payments with signature-checked webhooks",
      "Game databases reached only through a signed Node service",
    ],
    STARK: [
      "Hybrid retrieval: ChromaDB embeddings plus BM25, reranked by a cross-encoder",
      "Whisper transcription and OCR for audio and scanned files",
      "Local inference through Ollama, no API cost",
    ],
    Draft: [
      "RAG with LangChain and Pinecone embeddings",
      "Groq in production, Ollama locally",
      "GitHub Actions CI/CD to Vercel and Render",
    ],
    "CoderStein Events": [
      "Reusable React, Next.js and Astro components in TypeScript and Tailwind",
      "LangChain features wired into production interfaces",
      "Jest unit and end-to-end tests",
    ],
  },
  "pt-PT": {
    "Projeto GIS": [
      "Geoportal em React sobre WMS e grupos de camadas do GeoServer",
      "Ordem das camadas lida do GetCapabilities do WMS, sem reordenar no cliente",
      "PostGIS e SQL Server atrás de uma API .NET 10, dados do GeoMedia migrados",
      "Vitest, Playwright e xUnit, CI no Azure DevOps",
    ],
    "Aorus Tale": [
      "Salas de voz em LiveKit, com partilha de ecrã e supressão de ruído Krisp",
      "Pagamentos Mercado Pago com webhooks de assinatura verificada",
      "Bases de dados do jogo acedidas só através de um serviço Node assinado",
    ],
    STARK: [
      "Recuperação híbrida: embeddings em ChromaDB mais BM25, com reranking por cross-encoder",
      "Transcrição com Whisper e OCR para áudio e ficheiros digitalizados",
      "Inferência local com Ollama, sem custos de API",
    ],
    Draft: [
      "RAG com LangChain e embeddings no Pinecone",
      "Groq em produção, Ollama em local",
      "CI/CD com GitHub Actions para Vercel e Render",
    ],
    "CoderStein Events": [
      "Componentes reutilizáveis em React, Next.js e Astro, com TypeScript e Tailwind",
      "Funcionalidades LangChain integradas em interfaces em produção",
      "Testes unitários e end-to-end com Jest",
    ],
  },
  es: {
    "Proyecto GIS": [
      "Geoportal en React sobre WMS y grupos de capas de GeoServer",
      "Orden de las capas leído del GetCapabilities del WMS, sin reordenar en el cliente",
      "PostGIS y SQL Server detrás de una API .NET 10, datos de GeoMedia migrados",
      "Vitest, Playwright y xUnit, CI en Azure DevOps",
    ],
    "Aorus Tale": [
      "Salas de voz en LiveKit, con pantalla compartida y supresión de ruido Krisp",
      "Pagos con Mercado Pago y webhooks de firma verificada",
      "Bases de datos del juego alcanzadas solo a través de un servicio Node firmado",
    ],
    STARK: [
      "Recuperación híbrida: embeddings en ChromaDB más BM25, con reranking por cross-encoder",
      "Transcripción con Whisper y OCR para audio y archivos escaneados",
      "Inferencia local con Ollama, sin costes de API",
    ],
    Draft: [
      "RAG con LangChain y embeddings en Pinecone",
      "Groq en producción, Ollama en local",
      "CI/CD con GitHub Actions hacia Vercel y Render",
    ],
    "CoderStein Events": [
      "Componentes reutilizables en React, Next.js y Astro, con TypeScript y Tailwind",
      "Funcionalidades LangChain integradas en interfaces en producción",
      "Pruebas unitarias y end-to-end con Jest",
    ],
  },
}

// Column spans on the 12-column desktop grid. Alternating widths, with the
// second card dropped lower so the rows do not line up.
const layout = [
  "lg:col-span-7",
  "lg:col-span-5 lg:mt-24",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-8 lg:col-start-3",
]

export function Projects() {
  const { language } = useLanguage()
  const t = translations
  const list = projects[language]

  return (
    <section
      id="projects"
      className="scroll-mt-14 border-t border-border px-4 py-20 sm:px-6 md:px-12 md:py-24 lg:px-24"
    >
      <div className="mb-16">
        <h2 className="text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
          {t.title[language]}
        </h2>
        <div className="mt-4 h-px w-24 bg-accent" />
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {list.map((project, index) => (
          <div key={project.title} className={layout[index] ?? "lg:col-span-6"}>
            <SystemModule
              {...project}
              meta={undefined}
              highlights={highlights[language][project.title]}
              details={
                project.meta
                  ? [
                      { label: t.context[language], value: project.meta },
                      ...project.details,
                    ]
                  : project.details
              }
              ctaLabel={t.viewProject[language]}
              caseLabel={t.caseStudy[language]}
            />
          </div>
        ))}
      </div>

      <p className="mt-16 text-sm text-muted-foreground sm:text-right">
        {t.moreProjects[language]}
      </p>
    </section>
  )
}
