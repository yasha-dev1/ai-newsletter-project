import { MetadataRoute } from 'next'

const BASE_URL = 'https://ai-newsletter-project.vercel.app'

const blogPosts = [
  { slug: 'reliable-ai-pipelines-langgraph', lastModified: '2026-03-25' },
  { slug: 'vector-databases-comparison', lastModified: '2026-03-18' },
  { slug: 'prototype-to-production-llm', lastModified: '2026-03-11' },
  { slug: 'structured-output-patterns', lastModified: '2026-03-04' },
  { slug: 'evaluation-driven-development', lastModified: '2026-02-25' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date('2026-04-04'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date('2026-03-25'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/papers`,
      lastModified: new Date('2026-04-04'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/glossary`,
      lastModified: new Date('2026-04-04'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.lastModified),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...blogRoutes]
}