import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Context Engineering for AI Agents — Glossary | The AI Engineer",
  description:
    "A comprehensive, engineer-first glossary of context engineering terms for AI agents. Covers context windows, memory architectures, retrieval strategies, prompt construction, and agent frameworks.",
};

const glossary = [
  // ── CONTEXT FUNDAMENTALS ──────────────────────────────────────────────────
  {
    term: "Context Window",
    category: "Context Fundamentals",
    definition:
      "The maximum number of tokens a model can attend to in a single forward pass — both input prompt and generated output combined. Measured in tokens, not characters. GPT-4o supports up to 128 k tokens; Gemini 1.5 Pro extends to 1 M. Exceeding the limit requires truncation, summarisation, or retrieval strategies. The context window is the primary resource constraint in agentic systems.",
    seeAlso: ["KV Cache", "Context Compression", "Long-Context Retrieval"],
  },
  {
    term: "Context Engineering",
    category: "Context Fundamentals",
    definition:
      "The discipline of deliberately constructing, managing, and optimising the information placed inside a model's context window to maximise task performance. Goes beyond prompt engineering by treating the context as a dynamic, structured resource — deciding what to include, what to exclude, in what order, and at what level of detail. Encompasses retrieval, summarisation, memory management, tool-call results, and inter-agent message passing.",
    seeAlso: ["Prompt Engineering", "Memory Architecture", "Retrieval-Augmented Generation (RAG)"],
  },
  {
    term: "Context Budget",
    category: "Context Fundamentals",
    definition:
      "The deliberate allocation of token capacity across the different slots of a context window: system prompt, retrieved documents, conversation history, tool results, and output headroom. Effective context budgeting prevents overflow, reduces cost, and ensures the highest-signal information is always present. Analogous to memory management in systems programming.",
    seeAlso: ["Context Window", "Context Compression"],
  },
  {
    term: "Context Poisoning",
    category: "Context Fundamentals",
    definition:
      "The degradation of model behaviour caused by irrelevant, contradictory, or adversarially injected content in the context window. Can arise from noisy retrieval results, malicious tool outputs, or prompt injection attacks. A key reliability concern in production agentic systems.",
    seeAlso: ["Prompt Injection", "Guardrails"],
  },
  {
    term: "Lost-in-the-Middle Problem",
    category: "Context Fundamentals",
    definition:
      "An empirically observed failure mode where transformer models attend poorly to information positioned in the middle of a long context, performing best on content near the beginning or end. Documented in Liu et al. (2023). Motivates placement strategies that put the most critical information at context boundaries.",
    seeAlso: ["Context Window", "Long-Context Retrieval"],
  },

  // ── MEMORY ARCHITECTURE ───────────────────────────────────────────────────
  {
    term: "Memory Architecture",
    category: "Memory Architecture",
    definition:
      "The design of how an AI agent stores, retrieves, and updates information across time. Typically decomposed into four tiers: (1) in-context (working memory inside the active window), (2) external (vector/relational databases), (3) in-weights (knowledge baked into model parameters via training), and (4) in-cache (KV cache persisted across turns). Choosing the right tier for each type of information is a core context engineering decision.",
    seeAlso: ["KV Cache", "Episodic Memory", "Semantic Memory"],
  },
  {
    term: "Episodic Memory",
    category: "Memory Architecture",
    definition:
      "Storage of specific past events, interactions, or observations tied to a temporal context — the agent's equivalent of autobiographical memory. Typically implemented as a vector store of timestamped interaction summaries. Enables agents to recall what happened in a previous session, user preference history, or prior tool-call results.",
    seeAlso: ["Semantic Memory", "Memory Architecture"],
  },
  {
    term: "Semantic Memory",
    category: "Memory Architecture",
    definition:
      "Storage of general facts, domain knowledge, and concepts, independent of when or how they were learned. In agentic systems, typically backed by a vector database of chunked documents. Provides the agent's 'world knowledge' beyond its training cut-off.",
    seeAlso: ["Episodic Memory", "Retrieval-Augmented Generation (RAG)"],
  },
  {
    term: "Working Memory",
    category: "Memory Architecture",
    definition:
      "The subset of information actively held in the context window during a single inference call. Analogous to RAM in a computer — fast, limited, and volatile. Everything the model 'knows' at inference time must be present here, either directly or via tool-call retrieval.",
    seeAlso: ["Context Window", "Memory Architecture", "Context Budget"],
  },
  {
    term: "Memory Consolidation",
    category: "Memory Architecture",
    definition:
      "The process of distilling raw interaction history into compact, durable representations for long-term storage. Techniques include LLM-generated summaries, entity extraction, and importance-weighted pruning. Prevents unbounded growth of episodic stores and keeps retrieval precision high.",
    seeAlso: ["Episodic Memory", "Context Compression"],
  },

  // ── RETRIEVAL & GROUNDING ─────────────────────────────────────────────────
  {
    term: "Retrieval-Augmented Generation (RAG)",
    category: "Retrieval & Grounding",
    definition:
      "An architecture that augments LLM generation by retrieving relevant documents from an external store at inference time and injecting them into the context window. Decouples knowledge from model weights, enabling up-to-date answers without retraining. The retrieval step typically uses dense vector similarity (ANN search) over embedded document chunks.",
    seeAlso: ["Semantic Memory", "Chunking Strategy", "Re-ranking"],
  },
  {
    term: "Chunking Strategy",
    category: "Retrieval & Grounding",
    definition:
      "The method by which source documents are split into retrievable units before embedding. Common strategies: fixed-size (e.g., 512 tokens with overlap), sentence-boundary, paragraph, semantic (cluster sentences by meaning), and recursive character splitting. Chunk size directly impacts retrieval precision and context utilisation — too large wastes budget; too small loses coherence.",
    seeAlso: ["Retrieval-Augmented Generation (RAG)", "Embedding"],
  },
  {
    term: "Re-ranking",
    category: "Retrieval & Grounding",
    definition:
      "A second-stage retrieval step that reorders an initial set of candidate documents using a more computationally expensive cross-encoder model (e.g., Cohere Rerank, BGE-Reranker). Improves precision over pure vector similarity, which can surface topically related but contextually irrelevant chunks. Essential in production RAG pipelines where context budget is tight.",
    seeAlso: ["Retrieval-Augmented Generation (RAG)", "Context Budget"],
  },
  {
    term: "Long-Context Retrieval",
    category: "Retrieval & Grounding",
    definition:
      "Retrieval strategies optimised for models with large context windows (>100 k tokens), where entire documents or long transcripts can be included rather than chunked. Trades retrieval precision for completeness. Still subject to the lost-in-the-middle problem; placement and structure of retrieved content matters.",
    seeAlso: ["Context Window", "Lost-in-the-Middle Problem", "Retrieval-Augmented Generation (RAG)"],
  },
  {
    term: "Hypothetical Document Embedding (HyDE)",
    category: "Retrieval & Grounding",
    definition:
      "A retrieval technique where the LLM first generates a hypothetical answer to a query, then embeds that answer to search the vector store — rather than embedding the raw query. Bridges the vocabulary gap between short queries and longer document chunks, improving recall on sparse or ambiguous queries. Introduced by Gao et al. (2022).",
    seeAlso: ["Retrieval-Augmented Generation (RAG)", "Embedding"],
  },

  // ── PROMPT CONSTRUCTION ───────────────────────────────────────────────────
  {
    term: "Prompt Engineering",
    category: "Prompt Construction",
    definition:
      "The practice of crafting model inputs — instructions, examples, constraints, and formatting — to elicit desired outputs. A subset of context engineering focused on the static, human-authored portions of the context. Techniques include zero-shot, few-shot, chain-of-thought (CoT), and self-consistency prompting.",
    seeAlso: ["Context Engineering", "System Prompt", "Few-Shot Prompting"],
  },
  {
    term: "System Prompt",
    category: "Prompt Construction",
    definition:
      "A privileged, persistent instruction block prepended to the context window that defines the model's role, constraints, output format, and tool access. In multi-turn agents, the system prompt is the most stable context component. Poorly designed system prompts are a leading cause of inconsistent agent behaviour in production.",
    seeAlso: ["Prompt Engineering", "Context Budget"],
  },
  {
    term: "Few-Shot Prompting",
    category: "Prompt Construction",
    definition:
      "Providing the model with a small number of input-output examples within the context window to demonstrate the desired task format or reasoning pattern. More reliable than zero-shot for structured outputs. Selection of examples (random vs. retrieved by similarity) significantly impacts performance.",
    seeAlso: ["Prompt Engineering", "In-Context Learning"],
  },
  {
    term: "Chain-of-Thought (CoT) Prompting",
    category: "Prompt Construction",
    definition:
      "A prompting technique that elicits step-by-step intermediate reasoning before the final answer, improving performance on multi-step arithmetic, logic, and planning tasks. Introduced by Wei et al. (2022). Variants include zero-shot CoT ('Let\\'s think step by step'), self-consistency CoT (majority vote over multiple reasoning paths), and tree-of-thought (branching search over reasoning steps).",
    seeAlso: ["Few-Shot Prompting", "Scratchpad"],
  },
  {
    term: "Prompt Injection",
    category: "Prompt Construction",
    definition:
      "An attack where adversarial instructions embedded in external content (web pages, documents, tool outputs) override or hijack the agent's intended behaviour. The model cannot reliably distinguish between trusted system instructions and untrusted data. A critical security concern for agents with web browsing or document-reading capabilities. Mitigations include input sanitisation, privilege separation, and output validation.",
    seeAlso: ["Context Poisoning", "Guardrails"],
  },

  // ── AGENT FRAMEWORKS ──────────────────────────────────────────────────────
  {
    term: "Agentic Loop",
    category: "Agent Frameworks",
    definition:
      "The core execution cycle of an AI agent: (1) receive observation, (2) update context, (3) reason/plan, (4) select and call a tool, (5) receive tool result, (6) repeat until goal is met or stopping condition is reached. Context engineering determines what information is carried forward at each iteration and how tool results are incorporated.",
    seeAlso: ["Tool Calling", "ReAct", "Scratchpad"],
  },
  {
    term: "ReAct (Reason + Act)",
    category: "Agent Frameworks",
    definition:
      "An agent prompting pattern that interleaves reasoning traces ('Thought:') with action calls ('Action:') and observations ('Observation:') in a single context stream. Introduced by Yao et al. (2022). The interleaved trace serves as the agent's working memory and makes reasoning inspectable. Widely adopted as the default pattern in LangChain, LlamaIndex, and similar frameworks.",
    seeAlso: ["Agentic Loop", "Chain-of-Thought (CoT) Prompting", "Scratchpad"],
  },
  {
    term: "Tool Calling",
    category: "Agent Frameworks",
    definition:
      "The mechanism by which a model emits a structured request to invoke an external function (API, database query, code executor, web search) and receives the result back in context. Standardised via OpenAI's function-calling API and Anthropic's tool-use API. Tool results consume context budget and must be managed carefully in long-running agents.",
    seeAlso: ["Agentic Loop", "Context Budget", "ReAct"],
  },
  {
    term: "Scratchpad",
    category: "Agent Frameworks",
    definition:
      "A designated region of the context window used for intermediate reasoning, planning, or draft outputs that are not part of the final response. Provides the model with space to 'think out loud' before committing to an answer or action. In some frameworks, the scratchpad is hidden from end users but retained for subsequent agent steps.",
    seeAlso: ["Chain-of-Thought (CoT) Prompting", "Working Memory", "ReAct"],
  },
  {
    term: "Multi-Agent Context Passing",
    category: "Agent Frameworks",
    definition:
      "The protocols and data structures used to transfer state between agents in a multi-agent system. Includes full context forwarding (expensive but lossless), summary-based handoff (lossy but compact), structured message schemas, and shared external memory. The design of inter-agent context interfaces is a primary determinant of system coherence and cost.",
    seeAlso: ["Memory Architecture", "Context Budget", "Agentic Loop"],
  },

  // ── OPTIMISATION TECHNIQUES ───────────────────────────────────────────────
  {
    term: "Context Compression",
    category: "Optimisation Techniques",
    definition:
      "Techniques that reduce the token footprint of information before or after it enters the context window. Methods include: LLM-based summarisation, selective extraction (keep only relevant sentences), token pruning (remove low-attention tokens post-hoc), and AutoCompressor (trained compression models). Essential for long-running agents where history accumulates rapidly.",
    seeAlso: ["Context Budget", "Memory Consolidation", "KV Cache"],
  },
  {
    term: "KV Cache",
    category: "Optimisation Techniques",
    definition:
      "A cache of key and value tensors computed for previously processed tokens in a transformer. Avoids recomputing attention for the prefix on each new token during autoregressive generation. In agentic systems, persistent KV caches (prefix caching) allow reuse of the system prompt and static context across requests, significantly reducing latency and cost. Supported natively by Anthropic, OpenAI, and most inference frameworks.",
    seeAlso: ["Context Window", "Context Compression"],
  },
  {
    term: "In-Context Learning (ICL)",
    category: "Optimisation Techniques",
    definition:
      "The ability of large language models to adapt their behaviour based solely on examples or instructions provided in the context window, without any gradient updates. Emerges at scale and is the mechanism underlying few-shot prompting. ICL performance is sensitive to example order, format, and label balance — all context engineering concerns.",
    seeAlso: ["Few-Shot Prompting", "Context Window"],
  },
  {
    term: "Embedding",
    category: "Optimisation Techniques",
    definition:
      "A dense vector representation of text (or other data) in a continuous high-dimensional space, produced by an encoder model. Semantically similar texts map to nearby vectors, enabling efficient similarity search over large corpora. The quality of embeddings is the foundation of any RAG or semantic memory system. State-of-the-art models include OpenAI text-embedding-3-large, Cohere embed-v3, and open-source alternatives like BGE and E5.",
    seeAlso: ["Retrieval-Augmented Generation (RAG)", "Chunking Strategy", "Semantic Memory"],
  },
  {
    term: "Guardrails",
    category: "Optimisation Techniques",
    definition:
      "Runtime validation layers applied to LLM inputs and outputs to enforce safety, accuracy, and compliance constraints. Input guardrails sanitise prompts and detect injection attempts; output guardrails validate format, filter harmful content, and check factual grounding. Libraries include Guardrails AI, NVIDIA NeMo Guardrails, and LlamaGuard. In context engineering, guardrails also prevent context poisoning from untrusted external sources.",
    seeAlso: ["Context Poisoning", "Prompt Injection"],
  },
];

