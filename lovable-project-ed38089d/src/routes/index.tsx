import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Check, X, Zap, Eye, Shield } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { SpinStar, TickingClock, HeroLeadsDashboard } from "@/components/site/Anims";
import { Meteors, AnimatedGridPattern, Particles } from "@/components/site/MagicFX";
import { TiltCard, Magnetic, Aurora, Ripples, GlassOrbs, Parallax } from "@/components/site/FX";
import { LosingMoney3D } from "@/components/site/LosingMoney3D";
import { LoopingLaptop } from "@/components/site/LoopingLaptop";
import BlurText from "@/components/reactbits/BlurText";
import ShinyText from "@/components/reactbits/ShinyText";
import StarBorder from "@/components/reactbits/StarBorder";
import Magnet from "@/components/reactbits/Magnet";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Saints Studios | Dubai web design that makes your phone ring" },
      { name: "description", content: "Dubai's growth-focused web studio. Beautiful, fast websites engineered to convert. Live in 7 days." },
      { name: "keywords", content: "Dubai web design, web design Dubai, Dubai SEO, lead generation Dubai, website Dubai, Saints Studios" },
      { property: "og:title", content: "Saints Studios | Dubai web design that makes your phone ring" },
      { property: "og:description", content: "Dubai's growth-focused web studio. Beautiful, fast websites engineered to convert. Live in 7 days." },
      { property: "og:url", content: "https://saints-studios.com/" },
    ],
    links: [{ rel: "canonical", href: "https://saints-studios.com/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Saints Studios",
        description: "Premium Dubai web design and digital growth studio.",
        areaServed: "Dubai, UAE",
        address: { "@type": "PostalAddress", addressLocality: "Dubai", addressRegion: "Dubai", addressCountry: "AE" },
        telephone: "+971507619289",
      }),
    }],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout backdrop="landing">
      <Hero />
      <PhoneRingsSection />
      <LosingMoney3D />
      <WhoWeWorkWith />
      <Process />
      <FinalCTA />
    </SiteLayout>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="relative hero-pattern overflow-hidden">
      <Parallax speed={0.25} className="absolute inset-0 pointer-events-none">
        <Aurora />
      </Parallax>
      <Parallax speed={0.45} className="absolute inset-0 pointer-events-none">
        <Particles quantity={120} />
      </Parallax>
      <Parallax speed={0.55} className="absolute inset-0 pointer-events-none">
        <Particles quantity={70} color="#e2b672" />
      </Parallax>
      <Parallax speed={0.65} className="absolute inset-0 pointer-events-none">
        <GlassOrbs count={7} />
      </Parallax>
      <div className="relative container-narrow min-h-[calc(100vh-72px)] grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center py-20">
        <div className="space-y-8">
          <p className="eyebrow flex items-center gap-3 reveal-left">
            <span className="w-8 h-px bg-gold" />
            Dubai's growth-focused web studio
          </p>
          <h1 className="font-display text-[48px] md:text-[72px] leading-[1.05] text-espresso">
            <BlurText text="We build websites that bring you" className="inline" animateBy="words" direction="top" delay={90} />{" "}
            <em className="font-light text-gold inline-block">
              <ShinyText text="customers." color="#C9973A" shineColor="#FFF4D6" speed={3} spread={90} />
            </em>
            <br />
            <BlurText text="Not just clicks." className="inline" animateBy="words" direction="top" delay={110} />
          </h1>
          <p className="text-[16px] font-light text-warm-brown max-w-xl leading-relaxed reveal">
            Done-for-you web design for Dubai businesses that want more visibility,
            more leads, and a stronger online presence. Live in 7 days.
          </p>
          <div className="flex flex-wrap gap-3 items-center reveal">
            <Magnet padding={80} magnetStrength={4}>
              <StarBorder as={Link} to="/contact" color="#C9973A" speed="5s" className="inline-block">
                <span className="inline-flex items-center gap-2 font-medium text-espresso">
                  Book a free strategy call <ArrowRight className="w-4 h-4" />
                </span>
              </StarBorder>
            </Magnet>
            <Magnet padding={60} magnetStrength={6}>
              <Link to="/services" className="btn-secondary">See what we do</Link>
            </Magnet>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 text-[12px] text-warm-brown reveal">
            <span className="flex items-center gap-2"><SpinStar className="w-4 h-4" /> 5-star rated</span>
            <span className="w-px h-4 bg-warm-border hidden sm:block" />
            <span className="flex items-center gap-2"><TickingClock size={22} /> 7-day delivery</span>
          </div>
        </div>

        <div className="relative reveal-scale">
          <HeroLeadsDashboard />
        </div>
      </div>
    </section>
  );
}

