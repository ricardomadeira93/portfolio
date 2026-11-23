const body = `# Ricardo Madeira

> Full Stack Developer based in Portugal, working remotely. Builds web applications in production with React, Next.js, TypeScript, Python/FastAPI and .NET. Languages: Portuguese, English, Spanish.

## Current work

- Winning (Alan Allman Associates), since May 2026: full stack developer on a public geospatial portal for the public administration. React, TypeScript and Vite on the front end, .NET 10 on the back end, PostgreSQL/PostGIS and SQL Server, GeoServer, GeoNetwork, pygeoapi, Martin and ScalarGIS in Docker Compose.

## Earlier work

- Betacode, 2024 to May 2026: Next.js, React, Python and FastAPI applications in production, including RAG pipelines and LLM integrations.
- CoderStein Portugal, July 2023 to July 2024: frontend on a large-scale event management platform.
- Forma Studio, since October 2022: freelance websites and landing pages for small businesses.

## Projects

- STARK: local document assistant with hybrid retrieval (semantic search, BM25, cross-encoder reranking). https://stark-snowy.vercel.app/
- Draft: RFP and security questionnaire automation with LangChain and Pinecone. https://draft-pink.vercel.app

## Links

- Site: https://www.ricardomadeira.dev/
- GitHub: https://github.com/ricardomadeira93/
- LinkedIn: https://www.linkedin.com/in/ricardo-madeira-8ab393280/
`

export function GET() {
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
