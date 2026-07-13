import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type MouseEvent,
} from "react";
import { useIsMobile } from "@/hooks/use-mobile";

/* ===== Scroll Progress Bar (top of page) ===== */
export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-gold via-[#f0d78c] to-gold shadow-[0_0_10px_rgba(201,151,58,0.6)] transition-[width] duration-150"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}

/* ===== Tilt + Spotlight Card ===== */
export function TiltCard({
  children,
  className = "",
  intensity = 8,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rx = (0.5 - y) * intensity;
    const ry = (x - 0.5) * intensity;
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  };
  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`relative tilt-card group/tilt ${className}`}
    >
      <div className="tilt-inner">{children}</div>
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover/tilt:opacity-100 transition-opacity duration-300 [background:radial-gradient(280px_circle_at_var(--mx)_var(--my),rgba(201,151,58,0.18),transparent_60%)]" />
    </div>
  );
}

/* ===== Magnetic Button wrapper ===== */
export function Magnetic({
  children,
  strength = 18,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const onMove = (e: MouseEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${(x / r.width) * strength}px, ${(y / r.height) * strength}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };
  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`inline-block transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </span>
  );
}

/* ===== Count-up on scroll into view ===== */
export function CountUp({
  to,
  duration = 1600,
  prefix = "",
  suffix = "",
  className = "",
}: {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started) {
            started = true;
            const t0 = performance.now();
            const tick = (t: number) => {
              const p = Math.min(1, (t - t0) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setV(Math.round(eased * to));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to, duration]);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {v.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ===== Aurora soft blobs (subtle background) ===== */
export function Aurora({ className = "" }: { className?: string }) {
  const isMobile = useIsMobile();
  const blur = isMobile ? "blur-[60px]" : "blur-[100px]";
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className={`absolute -top-32 -left-24 w-[460px] h-[460px] rounded-full bg-gold/45 ${blur} ${isMobile ? "" : "animate-blob"}`} />
      <div className={`absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-[#f0d78c]/55 ${blur} ${isMobile ? "" : "animate-blob [animation-delay:-6s]"}`} />
      <div className={`absolute bottom-0 left-1/3 w-[420px] h-[420px] rounded-full bg-[#c9973a]/35 ${blur} ${isMobile ? "" : "animate-blob [animation-delay:-12s]"}`} />
    </div>
  );
}

/* ===== Concentric ripple rings ===== */
export function Ripples({ count = 4 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full border border-gold/30 animate-ripple"
          style={
            {
              width: 80,
              height: 80,
              animationDelay: `${i * 0.9}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

/* ===== Drifting glass orbs with parallax on hover ===== */
export function GlassOrbs({ count = 6 }: { count?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const effectiveCount = isMobile ? Math.min(3, count) : count;
  const [orbs, setOrbs] = useState<
    Array<{ size: number; left: number; top: number; delay: number; depth: number }>
  >([]);
  useEffect(() => {
    setOrbs(
      Array.from({ length: effectiveCount }).map(() => ({
        size: 60 + Math.random() * 120,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 6,
        depth: 0.3 + Math.random() * 1.2,
      })),
    );
  }, [effectiveCount]);
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ox", `${x * 24}px`);
    el.style.setProperty("--oy", `${y * 24}px`);
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="pointer-events-auto absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {orbs.map((o, i) => (
        <span
          key={i}
          className={`absolute rounded-full bg-gradient-to-br from-white/30 to-gold/15 border border-white/40 shadow-[inset_0_1px_8px_rgba(255,255,255,0.4)] ${isMobile ? "" : "backdrop-blur-md animate-float-y"}`}
          style={
            {
              width: o.size,
              height: o.size,
              left: `${o.left}%`,
              top: `${o.top}%`,
              animationDelay: `${o.delay}s`,
              transform: isMobile
                ? undefined
                : `translate(calc(var(--ox,0px) * ${o.depth}), calc(var(--oy,0px) * ${o.depth}))`,
              transition: isMobile ? undefined : "transform 400ms ease",
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

/* ===== Shimmer Text (gold sweep on hover) ===== */
export function ShimmerText({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block bg-clip-text text-transparent bg-[length:200%_100%] bg-[linear-gradient(110deg,var(--color-espresso)_45%,var(--color-gold)_55%,var(--color-espresso)_65%)] hover:animate-shimmer-text ${className}`}
    >
      {children}
    </span>
  );
}

/* ===== Parallax (background scrolls slower than foreground) ===== */
export function Parallax({
  children,
  speed = 0.5,
  className = "",
}: {
  children: ReactNode;
  /** 0 = locked in place, 1 = scrolls with page. <1 means slower than foreground. */
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (isMobile) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let startTop = 0;
    let inView = false;
    const measure = () => {
      startTop = el.getBoundingClientRect().top + window.scrollY;
    };
    const update = () => {
      raf = 0;
      const rel = window.scrollY - startTop;
      const y = rel * (1 - speed);
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
    };
    const onScroll = () => {
      if (!inView) return;
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      if (inView) update();
    };
    measure();
    update();

    // Only listen for scroll while the parallax target is visible.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          inView = e.isIntersecting;
          if (inView) {
            measure();
            if (!raf) raf = requestAnimationFrame(update);
            window.addEventListener("scroll", onScroll, { passive: true });
          } else {
            window.removeEventListener("scroll", onScroll);
            if (raf) {
              cancelAnimationFrame(raf);
              raf = 0;
            }
          }
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    window.addEventListener("resize", onResize);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed, isMobile]);
  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{ transform: "translate3d(0,0,0)" }}
    >
      {children}
    </div>
  );
}
