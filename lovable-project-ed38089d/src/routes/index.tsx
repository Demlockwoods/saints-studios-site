import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Star, Zap, Smartphone, Search, Link2,
  ArrowRight, MessageCircle, Quote, ChevronLeft, ChevronRight,
} from "lucide-react";
import { useRef } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { SpinStar, TickingClock, SwingingShield, HeroLeadsDashboard } from "@/components/site/Anims";
import { Meteors, AnimatedGridPattern, Particles } from "@/components/site/MagicFX";
import { TiltCard, Magnetic, CountUp, Aurora, Ripples, GlassOrbs, Parallax } from "@/components/site/FX";
import { LosingMoney3D } from "@/components/site/LosingMoney3D";
import { StickyGradientSection } from "@/components/site/StickyGradientSection";
import BlurText from "@/components/reactbits/BlurText";
import ShinyText from "@/components/reactbits/ShinyText";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import StarBorder from "@/components/reactbits/StarBorder";
import Magnet from "@/components/reactbits/Magnet";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Saints Studios — Dubai web design that makes your phone ring" },
      { name: "description", content: "Dubai's growth-focused web studio. Beautiful, fast websites engineered to convert. Live in 7 days. Money-back guaranteed." },
      { name: "keywords", content: "Dubai web design, web design Dubai, Dubai SEO, lead generation Dubai, website Dubai, Saints Studios" },
      { property: "og:title", content: "Saints Studios — Dubai web design that makes your phone ring" },
      { property: "og:description", content: "Done-for-you web design for Dubai businesses that want more visibility, more leads, and a stronger online presence." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Saints Studios",
        description: "Premium Dubai web design and digital growth studio.",
        areaServed: "Dubai, UAE",
        address: { "@type": "PostalAddress", addressLocality: "Business Bay", addressRegion: "Dubai", addressCountry: "AE" },
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
      <SocialProof />
      <LosingMoney3D />
      <StickyGradientSection
        from="hsl(24, 62%, 74%)"
        to="hsl(36, 55%, 90%)"
        accent="#8B3A3A"
      >
        <Services />
      </StickyGradientSection>
      <Process />
      <FeaturedResult />
      
      <Reviews />
      <FinalCTA />
    </SiteLayout>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="relative hero-pattern overflow-hidden">
      <Parallax speed={0.3} className="absolute inset-0 pointer-events-none">
        <Aurora />
      </Parallax>
      <Parallax speed={0.5} className="absolute inset-0 pointer-events-none">
        <Particles quantity={60} />
      </Parallax>
      <Parallax speed={0.65} className="absolute inset-0 pointer-events-none">
        <GlassOrbs count={5} />
      </Parallax>
      <div className="relative container-narrow min-h-[calc(100vh-72px)] grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center py-20">
        <div className="space-y-8">
          <p className="eyebrow flex items-center gap-3 reveal-left">
            <span className="w-8 h-px bg-gold" />
            Dubai's growth-focused web studio
          </p>
          <h1 className="font-display text-[48px] md:text-[72px] leading-[1.05] text-espresso">
            <BlurText
              text="We build websites that bring you"
              className="inline"
              animateBy="words"
              direction="top"
              delay={90}
            />{" "}
            <em className="font-light text-gold inline-block">
              <ShinyText
                text="customers."
                color="#C9973A"
                shineColor="#FFF4D6"
                speed={3}
                spread={90}
              />
            </em>
            <br />
            <BlurText
              text="Not just clicks."
              className="inline"
              animateBy="words"
              direction="top"
              delay={110}
            />
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
              <Link to="/reviews" className="btn-secondary">Read our reviews</Link>
            </Magnet>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 text-[12px] text-warm-brown reveal">
            <span className="flex items-center gap-2"><SpinStar className="w-4 h-4" /> 5-star rated</span>
            <span className="w-px h-4 bg-warm-border hidden sm:block" />
            <span className="flex items-center gap-2"><TickingClock size={22} /> 7-day delivery</span>
            <span className="w-px h-4 bg-warm-border hidden sm:block" />
            <span className="flex items-center gap-2"><SwingingShield className="w-4 h-4" /> Money-back guarantee</span>
          </div>
        </div>

        <div className="relative reveal-scale">
          <HeroLeadsDashboard />
        </div>
      </div>
    </section>
  );
}

function TrustItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return <span className="flex items-center gap-2">{icon}{label}</span>;
}

function MockSite({ label, before }: { label: string; before?: boolean }) {
  return (
    <div className="rounded-xl overflow-hidden border border-warm-border bg-white">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-cream-deep border-b border-warm-border">
        <span className="w-2 h-2 rounded-full bg-[#E47C66]" />
        <span className="w-2 h-2 rounded-full bg-[#E8B84A]" />
        <span className="w-2 h-2 rounded-full bg-[#87A878]" />
      </div>
      {before ? (
        <div className="p-3 space-y-2 text-[8px] bg-[#f1efe8]">
          <div className="h-3 w-1/2 bg-gray-300" />
          <div className="h-2 w-full bg-gray-200" />
          <div className="h-2 w-4/5 bg-gray-200" />
          <div className="h-12 w-full bg-gray-300 mt-2" />
          <div className="h-2 w-2/3 bg-gray-200" />
        </div>
      ) : (
        <div className="p-3 space-y-2 bg-cream">
          <div className="h-2.5 w-1/3 bg-gold/60 rounded-full" />
          <div className="h-3 w-3/4 bg-espresso rounded" />
          <div className="h-1.5 w-full bg-warm-border rounded" />
          <div className="h-1.5 w-5/6 bg-warm-border rounded" />
          <div className="flex gap-1.5 mt-2">
            <div className="h-4 w-12 bg-espresso rounded-full" />
            <div className="h-4 w-10 border border-warm-border rounded-full" />
          </div>
        </div>
      )}
      <div className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] text-warm-brown border-t border-warm-border">
        <span className={`w-1.5 h-1.5 rounded-full ${before ? "bg-[#E47C66]" : "bg-[#87A878]"}`} />
        {label}
      </div>
    </div>
  );
}

