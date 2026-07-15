import { useEffect, useRef, useState } from "react";
import { Zap, Smartphone, Search, Link2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { TickingClock } from "./Anims";
import { Aurora, GlassOrbs } from "./FX";
import { Particles } from "./MagicFX";


const REASONS = [
  {
    icon: Zap,
    num: "01",
    title: "Too slow to keep anyone.",
    body: "If your site takes more than 3 seconds to load, 53% of visitors leave. We rebuild yours to load under 2 seconds , even on patchy 4G.",
    stat: "53% bounce",
  },
  {
    icon: Smartphone,
    num: "02",
    title: "Invisible on mobile.",
    body: "70% of your traffic is on a phone. A non-responsive site loses them all. We design mobile-first, then scale up.",
    stat: "70% mobile",
  },
  {
    icon: Search,
    num: "03",
    title: "Buried on Google.",
    body: "Not on page one? Not in the conversation. On-page SEO, local schema, and a real Google Business Profile.",
    stat: "Page 1 in 90d",
  },
  {
    icon: Link2,
    num: "04",
    title: "No lead capture.",
    body: "Visitors leave with no way to follow up. Forms, WhatsApp, live chat , every interested visitor becomes a contact.",
    stat: "5× enquiries",
  },
];

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const remap = (x: number, a: number, b: number) => clamp01((x - a) / (b - a));
const easeInOut = (t: number) => t * t * (3 - 2 * t);

// Progress windows for each reason quadrant to light up + card to appear
const QUADRANT_RANGES: Array<[number, number]> = [
  [0.10, 0.30],
  [0.30, 0.50],
  [0.50, 0.68],
  [0.68, 0.85],
];

const CARD_POSITIONS = [
  // TL quadrant → card floats top-left
  "left-2 sm:left-6 md:left-14 top-[12%] max-w-[340px] md:max-w-[400px]",
  // TR
  "right-2 sm:right-6 md:right-14 top-[12%] max-w-[340px] md:max-w-[400px] text-right",
  // BL
  "left-2 sm:left-6 md:left-14 bottom-[10%] max-w-[340px] md:max-w-[400px]",
  // BR
  "right-2 sm:right-6 md:right-14 bottom-[10%] max-w-[340px] md:max-w-[400px] text-right",
];

const CARD_ORIGIN = [
  { x: -60, y: -20 },
  { x: 60, y: -20 },
  { x: -60, y: 20 },
  { x: 60, y: 20 },
];

export function LosingMoney3D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);
  const isMobile = useIsMobile();
  const lastRef = useRef(0);
  const inViewRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const el = wrapRef.current;
    if (!el) return;

    // Only track scroll while section is on-screen (perf)
    const io = new IntersectionObserver(
      (entries) => {
        inViewRef.current = entries[0]?.isIntersecting ?? false;
      },
      { rootMargin: "20% 0px 20% 0px" }
    );
    io.observe(el);

    let raf = 0;
    // Throttle setState by delta: bigger delta on mobile = fewer re-renders
    const minDelta = isMobile ? 0.002 : 0.0005;
    const compute = () => {
      raf = 0;
      const node = wrapRef.current;
      if (!node || !inViewRef.current) return;
      const r = node.getBoundingClientRect();
      const total = node.offsetHeight - window.innerHeight;
      const scrolled = -r.top;
      const p = clamp01(scrolled / Math.max(1, total));
      if (Math.abs(p - lastRef.current) >= minDelta || p === 0 || p === 1) {
        lastRef.current = p;
        setProgress(p);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isMobile]);


  if (reduced) {
    return (
      <section className="section-pad">
        <div className="container-narrow text-center max-w-3xl mx-auto space-y-6">
          <p className="eyebrow">The problem</p>
          <h2 className="font-display text-4xl md:text-5xl text-espresso">
            Your website is losing you money.{" "}
            <em className="text-gold font-light">Every single day.</em>
          </h2>
        </div>
        <div className="container-narrow mt-12 grid md:grid-cols-2 gap-6">
          {REASONS.map((r) => (
            <div
              key={r.num}
              className="bg-cream-soft border border-warm-border rounded-3xl p-8"
            >
              <p className="font-display text-4xl text-gold">{r.num}</p>
              <h3 className="font-display text-2xl text-espresso mt-2">
                {r.title}
              </h3>
              <p className="text-[14px] font-light text-warm-brown mt-3">
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Reveal window at the end
  const revealT = easeInOut(remap(progress, 0.85, 1));
  // Side-to-side drift range across the entire scroll: -6% → +6%
  const drift = Math.sin(progress * Math.PI * 2) * 6; // % of viewport width
  // Subtle float / tilt
  const tilt = Math.sin(progress * Math.PI * 3) * 3; // degrees
  const laptopLift = easeInOut(remap(progress, 0, 0.15)); // 0→1 entry

  return (
    <section
      ref={wrapRef}
      className="relative"
      style={{ height: isMobile ? "350vh" : "500vh" }}
      aria-label="Your website is losing you money"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background motion layers , solid amount of movement behind the laptop */}
        <div className="absolute inset-0 pointer-events-none opacity-70">
          <Aurora />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <Particles quantity={isMobile ? 40 : 80} color="#c9973a" />
        </div>
        {!isMobile && (
          <div className="absolute inset-0 pointer-events-none">
            <GlassOrbs count={5} />
          </div>
        )}
        {/* Ambient glow behind laptop */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(60vw 50vh at 50% 55%, rgba(201,151,58,0.22), transparent 65%)",
          }}
        />

        {/* Heading */}
        <div className="absolute top-8 md:top-12 left-0 right-0 text-center px-6 z-10 pointer-events-none">
          <p className="eyebrow">The problem · scroll ↓</p>
          <h2 className="font-display text-3xl md:text-5xl text-espresso mt-3 max-w-3xl mx-auto">
            Your website is losing you money.{" "}
            <em className="text-gold font-light">Every single day.</em>
          </h2>
        </div>

        {/* Floating laptop stage , no CSS transition so it locks to scroll frame */}
        <div
          className="absolute inset-0 flex items-center justify-center z-0"
          style={{
            transform: `translate3d(${drift}vw, ${(1 - laptopLift) * 30}px, 0)`,
            willChange: "transform",
          }}
        >
          <Laptop progress={progress} tilt={tilt} revealT={revealT} isMobile={isMobile} />
        </div>


        {/* Reason cards (liquid glass) */}
        {REASONS.map((r, i) => {
          const [a, b] = QUADRANT_RANGES[i];
          const local = remap(progress, a, b);
          const inT = easeInOut(remap(local, 0, 0.35));
          const outT = easeInOut(remap(local, 0.85, 1));
          const opacity = inT * (1 - outT) * (1 - revealT);
          const origin = CARD_ORIGIN[i];
          const tx = (1 - inT) * origin.x;
          const ty = (1 - inT) * origin.y;
          const Icon = r.icon;
          return (
            <div
              key={r.num}
              className={`absolute ${CARD_POSITIONS[i]} z-20 pointer-events-none`}
              style={{
                opacity,
                transform: `translate3d(${tx}px, ${ty}px, 0)`,
                willChange: "opacity, transform",
              }}
            >
              <div className="glass-card p-6 md:p-7">
                <div
                  className={`flex items-center gap-3 mb-3 ${
                    i % 2 === 1 ? "justify-end" : "justify-start"
                  }`}
                >
                  {i % 2 === 1 && (
                    <span className="font-display text-4xl text-gold">
                      {r.num}
                    </span>
                  )}
                  <span className="w-11 h-11 rounded-full bg-espresso text-gold flex items-center justify-center">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </span>
                  {i % 2 === 0 && (
                    <span className="font-display text-4xl text-gold">
                      {r.num}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-espresso leading-snug">
                  {r.title}
                </h3>
                <p className="text-[15px] md:text-base font-normal text-espresso/85 leading-relaxed mt-3">
                  {r.body}
                </p>
                <div
                  className={`mt-4 inline-flex items-center gap-2 text-[12px] font-semibold text-gold tracking-wider uppercase ${
                    i % 2 === 1 ? "flex-row-reverse" : ""
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />{" "}
                  {r.stat}
                </div>
              </div>
            </div>
          );
        })}

        {/* Progress dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-40 pointer-events-none">
          {[0.05, 0.25, 0.45, 0.62, 0.9].map((b, i) => {
            const active = progress >= b - 0.04;
            return (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  active ? "w-8 bg-gold" : "w-2 bg-warm-border"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Laptop SVG ---------- */

function Laptop({
  progress,
  tilt,
  revealT,
  isMobile,
}: {
  progress: number;
  tilt: number;
  revealT: number;
  isMobile: boolean;
}) {
  // Quadrant activation levels (0..1) , each lights up in its window
  const quads = QUADRANT_RANGES.map(([a, b]) =>
    easeInOut(remap(progress, a, a + (b - a) * 0.6))
  );

  return (
    <div
      className="relative w-[92vw] max-w-[820px] aspect-[16/11]"
      style={{
        transform: isMobile
          ? `translateZ(0)`
          : `rotateZ(${tilt * 0.3}deg) rotateX(${6 - progress * 4}deg)`,
        transformStyle: isMobile ? undefined : "preserve-3d",
        perspective: isMobile ? undefined : "1200px",
        willChange: "transform",
      }}
    >

      {/* Screen */}
      <div
        className="absolute left-[4%] right-[4%] top-0 h-[78%] rounded-t-2xl border border-warm-border"
        style={{
          background:
            "linear-gradient(180deg, #1a1208 0%, #2c2018 100%)",
          boxShadow:
            "0 30px 80px -30px rgba(44,32,24,0.55), inset 0 0 0 6px #0d0904, inset 0 0 60px rgba(0,0,0,0.55)",
        }}
      >
        {/* Bezel notch */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-black/60" />

        {/* Screen inner */}
        <div className="absolute inset-[10px] rounded-lg overflow-hidden bg-[#0a0705]">
          {/* Reveal end state */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
            style={{
              opacity: revealT,
              background:
                "radial-gradient(60% 60% at 50% 45%, rgba(201,151,58,0.35), rgba(10,7,5,0.9) 75%)",
            }}
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold/80 mb-3">
              The fix
            </p>
            <h3 className="font-display text-2xl md:text-4xl text-ivory leading-tight max-w-md">
              We fix all of this. In{" "}
              <em className="text-gold font-light">7 days.</em>
            </h3>
            <div className="mt-5 flex items-center gap-3">
              <TickingClock size={44} />
              <span className="font-display italic text-base md:text-lg text-ivory/80">
                Live, ranked, converting.
              </span>
            </div>
          </div>

          {/* Quadrants */}
          <div
            className="absolute inset-0 grid grid-cols-2 grid-rows-2"
            style={{ opacity: 1 - revealT }}
          >
            {quads.map((q, i) => (
              <Quadrant key={i} index={i} lit={q} />
            ))}
            {/* Grid dividers */}
            <div className="pointer-events-none absolute inset-0">
              <span className="absolute left-1/2 top-0 bottom-0 w-px bg-black/50" />
              <span className="absolute top-1/2 left-0 right-0 h-px bg-black/50" />
            </div>
          </div>
        </div>

        {/* Screen glare */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-t-2xl"
          style={{
            background:
              "linear-gradient(115deg, rgba(255,255,255,0.08) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.04) 100%)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* Hinge */}
      <div className="absolute left-[3%] right-[3%] top-[78%] h-[2.5%] rounded-b-md bg-gradient-to-b from-[#3a2a1e] to-[#211510] border-x border-warm-border/30" />

      {/* Base */}
      <div
        className="absolute left-[1%] right-[1%] top-[80.5%] h-[8%] rounded-b-[28px]"
        style={{
          background:
            "linear-gradient(180deg, #d8c9a8 0%, #b89d75 60%, #8a6f4e 100%)",
          boxShadow:
            "0 20px 40px -20px rgba(44,32,24,0.5), inset 0 1px 0 rgba(255,255,255,0.35)",
        }}
      >
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[14%] h-[18%] rounded-full bg-black/15" />
      </div>

      {/* Reflection under laptop */}
      <div
        aria-hidden
        className="absolute left-[10%] right-[10%] top-[92%] h-[8%] rounded-[50%] blur-2xl"
        style={{
          background: "radial-gradient(ellipse, rgba(44,32,24,0.35), transparent 70%)",
        }}
      />
    </div>
  );
}

const QUAD_THEMES = [
  { hue: "#c9973a", label: "SPEED", icon: "⚡" },
  { hue: "#e2b672", label: "MOBILE", icon: "▢" },
  { hue: "#a8763a", label: "SEARCH", icon: "◎" },
  { hue: "#d4a860", label: "LEADS", icon: "◈" },
];

function Quadrant({ index, lit }: { index: number; lit: number }) {
  const theme = QUAD_THEMES[index];
  return (
    <div className="relative overflow-hidden">
      {/* Off state */}
      <div className="absolute inset-0 bg-[#0d0904]" />
      {/* Lit overlay */}
      <div
        className="absolute inset-0 transition-none"
        style={{
          opacity: lit,
          background: `radial-gradient(80% 80% at 50% 50%, ${theme.hue}55, ${theme.hue}10 60%, transparent 100%)`,
        }}
      />
      {/* Scanlines / UI hint */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-3"
        style={{ opacity: lit }}
      >
        <span
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ color: theme.hue }}
        >
          0{index + 1} · {theme.label}
        </span>
        <div className="w-16 h-16 rounded-2xl border flex items-center justify-center text-2xl"
          style={{ borderColor: `${theme.hue}66`, color: theme.hue, background: `${theme.hue}12` }}
        >
          {theme.icon}
        </div>
        {/* Fake bar chart pulse */}
        <div className="flex items-end gap-1 h-6">
          {[0, 1, 2, 3, 4].map((k) => (
            <span
              key={k}
              className="w-1 rounded-sm"
              style={{
                height: `${20 + ((lit * 100 + k * 17) % 80)}%`,
                background: theme.hue,
                opacity: 0.7,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
