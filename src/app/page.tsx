import Link from "next/link";

function SubscribeForm() {
  return (
    <div id="subscribe" className="w-full max-w-md">
      <form className="flex gap-2">
        <input
          type="email"
          placeholder="you@company.com"
          className="flex-1 px-4 py-3 rounded-full border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all placeholder:text-muted"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent-light transition-colors shrink-0"
        >
          Subscribe
        </button>
      </form>
      <p className="text-xs text-muted mt-3">
        Free weekly digest. No spam. Unsubscribe anytime.
      </p>
    </div>
  );
}

function SectionCard({
  href,
  label,
  title,
  description,
  items,
}: {
  href: string;
  label: string;
  title: string;
  description: string;
  items: { title: string; meta: string }[];
}) {
  return (
    <div className="border border-border rounded-2xl p-6 hover:border-accent/30 transition-colors bg-card">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-accent">
          {label}
        </span>
        <Link
          href={href}
          className="text-xs text-muted hover:text-accent transition-colors"
        >
          View all &rarr;
        </Link>
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-muted mb-5">{description}</p>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-sm group cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent/60 mt-2 shrink-0 group-hover:bg-accent transition-colors" />
            <div>
              <span className="font-medium group-hover:text-accent transition-colors">
                {item.title}
              </span>
              <span className="block text-xs text-muted mt-0.5">
                {item.meta}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const latestIssues = [
  {
    number: 42,
    title: "The Rise of Small Language Models",
    date: "Mar 28, 2026",
    summary:
      "Why smaller, specialized models are winning in production. Plus: new fine-tuning techniques and deployment patterns.",
  },
  {
    number: 41,
    title: "RAG in Production: Lessons Learned",
    date: "Mar 21, 2026",
    summary:
      "Battle-tested patterns for retrieval-augmented generation at scale. Common pitfalls and how to avoid them.",
  },
  {
    number: 40,
    title: "AI Agents That Actually Work",
    date: "Mar 14, 2026",
    summary:
      "Moving beyond demos to production-grade AI agents. Tool use, evaluation, and reliability engineering.",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-xs font-medium text-accent mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Issue #42 is live
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-5">
            Stay ahead in{" "}
            <span className="text-accent">AI Engineering</span>
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-8 max-w-xl">
            A curated weekly newsletter for AI engineers. Papers, tools,
            tutorials, and insights — everything you need to build with AI,
            delivered every Friday.
          </p>
          <SubscribeForm />
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-bold">42</div>
            <div className="text-xs text-muted mt-1">Issues Published</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold">5,200+</div>
            <div className="text-xs text-muted mt-1">Subscribers</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold">68%</div>
            <div className="text-xs text-muted mt-1">Open Rate</div>
          </div>
        </div>
      </section>

      {/* Latest Issues */}
      <section className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
        <h2 className="text-2xl font-bold tracking-tight mb-8">
          Latest Issues
        </h2>
        <div className="space-y-4">
          {latestIssues.map((issue) => (
            <article
              key={issue.number}
              className="border border-border rounded-2xl p-6 hover:border-accent/30 hover:bg-card-hover transition-all cursor-pointer bg-card"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono text-accent">
                  #{issue.number}
                </span>
                <span className="text-xs text-muted">{issue.date}</span>
              </div>
              <h3 className="text-lg font-semibold mb-1">{issue.title}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {issue.summary}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Content Sections */}
      <section className="max-w-6xl mx-auto px-6 pb-16 sm:pb-20">
        <h2 className="text-2xl font-bold tracking-tight mb-8">
          Explore Content
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SectionCard
            href="/blog"
            label="Blog"
            title="Deep Dives"
            description="In-depth articles on AI engineering topics."
            items={[
              {
                title: "Building Reliable AI Pipelines with LangGraph",
                meta: "12 min read",
              },
              {
                title: "Vector Databases: A Practical Comparison",
                meta: "8 min read",
              },
              {
                title: "From Prototype to Production: LLM Best Practices",
                meta: "15 min read",
              },
            ]}
          />
          <SectionCard
            href="/papers"
            label="AI Papers"
            title="Paper Summaries"
            description="Key research papers distilled for practitioners."
            items={[
              {
                title: "KV-Cache Compression for Long-Context Models",
                meta: "arXiv 2026",
              },
              {
                title: "Scaling Test-Time Compute Optimally",
                meta: "arXiv 2026",
              },
              {
                title: "Constitutional AI: Harmlessness from Feedback",
                meta: "Anthropic 2025",
              },
            ]}
          />
          <SectionCard
            href="/glossary"
            label="Glossary"
            title="AI A-Z"
            description="Key terms and concepts explained simply."
            items={[
              {
                title: "Retrieval-Augmented Generation (RAG)",
                meta: "Architecture pattern",
              },
              {
                title: "LoRA (Low-Rank Adaptation)",
                meta: "Fine-tuning technique",
              },
              {
                title: "Mixture of Experts (MoE)",
                meta: "Model architecture",
              },
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Join 5,200+ AI Engineers
          </h2>
          <p className="text-muted mb-8 max-w-md mx-auto">
            Get the most important AI engineering news, papers, and tools
            delivered to your inbox every Friday.
          </p>
          <div className="flex justify-center">
            <SubscribeForm />
          </div>
        </div>
      </section>
    </main>
  );
}
