import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glossary — The AI Engineer",
  description: "Key AI engineering terms and concepts explained simply.",
};

const glossary = [
  {
    term: "RAG (Retrieval-Augmented Generation)",
    category: "Architecture",
    definition:
      "A pattern that combines a retrieval system (typically a vector database) with a language model. The model generates responses grounded in retrieved documents, reducing hallucination and enabling knowledge updates without retraining.",
  },
  {
    term: "LoRA (Low-Rank Adaptation)",
    category: "Fine-tuning",
    definition:
      "A parameter-efficient fine-tuning technique that freezes the pre-trained model weights and injects trainable low-rank decomposition matrices. Reduces GPU memory requirements by orders of magnitude while maintaining performance.",
  },
  {
    term: "Mixture of Experts (MoE)",
    category: "Architecture",
    definition:
      "A model architecture where only a subset of parameters (experts) are activated for each input. A gating network routes tokens to the most relevant experts, enabling larger model capacity without proportional compute cost.",
  },
  {
    term: "KV Cache",
    category: "Inference",
    definition:
      "A cache of key and value tensors from previously processed tokens in a transformer model. Avoids redundant computation during autoregressive generation, trading memory for speed. A primary bottleneck in long-context inference.",
  },
  {
    term: "RLHF (Reinforcement Learning from Human Feedback)",
    category: "Training",
    definition:
      "A training technique where a reward model learned from human preferences is used to fine-tune a language model via reinforcement learning. Used to align model outputs with human intent and values.",
  },
  {
    term: "Embedding",
    category: "Fundamentals",
    definition:
      "A dense vector representation of text (or other data) in a continuous vector space. Semantically similar inputs map to nearby vectors, enabling similarity search, clustering, and retrieval.",
  },
  {
    term: "Prompt Engineering",
    category: "Techniques",
    definition:
      "The practice of designing and optimizing input prompts to elicit desired behavior from language models. Includes techniques like few-shot examples, chain-of-thought reasoning, and system prompts.",
  },
  {
    term: "Transformer",
    category: "Architecture",
    definition:
      'The neural network architecture behind modern LLMs. Uses self-attention mechanisms to process sequences in parallel, enabling efficient training on large datasets. Introduced in the "Attention Is All You Need" paper (2017).',
  },
  {
    term: "Tokenization",
    category: "Fundamentals",
    definition:
      "The process of converting text into a sequence of tokens (subword units) that a model can process. Common algorithms include BPE (Byte-Pair Encoding) and SentencePiece. Token count affects cost, latency, and context window usage.",
  },
  {
    term: "Guardrails",
    category: "Production",
    definition:
      "Runtime checks and constraints applied to LLM inputs and outputs to ensure safety, accuracy, and compliance. Includes content filtering, output validation, PII detection, and topic restriction.",
  },
  {
    term: "Agentic AI",
    category: "Architecture",
    definition:
      "AI systems that can autonomously plan, use tools, and take multi-step actions to accomplish goals. Combines LLM reasoning with tool calling, memory, and feedback loops.",
  },
  {
    term: "Quantization",
    category: "Optimization",
    definition:
      "Reducing the numerical precision of model weights (e.g., from 32-bit to 4-bit) to decrease memory usage and increase inference speed with minimal quality loss. Key technique for deploying large models on constrained hardware.",
  },
];

const categories = [...new Set(glossary.map((g) => g.category))].sort();

export default function GlossaryPage() {
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
          Glossary
        </h1>
        <p className="text-muted max-w-xl">
          Key AI engineering terms explained simply. Built for practitioners who
          need quick, accurate definitions.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <span
            key={cat}
            className="text-xs px-3 py-1.5 rounded-full border border-border text-muted hover:border-accent/30 hover:text-accent transition-colors cursor-pointer"
          >
            {cat}
          </span>
        ))}
      </div>

      <div className="space-y-4">
        {glossary.map((item, i) => (
          <div
            key={i}
            className="border border-border rounded-2xl p-6 bg-card hover:border-accent/30 transition-colors"
          >
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h2 className="text-lg font-semibold">{item.term}</h2>
              <span className="text-xs px-2.5 py-1 rounded-full bg-accent/5 text-accent border border-accent/20">
                {item.category}
              </span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              {item.definition}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
