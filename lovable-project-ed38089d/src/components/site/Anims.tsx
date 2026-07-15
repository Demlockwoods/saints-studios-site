import { Star, Shield } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* 3D-feeling spinning gold star */
export function SpinStar({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <span className={`star-3d perspective-1000 inline-block ${className}`}>
      <span className="block animate-spin-3d origin-center">
        <Star className="w-full h-full fill-gold text-gold" strokeWidth={1.5} />
      </span>
    </span>
  );
}

/* Animated 5-star row with staggered spin */
export function SpinningStars({ size = 18 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-1 perspective-1000">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="block animate-spin-3d"
          style={{ width: size, height: size, animationDelay: `${i * 0.25}s`, animationDuration: "5s" }}
        >
          <Star className="w-full h-full fill-gold text-gold" strokeWidth={1.5} />
        </span>
      ))}
    </span>
  );
}

/* SVG analog clock , second hand sweeps continuously, hour hand reads "7" */
export function TickingClock({ size = 56 }: { size?: number }) {
  return (
    <span
      className="inline-block align-middle"
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <defs>
          <radialGradient id="faceGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FDFAF4" />
            <stop offset="100%" stopColor="#F0E8D8" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="47" fill="url(#faceGrad)" stroke="#C9973A" strokeWidth="2.5" />
        {/* hour ticks */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI) / 6;
          const x1 = 50 + Math.sin(a) * 42;
          const y1 = 50 - Math.cos(a) * 42;
          const x2 = 50 + Math.sin(a) * 46;
          const y2 = 50 - Math.cos(a) * 46;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#2C2018" strokeOpacity={i % 3 === 0 ? 0.9 : 0.4} strokeWidth={i % 3 === 0 ? 2 : 1} strokeLinecap="round" />;
        })}
        {/* "7" emphasis */}
        <text x="33" y="74" fontFamily="Cormorant Garamond, serif" fontSize="20" fontWeight="600" fill="#C9973A">7</text>
        {/* hour hand pointing at 7 (210°) */}
        <g transform="rotate(210 50 50)">
          <line x1="50" y1="50" x2="50" y2="28" stroke="#2C2018" strokeWidth="3.5" strokeLinecap="round" />
        </g>
        {/* minute hand , animated sweep */}
        <g className="origin-center animate-spin-slow" style={{ transformOrigin: "50px 50px" }}>
          <line x1="50" y1="50" x2="50" y2="14" stroke="#2C2018" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        {/* second hand , fast sweep */}
        <g style={{ transformOrigin: "50px 50px", transformBox: "fill-box", animation: "spin-slow 4s linear infinite" }}>
          <line x1="50" y1="56" x2="50" y2="12" stroke="#C9973A" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <circle cx="50" cy="50" r="3" fill="#C9973A" />
        <circle cx="50" cy="50" r="1.2" fill="#2C2018" />
      </svg>
    </span>
  );
}

/* 3D coin-flip shield for guarantee */
export function SwingingShield({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <span className={`perspective-1000 inline-block ${className}`}>
      <span className="block animate-swing-3d">
        <Shield className="w-full h-full text-gold" strokeWidth={1.5} />
      </span>
    </span>
  );
}

/* Animated browser mockup: a live "leads dashboard" that loops.
   Bars grow, counter ticks up to 340%, cursor moves, notifications drop in.
   Hover slows/explodes the scene for play. */