const categories = [...new Set(glossary.map((g) => g.category))];

const termCount = glossary.length;

export default function ContextEngineeringGlossaryPage() {
  return (
    <main className="flex-1 max-w-6xl mx-auto px-6 py-16">
      {/* Breadcrumb */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-xs text-muted mb-4">
          <Link href="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/glossary" className="hover:text-accent transition-colors">
            Glossary
          </Link>
          <span>/</span>
          <span className="text-foreground">Context Engineering</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Context Engineering for AI Agents
        </h1>
        <p className="text-muted max-w-2xl mb-4">
          A comprehensive, engineer-first reference covering every key concept
          in context engineering — from context window mechanics and memory
          architectures to retrieval strategies, prompt construction patterns,
          and agent frameworks. {termCount} terms across {categories.length}{" "}
          categories.
        </p>
        <div className="flex flex-wrap gap-3 text-xs text-muted">
          <span className="px-3 py-1 rounded-full bg-accent/5 border border-accent/20 text-accent">
            {termCount} terms
          </span>
          <span className="px-3 py-1 rounded-full border border-border">
            Last updated: April 2026
          </span>
          <span className="px-3 py-1 rounded-full border border-border">
            Engineer-first · No hype
          </span>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <a
            key={cat}
            href={`#${cat.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "")}`}
            className="text-xs px-3 py-1.5 rounded-full border border-border text-muted hover:border-accent/30 hover:text-accent transition-colors"
          >
            {cat}
          </a>
        ))}
      </div>

      {/* Terms grouped by category */}
      {categories.map((cat) => (
        <section
          key={cat}
          id={cat.toLowerCase().replace(/\s+/g, "-").replace(/[()]/g, "")}
          className="mb-14"
        >
          <h2 className="text-xl font-semibold mb-5 pb-2 border-b border-border">
            {cat}
          </h2>
          <div className="space-y-4">
            {glossary
              .filter((item) => item.category === cat)
              .map((item, i) => (
                <div
                  key={i}
                  id={item.term
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[()]/g, "")
                    .replace(/,/g, "")}
                  className="border border-border rounded-2xl p-6 bg-card hover:border-accent/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-lg font-semibold">{item.term}</h3>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-accent/5 text-accent border border-accent/20">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed mb-3">
                    {item.definition}
                  </p>
                  {item.seeAlso && item.seeAlso.length > 0 && (
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-xs text-muted">See also:</span>
                      {item.seeAlso.map((related) => (
                        <a
                          key={related}
                          href={`#${related
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/[()]/g, "")
                            .replace(/,/g, "")}`}
                          className="text-xs px-2 py-0.5 rounded border border-border text-muted hover:text-accent hover:border-accent/30 transition-colors"
                        >
                          {related}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </section>
      ))}

      {/* Footer nav */}
      <div className="mt-16 pt-8 border-t border-border flex flex-wrap gap-4 justify-between items-center text-xs text-muted">
        <Link
          href="/glossary"
          className="hover:text-accent transition-colors flex items-center gap-1"
        >
          &larr; All Glossary Terms
        </Link>
        <span>
          Missing a term?{" "}
          <a
            href="https://github.com/yasha-dev1/ai-newsletter-project/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Open an issue on GitHub
          </a>
        </span>
      </div>
    </main>
  );
}
