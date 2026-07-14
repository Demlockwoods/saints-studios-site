import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Minus, X, Zap, Eye, Shield } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { LoopingLaptop } from "@/components/site/LoopingLaptop";
import { Aurora, GlassOrbs, TiltCard } from "@/components/site/FX";
import { Particles } from "@/components/site/MagicFX";
import BlurText from "@/components/reactbits/BlurText";
import ShinyText from "@/components/reactbits/ShinyText";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Why Saints? — We care whether your phone rings | Saints Studios" },
      { name: "description", content: "Saints Studios was founded by Domekveer Chopra to fix one thing: Dubai businesses with great offers and invisible websites. Speed, transparency, the 7-day guarantee." },
      { name: "keywords", content: "Why Saints Studios, Domekveer Chopra, Dubai web design studio, 7 day website Dubai" },
      { property: "og:title", content: "Why Saints? — Saints Studios" },
      { property: "og:description", content: "A Dubai growth studio built around speed, transparency, and outcomes — not awards." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const differentiators = [
    { n: "01", t: "Speed", b: "We deliver in 7 days. Not 6–8 weeks. Not 'it depends on revisions.' Seven days from receiving your assets to a live, optimised, Google-indexed website.", Icon: Zap, kpi: "7d" },
    { n: "02", t: "Transparency", b: "Our process is documented and you see daily updates during the build. You know exactly what you're getting before you sign anything. No surprises. Ever.", Icon: Eye, kpi: "100%" },
    { n: "03", t: "The Guarantee", b: "Miss the 7-day deadline through any fault of ours? Your first month of retainer is free. We put it in writing because we want you safe — not just hopeful.", Icon: Shield, kpi: "0" },
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
      <section className="relative section-pad hero-pattern overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-90">
          <Aurora />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <Particles quantity={40} />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <GlassOrbs count={4} />
        </div>
        <div className="relative container-narrow max-w-4xl text-center mx-auto space-y-7 animate-fade-in">
          <p className="eyebrow flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-gold" /> Why Saints? <span className="w-8 h-px bg-gold" />
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-espresso leading-[1.02]">
            <BlurText
              text="We don't care about design awards."
              className="inline"
              animateBy="words"
              direction="top"
              delay={80}
            />
            <br />
            <span className="text-warm-brown">We care about whether </span>
            <em className="text-gold font-light">
              <ShinyText text="your phone rings." color="#C9973A" shineColor="#FFF4D6" speed={3} spread={80} />
            </em>
          </h1>
          <p className="text-[16px] font-light text-warm-brown italic max-w-2xl mx-auto leading-relaxed">
            That's the only metric that matters to us. Not trophies. Not the approval
            of other designers. Whether your website is generating real enquiries from
            real people who want to spend money with your business.
          </p>
        </div>
      </section>

      {/* WHAT WE DO — "Beautiful is a requirement, not a goal" */}
      <section className="relative section-pad bg-cream-soft border-y border-warm-border overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <Aurora />
        </div>
        <div className="relative container-narrow">
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-14">
            <p className="eyebrow">What we actually do</p>
            <h2 className="font-display text-4xl md:text-6xl text-espresso leading-[1.05]">
              Beautiful is a{" "}
              <em className="text-gold font-light not-italic border-b border-gold/60 pb-1">requirement</em>
              {" "}— not the goal.
            </h2>
            <p className="text-[15px] font-light text-warm-brown max-w-2xl mx-auto leading-relaxed">
              A great-looking website that generates no leads is a very expensive
              piece of art. We make sure yours is neither.
            </p>
          </div>

          {/* Split contrast: what most agencies do vs what we do */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <TiltCard className="bg-cream border border-warm-border rounded-3xl p-8 md:p-10 group">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-10 h-10 rounded-full border border-warm-border flex items-center justify-center text-warm-brown">
                  <X className="w-4 h-4" />
                </span>
                <p className="text-[11px] tracking-[0.25em] uppercase text-warm-brown">Most agencies</p>
              </div>
              <h3 className="font-display text-2xl text-espresso mb-3">
                Sell you a portfolio.
              </h3>
              <ul className="space-y-2.5 text-[14px] text-warm-brown font-light">
                <li>Pixel-perfect layouts, no strategy.</li>
                <li>Six weeks, three revisions, no numbers.</li>
                <li>You get a compliment. Not a customer.</li>
              </ul>
            </TiltCard>
            <TiltCard className="bg-espresso text-ivory border border-gold/40 rounded-3xl p-8 md:p-10 shadow-[0_30px_80px_-40px_rgba(44,32,24,0.5)]">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-10 h-10 rounded-full bg-gold text-ivory flex items-center justify-center">
                  <Check className="w-4 h-4" strokeWidth={3} />
                </span>
                <p className="text-[11px] tracking-[0.25em] uppercase text-gold">Saints Studios</p>
              </div>
              <h3 className="font-display text-2xl text-ivory mb-3">
                Engineer a growth machine.
              </h3>
              <ul className="space-y-2.5 text-[14px] text-ivory/80 font-light">
                <li>Every section built around a behaviour.</li>
                <li>7-day delivery. Measurable from day one.</li>
                <li>You get a phone that rings. Not a trophy.</li>
              </ul>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* WHO WE WORK WITH — with looping laptop */}
      <section className="section-pad">
        <div className="container-narrow grid lg:grid-cols-[1.05fr_1fr] gap-16 items-center">
          <div className="space-y-5 text-[15px] font-light text-warm-brown leading-relaxed reveal-left">
            <p className="eyebrow">Who we work with</p>
            <h2 className="font-display text-5xl md:text-6xl text-espresso font-medium leading-[0.98]">
              Business owners. <em className="text-gold font-light">Not marketing departments.</em>
            </h2>
            <p>
              Clinics. Restaurants. Law firms. Consultancies. Gyms. Retail brands.
              Businesses across Dubai, Abu Dhabi, and the wider Emirates that have
              something genuinely worth buying — and a website that isn't
              communicating that effectively.
            </p>
            <p>
              Our clients don't have time to learn SEO or read about Core Web
              Vitals. They need someone they trust to handle all of it, report
              back clearly, and prove the investment is working.
            </p>
            <p className="font-display italic text-2xl text-espresso pt-2">
              That's exactly what we do.
            </p>
          </div>
          <div className="reveal-right">
            <LoopingLaptop />
            <p className="mt-6 text-center text-[12px] tracking-[0.25em] uppercase text-warm-brown">
              Everything we do on your site — while you run your business.
            </p>
          </div>
        </div>
      </section>

      {/* HOW WE'RE DIFFERENT — richer visual */}
      <section className="relative section-pad bg-espresso text-ivory overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-70">
          <Particles quantity={40} color="#C9973A" />
        </div>
        <div className="relative container-narrow">
          <div className="max-w-2xl space-y-3 mb-16">
            <p className="eyebrow text-gold">How we're different</p>
            <h2 className="font-display text-4xl md:text-6xl text-ivory leading-[1.05]">
              Three things that set us{" "}
              <em className="text-gold font-light">apart.</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {differentiators.map((d, i) => (
              <TiltCard
                key={d.n}
                className="relative rounded-3xl border border-gold/20 bg-gradient-to-b from-espresso-dark to-espresso p-8 group overflow-hidden reveal-scale"
              >
                <span
                  aria-hidden
                  className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gold/10 blur-3xl group-hover:bg-gold/20 transition-colors"
                />
                <div className="relative space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-6xl text-gold leading-none">{d.n}</span>
                    <span className="w-14 h-14 rounded-full border border-gold/40 flex items-center justify-center text-gold group-hover:rotate-12 transition-transform">
                      <d.Icon className="w-5 h-5" strokeWidth={1.5} />
                    </span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-display text-2xl text-ivory">{d.t}</h3>
                    <span className="text-[11px] tracking-[0.25em] uppercase text-gold">
                      {d.kpi}
                    </span>
                  </div>
                  <div className="h-px w-16 bg-gold/40 group-hover:w-24 transition-all" />
                  <p className="text-[14px] font-light text-ivory/75 leading-relaxed">
                    {d.b}
                  </p>
                </div>
                {i < differentiators.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-gold/40 to-transparent"
                  />
                )}
              </TiltCard>
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

      {/* Client quotes temporarily removed until real testimonials arrive. */}


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