export function HeroLeadsDashboard() {
  const [tick, setTick] = useState(0);
  const [hover, setHover] = useState(false);
  const raf = useRef<number | null>(null);
  const start = useRef<number>(0);

  useEffect(() => {
    const loop = (t: number) => {
      if (!start.current) start.current = t;
      const elapsed = (t - start.current) / 1000;
      // 6-second loop
      const p = (elapsed % 6) / 6;
      setTick(p);
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, []);

  // Eased progress 0 → 1 across the cycle
  const ease = (x: number) => 1 - Math.pow(1 - x, 3);
  const grow = ease(Math.min(tick * 1.6, 1));
  const counter = Math.round(grow * 340);
  const bars = [0.4, 0.55, 0.7, 0.6, 0.85, 0.95, 1];

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative group cursor-pointer"
    >
      {/* glowing halo */}
      <div className={`absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-gold/30 via-transparent to-espresso/10 blur-2xl transition-opacity duration-500 ${hover ? "opacity-100" : "opacity-60"}`} />

      <div className={`relative bg-cream-soft border border-warm-border rounded-3xl shadow-[0_30px_80px_-30px_rgba(44,32,24,0.35)] overflow-hidden transition-transform duration-500 ${hover ? "scale-[1.02] -rotate-1" : ""}`}>
        {/* browser chrome */}
        <div className="flex items-center gap-1.5 px-4 py-3 bg-cream-deep border-b border-warm-border">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E47C66]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#E8B84A]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#87A878]" />
          <span className="ml-3 text-[10px] text-warm-brown font-mono tracking-wide">yourbusiness.ae/analytics</span>
          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
        </div>

        {/* dashboard */}
        <div className="p-6 space-y-5 bg-cream">
          {/* header line */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-warm-brown">Leads · last 90 days</p>
              <p className="font-display text-4xl text-espresso leading-tight">
                +<span className="text-gold tabular-nums">{counter}</span>%
              </p>
            </div>
            <div className="flex items-center gap-1 text-gold">
              <SpinStar className="w-4 h-4" />
              <span className="text-[11px] font-medium">trending</span>
            </div>
          </div>

          {/* growing bars */}
          <div className="flex items-end gap-2 h-24 border-b border-warm-border pb-1">
            {bars.map((b, i) => {
              const h = b * grow * 100;
              return (
                <div key={i} className="flex-1 flex flex-col justify-end">
                  <div
                    className="rounded-t bg-gradient-to-t from-gold to-gold/70 transition-all duration-300"
                    style={{ height: `${h}%`, opacity: 0.55 + b * 0.45 }}
                  />
                </div>
              );
            })}
          </div>

          {/* live ticker rows */}
          <div className="space-y-2">
            {["Marina Dental", "Al Manara Bistro", "JBR Hair Atelier"].map((name, i) => {
              const visible = grow > (i + 1) * 0.25;
              return (
                <div
                  key={name}
                  className={`flex items-center justify-between text-[12px] transition-all duration-500 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"}`}
                >
                  <span className="flex items-center gap-2 text-espresso">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    New enquiry · <em className="not-italic text-warm-brown">{name}</em>
                  </span>
                  <span className="font-mono text-[10px] text-warm-brown">just now</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* floating notification pill , drops in mid-cycle */}
      <div
        className={`absolute -top-5 -right-3 md:-right-6 bg-espresso text-ivory rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 transition-all duration-500 ${tick > 0.55 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}
      >
        <span className="w-8 h-8 rounded-full bg-gold/20 text-gold grid place-items-center">
          <SpinStar className="w-4 h-4" />
        </span>
        <div className="text-left">
          <div className="text-[10px] tracking-wider uppercase text-ivory/60">Booking</div>
          <div className="text-[12px] font-medium">Table for 4 · 8:30 PM</div>
        </div>
      </div>

      {/* floating stat card , always on, ticking */}
      <div className="absolute -bottom-7 -left-4 md:-left-8 bg-cream-soft border border-gold/40 rounded-2xl shadow-xl px-5 py-3 animate-float-y">
        <div className="text-[9px] tracking-[0.25em] uppercase text-warm-brown">Live visitors</div>
        <div className="font-display text-2xl text-espresso tabular-nums">
          {Math.round(40 + grow * 180)}
          <span className="text-gold text-sm ml-1">↑</span>
        </div>
      </div>

      {/* corner sparkle */}
      <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full border border-gold/40 animate-spin-slow hidden md:block">
        <span className="absolute top-1/2 left-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold" />
      </div>
    </div>
  );
}
