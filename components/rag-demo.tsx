"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { useLanguage, type SiteLanguage } from "./language-provider"

type Stage = "idle" | "query" | "retrieval" | "context" | "generation" | "complete"

interface RetrievedChunk {
  id: string
  score: number
  text: string
  source: string
}

interface QuickPrompt {
  label: Record<SiteLanguage, string>
  query: Record<SiteLanguage, string>
  response: Record<SiteLanguage, string>
  chunks: RetrievedChunk[]
  stats: { sources: number; tokens: number; latency: string }
}

const quickPrompts: QuickPrompt[] = [
  {
    label: {
      en: "What does Ricardo build?",
      "pt-PT": "O que o Ricardo constrói?",
      es: "¿Qué construye Ricardo?",
    },
    query: {
      en: "What does Ricardo build?",
      "pt-PT": "O que o Ricardo constrói?",
      es: "¿Qué construye Ricardo?",
    },
    response: {
      en: `Ricardo specializes in architecting RAG driven applications and robust AI systems.
      
Core methodology:
• Engineering systems that prioritize verifiable grounding
• Designing interfaces that expose deterministic decision paths
• Architecting maintainable, enterprise ready infrastructures

Current portfolio highlights:
• STARK: Local First document assistant featuring source tracing
• Draft: High precision RFP automation leveraging structured retrieval
• CoderStein: Enterprise platform managing complex live operations`,
      "pt-PT": `O Ricardo especializa-se em arquitetar aplicações baseadas em RAG e sistemas de IA robustos.

Metodologia base:
• Engenharia de sistemas que priorizam respostas verificáveis
• Design de interfaces que expõem caminhos de decisão determinísticos
• Arquitetura de infraestruturas sustentáveis e prontas para enterprise

Destaques do portfólio:
• STARK: Assistente de documentos Local First com rastreio de fontes
• Draft: Automação de RFPs de alta precisão via retrieval estruturado
• CoderStein: Plataforma enterprise que gere operações complexas ao vivo`,
      es: `Ricardo se especializa en la arquitectura de aplicaciones basadas en RAG y sistemas de IA robustos.

Metodología base:
• Ingeniería de sistemas que priorizan respuestas verificables
• Diseño de interfaces que exponen caminos de decisión deterministas
• Arquitectura de infraestructuras mantenibles y listas para enterprise

Puntos clave del portafolio:
• STARK: Asistente de documentos Local First con rastreo de fuentes
• Draft: Automatización de RFPs de alta precisión mediante recuperación estructurada
• CoderStein: Plataforma enterprise que gestiona operaciones complejas en vivo`,
    },
    chunks: [
      {
        id: "chunk_001",
        score: 0.96,
        text: "Ricardo builds RAG systems and production AI applications. Focus on traceability, clean interfaces...",
        source: "profile/about.md",
      },
      {
        id: "chunk_002",
        score: 0.91,
        text: "STARK is a local-first AI assistant for querying documents with citations. Works entirely on local files...",
        source: "projects/stark.md",
      },
      {
        id: "chunk_003",
        score: 0.87,
        text: "Draft automates repetitive RFP responses using structured prompts and retrieval...",
        source: "projects/draft.md",
      },
    ],
    stats: { sources: 3, tokens: 142, latency: "910ms" },
  },
  {
    label: {
      en: "Explain STARK",
      "pt-PT": "Explica o STARK",
      es: "Explica STARK",
    },
    query: {
      en: "What is STARK and how does it work?",
      "pt-PT": "O que é o STARK e como funciona?",
      es: "¿Qué es STARK y cómo funciona?",
    },
    response: {
      en: `STARK is a Local First AI document assistant architected for privacy and deterministic traceability.

System architecture:
• Executes entirely on local files — zero data egress
• Deterministic source tracing for every generated response
• Engineered for professional document analysis where precision is critical

The platform utilizes a RAG architecture to orchestrate document retrieval before generation, ensuring that every answer is grounded in your specific data ecosystem.`,
      "pt-PT": `O STARK é um assistente de documentos Local First, arquitetado para privacidade e rastreabilidade determinística.

Arquitetura do sistema:
• Execução inteiramente local — sem saída de dados
• Rastreio determinístico de fontes para cada resposta gerada
• Desenhado para análise documental profissional onde a precisão é crítica

A plataforma utiliza uma arquitetura RAG para orquestrar o retrieval antes da geração, garantindo que cada resposta é fundamentada no seu ecossistema de dados específico.`,
      es: `STARK es un asistente de documentos Local First, arquitectado para privacidad y trazabilidad determinista.

Arquitectura del sistema:
• Ejecución íntegramente local — sin salida de datos
• Rastreo determinista de fuentes para cada respuesta generada
• Diseñado para análisis documental profesional donde la precisión es crítica

La plataforma utiliza una arquitectura RAG para orquestar la recuperación antes de la generación, asegurando que cada respuesta esté fundamentada en su ecosistema de datos específico.`,
    },
    chunks: [
      {
        id: "chunk_001",
        score: 0.98,
        text: "STARK: Local-first AI assistant for querying documents with citations. Works entirely on local files...",
        source: "projects/stark.md",
      },
      {
        id: "chunk_002",
        score: 0.89,
        text: "Emphasis on privacy and traceable answers — every response shows its sources...",
        source: "projects/stark.md",
      },
    ],
    stats: { sources: 2, tokens: 118, latency: "780ms" },
  },
  {
    label: {
      en: "What is this demo showing?",
      "pt-PT": "O que mostra esta demo?",
      es: "¿Qué muestra esta demo?",
    },
    query: {
      en: "What is this system demonstrating?",
      "pt-PT": "O que demonstra este sistema?",
      es: "¿Qué demuestra este sistema?",
    },
    response: {
      en: `This demonstration visualizes the RAG (Retrieval Augmented Generation) lifecycle in action.

The four stages shown:
• Query: Your question is processed and vectorized for semantic search
• Retrieval: Highly relevant document chunks are identified via similarity search
• Context: Retrieved data is orchestrated into a coherent context window
• Generation: The LLM generates a grounded response based on the assembled context

Every response includes deterministic citations and performance metadata to demonstrate the transparency that RAG enables.`,
      "pt-PT": `Esta demonstração visualiza o ciclo de vida RAG (Retrieval Augmented Generation) em ação.

As quatro fases mostradas:
• Query: A sua pergunta é processada e vetorizada para pesquisa semântica
• Retrieval: Chunks altamente relevantes são identificados via pesquisa por similaridade
• Context: Os dados recuperados são orquestrados numa janela de contexto coerente
• Generation: O LLM gera uma resposta fundamentada no contexto montado

Cada resposta inclui citações determinísticas e metadados de performance para demonstrar a transparência que o RAG permite.`,
      es: `Esta demostración visualiza el ciclo de vida RAG (Retrieval Augmented Generation) en acción.

Las cuatro etapas mostradas:
• Query: Tu pregunta es procesada y vectorizada para búsqueda semántica
• Retrieval: Se identifican chunks altamente relevantes mediante búsqueda por similitud
• Context: Los datos recuperados se orquestan en una ventana de contexto coherente
• Generation: El LLM genera una respuesta fundamentada en el contexto ensamblado

Cada respuesta incluye citas deterministas y metadatos de rendimiento para demostrar la transparencia que RAG permite.`,
    },
    chunks: [
      {
        id: "chunk_001",
        score: 0.94,
        text: "RAG pipeline visualization showing query processing, retrieval, context assembly, and generation stages...",
        source: "docs/demo.md",
      },
      {
        id: "chunk_002",
        score: 0.88,
        text: "Each response includes source citations and metadata to demonstrate traceability...",
        source: "docs/features.md",
      },
    ],
    stats: { sources: 2, tokens: 134, latency: "850ms" },
  },
]

