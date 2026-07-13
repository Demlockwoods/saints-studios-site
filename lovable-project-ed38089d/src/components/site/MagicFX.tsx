import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

/* ---------- Meteors ---------- */
export function Meteors({ number = 20 }: { number?: number }) {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [meteors, setMeteors] = useState<Array<CSSProperties>>([]);
  useEffect(() => {
    const n = isMobile ? Math.min(6, number) : number;
    setMeteors(
      Array.from({ length: n }).map(() => ({
        top: "-5%",
        left: `${Math.floor(Math.random() * 100)}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${4 + Math.random() * 6}s`,
      })),
    );
  }, [number, isMobile]);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setInView(e.isIntersecting);
      },
      { rootMargin: "100px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      {inView &&
        meteors.map((style, i) => (
          <span
            key={i}
            style={style}
            className="absolute h-[3px] w-[3px] rotate-[215deg] rounded-full bg-[#f0d78c] shadow-[0_0_8px_2px_rgba(240,215,140,0.7)] animate-meteor"
          >
            <span className="absolute top-1/2 -z-10 h-[2px] w-[90px] -translate-y-1/2 bg-gradient-to-r from-[#f0d78c] via-gold to-transparent" />
          </span>
        ))}
    </div>
  );
}

/* ---------- Animated Grid Pattern ---------- */
export function AnimatedGridPattern({
  width = 40,
  height = 40,
  numSquares = 30,
  className = "",
}: {
  width?: number;
  height?: number;
  numSquares?: number;
  className?: string;
}) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [squares, setSquares] = useState<Array<{ id: number; pos: [number, number] }>>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        setDims({ w: e.contentRect.width, h: e.contentRect.height });
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (dims.w === 0) return;
    const cols = Math.ceil(dims.w / width);
    const rows = Math.ceil(dims.h / height);
    setSquares(
      Array.from({ length: numSquares }).map((_, i) => ({
        id: i,
        pos: [Math.floor(Math.random() * cols), Math.floor(Math.random() * rows)],
      })),
    );
    const t = setInterval(() => {
      setSquares((prev) =>
        prev.map((s) => ({
          ...s,
          pos: [Math.floor(Math.random() * cols), Math.floor(Math.random() * rows)],
        })),
      );
    }, 3500);
    return () => clearInterval(t);
  }, [dims, numSquares, width, height]);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full fill-gold/25 stroke-gold/40 ${className}`}
    >
      <defs>
        <pattern id={id} width={width} height={height} patternUnits="userSpaceOnUse">
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x="0" y="0" className="overflow-visible">
        {squares.map(({ pos: [x, y], id: sid }) => (
          <rect
            key={`${sid}-${x}-${y}`}
            width={width - 1}
            height={height - 1}
            x={x * width + 0.5}
            y={y * height + 0.5}
            fill="currentColor"
            className="text-gold/35 animate-grid-fade"
          />
        ))}
      </svg>
    </svg>
  );
}

/* ---------- Border Beam ---------- */
export function BorderBeam({
  size = 200,
  duration = 8,
  colorFrom = "#c9a84c",
  colorTo = "#f0d78c",
}: {
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
}) {
  return (
    <div
      style={
        {
          "--size": `${size}px`,
          "--duration": `${duration}s`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
        } as CSSProperties
      }
      className="pointer-events-none absolute inset-0 rounded-[inherit] [border:1px_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] after:absolute after:aspect-square after:w-[var(--size)] after:animate-border-beam after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:90%_50%] after:[offset-path:rect(0_auto_auto_0_round_var(--size))]"
    />
  );
}

/* ---------- Particles ---------- */
export function Particles({
  quantity = 50,
  color = "#d8a94a",
}: {
  quantity?: number;
  color?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let running = false;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
    const parent = canvas.parentElement!;
    const effectiveQty = isMobile ? Math.min(18, Math.round(quantity / 2)) : quantity;
    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    let particles: P[] = [];

    const resize = () => {
      const { width, height } = parent.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: effectiveQty }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 1.8 + 0.6,
        a: Math.random() * 0.55 + 0.4,
      }));
    };

    const draw = () => {
      const { width, height } = parent.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      if (!isMobile) ctx.shadowColor = color;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        if (!isMobile) ctx.shadowBlur = 8;
        ctx.fillStyle = color + Math.floor(p.a * 255).toString(16).padStart(2, "0");
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    resize();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) start();
          else stop();
        }
      },
      { rootMargin: "100px 0px" },
    );
    io.observe(parent);
    window.addEventListener("resize", resize);
    return () => {
      io.disconnect();
      stop();
      window.removeEventListener("resize", resize);
    };
  }, [quantity, color, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
