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
      en: `Ricardo builds fullstack applications and AI systems, with a focus on retrieval-augmented generation (RAG).

His work centers on:
• building systems that return verifiable answers
• designing interfaces that expose how AI decisions are made
• creating maintainable, production-ready architectures

Examples include:
• STARK: local-first document assistant with citations
• Draft: RFP automation system using structured retrieval
• Events Platform: production system managing real users and operations`,
      "pt-PT": `O Ricardo constrói aplicações fullstack e sistemas de IA, com foco em retrieval-augmented generation (RAG).

O seu trabalho centra-se em:
• construir sistemas que retornam respostas verificáveis
• desenhar interfaces que expõem como as decisões de IA são tomadas
• criar arquitecturas prontas para produção e fáceis de manter

Exemplos incluem:
• STARK: assistente de documentos local-first com citações
• Draft: sistema de automação de RFPs usando retrieval estruturado
• Events Platform: sistema em produção a gerir utilizadores e operações reais`,
      es: `Ricardo construye aplicaciones fullstack y sistemas de IA, con enfoque en retrieval-augmented generation (RAG).

Su trabajo se centra en:
• construir sistemas que devuelven respuestas verificables
• diseñar interfaces que exponen cómo se toman las decisiones de IA
• crear arquitecturas mantenibles y listas para producción

Ejemplos incluyen:
• STARK: asistente de documentos local-first con citas
• Draft: sistema de automatización de RFPs usando retrieval estructurado
• Events Platform: sistema en producción gestionando usuarios y operaciones reales`,
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
      en: `STARK is a local-first AI document assistant designed for privacy and traceability.

Key characteristics:
• Runs entirely on local files — no data leaves your machine
• Every answer includes citations pointing to specific sources
• Built for document analysis workflows where accuracy matters

The system uses RAG architecture to retrieve relevant chunks from your documents before generating responses, ensuring answers are grounded in your actual data rather than hallucinated.`,
      "pt-PT": `O STARK é um assistente de documentos de IA local-first, desenhado para privacidade e rastreabilidade.

Características principais:
• Corre inteiramente em ficheiros locais — nenhum dado sai da sua máquina
• Cada resposta inclui citações que apontam para fontes específicas
• Construído para workflows de análise de documentos onde a precisão importa

O sistema usa arquitectura RAG para recuperar chunks relevantes dos seus documentos antes de gerar respostas, garantindo que as respostas se baseiam nos seus dados reais em vez de serem alucinadas.`,
      es: `STARK es un asistente de documentos de IA local-first diseñado para privacidad y trazabilidad.

Características clave:
• Funciona completamente en archivos locales — ningún dato sale de tu máquina
• Cada respuesta incluye citas que apuntan a fuentes específicas
• Construido para flujos de trabajo de análisis de documentos donde la precisión importa

El sistema usa arquitectura RAG para recuperar chunks relevantes de tus documentos antes de generar respuestas, asegurando que las respuestas se basen en tus datos reales en lugar de ser alucinadas.`,
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
      en: `This demo visualizes a RAG (Retrieval-Augmented Generation) pipeline in action.

The four stages shown:
• Query: Your question is processed and embedded
• Retrieval: Relevant document chunks are found via similarity search
• Context: Retrieved chunks are assembled into a coherent context window
• Generation: The LLM generates a response grounded in the retrieved context

Each response includes source citations and metadata (tokens, latency) to demonstrate the traceability that RAG enables.`,
      "pt-PT": `Esta demo visualiza um pipeline RAG (Retrieval-Augmented Generation) em acção.

As quatro fases mostradas:
• Query: A sua pergunta é processada e convertida em embedding
• Retrieval: Chunks de documentos relevantes são encontrados via pesquisa por similaridade
• Context: Os chunks recuperados são montados numa janela de contexto coerente
• Generation: O LLM gera uma resposta baseada no contexto recuperado

Cada resposta inclui citações de fontes e metadados (tokens, latência) para demonstrar a rastreabilidade que o RAG permite.`,
      es: `Esta demo visualiza un pipeline RAG (Retrieval-Augmented Generation) en acción.

Las cuatro etapas mostradas:
• Query: Tu pregunta es procesada y convertida en embedding
• Retrieval: Se encuentran chunks de documentos relevantes mediante búsqueda por similitud
• Context: Los chunks recuperados se ensamblan en una ventana de contexto coherente
• Generation: El LLM genera una respuesta basada en el contexto recuperado

Cada respuesta incluye citas de fuentes y metadatos (tokens, latencia) para demostrar la trazabilidad que RAG permite.`,
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
    en: "Interactive visualization of retrieval-augmented generation. Ask a question to see how queries transform into contextual responses.",
    "pt-PT": "Visualização interactiva de retrieval-augmented generation. Faça uma pergunta para ver como as queries se transformam em respostas contextuais.",
    es: "Visualización interactiva de retrieval-augmented generation. Haz una pregunta para ver cómo las queries se transforman en respuestas contextuales.",
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
    en: "STATUS",
    "pt-PT": "ESTADO",
    es: "ESTADO",
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
      className="px-6 py-24 md:px-12 lg:px-24 bg-surface border-y border-border"
    >
      {/* Section header */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <div className="font-mono text-xs text-muted-foreground tracking-widest">
            <span className="text-accent">//</span> {t.sectionLabel[language]}
          </div>
          <div className="font-mono text-[10px] text-muted-foreground tracking-widest">
            RAG_SYSTEM
          </div>
        </div>
        <h2 className="text-4xl md:text-5xl font-light tracking-tight">
          {t.title[language]}
        </h2>
        <p className="mt-4 text-muted-foreground max-w-xl">
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
                  "px-4 py-2 border border-border font-mono text-xs transition-all duration-200",
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
        <div className="flex border-b border-border">
          {(["query", "retrieval", "context", "generation"] as const).map(
            (s, i) => (
              <div
                key={s}
                className={cn(
                  "flex-1 px-4 py-3 font-mono text-xs uppercase tracking-wider border-r border-border last:border-r-0 transition-colors duration-300",
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
          <div className="border-r border-border">
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
                    <div className="flex items-center justify-between mb-2">
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
                  <div className="h-24 border border-dashed border-border/50 flex items-center justify-center">
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
                      <span className="font-mono text-xs">
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
                        <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
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
        <div className="flex items-center justify-between p-4 border-t border-border bg-surface">
          <div className="font-mono text-xs text-muted-foreground">
            {t.status[language]}:{" "}
            <span className={cn(stage !== "idle" && "text-accent")}>
              {stage.toUpperCase()}
            </span>
          </div>
          {stage !== "idle" && (
            <button
              onClick={() => resetDemo()}
              className="px-6 py-2 border border-border text-muted-foreground font-mono text-xs uppercase tracking-wider transition-all duration-300 hover:border-foreground hover:text-foreground"
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
