import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Maison Studio" },
      { name: "description", content: "Web design, SEO, and lead generation for Dubai businesses. The complete online growth system." },
      { property: "og:title", content: "Services — Maison Studio" },
      { property: "og:description", content: "Not just a website. A complete online growth system." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const services = [
    {
      num: "01", tag: "Web Design",
      title: "Websites that work as hard as you do.",
      body: "We start by understanding your business — your customers, your offer, your competition. Then we design and build a site that reflects the quality of what you actually do. Hand-crafted layouts, custom typography, real performance work. No templates. No shortcuts.",
      pills: ["Mobile responsive", "Sub-2s loading", "SEO-ready structure", "Conversion-optimised", "CMS included", "Analytics wired"],
      reverse: false,
    },
    {
      num: "02", tag: "Search Engine Optimisation",
      title: "Get found by people already searching for you.",
      body: "We build every site with Google in mind from day one — proper page structure, fast load times, schema markup, local SEO, and a Google Business Profile that actually converts. We track everything and report monthly.",
      pills: ["On-page SEO", "Technical SEO", "Local SEO", "Google Business Profile", "Keyword research", "Monthly reports"],
      reverse: true,
      note: "SEO compounds over 60-90 days. We track everything, report monthly, and show you exactly what's improving.",
    },
    {
      num: "03", tag: "Lead Generation",
      title: "Turn your traffic into enquiries and revenue.",
      body: "Most websites leak leads. We patch every hole. Contact forms, landing pages, live chat setup, pop-up lead capture, CTA strategy, CRM integration. Your site stops being a brochure and starts being a salesperson.",
      pills: ["Contact forms", "Landing pages", "Live chat", "Lead pop-ups", "CTA strategy", "CRM integration"],
      reverse: false,
    },
  ];
  return (
    <SiteLayout backdrop="services">
      <section className="section-pad">
        <div className="container-narrow text-center max-w-3xl mx-auto space-y-5">
          <p className="eyebrow">Services</p>
          <h1 className="font-display text-5xl md:text-6xl text-espresso">
            Not just a website. A complete <em className="text-gold font-light">online growth system.</em>
          </h1>
          <p className="text-[15px] font-light text-warm-brown">
            We build the visibility, the trust, and the lead generation infrastructure
            your business needs to grow online.
          </p>
        </div>
      </section>

      {services.map((s) => (
        <section key={s.num} className="section-pad border-t border-warm-border">
          <div className={`container-narrow grid lg:grid-cols-2 gap-16 items-center ${s.reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div className="space-y-5">
              <div className="font-display text-7xl text-warm-border/60 leading-none">{s.num}</div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-gold">{s.tag}</p>
              <h2 className="font-display text-3xl md:text-4xl text-espresso">{s.title}</h2>
              <p className="text-[15px] font-light text-warm-brown leading-relaxed">{s.body}</p>
              {s.note && (
                <p className="border-l-2 border-gold pl-4 text-[13px] italic text-warm-brown">
                  {s.note}
                </p>
              )}
              <div className="flex flex-wrap gap-2 pt-2">
                {s.pills.map((p) => (
                  <span key={p} className="px-3 py-1.5 rounded-full border border-warm-border bg-cream-soft text-[12px] text-espresso">
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-cream-soft border border-warm-border rounded-3xl p-8 min-h-[340px] flex items-center justify-center">
              <div className="w-full space-y-3">
                <div className="h-3 w-1/3 bg-gold rounded" />
                <div className="h-6 w-3/4 bg-espresso rounded" />
                <div className="h-2 bg-warm-border rounded" />
                <div className="h-2 w-5/6 bg-warm-border rounded" />
                <div className="grid grid-cols-3 gap-2 pt-4">
                  {[1,2,3].map(i => <div key={i} className="aspect-square bg-cream-deep rounded-lg" />)}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Guarantee */}
      <section className="section-pad bg-espresso text-ivory text-center">
        <div className="container-narrow max-w-3xl space-y-6">
          <p className="text-gold font-display text-[120px] leading-none">7</p>
          <h2 className="font-display text-4xl md:text-5xl text-ivory">
            The 7-day <em className="text-gold font-light">guarantee.</em>
          </h2>
          <p className="text-[15px] font-light text-ivory/75 leading-relaxed">
            We deliver your completed website within 7 days of receiving your content
            and assets. If we miss the deadline through any fault of ours, your first
            retainer month is completely free. We've never triggered it. We put it in
            writing because we want you to feel safe, not just hopeful.
          </p>
          <p className="text-[11px] text-ivory/40">
            Applies to Starter and Growth packages. Premium timelines vary by project scope.
          </p>
        </div>
      </section>

    </SiteLayout>
  );
}
