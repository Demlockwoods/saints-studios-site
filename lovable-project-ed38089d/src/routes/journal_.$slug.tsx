import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { getPost, posts, type JournalPost } from "@/lib/journal-posts";

export const Route = createFileRoute("/journal_/$slug")({
  head: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) {
      return {
        meta: [
          { title: "Article not found , Saints Studios" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const url = `https://saints-studios.com/journal/${post.slug}`;
    return {
      meta: [
        { title: `${post.title} | Saints Studios` },
        { name: "description", content: post.excerpt },
        { name: "keywords", content: post.keywords.join(", ") },
        { name: "author", content: "Saints Studios" },
        { property: "article:section", content: post.category },
        { property: "article:published_time", content: post.date },
        { property: "og:type", content: "article" },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.excerpt },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            author: { "@type": "Organization", name: "Saints Studios" },
            publisher: {
              "@type": "Organization",
              name: "Saints Studios",
              url: "https://saintsstudios.lovable.app",
            },
            datePublished: post.date,
            mainEntityOfPage: url,
            keywords: post.keywords.join(", "),
            articleSection: post.category,
          }),
        },
      ],
    };
  },
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  notFoundComponent: () => (
    <SiteLayout backdrop="journal">
      <section className="section-pad text-center">
        <div className="container-narrow">
          <h1 className="font-display text-5xl text-espresso">Article not found.</h1>
          <Link to="/journal" className="btn-primary mt-8 inline-flex">
            <ArrowLeft className="w-4 h-4" /> Back to Journal
          </Link>
        </div>
      </section>
    </SiteLayout>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { post } = Route.useLoaderData();
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <SiteLayout backdrop="journal">
      <article className="section-pad">
        <div className="container-narrow max-w-3xl mx-auto">
          <Link to="/journal" className="inline-flex items-center gap-2 text-[12px] text-warm-brown hover:text-gold transition-colors mb-10">
            <ArrowLeft className="w-3.5 h-3.5" /> All articles
          </Link>

          <header className="space-y-5 animate-fade-up">
            <span className="inline-block bg-gold/15 text-gold text-[11px] px-2.5 py-1 rounded-full tracking-wider uppercase">
              {post.category}
            </span>
            <h1 className="font-display text-4xl md:text-6xl text-espresso leading-[1.05]">
              {post.title}
            </h1>
            <p className="text-[16px] font-light text-warm-brown italic leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 text-[12px] text-warm-brown pt-2 border-t border-warm-border">
              <span>By Saints Studios</span>
              <span className="w-1 h-1 rounded-full bg-gold" />
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-gold" /> {post.read} read</span>
              <span className="w-1 h-1 rounded-full bg-gold" />
              <span>{post.date}</span>
            </div>
          </header>

          <div className="mt-12 space-y-6">
            {post.body.map((block: JournalPost["body"][number], i: number) => {
              if (block.type === "h2")
                return (
                  <h2 key={i} className="font-display text-3xl md:text-4xl text-espresso pt-6">
                    {block.text}
                  </h2>
                );
              if (block.type === "h3")
                return (
                  <h3 key={i} className="font-display text-2xl text-espresso pt-4">
                    {block.text}
                  </h3>
                );
              if (block.type === "quote")
                return (
                  <blockquote key={i} className="border-l-2 border-gold pl-6 my-8">
                    <p className="font-display italic text-2xl text-espresso leading-snug">
                      {block.text}
                    </p>
                  </blockquote>
                );
              if (block.type === "ul")
                return (
                  <ul key={i} className="space-y-2.5 pl-5 list-disc marker:text-gold text-[15px] font-light text-warm-brown leading-relaxed">
                    {block.items.map((it: string, j: number) => <li key={j}>{it}</li>)}
                  </ul>
                );
              return (
                <p key={i} className="text-[16px] font-light text-warm-brown leading-relaxed">
                  {block.text}
                </p>
              );
            })}
          </div>

          <div className="mt-16 bg-espresso text-ivory rounded-3xl p-10 text-center space-y-4">
            <h3 className="font-display text-3xl text-ivory">
              Want this done for your business?
            </h3>
            <p className="text-[14px] text-ivory/70">
              Book a free 30-minute strategy call. We'll tell you exactly what to fix first.
            </p>
            <Link to="/contact" className="btn-gold mt-2 inline-flex">
              Book your free call <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="container-narrow mt-24">
          <p className="eyebrow mb-6">Keep reading</p>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link
                key={p.slug}
                to="/journal/$slug"
                params={{ slug: p.slug }}
                className="hover-lift-card bg-cream-soft border border-warm-border rounded-3xl p-7 block"
              >
                <span className="inline-block bg-gold/15 text-gold text-[11px] px-2.5 py-1 rounded-full tracking-wider uppercase">
                  {p.category}
                </span>
                <h4 className="font-display text-xl text-espresso mt-3">{p.title}</h4>
                <p className="text-[12px] text-warm-brown mt-2">{p.date} · {p.read} read</p>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
