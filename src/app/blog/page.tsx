import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — The AI Engineer",
  description: "In-depth articles on AI engineering topics.",
};

const posts = [
  {
    slug: "reliable-ai-pipelines-langgraph",
    title: "Building Reliable AI Pipelines with LangGraph",
    excerpt:
      "How to design fault-tolerant, observable AI pipelines using LangGraph's state machine approach. We cover retry strategies, checkpointing, and monitoring patterns.",
    date: "Mar 25, 2026",
    readTime: "12 min",
    tags: ["LangGraph", "Pipelines", "Production"],
  },
  {
    slug: "vector-databases-comparison",
    title: "Vector Databases: A Practical Comparison for 2026",
    excerpt:
      "We benchmarked Pinecone, Weaviate, Qdrant, Milvus, and pgvector across latency, cost, and developer experience. Here's what we found.",
    date: "Mar 18, 2026",
    readTime: "8 min",
    tags: ["Vector DB", "RAG", "Infrastructure"],
  },
  {
    slug: "prototype-to-production-llm",
    title: "From Prototype to Production: LLM Best Practices",
    excerpt:
      "The gap between a working demo and a production LLM app is massive. This guide covers evaluation, guardrails, caching, and cost optimization.",
    date: "Mar 11, 2026",
    readTime: "15 min",
    tags: ["LLM", "Production", "Best Practices"],
  },
  {
    slug: "structured-output-patterns",
    title: "Structured Output Patterns for LLM Applications",
    excerpt:
      "Getting reliable JSON, SQL, and code from language models. We explore constrained decoding, function calling, and validation strategies.",
    date: "Mar 4, 2026",
    readTime: "10 min",
    tags: ["LLM", "Structured Output", "Patterns"],
  },
  {
    slug: "evaluation-driven-development",
    title: "Evaluation-Driven Development for AI Features",
    excerpt:
      "Why evals are the new tests. A practical framework for building evaluation suites that catch regressions before your users do.",
    date: "Feb 25, 2026",
    readTime: "11 min",
    tags: ["Evaluation", "Testing", "Methodology"],
  },
];

export default function BlogPage() {
  return (
    <main className="flex-1 max-w-6xl mx-auto px-6 py-16">
      <div className="mb-12">
        <Link
          href="/"
          className="text-xs text-muted hover:text-accent transition-colors mb-4 inline-block"
        >
          &larr; Home
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Blog
        </h1>
        <p className="text-muted max-w-xl">
          In-depth articles on AI engineering — from architecture patterns to
          production best practices.
        </p>
      </div>
      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="border border-border rounded-2xl p-6 hover:border-accent/30 hover:bg-card-hover transition-all cursor-pointer bg-card"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs text-muted">{post.date}</span>
              <span className="text-xs text-muted">&middot;</span>
              <span className="text-xs text-muted">{post.readTime} read</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-sm text-muted leading-relaxed mb-4">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full border border-border text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
