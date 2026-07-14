import { useEffect, useRef, useState } from "react";
import { ArrowRight, Paintbrush, Search, Target } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type Service = {
  num: string;
  tag: string;
  title: string;
  body: string;
  pills: string[];
  Icon: typeof Paintbrush;
};

const SERVICES: Service[] = [
  {
    num: "01",
    tag: "Web Design",
    title: "Websites that work as hard as you do.",
    body: "Hand-crafted layouts, custom typography, real performance work. No templates. No shortcuts. Built around your business and your customers.",
    pills: ["Mobile responsive", "Sub-2s loading", "Conversion-optimised", "CMS included"],
    Icon: Paintbrush,
  },
  {
    num: "02",
    tag: "Search Engine Optimisation",
    title: "Get found by people already searching for you.",
    body: "On-page structure, local schema, technical SEO, and a Google Business Profile that actually converts. We track every metric and report monthly.",
    pills: ["On-page SEO", "Local SEO", "Google Business Profile", "Monthly reports"],
    Icon: Search,
  },
  {
    num: "03",
    tag: "Lead Generation",
    title: "Turn your traffic into revenue.",
    body: "Forms, landing pages, CTA strategy, live chat, and CRM integration. Your website stops being a brochure and starts being your best salesperson.",
    pills: ["Contact forms", "Landing pages", "Live chat", "CRM integration"],
    Icon: Target,
  },
];

export function ServicesWheel() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = wrap.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height - vh;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const p = total > 0 ? scrolled / total : 0;
        setProgress(p);
        const idx = Math.min(SERVICES.length - 1, Math.floor(p * SERVICES.length + 0.01));
        setActive(idx);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const activeService = SERVICES[active];
  const rotation = -progress * 360 * (SERVICES.length / SERVICES.length);

  return (
    <div
      ref={wrapRef}
      className="relative"
      style={{ height: isMobile ? "260vh" : "320vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Backdrop veil so background animation feels paused */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-cream-soft/70 to-cream/40 backdrop-blur-[2px]" />

        <div className="relative container-narrow grid md:grid-cols-[1fr_1.1fr] gap-10 items-center w-full">
          {/* WHEEL */}
          <div className="relative aspect-square max-w-[480px] mx-auto w-full">
            {/* Outer ring */}
            <div
              className="absolute inset-0 rounded-full border border-warm-border/70"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(201,151,58,0.16), rgba(139,58,58,0.10), rgba(201,151,58,0.16))",
              }}
            />
            {/* Rotating dial */}
            <div
              className="absolute inset-6 rounded-full border border-warm-border bg-cream-soft/60 backdrop-blur-md transition-transform duration-500 ease-out"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {SERVICES.map((s, i) => {
                const angle = (360 / SERVICES.length) * i - 90;
                const rad = (angle * Math.PI) / 180;
                const r = 42;
                const x = 50 + r * Math.cos(rad);
                const y = 50 + r * Math.sin(rad);
                const isActive = i === active;
                return (
                  <div
                    key={s.num}
                    className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: `translate(-50%,-50%) rotate(${-rotation}deg) scale(${isActive ? 1.15 : 0.85})`,
                    }}
                  >
                    <div
                      className={[
                        "w-20 h-20 rounded-full flex items-center justify-center border transition-all",
                        isActive
                          ? "bg-espresso text-gold border-gold shadow-[0_0_0_6px_rgba(201,151,58,0.18)]"
                          : "bg-cream-soft text-warm-brown border-warm-border",
                      ].join(" ")}
                    >
                      <s.Icon className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Center hub */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-espresso to-espresso-dark text-gold flex flex-col items-center justify-center shadow-[0_20px_50px_-20px_rgba(44,32,24,0.6)]">
              <span className="font-display text-4xl leading-none">{activeService.num}</span>
              <span className="text-[9px] tracking-[0.25em] uppercase text-gold/80 mt-1">
                of 0{SERVICES.length}
              </span>
            </div>
            {/* progress arc */}
            <svg
              className="absolute inset-0 -rotate-90 pointer-events-none"
              viewBox="0 0 100 100"
              aria-hidden
            >
              <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(201,151,58,0.15)" strokeWidth="0.6" />
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="var(--color-gold)"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeDasharray={`${progress * 301.6} 301.6`}
                style={{ transition: "stroke-dasharray 200ms linear" }}
              />
            </svg>
          </div>

          {/* CONTENT */}
          <div key={activeService.num} className="space-y-5 animate-fade-in">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold">
              {activeService.tag}
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-espresso leading-[1.05]">
              {activeService.title}
            </h2>
            <p className="text-[15px] font-light text-warm-brown leading-relaxed max-w-lg">
              {activeService.body}
            </p>
            <div className="flex flex-wrap gap-2">
              {activeService.pills.map((p) => (
                <span
                  key={p}
                  className="px-3 py-1.5 rounded-full border border-warm-border bg-cream-soft/80 text-[12px] text-espresso"
                >
                  {p}
                </span>
              ))}
            </div>
            {/* dots */}
            <div className="flex items-center gap-2 pt-2">
              {SERVICES.map((s, i) => (
                <span
                  key={s.num}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === active ? "w-10 bg-gold" : "w-4 bg-warm-border"
                  }`}
                />
              ))}
              <span className="ml-3 text-[11px] tracking-widest uppercase text-warm-brown flex items-center gap-1">
                Scroll <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
