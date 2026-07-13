import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { posts } from "@/lib/journal-posts";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — Insights for Dubai businesses | Saints Studios" },
      { name: "description", content: "Practical advice on web design, SEO, lead generation, and online growth for Dubai businesses. Written by Saints Studios." },
      { name: "keywords", content: "Dubai web design blog, Dubai SEO advice, lead generation Dubai, restaurant marketing Dubai, Core Web Vitals, Google Business Profile Dubai" },
      { property: "og:title", content: "Journal — Saints Studios" },
      { property: "og:description", content: "Practical advice on web design, SEO, and lead generation for Dubai businesses." },
      { property: "og:url", content: "/journal" },
    ],
    links: [{ rel: "canonical", href: "/journal" }],
  }),
  component: JournalPage,
});

function JournalPage() {
  const [feat, ...rest] = posts;
  return (
    <SiteLayout backdrop="journal">
      <section className="section-pad">
        <div className="container-narrow max-w-3xl space-y-4 mb-16 animate-fade-up">
          <p className="eyebrow">The Journal</p>
          <h1 className="font-display text-5xl md:text-6xl text-espresso">
            Insights for Dubai businesses that take their <em className="text-gold font-light">online presence</em> seriously.
          </h1>
          <p className="text-[15px] font-light text-warm-brown">
            Practical, no-fluff articles on SEO, web design, and lead generation —
            written from real client work in Dubai.
          </p>
        </div>

        <div className="container-narrow">
          <Link
            to="/journal/$slug"
            params={{ slug: feat.slug }}
            className="hover-lift-card bg-cream-soft border border-warm-border rounded-3xl overflow-hidden grid md:grid-cols-2 mb-10 group"
          >
            <div className="aspect-[4/3] bg-gradient-to-br from-cream-deep via-cream to-warm-border/30 relative overflow-hidden">
              <div className="absolute inset-0 animate-shimmer opacity-50" />
              <span className="absolute bottom-6 left-6 font-display italic text-5xl text-gold/40 group-hover:text-gold transition-colors">01</span>
            </div>
            <div className="p-10 flex flex-col justify-center space-y-3">
              <span className="inline-block self-start bg-gold/15 text-gold text-[11px] px-2.5 py-1 rounded-full tracking-wider uppercase">
                {feat.category}
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-espresso group-hover:text-gold transition-colors">{feat.title}</h2>
              <p className="text-[14px] font-light text-warm-brown leading-relaxed">{feat.excerpt}</p>
              <p className="text-[12px] text-warm-brown flex items-center gap-2 pt-1">
                <Clock className="w-3.5 h-3.5 text-gold" /> {feat.date} · {feat.read} read
              </p>
              <span className="inline-flex items-center gap-2 text-gold text-[13px] pt-2 group-hover:gap-3 transition-all">
                Read article <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          <div className="grid md:grid-cols-2 gap-6">
            {rest.map((p) => (
              <Link
                key={p.slug}
                to="/journal/$slug"
                params={{ slug: p.slug }}
                className="hover-lift-card bg-cream-soft border border-warm-border rounded-3xl p-7 space-y-3 group"
              >
                <span className="inline-block bg-gold/15 text-gold text-[11px] px-2.5 py-1 rounded-full tracking-wider uppercase">
                  {p.category}
                </span>
                <h3 className="font-display text-2xl text-espresso group-hover:text-gold transition-colors">{p.title}</h3>
                <p className="text-[13px] font-light text-warm-brown line-clamp-3">{p.excerpt}</p>
                <p className="text-[12px] text-warm-brown flex items-center gap-2 pt-1">
                  <Clock className="w-3.5 h-3.5 text-gold" /> {p.date} · {p.read} read
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
