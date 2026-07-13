import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Minus, X } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — We don't care about design awards | Saints Studios" },
      { name: "description", content: "Saints Studios was founded by Domekveer Chopra to fix one thing: Dubai businesses with great offers and invisible websites. Speed, transparency, the 7-day guarantee." },
      { name: "keywords", content: "Domekveer Chopra, Saints Studios Dubai, Dubai web design studio, 7 day website Dubai" },
      { property: "og:title", content: "About — Saints Studios" },
      { property: "og:description", content: "A Dubai growth studio built around speed, transparency, and outcomes — not awards." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const differentiators = [
    { n: "01", t: "Speed", b: "We deliver in 7 days. Not 6–8 weeks. Not 'it depends on revisions.' Seven days from receiving your assets to a live, optimised, Google-indexed website. We built our entire process around this promise — and we've never missed it." },
    { n: "02", t: "Transparency", b: "Our process is documented and you see daily updates during the build. You know exactly what you're getting before you sign anything. No surprises. Ever." },
    { n: "03", t: "The Guarantee", b: "If we miss the 7-day deadline through any fault of ours, your first month of retainer is free. We've never triggered it. We put it in writing because we want you to feel safe investing in us — not just hopeful." },
  ];

  const rows = [
    ["Delivery speed", "yes", "no", "partial"],
    ["Personal attention", "yes", "no", "partial"],
    ["Measurable ROI focus", "yes", "partial", "no"],
    ["Transparent process", "yes", "no", "partial"],
    ["Post-launch support", "yes", "partial", "no"],
    ["Monthly reporting", "yes", "yes", "no"],
    ["Guaranteed delivery", "yes", "no", "no"],
  ] as const;

  return (
    <SiteLayout backdrop="about">
      {/* HERO */}
      <section className="section-pad hero-pattern">
        <div className="container-narrow max-w-4xl text-center mx-auto space-y-7 animate-fade-up">
          <p className="eyebrow">About Saints Studios</p>
          <h1 className="font-display text-5xl md:text-7xl text-espresso leading-[1.05]">
            We don't care about design awards. We care about whether <em className="text-gold font-light">your phone rings.</em>
          </h1>
          <p className="text-[16px] font-light text-warm-brown italic max-w-2xl mx-auto leading-relaxed">
            That's the only metric that matters to us. Not trophies. Not the approval
            of other designers. Whether your website is generating real enquiries from
            real people who want to spend money with your business.
          </p>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="section-pad bg-cream-soft border-y border-warm-border">
        <div className="container-narrow grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
          <div className="space-y-3 lg:sticky lg:top-28">
            <p className="eyebrow">What we actually do</p>
            <h2 className="font-display text-4xl md:text-5xl text-espresso">
              Beautiful is a requirement — not the goal.
            </h2>
          </div>
          <div className="space-y-5 text-[15px] font-light text-warm-brown leading-relaxed">
            <p>
              Most web agencies will show you a beautiful portfolio and talk about
              pixel-perfect design, cutting-edge aesthetics, and creative vision.
              We're not that agency.
            </p>
            <p>
              Saints Studios builds websites for Dubai businesses that need results.
              We think about what a customer does when they land on your page. We
              think about what makes them scroll, what makes them trust, and what
              makes them pick up the phone or fill in a form. Then we build a
              website around those behaviours.
            </p>
            <p>
              If your site doesn't look the part, people won't trust it. But looking
              good and generating business are two different things, and the gap
              between them is where most web agencies fall flat. We close that gap.
            </p>
            <blockquote className="border-l-2 border-gold pl-5 mt-8">
              <p className="font-display italic text-2xl text-espresso">
                "A website that wins a design award but generates no leads is a very
                expensive piece of art. We make sure yours is neither."
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* WHO WE WORK WITH */}
      <section className="section-pad">
        <div className="container-narrow grid lg:grid-cols-[1.2fr_1fr] gap-16 items-start">
          <div className="space-y-5 text-[15px] font-light text-warm-brown leading-relaxed">
            <p className="eyebrow">Who we work with</p>
            <h2 className="font-display text-4xl md:text-5xl text-espresso">
              Business owners. <em className="text-gold font-light">Not marketing departments.</em>
            </h2>
            <p>
              Clinics. Restaurants. Law firms. Consultancies. Gyms. Retail brands.
              Businesses across Dubai, Abu Dhabi, and the wider Emirates that have
              something genuinely worth buying — and a website that isn't
              communicating that effectively.
            </p>
            <p>
              Our clients are busy running operations, managing staff, and
              delivering their service. They don't have time to learn SEO or
              understand Core Web Vitals. They need someone they trust to handle
              all of it, report back clearly, and prove that the investment is
              working.
            </p>
            <p className="font-display italic text-2xl text-espresso pt-2">
              That's exactly what we do.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {["Clinics","Restaurants","Law firms","Consultancies","Gyms","Retail brands","Real estate","Salons"].map((w, i) => (
              <div
                key={w}
                className="aspect-square rounded-2xl border border-warm-border bg-cream-soft flex items-center justify-center font-display text-xl text-espresso hover:bg-espresso hover:text-ivory hover:rotate-2 transition-all"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {w}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE'RE DIFFERENT */}
      <section className="section-pad bg-espresso text-ivory">
        <div className="container-narrow">
          <div className="max-w-2xl space-y-3 mb-16">
            <p className="eyebrow">How we're different</p>
            <h2 className="font-display text-4xl md:text-5xl text-ivory">
              Three things that set us apart.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {differentiators.map((d) => (
              <div key={d.n} className="space-y-4 group">
                <div className="font-display text-6xl text-gold leading-none group-hover:translate-x-1 transition-transform">{d.n}</div>
                <h3 className="font-display text-2xl text-ivory">{d.t}</h3>
                <p className="text-[14px] font-light text-ivory/70 leading-relaxed">{d.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="section-pad">
        <div className="container-narrow grid lg:grid-cols-[1fr_1.3fr] gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] bg-gradient-to-br from-espresso via-warm-brown to-gold-soft rounded-3xl flex items-end p-10 text-ivory shadow-[0_40px_80px_-40px_rgba(44,32,24,0.4)] hover:rotate-1 transition-transform">
              <div>
                <p className="font-display text-4xl italic">Domekveer Chopra</p>
                <p className="text-[12px] mt-2 tracking-widest uppercase text-ivory/70">Founder · Saints Studios</p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full border border-gold/40 animate-spin-slow hidden md:block" />
          </div>
          <div className="space-y-5 text-[15px] font-light text-warm-brown leading-relaxed">
            <p className="eyebrow">The person behind the work</p>
            <h2 className="font-display text-4xl md:text-5xl text-espresso">
              Dubai is full of exceptional businesses being let down by <em className="text-gold font-light">mediocre websites.</em>
            </h2>
            <p>
              Saints Studios was founded by Domekveer Chopra with one observation:
              restaurants with food worth travelling for, buried on page four of
              Google. Clinics with world-class practitioners losing bookings because
              their site doesn't load on mobile. Consultancies with genuine expertise
              looking unprofessional online — and wondering why inbound leads have
              dried up.
            </p>
            <p>
              Domekveer built Saints Studios to fix this. Not to offer another
              generic web design service, but to build a focused growth studio that
              treats every client's website as what it should be: their most valuable
              sales asset.
            </p>
            <p>
              The approach is direct and the standards are high. Every site Saints
              Studios builds is researched, strategised, and delivered with the same
              question running through every decision: <em>will this make the
              client's phone ring more?</em>
            </p>
            <p>
              If the answer is yes, it stays. If it isn't — it changes.
            </p>
            <blockquote className="border-l-2 border-gold pl-5 mt-6">
              <p className="font-display italic text-2xl text-espresso">
                "The best compliment a client can give us isn't 'the site looks
                amazing.' It's 'we've had five enquiries this week and we never
                used to get any.'"
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="section-pad bg-cream-soft border-y border-warm-border">
        <div className="container-narrow max-w-2xl space-y-4 mb-12">
          <p className="eyebrow">Why us</p>
          <h2 className="font-display text-4xl text-espresso">The honest comparison.</h2>
        </div>
        <div className="container-narrow overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-warm-border text-[11px] tracking-[0.2em] uppercase text-warm-brown">
                <th className="py-4 font-medium">Criteria</th>
                <th className="py-4 font-medium text-gold">Saints Studios</th>
                <th className="py-4 font-medium">Large Agency</th>
                <th className="py-4 font-medium">Cheap Freelancer</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([c, a, b, d]) => (
                <tr key={c} className="border-b border-warm-border group hover:bg-cream transition-colors">
                  <td className="py-5 text-[14px] text-espresso">{c}</td>
                  {[a, b, d].map((v, i) => (
                    <td key={i} className="py-5">
                      {v === "yes" && <Check className="w-5 h-5 text-gold group-hover:scale-125 transition-transform" strokeWidth={2.5} />}
                      {v === "partial" && <Minus className="w-5 h-5 text-warm-brown/50" />}
                      {v === "no" && <X className="w-5 h-5 text-destructive/70" />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CLIENT QUOTES */}
      <section className="section-pad">
        <div className="container-narrow max-w-2xl space-y-3 mb-12">
          <p className="eyebrow">What clients say</p>
          <h2 className="font-display text-4xl text-espresso">
            Three quotes that matter more than any portfolio.
          </h2>
        </div>
        <div className="container-narrow grid md:grid-cols-3 gap-6">
          {[
            { q: "I'd been burned by two agencies before Saints Studios. The difference was night and day — not just in the quality of the site, but in the number of enquiries we started getting within weeks of launch.", n: "Clinic owner, JBR" },
            { q: "Domekveer told me exactly what he was going to do, did it in 6 days, and my restaurant has been fully booked every weekend since. That's the whole story.", n: "Restaurant owner, DIFC" },
            { q: "I was sceptical about the 7-day promise. But they delivered on day 6 and the site was better than anything I'd seen from much larger agencies.", n: "Consultancy founder, Business Bay" },
          ].map((c, i) => (
            <div key={i} className="hover-lift-card bg-cream-soft border border-warm-border rounded-3xl p-7">
              <p className="font-display italic text-xl text-espresso leading-snug">"{c.q}"</p>
              <p className="text-[12px] text-warm-brown mt-5">{c.n}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-espresso text-ivory text-center">
        <div className="container-narrow max-w-2xl space-y-6">
          <h2 className="font-display text-4xl md:text-5xl text-ivory">
            Let's make your phone ring.
          </h2>
          <p className="text-[15px] font-light text-ivory/70">
            Book a free 30-minute strategy call. We'll tell you exactly what to fix first — even if you don't end up working with us.
          </p>
          <Link to="/contact" className="btn-gold mt-2 inline-flex">
            Book your free call
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
