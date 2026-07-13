import { useEffect, useRef } from "react";

type Stop = { h: number; s: number; l: number };

/**
 * Smooth, seamless scroll-driven page backdrop.
 * Renders a fixed full-viewport gradient layer *behind* the page so there
 * are no seams between sections. Sections that were previously painted
 * with `bg-cream-soft` etc. can stay — this layer sits at z=-1.
 *
 * palette: array of HSL stops the backdrop interpolates through as the user
 * scrolls from top (index 0) to bottom (last index).
 */
export function ScrollTheme({
  palette,
  accent,
}: {
  palette?: Stop[];
  /** Optional radial glow color (hex or rgb string) that fades in mid-page. */
  accent?: string;
}) {
  const layerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const stops: Stop[] = palette ?? [
      { h: 34, s: 55, l: 82 }, // deeper orangish cream
      { h: 28, s: 62, l: 74 }, // warm peach
      { h: 24, s: 65, l: 66 }, // amber
    ];

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const paint = () => {
      rafRef.current = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, scrollRef.current / max)) : 0;

      const scale = p * (stops.length - 1);
      const seg = Math.min(stops.length - 2, Math.floor(scale));
      const t = scale - seg;
      const a = stops[seg];
      const b = stops[seg + 1];
      const hue = lerp(a.h, b.h, t);
      const sat = lerp(a.s, b.s, t);
      const lit = lerp(a.l, b.l, t);

      // Two soft radial glows + base color for depth without banding
      const base = `hsl(${hue.toFixed(1)} ${sat.toFixed(1)}% ${lit.toFixed(1)}%)`;
      const glowY = 30 + p * 40; // moves down as you scroll
      const accentGlow = accent
        ? `radial-gradient(60vw 50vh at 80% ${100 - glowY}%, ${accent}22, transparent 60%),`
        : "";
      const bg =
        `${accentGlow}` +
        `radial-gradient(70vw 60vh at 20% ${glowY}%, hsl(${hue.toFixed(1)} ${(sat + 10).toFixed(1)}% ${(lit + 5).toFixed(1)}% / 0.55), transparent 60%),` +
        `radial-gradient(80vw 70vh at 90% ${100 - glowY}%, hsl(${hue.toFixed(1)} ${sat.toFixed(1)}% ${(lit - 4).toFixed(1)}% / 0.5), transparent 65%),` +
        base;

      if (layerRef.current) layerRef.current.style.background = bg;
    };

    const onScroll = () => {
      scrollRef.current = window.scrollY;
      if (!rafRef.current) rafRef.current = requestAnimationFrame(paint);
    };

    scrollRef.current = window.scrollY;
    paint();
    if (reduce) return;

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [palette, accent]);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none will-change-[background]"
      style={{ background: "hsl(34 55% 82%)" }}
    />
  );
}