const translations = {
  sectionLabel: {
    en: "LIVE_DEMONSTRATION",
    "pt-PT": "DEMONSTRACAO_AO_VIVO",
    es: "DEMOSTRACIÓN_EN_VIVO",
  },
  title: {
    en: "RAG Pipeline",
    "pt-PT": "Pipeline RAG",
    es: "Pipeline RAG",
  },
  subtitle: {
    en: "Interactive exploration of the RAG lifecycle. Experience how raw queries are transformed into verifiable, contextually grounded responses.",
    "pt-PT": "Exploração interativa do ciclo de vida RAG. Veja como as queries são transformadas em respostas verificáveis e fundamentadas em contexto.",
    es: "Exploración interactiva del ciclo de vida RAG. Vea cómo las queries se transforman en respuestas verificables y fundamentadas en contexto.",
  },
  systemContext: {
    en: "This demo is trained on project documentation and system notes.",
    "pt-PT": "Esta demo está treinada em documentação de projectos e notas do sistema.",
    es: "Esta demo está entrenada en documentación de proyectos y notas del sistema.",
  },
  tryLabel: {
    en: "Try:",
    "pt-PT": "Experimente:",
    es: "Prueba:",
  },
  placeholder: {
    en: "Ask something about RAG, projects, or system design...",
    "pt-PT": "Pergunte algo sobre RAG, projectos ou design de sistemas...",
    es: "Pregunta algo sobre RAG, proyectos o diseño de sistemas...",
  },
  inputQuery: {
    en: "INPUT_QUERY",
    "pt-PT": "INPUT_QUERY",
    es: "INPUT_QUERY",
  },
  retrievedChunks: {
    en: "RETRIEVED_CHUNKS",
    "pt-PT": "CHUNKS_RECUPERADOS",
    es: "CHUNKS_RECUPERADOS",
  },
  contextAssembly: {
    en: "CONTEXT_ASSEMBLY",
    "pt-PT": "MONTAGEM_CONTEXTO",
    es: "ENSAMBLAJE_CONTEXTO",
  },
  generatedResponse: {
    en: "GENERATED_RESPONSE",
    "pt-PT": "RESPOSTA_GERADA",
    es: "RESPUESTA_GENERADA",
  },
  sourcesCited: {
    en: "sources cited",
    "pt-PT": "fontes citadas",
    es: "fuentes citadas",
  },
  tokens: {
    en: "tokens",
    "pt-PT": "tokens",
    es: "tokens",
  },
  status: {
    en: "SYSTEM_STATUS",
    "pt-PT": "ESTADO_SISTEMA",
    es: "ESTADO_SISTEMA",
  },
  runPipeline: {
    en: "Run Pipeline",
    "pt-PT": "Executar Pipeline",
    es: "Ejecutar Pipeline",
  },
  reset: {
    en: "Reset",
    "pt-PT": "Reiniciar",
    es: "Reiniciar",
  },
  footnote: {
    en: "Demonstration uses simulated retrieval with real project data",
    "pt-PT": "Demonstração usa retrieval simulado com dados reais de projectos",
    es: "Demostración usa retrieval simulado con datos reales de proyectos",
  },
  awaitingQuery: {
    en: "Awaiting query...",
    "pt-PT": "À espera de query...",
    es: "Esperando query...",
  },
  awaitingRetrieval: {
    en: "Awaiting retrieval completion...",
    "pt-PT": "À espera da conclusão do retrieval...",
    es: "Esperando finalización del retrieval...",
  },
  awaitingContext: {
    en: "Awaiting context...",
    "pt-PT": "À espera de contexto...",
    es: "Esperando contexto...",
  },
  chunksMerged: {
    en: "chunks merged",
    "pt-PT": "chunks agregados",
    es: "chunks fusionados",
  },
  contextOptimized: {
    en: "Context optimized for relevance",
    "pt-PT": "Contexto optimizado para relevância",
    es: "Contexto optimizado para relevancia",
  },
  stageLabels: {
    en: {
      query: "query",
      retrieval: "retrieval",
      context: "context",
      generation: "generation",
    },
    "pt-PT": {
      query: "query",
      retrieval: "retrieval",
      context: "contexto",
      generation: "geracao",
    },
    es: {
      query: "query",
      retrieval: "retrieval",
      context: "contexto",
      generation: "generacion",
    },
  },
}

