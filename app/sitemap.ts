import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.ricardomadeira.dev/",
      changeFrequency: "monthly",
      priority: 1,
    },
  ]
}