/* ---------- SOCIAL PROOF ---------- */
function SocialProof() {
  const names = ["Al Manara Bistro", "Marina Dental", "Habibi Legal", "Pulse Fitness", "DIFC Advisory", "Olea & Co.", "JBR Hair Atelier", "Oryx Realty"];
  return (
    <section className="bg-cream-deep border-y border-warm-border">
      <div className="container-narrow py-6 flex flex-col md:flex-row items-center gap-4">
        <p className="text-[11px] tracking-[0.25em] uppercase text-warm-brown whitespace-nowrap">
          Trusted across Dubai · JBR · DIFC · Business Bay
        </p>
        <div className="flex-1 overflow-hidden edge-fade-x">
          <div className="flex items-center gap-8 animate-scroll-left whitespace-nowrap">
            {[...names, ...names].map((n, i) => (
              <span key={i} className="flex items-center gap-8 font-display text-warm-brown text-lg italic">
                {n} <span className="w-1 h-1 rounded-full bg-gold" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- PROBLEM ---------- */
function Problem() {
  const cards = [
    { icon: Zap, num: "01", title: "Too slow to keep anyone.", body: "If your site takes more than 3 seconds to load, 53% of visitors leave before seeing a word. We rebuild yours to load under 2 seconds — on mobile, on patchy 4G, on a Friday night.", stat: "53% bounce" },
    { icon: Smartphone, num: "02", title: "Invisible on mobile.", body: "Over 70% of your traffic is on a phone. A non-responsive site loses them all. We design mobile-first, then scale up to desktop — never the other way around.", stat: "70% on mobile" },
    { icon: Search, num: "03", title: "Buried on Google.", body: "If you're not on page one, you're not in the conversation. We build every site with on-page SEO, local schema, and a Google Business Profile that actually shows up.", stat: "Page 1 in 90 days" },
    { icon: Link2, num: "04", title: "No lead capture.", body: "Visitors come and leave with no way to follow up. We add forms, WhatsApp, live chat, and lead magnets — so every interested visitor becomes a contact.", stat: "Up to 5× enquiries" },
  ];
  const scroller = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="section-pad overflow-hidden">
      <div className="container-narrow text-center max-w-3xl mx-auto space-y-6">
        <p className="eyebrow">The problem · swipe →</p>
        <h2 className="font-display text-4xl md:text-5xl text-espresso">
          Your website is losing you money. <em className="text-gold font-light">Every single day.</em>
        </h2>
        <p className="text-[15px] font-light text-warm-brown leading-relaxed">
          Most Dubai businesses have a website that exists — but doesn't work.
          Spin the wheel to see where it's leaking customers.
        </p>
      </div>

      <div className="relative mt-14">
        <div
          ref={scroller}
          className="scroll-snap-x flex gap-6 overflow-x-auto pb-6 px-6 md:px-[max(1.5rem,calc((100vw-1200px)/2))]"
        >
          {cards.map(({ icon: Icon, num, title, body, stat }) => (
            <TiltCard
              key={title}
              className="snap-center-item flex-shrink-0 w-[85vw] md:w-[460px] bg-cream-soft border border-warm-border rounded-3xl hover:border-gold transition-colors group sheen"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <span className="font-display text-5xl text-warm-border group-hover:text-gold transition-colors">{num}</span>
                  <span className="w-12 h-12 rounded-full bg-espresso text-gold flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </span>
                </div>
                <h3 className="font-display text-2xl text-espresso mb-3">{title}</h3>
                <p className="text-[14px] font-light text-warm-brown leading-relaxed">{body}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-[12px] text-gold tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" /> {stat}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        <div className="container-narrow mt-8 flex items-center justify-between">
          <p className="text-[11px] text-warm-brown tracking-widest uppercase">Drag · swipe · spin →</p>
          <div className="flex gap-2">
            <button onClick={() => scroll(-1)} aria-label="Previous" className="w-11 h-11 rounded-full border border-warm-border hover:border-gold hover:text-gold transition-all flex items-center justify-center">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => scroll(1)} aria-label="Next" className="w-11 h-11 rounded-full border border-warm-border hover:border-gold hover:text-gold transition-all flex items-center justify-center">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="container-narrow mt-16 flex flex-col items-center gap-6">
        <div className="w-24 h-px bg-gold" />
        <p className="font-display italic text-2xl text-espresso text-center flex items-center gap-3">
          We fix all of this. In <TickingClock size={32} /> 7 days.
        </p>
      </div>
    </section>
  );
}

/* ---------- SERVICES ---------- */
function Services() {
  const services = [
    { num: "01", tag: "Web Design", title: "Websites that work as hard as you do.", body: "Beautiful, fast, mobile-optimised websites engineered to convert visitors into enquiries. No templates. No shortcuts. Built around your business and your customers." },
    { num: "02", tag: "SEO", title: "Get found by people already looking for you.", body: "We build every site with Google in mind from day one. Local SEO, technical optimisation, keyword targeting — so your business shows up when it matters most." },
    { num: "03", tag: "Lead Generation", title: "Turn traffic into revenue.", body: "Forms, landing pages, live chat, and CTA strategy that captures every possible lead from your site. Your website should be your best-performing salesperson." },
  ];
  return (
    <section className="section-pad border-y border-warm-border/60">
      <div className="container-narrow">
        <div className="max-w-2xl space-y-4 mb-16">

          <p className="eyebrow">What we do</p>
          <h2 className="font-display text-4xl md:text-5xl text-espresso">
            Everything your business needs to <em className="text-gold font-light">dominate online.</em>
          </h2>
        </div>
        <div className="space-y-5">
          {services.map((s) => (
            <div key={s.num} className="reveal-left relative hover-lift-card sheen border-t border-warm-border bg-cream rounded-3xl p-8 md:p-12 overflow-hidden">
              <span className="absolute left-0 top-0 h-1 w-0 group-hover:w-full bg-gradient-to-r from-gold via-[#f0d78c] to-gold transition-[width] duration-700" />
              <span className="absolute right-8 top-2 font-display text-[120px] text-warm-border/40 leading-none pointer-events-none select-none">
                {s.num}
              </span>
              <div className="relative max-w-2xl space-y-4">
                <p className="text-[11px] tracking-[0.25em] uppercase text-gold">{s.tag}</p>
                <h3 className="font-display text-3xl md:text-4xl text-espresso">{s.title}</h3>
                <p className="text-[14px] font-light text-warm-brown leading-relaxed">{s.body}</p>
                <Link to="/services" className="inline-flex items-center gap-2 text-gold text-[13px] hover:gap-3 transition-all pt-2">
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
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
            <div
              key={s.n}
              className="relative space-y-4 reveal-scale"
              style={{ transitionDelay: `${i * 140}ms` }}
            >
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
            Delivered in 7 days — or your first retainer month is free.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- FEATURED RESULT ---------- */
function FeaturedResult() {
  return (
    <section className="section-pad">
      <div className="container-narrow grid lg:grid-cols-2 gap-16 items-center">
        <div className="reveal-left bg-cream-soft border border-warm-border rounded-3xl p-6 shadow-[0_30px_80px_-40px_rgba(44,32,24,0.2)]">
          <div className="flex items-center gap-1.5 px-3 py-2 bg-cream-deep border border-warm-border rounded-t-xl">
            <span className="w-2 h-2 rounded-full bg-[#E47C66]" />
            <span className="w-2 h-2 rounded-full bg-[#E8B84A]" />
            <span className="w-2 h-2 rounded-full bg-[#87A878]" />
            <span className="ml-3 text-[10px] text-warm-brown">almanara.ae</span>
          </div>
          <div className="bg-cream p-8 rounded-b-xl space-y-3 min-h-[320px]">
            <div className="text-[10px] tracking-widest uppercase text-gold">Marina · Restaurant</div>
            <div className="font-display text-3xl text-espresso italic">Al Manara Bistro</div>
            <div className="h-px bg-warm-border my-3" />
            <div className="h-2 w-full bg-warm-border/60 rounded" />
            <div className="h-2 w-5/6 bg-warm-border/60 rounded" />
            <div className="h-2 w-2/3 bg-warm-border/60 rounded" />
            <div className="flex gap-2 mt-5">
              <div className="h-7 w-24 bg-espresso rounded-full" />
              <div className="h-7 w-20 border border-warm-border rounded-full" />
            </div>
          </div>
        </div>
        <div className="space-y-6 reveal-right">
          <p className="text-[11px] tracking-[0.25em] uppercase text-gold">Al Manara Bistro · Dubai Marina</p>
          <div>
            <div className="font-display text-7xl md:text-8xl text-espresso leading-none">
              +<CountUp to={340} />%
            </div>
            <p className="font-display italic text-2xl text-warm-brown mt-2">increase in monthly enquiries.</p>
          </div>
          <p className="text-[15px] font-light text-warm-brown leading-relaxed">
            A Dubai Marina restaurant came to us with a site that hadn't been touched
            since 2017. We rebuilt it from scratch, optimised it for local search, and
            added a reservation capture form. Within 90 days they had more inbound
            bookings than they'd received in the previous two years combined.
          </p>
          <div className="relative pl-8 border-l border-gold">
            <Quote className="absolute -left-3 top-0 w-6 h-6 text-gold fill-gold" />
            <p className="font-display italic text-2xl text-espresso leading-snug">
              "The phone hasn't stopped. We had to hire two new floor staff. Best money
              we've spent in years."
            </p>
            <p className="mt-3 text-[12px] text-warm-brown">
              Yousef Khan · Owner, Al Manara Bistro
            </p>
          </div>
          <Link to="/reviews" className="inline-flex items-center gap-2 text-gold text-[13px] hover:gap-3 transition-all">
            Read more client reviews <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}


/* ---------- REVIEWS ---------- */
const reviewSet = [
  { q: "They rebuilt our site in a week and our enquiries doubled within the first month. I expected good. I got extraordinary.", n: "Layla Hassan", b: "Founder, JBR Hair Atelier", f: true },
  { q: "We finally rank on the first page for our clinic. Three new patient bookings in the first week alone.", n: "Dr. Faisal Noor", b: "Marina Dental" },
  { q: "Worth every dirham. The site looks luxury and it sells like it.", n: "Omar Saleh", b: "Oryx Realty" },
  { q: "I've worked with three agencies in Dubai. This is the only one that understood the brief on the first call.", n: "Nadia Al-Rashid", b: "DIFC Advisory" },
  { q: "Delivered in 6 days. Beautiful, fast, and our WhatsApp hasn't stopped.", n: "Tariq Mahmoud", b: "Pulse Fitness", f: true },
  { q: "Honest, sharp, and proper craft. Rare combination.", n: "Sophie Laurent", b: "Olea & Co." },
  { q: "We launched and bookings tripled in three weeks. I still can't quite believe it.", n: "Yousef Khan", b: "Al Manara Bistro" },
  { q: "The strategy call alone was worth the engagement. They actually listen.", n: "Reem Al-Sayed", b: "Habibi Legal" },
  { q: "Best web investment we've made. Period.", n: "Karim Boutros", b: "Boutros Group" },
  { q: "From an outdated brochure site to a real growth engine. Couldn't recommend more highly.", n: "Aisha Mansour", b: "Maison Aisha" },
];

function Reviews() {
  const row1 = reviewSet.slice(0, 5);
  const row2 = reviewSet.slice(5);
  return (
    <section className="section-pad">
      <div className="container-narrow text-center space-y-5 mb-14">
        <p className="eyebrow">Reviews</p>
        <h2 className="font-display text-4xl md:text-5xl text-espresso">
          What our clients <em className="text-gold font-light">actually say.</em>
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-3">
          <div className="flex items-center gap-2">
            <span className="font-display text-4xl text-espresso">4.9</span>
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-gold text-gold" />)}
            </div>
          </div>
          <span className="w-px h-8 bg-warm-border" />
          <span className="text-[13px] text-warm-brown">120+ happy clients</span>
          <span className="w-px h-8 bg-warm-border" />
          <span className="text-[13px] text-warm-brown">98% retention</span>
        </div>
      </div>

      <div className="space-y-6 [--gap:1.5rem] group overflow-hidden">
        <ReviewRow items={row1} dir="left" />
        <ReviewRow items={row2} dir="right" />
      </div>
    </section>
  );
}

function ReviewRow({ items, dir }: { items: typeof reviewSet; dir: "left" | "right" }) {
  return (
    <div className="overflow-hidden">
      <div className={`flex gap-6 w-max ${dir === "left" ? "animate-scroll-left" : "animate-scroll-right"} group-hover:[animation-play-state:paused]`}>
        {[...items, ...items].map((r, i) => <ReviewCard key={i} {...r} />)}
      </div>
    </div>
  );
}

function ReviewCard({ q, n, b, f }: { q: string; n: string; b: string; f?: boolean }) {
  return (
    <div className={`relative w-[340px] flex-shrink-0 rounded-3xl border p-7 ${f ? "bg-espresso text-ivory border-espresso" : "bg-cream-soft border-warm-border text-espresso"}`}>
      <Quote className={`absolute -top-2 left-5 w-14 h-14 ${f ? "text-ivory/10 fill-ivory/10" : "text-cream-deep fill-cream-deep"}`} />
      <div className="relative">
        <div className="flex gap-0.5 mb-3">
          {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />)}
        </div>
        <p className={`font-display text-lg leading-snug italic ${f ? "text-ivory" : "text-espresso"}`}>
          "{q}"
        </p>
        <div className="h-px bg-warm-border/30 my-5" />
        <p className="text-[13px] font-medium">{n}</p>
        <p className={`text-[12px] ${f ? "text-ivory/60" : "text-warm-brown"}`}>{b}</p>
      </div>
    </div>
  );
}

/* ---------- FINAL CTA ---------- */
function FinalCTA() {
  return (
    <section className="relative section-pad bg-espresso text-ivory text-center overflow-hidden">
      <Meteors number={25} />
      <Ripples count={4} />
      <div className="relative container-narrow max-w-3xl space-y-7">
        <h2 className="font-display text-4xl md:text-[54px] leading-[1.1] text-ivory reveal-blur">
          Your website should be your <em className="text-gold font-light">best salesperson.</em>
        </h2>
        <p className="text-[16px] font-light text-ivory/70 max-w-xl mx-auto reveal">
          Let's build something that actually works for your business. Book a free
          30-minute strategy call — no pitch, no pressure.
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
          We reply within 4 business hours. Based in Dubai.
        </p>
      </div>
    </section>
  );
}