export function RAGDemo() {
  const { language } = useLanguage()
  const [stage, setStage] = useState<Stage>("idle")
  const [selectedPrompt, setSelectedPrompt] = useState<QuickPrompt | null>(null)
  const [displayedQuery, setDisplayedQuery] = useState("")
  const [retrievedChunks, setRetrievedChunks] = useState<RetrievedChunk[]>([])
  const [generatedText, setGeneratedText] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const runIdRef = useRef(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const resetDemo = (nextRunId?: number) => {
    runIdRef.current = nextRunId ?? runIdRef.current + 1
    setStage("idle")
    setSelectedPrompt(null)
    setDisplayedQuery("")
    setRetrievedChunks([])
    setGeneratedText("")
  }

  useEffect(() => {
    resetDemo()
  }, [language])

  useEffect(() => {
    return () => {
      runIdRef.current += 1
    }
  }, [])

  const runDemo = async (prompt: QuickPrompt) => {
    if (stage !== "idle") return

    const runId = runIdRef.current + 1
    runIdRef.current = runId
    setSelectedPrompt(prompt)

    const query = prompt.query[language]
    const response = prompt.response[language]

    // Stage 1: Query typing
    setStage("query")
    setDisplayedQuery("")
    for (let i = 0; i <= query.length; i++) {
      if (runIdRef.current !== runId) return
      await new Promise((r) => setTimeout(r, 30))
      if (runIdRef.current !== runId) return
      setDisplayedQuery(query.slice(0, i))
    }
    await new Promise((r) => setTimeout(r, 400))
    if (runIdRef.current !== runId) return

    // Stage 2: Retrieval
    setStage("retrieval")
    setRetrievedChunks([])
    for (const chunk of prompt.chunks) {
      if (runIdRef.current !== runId) return
      await new Promise((r) => setTimeout(r, 350))
      if (runIdRef.current !== runId) return
      setRetrievedChunks((prev) => [...prev, chunk])
    }
    await new Promise((r) => setTimeout(r, 500))
    if (runIdRef.current !== runId) return

    // Stage 3: Context assembly
    setStage("context")
    await new Promise((r) => setTimeout(r, 800))
    if (runIdRef.current !== runId) return

    // Stage 4: Generation
    setStage("generation")
    setGeneratedText("")
    for (let i = 0; i <= response.length; i++) {
      if (runIdRef.current !== runId) return
      await new Promise((r) => setTimeout(r, 12))
      if (runIdRef.current !== runId) return
      setGeneratedText(response.slice(0, i))
    }

    // Stage 5: Complete
    if (runIdRef.current !== runId) return
    setStage("complete")
  }

  const t = translations

  return (
    <section
      ref={ref}
      className="border-y border-border bg-surface px-4 py-20 sm:px-6 md:px-12 md:py-24 lg:px-24"
    >
      {/* Section header */}
      <div className="mb-12">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="font-mono text-xs text-muted-foreground tracking-widest">
            <span className="text-accent">//</span> {t.sectionLabel[language]}
          </div>
          <div className="font-mono text-[10px] text-muted-foreground tracking-widest">
            RAG_SYSTEM
          </div>
        </div>
        <h2 className="text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
          {t.title[language]}
        </h2>
        <p className="mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
          {t.subtitle[language]}
        </p>
      </div>

      {/* Demo container */}
      <div
        className={cn(
          "relative border border-border bg-surface-elevated",
          isVisible ? "animate-mask-reveal" : "opacity-0"
        )}
        style={{ clipPath: isVisible ? undefined : "inset(0 100% 0 0)" }}
      >
        {/* System context label */}
        <div className="px-6 py-4 border-b border-border bg-surface">
          <div className="font-mono text-[10px] text-accent tracking-widest mb-1">
            SYSTEM_CONTEXT
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            {t.systemContext[language]}
          </p>
        </div>

        {/* Quick prompts */}
        <div className="px-6 py-4 border-b border-border">
          <div className="font-mono text-[10px] text-muted-foreground tracking-widest mb-3">
            {t.tryLabel[language]}
          </div>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => runDemo(prompt)}
                disabled={stage !== "idle"}
                className={cn(
                  "w-full px-4 py-2 text-left border border-border font-mono text-xs transition-all duration-200 sm:w-auto sm:text-center",
                  stage === "idle"
                    ? "hover:border-accent hover:text-accent"
                    : "opacity-50 cursor-not-allowed",
                  selectedPrompt === prompt && stage !== "idle" && "border-accent text-accent"
                )}
              >
                {prompt.label[language]}
              </button>
            ))}
          </div>
        </div>

        {/* Pipeline stages indicator */}
        <div className="grid grid-cols-2 border-b border-border sm:grid-cols-4">
          {(["query", "retrieval", "context", "generation"] as const).map(
            (s, i) => (
              <div
                key={s}
                className={cn(
                  "px-3 py-3 font-mono text-[10px] uppercase tracking-wider transition-colors duration-300 sm:px-4 sm:text-xs",
                  "border-r border-b border-border even:border-r-0 sm:border-b-0 sm:even:border-r sm:last:border-r-0",
                  stage === s && "bg-accent/10 text-accent",
                  stage !== "idle" &&
                    ["query", "retrieval", "context", "generation"].indexOf(
                      stage
                    ) > i &&
                    "text-foreground",
                  (stage === "idle" ||
                    ["query", "retrieval", "context", "generation"].indexOf(
                      stage
                    ) < i) &&
                    "text-muted-foreground"
                )}
              >
                <span className="text-accent/50 mr-2">0{i + 1}</span>
                {t.stageLabels[language][s]}
              </div>
            )
          )}
        </div>

        {/* Main demo area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
          {/* Left panel - Query & Retrieved */}
          <div className="border-b border-border lg:border-r lg:border-b-0">
            {/* Query input area */}
            <div className="p-6 border-b border-border">
              <div className="font-mono text-xs text-muted-foreground mb-3">
                {t.inputQuery[language]}
              </div>
              <div className="relative">
                <div className="min-h-[60px] p-4 border border-border bg-surface font-mono text-sm">
                  {displayedQuery || (
                    <span className="text-muted-foreground/60">
                      {t.placeholder[language]}
                    </span>
                  )}
                  {stage === "query" && (
                    <span className="inline-block w-2 h-4 bg-accent ml-1 animate-typing-cursor" />
                  )}
                </div>
              </div>
            </div>

            {/* Retrieved chunks */}
            <div className="p-6">
              <div className="font-mono text-xs text-muted-foreground mb-3">
                {t.retrievedChunks[language]} [{retrievedChunks.length}/{selectedPrompt?.chunks.length || 3}]
              </div>
              <div className="flex flex-col gap-3">
                {retrievedChunks.map((chunk, i) => (
                  <div
                    key={chunk.id}
                    className={cn(
                      "p-4 border border-border bg-surface",
                      "animate-offset-slide"
                    )}
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <span className="font-mono text-xs text-accent">
                        {chunk.id}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        score: {chunk.score.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {chunk.text}
                    </p>
                    <div className="mt-2 font-mono text-xs text-muted-foreground/60">
                      {chunk.source}
                    </div>
                  </div>
                ))}
                {stage === "retrieval" && retrievedChunks.length < (selectedPrompt?.chunks.length || 3) && (
                  <div className="h-24 border border-dashed border-border flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-accent border-t-transparent animate-spin" />
                  </div>
                )}
                {stage === "idle" && (
                  <div className="flex h-24 items-center justify-center border border-dashed border-border/50 px-4 text-center">
                    <span className="font-mono text-xs text-muted-foreground/50">
                      {t.awaitingQuery[language]}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right panel - Context & Generation */}
          <div>
            {/* Context assembly */}
            <div className="p-6 border-b border-border">
              <div className="font-mono text-xs text-muted-foreground mb-3">
                {t.contextAssembly[language]}
              </div>
              <div
                className={cn(
                  "min-h-[80px] p-4 border border-border transition-colors duration-500",
                  stage === "context" && "border-accent/50 bg-accent/5"
                )}
              >
                {stage === "context" ||
                stage === "generation" ||
                stage === "complete" ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-accent" />
                      <span className="font-mono text-xs break-words">
                        {selectedPrompt?.chunks.length || 3} {t.chunksMerged[language]} | {selectedPrompt?.stats.tokens || 0} {t.tokens[language]}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-accent/60" />
                      <span className="font-mono text-xs text-muted-foreground">
                        {t.contextOptimized[language]}
                      </span>
                    </div>
                  </div>
                ) : (
                  <span className="text-muted-foreground/60 text-sm">
                    {t.awaitingRetrieval[language]}
                  </span>
                )}
              </div>
            </div>

            {/* Generated response */}
            <div className="p-6">
              <div className="font-mono text-xs text-muted-foreground mb-3">
                {t.generatedResponse[language]}
              </div>
              <div
                className={cn(
                  "min-h-[180px] p-4 border border-border transition-colors duration-500",
                  stage === "generation" && "border-accent/50"
                )}
              >
                {stage === "generation" || stage === "complete" ? (
                  <div>
                    <div className="text-sm leading-relaxed whitespace-pre-line">
                      {generatedText}
                      {stage === "generation" && (
                        <span className="inline-block w-2 h-4 bg-accent ml-1 animate-typing-cursor" />
                      )}
                    </div>
                    {stage === "complete" && selectedPrompt && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 font-mono text-xs text-muted-foreground">
                          <span>
                            <span className="text-accent">{selectedPrompt.stats.sources}</span> {t.sourcesCited[language]}
                          </span>
                          <span className="text-muted-foreground/40">|</span>
                          <span>
                            <span className="text-accent">{selectedPrompt.stats.tokens}</span> {t.tokens[language]}
                          </span>
                          <span className="text-muted-foreground/40">|</span>
                          <span>
                            <span className="text-accent">{selectedPrompt.stats.latency}</span>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="text-muted-foreground/60 text-sm">
                    {t.awaitingContext[language]}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Control bar */}
        <div className="flex flex-col gap-3 border-t border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="font-mono text-xs text-muted-foreground">
            {t.status[language]}:{" "}
            <span className={cn(stage !== "idle" && "text-accent")}>
              {stage.toUpperCase()}
            </span>
          </div>
          {stage !== "idle" && (
            <button
              onClick={() => resetDemo()}
              className="w-full border border-border px-6 py-2 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-all duration-300 hover:border-foreground hover:text-foreground sm:w-auto"
            >
              {t.reset[language]}
            </button>
          )}
        </div>
      </div>

      {/* Bottom metadata */}
      <div className="mt-8 font-mono text-xs text-muted-foreground">
        <span className="text-accent">*</span> {t.footnote[language]}
      </div>
    </section>
  )
}
