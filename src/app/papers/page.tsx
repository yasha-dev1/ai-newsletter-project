import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Papers — The AI Engineer",
  description: "Key research papers distilled for AI engineering practitioners.",
};

const papers = [
  {
    title: "KV-Cache Compression for Long-Context Transformer Models",
    authors: "Zhang et al.",
    source: "arXiv 2026",
    summary:
      "Proposes a dynamic compression scheme for key-value caches that reduces memory usage by 4x while maintaining 98% of model quality. Critical for deploying long-context models in production.",
    tags: ["Inference", "Optimization", "Transformers"],
    impact: "High",
  },
  {
    title: "Scaling Test-Time Compute Optimally",
    authors: "Snell et al.",
    source: "arXiv 2026",
    summary:
      "Analyzes when and how to allocate additional compute at inference time. Finds that adaptive compute strategies outperform fixed budgets by 15-30% across reasoning benchmarks.",
    tags: ["Reasoning", "Inference", "Scaling"],
    impact: "High",
  },
  {
    title: "Constitutional AI: Harmlessness from AI Feedback",
    authors: "Bai et al., Anthropic",
    source: "Anthropic 2025",
    summary:
      "Introduces a method for training AI systems to be helpful, harmless, and honest using AI-generated feedback rather than human labels. Foundation for modern alignment techniques.",
    tags: ["Alignment", "Safety", "RLHF"],
    impact: "Foundational",
  },
  {
    title: "Mixture-of-Agents: Collaborative LLM Reasoning",
    authors: "Wang et al.",
    source: "arXiv 2026",
    summary:
      "Demonstrates that routing queries to specialized model ensembles can outperform single large models while reducing total compute by 40%. Practical framework for multi-model architectures.",
    tags: ["Agents", "Architecture", "Efficiency"],
    impact: "Medium",
  },
  {
    title: "Retrieval-Augmented Generation for Knowledge-Intensive Tasks",
    authors: "Lewis et al.",
    source: "NeurIPS 2024",
    summary:
      "The foundational RAG paper. Combines parametric and non-parametric memory to ground LLM outputs in retrieved documents, reducing hallucination and enabling knowledge updates without retraining.",
    tags: ["RAG", "Retrieval", "Foundational"],
    impact: "Foundational",
  },
  {
    title: "LoRA: Low-Rank Adaptation of Large Language Models",
    authors: "Hu et al.",
    source: "ICLR 2024",
    summary:
      "Introduces low-rank matrix decomposition for efficient fine-tuning. Reduces trainable parameters by 10,000x while matching full fine-tuning performance. Now the standard for model customization.",
    tags: ["Fine-tuning", "Efficiency", "Foundational"],
    impact: "Foundational",
  },
];

function ImpactBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    High: "bg-accent/10 text-accent border-accent/20",
    Medium: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    Foundational: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  };
  return (
    <span
      className={`text-xs px-2.5 py-1 rounded-full border font-medium ${colors[level] || ""}`}
    >
      {level}
    </span>
  );
}

export default function PapersPage() {
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
          AI Papers
        </h1>
        <p className="text-muted max-w-xl">
          Key research papers distilled for practitioners. We focus on papers
          with direct engineering impact.
        </p>
      </div>
      <div className="space-y-6">
        {papers.map((paper, i) => (
          <article
            key={i}
            className="border border-border rounded-2xl p-6 hover:border-accent/30 hover:bg-card-hover transition-all bg-card"
          >
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="text-xs text-muted font-mono">
                {paper.source}
              </span>
              <span className="text-xs text-muted">&middot;</span>
              <span className="text-xs text-muted">{paper.authors}</span>
              <ImpactBadge level={paper.impact} />
            </div>
            <h2 className="text-xl font-semibold mb-2">{paper.title}</h2>
            <p className="text-sm text-muted leading-relaxed mb-4">
              {paper.summary}
            </p>
            <div className="flex flex-wrap gap-2">
              {paper.tags.map((tag) => (
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