/* ---------- WHY SAINTS: WE DON'T CARE ABOUT DESIGN AWARDS ---------- */
function PhoneRingsSection() {
  return (
    <section className="relative section-pad hero-pattern overflow-hidden border-y border-warm-border">
      <div className="absolute inset-0 pointer-events-none opacity-90">
        <Aurora />
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <Particles quantity={60} color="#c9973a" />
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <GlassOrbs count={4} />
      </div>
      <div className="relative container-narrow max-w-4xl text-center mx-auto space-y-7 animate-fade-in">
        <p className="eyebrow flex items-center justify-center gap-3">
          <span className="w-8 h-px bg-gold" /> Why Saints? <span className="w-8 h-px bg-gold" />
        </p>
        <h2 className="font-display text-5xl md:text-7xl text-espresso leading-[1.02]">
          <BlurText text="We don't care about design awards." className="inline" animateBy="words" direction="top" delay={80} />
          <br />
          <span className="text-warm-brown">We care about whether </span>
          <em className="text-gold font-light">
            <ShinyText text="your phone rings." color="#C9973A" shineColor="#FFF4D6" speed={3} spread={80} />
          </em>
        </h2>
        <p className="text-[16px] font-light text-warm-brown italic max-w-2xl mx-auto leading-relaxed">
          That's the only metric that matters to us. Not trophies. Not the approval
          of other designers. Whether your website is generating real enquiries from
          real people who want to spend money with your business.
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto text-left pt-6">
          <TiltCard className="bg-cream border border-warm-border rounded-3xl p-8 md:p-10 group">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-10 rounded-full border border-warm-border flex items-center justify-center text-warm-brown">
                <X className="w-4 h-4" />
              </span>
              <p className="text-[11px] tracking-[0.25em] uppercase text-warm-brown">Most agencies</p>
            </div>
            <h3 className="font-display text-2xl text-espresso mb-3">Sell you a portfolio.</h3>
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
            <h3 className="font-display text-2xl text-ivory mb-3">Engineer a growth machine.</h3>
            <ul className="space-y-2.5 text-[14px] text-ivory/80 font-light">
              <li>Every section built around a behaviour.</li>
              <li>7-day delivery. Measurable from day one.</li>
              <li>You get a phone that rings. Not a trophy.</li>
            </ul>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

/* ---------- WHO WE WORK WITH (moved from about, placed after 3D laptop) ---------- */
function WhoWeWorkWith() {
  return (
    <section className="relative section-pad overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <Particles quantity={50} color="#c9973a" />
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <GlassOrbs count={4} />
      </div>
      <div className="relative container-narrow grid lg:grid-cols-[1.05fr_1fr] gap-16 items-center">
        <div className="space-y-5 text-[15px] font-light text-warm-brown leading-relaxed reveal-left">
          <p className="eyebrow">Who we work with</p>
          <h2 className="font-display text-5xl md:text-6xl text-espresso font-medium leading-[0.98]">
            Business owners. <em className="text-gold font-light">Not marketing departments.</em>
          </h2>
          <p>
            Clinics. Restaurants. Law firms. Consultancies. Gyms. Retail brands.
            Businesses across Dubai, Abu Dhabi, and the wider Emirates that have
            something genuinely worth buying, and a website that isn't communicating
            that effectively.
          </p>
          <p>
            Our clients don't have time to learn SEO or read about Core Web Vitals.
            They need someone they trust to handle all of it, report back clearly,
            and prove the investment is working.
          </p>
          <p className="font-display italic text-2xl text-espresso pt-2">
            That's exactly what we do.
          </p>
        </div>
        <div className="reveal-right">
          <LoopingLaptop />
          <p className="mt-6 text-center text-[12px] tracking-[0.25em] uppercase text-warm-brown">
            Everything we do on your site, while you run your business.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- PROCESS ---------- */
function Process() {
  const steps = [
    { n: "1", t: "Book a free call.", b: "We spend 30 minutes understanding your business, your customers, and your goals. No jargon, no pressure." },
    { n: "2", t: "We build.", b: "Our team gets to work. Design, copy, SEO, speed optimisation. You see progress updates daily and approve before we go live." },
    { n: "3", t: "You grow.", b: "Your site goes live in 7 days. From that moment it's generating visibility, trust, and leads around the clock." },
  ];
  return (
    <section className="relative section-pad bg-espresso text-ivory overflow-hidden">
      <AnimatedGridPattern numSquares={25} className="opacity-60" />
      <div className="absolute inset-0 pointer-events-none opacity-70">
        <Particles quantity={40} color="#C9973A" />
      </div>
      <div className="relative container-narrow">
        <div className="max-w-2xl space-y-4 mb-16">
          <p className="eyebrow">The process</p>
          <h2 className="font-display text-4xl md:text-5xl text-ivory">
            Simple. Fast. <em className="text-gold font-light">Built around you.</em>
          </h2>
        </div>
        <div className="relative grid md:grid-cols-3 gap-12">
          <div className="reveal-clip absolute left-0 right-0 top-8 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent hidden md:block" />
          {steps.map((s, i) => (
            <div key={s.n} className="relative space-y-4 reveal-scale" style={{ transitionDelay: `${i * 140}ms` }}>
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold/40 bg-espresso-dark">
                <span className="absolute inset-0 rounded-full border border-gold/30 animate-ripple" style={{ animationDelay: `${i * 0.6}s` }} />
                <span className="font-display text-3xl text-gold leading-none">{s.n}</span>
              </div>
              <h3 className="font-display text-2xl text-ivory">{s.t}</h3>
              <p className="text-[14px] font-light text-ivory/70 leading-relaxed">{s.b}</p>
            </div>
          ))}
        </div>
        <div className="mt-20 flex flex-col items-center gap-6">
          <div className="w-24 h-px bg-gold" />
          <p className="font-display italic text-xl md:text-2xl text-ivory text-center">
            Delivered in 7 days. Live, ranked, converting.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- DIFFERENTIATORS (kept for narrative flow) ---------- */

/* ---------- FINAL CTA ---------- */
function FinalCTA() {
  return (
    <section className="relative section-pad bg-espresso text-ivory text-center overflow-hidden">
      <Meteors number={30} />
      <Ripples count={4} />
      <div className="relative container-narrow max-w-3xl space-y-7">
        <h2 className="font-display text-4xl md:text-[54px] leading-[1.1] text-ivory reveal-blur">
          Your website should be your <em className="text-gold font-light">best salesperson.</em>
        </h2>
        <p className="text-[16px] font-light text-ivory/70 max-w-xl mx-auto reveal">
          Let's build something that actually works for your business. Book a free
          30-minute strategy call. No pitch, no pressure.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2 reveal-scale">
          <Magnetic>
            <Link to="/contact" className="btn-gold">Book your free call <ArrowRight className="w-4 h-4" /></Link>
          </Magnetic>
          <Magnetic strength={10}>
            <a href="https://wa.me/971507619289" className="btn-outline-cream">
              <MessageCircle className="w-4 h-4" /> WhatsApp us now
            </a>
          </Magnetic>
        </div>
        <p className="text-[12px] text-ivory/50">
          We'll WhatsApp you back shortly, usually within a few business hours.
        </p>
      </div>
    </section>
  );
}

// Unused Zap/Eye/Shield imports guard (kept for future use)
void Zap; void Eye; void Shield;
