import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Mail, Phone, MessageCircle } from "lucide-react";

import { SiteLayout } from "@/components/site/Layout";
import { StickyGradientSection } from "@/components/site/StickyGradientSection";
import { ServicesWheel } from "@/components/site/ServicesWheel";
import { Aurora, GlassOrbs } from "@/components/site/FX";
import { Particles } from "@/components/site/MagicFX";
import BlurText from "@/components/reactbits/BlurText";
import ShinyText from "@/components/reactbits/ShinyText";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services , Saints Studios" },
      { name: "description", content: "Web design, SEO, and lead generation for Dubai businesses. The complete online growth system." },
      { property: "og:title", content: "Services , Saints Studios" },
      { property: "og:description", content: "Not just a website. A complete online growth system." },
      { property: "og:url", content: "https://saints-studios.com/services" },
    ],
    links: [{ rel: "canonical", href: "https://saints-studios.com/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout backdrop="services">
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden section-pad">
        <div className="absolute inset-0 pointer-events-none opacity-80">
          <Aurora />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <Particles quantity={40} />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <GlassOrbs count={4} />
        </div>

        <div className="relative container-narrow grid lg:grid-cols-[1.15fr_1fr] gap-14 items-center">
          <div className="space-y-7">
            <p className="eyebrow flex items-center gap-3">
              <span className="w-8 h-px bg-gold" />
              Services
            </p>
            <h1 className="font-display text-[46px] md:text-[76px] leading-[1.02] text-espresso">
              <BlurText
                text="Not just a website."
                className="inline"
                animateBy="words"
                direction="top"
                delay={90}
              />
              <br />
              <em className="font-light text-gold">
                <ShinyText
                  text="A growth system."
                  color="#C9973A"
                  shineColor="#FFF4D6"
                  speed={3}
                  spread={80}
                />
              </em>
            </h1>
            <p className="text-[16px] font-light text-warm-brown max-w-xl leading-relaxed">
              Three tightly-integrated services that work together to turn your
              website into your best-performing salesperson , 24/7.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/contact" className="btn-primary">
                Book a strategy call <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-[12px] tracking-[0.25em] uppercase text-warm-brown flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-gold" /> Scroll to spin the wheel
              </span>
            </div>
          </div>

          {/* Decorative stat stack */}
          <div className="relative grid grid-cols-2 gap-4 max-w-md ml-auto">
            <ServiceHeroStat kpi="7d" label="Average delivery" delay={0} />
            <ServiceHeroStat kpi="+340%" label="Enquiry uplift" delay={120} />
            <ServiceHeroStat kpi="< 2s" label="Load target" delay={240} />
            <ServiceHeroStat kpi="98/100" label="PageSpeed" delay={360} />
          </div>
        </div>
      </section>

      {/* ---------- SCROLL-DRIVEN SERVICES WHEEL ---------- */}
      <StickyGradientSection
        from="hsl(20, 55%, 78%)"
        to="hsl(36, 55%, 90%)"
        accent="#7A2E2E"
      >
        <ServicesWheel />
      </StickyGradientSection>

      {/* ---------- BOOK NOW ---------- */}
      <section className="relative section-pad bg-espresso text-ivory overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-70">
          <Particles quantity={50} color="#C9973A" />
        </div>
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <Aurora />
        </div>
        <div className="relative container-narrow max-w-4xl text-center space-y-8">
          <p className="eyebrow text-gold flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-gold" /> Book now <span className="w-8 h-px bg-gold" />
          </p>
          <h2 className="font-display text-4xl md:text-6xl text-ivory leading-[1.05]">
            Ready when you are. <em className="text-gold font-light">Let's build.</em>
          </h2>
          <p className="text-[15px] font-light text-ivory/75 max-w-2xl mx-auto leading-relaxed">
            Book a free 30-minute strategy call, or reach us directly. We usually
            reply within a few business hours.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link to="/contact" className="btn-gold">
              Start the questionnaire <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="mailto:saintsstudiosae@gmail.com"
              className="btn-outline-cream inline-flex items-center gap-2"
              aria-label="Email Saints Studios"
            >
              <Mail className="w-4 h-4" /> Email us
            </a>
            <a
              href="https://wa.me/971507619289"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-cream inline-flex items-center gap-2"
              aria-label="WhatsApp Saints Studios"
            >
              <Phone className="w-4 h-4" /> WhatsApp
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 text-[13px] text-ivory/70">
            <a href="mailto:saintsstudiosae@gmail.com" className="hover:text-gold transition-colors flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" /> saintsstudiosae@gmail.com
            </a>
            <span className="hidden sm:block w-px h-4 bg-ivory/20" />
            <a href="https://wa.me/971507619289" className="hover:text-gold transition-colors flex items-center gap-2">
              <MessageCircle className="w-3.5 h-3.5" /> +971 50 761 9289
            </a>
          </div>
        </div>
      </section>

    </SiteLayout>
  );
}

function ServiceHeroStat({ kpi, label, delay }: { kpi: string; label: string; delay: number }) {
  return (
    <div
      className="reveal-scale bg-cream-soft/70 backdrop-blur-sm border border-warm-border rounded-2xl p-5 hover:border-gold transition-colors"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="font-display text-3xl md:text-4xl text-espresso leading-none">
        {kpi}
      </div>
      <p className="text-[11px] tracking-[0.2em] uppercase text-warm-brown mt-2">
        {label}
      </p>
    </div>
  );
}
