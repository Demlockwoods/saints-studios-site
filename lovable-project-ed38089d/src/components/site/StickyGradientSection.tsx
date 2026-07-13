import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Wraps a section with its own scroll-driven local gradient background.
 * As the user scrolls through the section, `from` fades into `to`.
 * The background stays visually pinned via `background-attachment: fixed`
 * feel — implemented with a `position: sticky` painted layer.
 */
export function StickyGradientSection({
  from,
  to,
  accent,
  className = "",
  children,
}: {
  from: string;
  to: string;
  accent?: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;
    const compute = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when top of section enters bottom of viewport, 1 when bottom exits top
      const total = r.height + vh;
      const scrolled = vh - r.top;
      const raw = scrolled / total;
      setP(Math.max(0, Math.min(1, raw)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const eased = p * p * (3 - 2 * p);
  const accentGlow = accent
    ? `radial-gradient(50vw 40vh at 70% ${20 + eased * 60}%, ${accent}22, transparent 60%),`
    : "";

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[1]"
        style={{
          background: `${accentGlow}linear-gradient(180deg, ${from} 0%, ${to} 100%)`,
          opacity: 0.85 + eased * 0.15,
          willChange: "background, opacity",
        }}
      />
      {children}
    </div>
  );
}
