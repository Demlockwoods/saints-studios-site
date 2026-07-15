import { useEffect, useState } from "react";

/**
 * Looping laptop animation. Tasks progressively check off, screen scrolls
 * to reveal more, forever. Pure CSS + React state, no heavy libs.
 */
const TASKS = [
  "Site loads under 2s",
  "Mobile-first responsive build",
  "Local SEO schema wired",
  "Google Business Profile linked",
  "Lead capture forms live",
  "WhatsApp click-to-chat",
  "Analytics + conversion tracking",
  "Blog engine + CMS",
  "Speed audit , 98/100",
  "Booking system connected",
  "Live chat installed",
  "Monthly report scheduled",
];

export function LoopingLaptop({ className = "" }: { className?: string }) {
  const [checked, setChecked] = useState<number>(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setChecked((c) => {
        if (c >= TASKS.length) return 0;
        return c + 1;
      });
    }, 1100);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className={`relative mx-auto w-full max-w-[520px] ${className}`}>
      {/* Screen bezel */}
      <div className="relative rounded-t-2xl bg-espresso border border-espresso-dark p-3 shadow-[0_30px_80px_-30px_rgba(44,32,24,0.55)]">
        <div className="relative rounded-lg overflow-hidden bg-cream border border-warm-border aspect-[16/10]">
          {/* browser bar */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-cream-deep border-b border-warm-border">
            <span className="w-2 h-2 rounded-full bg-[#E47C66]" />
            <span className="w-2 h-2 rounded-full bg-[#E8B84A]" />
            <span className="w-2 h-2 rounded-full bg-[#87A878]" />
            <span className="ml-3 text-[9px] text-warm-brown truncate">
              yourbusiness.ae/launch-checklist
            </span>
          </div>

          {/* scrollable task list */}
          <div className="relative h-[calc(100%-28px)] overflow-hidden">
            <ul
              className="p-4 space-y-2.5 transition-transform duration-700 ease-out"
              style={{
                transform: `translateY(-${Math.max(0, checked - 4) * 34}px)`,
              }}
            >
              {TASKS.map((t, i) => {
                const done = i < checked;
                const active = i === checked;
                return (
                  <li
                    key={t}
                    className={`flex items-center gap-2.5 text-[11px] transition-all duration-300 ${
                      done ? "opacity-90" : "opacity-70"
                    }`}
                  >
                    <span
                      className={[
                        "w-4 h-4 rounded-full flex items-center justify-center border transition-all duration-300",
                        done
                          ? "bg-gold border-gold text-ivory"
                          : active
                            ? "border-gold bg-cream-soft animate-gold-pulse"
                            : "border-warm-border bg-cream-soft",
                      ].join(" ")}
                    >
                      {done && (
                        <svg viewBox="0 0 12 12" className="w-2.5 h-2.5">
                          <path
                            d="M2 6l3 3 5-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span
                      className={`flex-1 truncate ${
                        done ? "text-espresso line-through decoration-gold/60" : "text-warm-brown"
                      }`}
                    >
                      {t}
                    </span>
                    {done && (
                      <span className="text-[9px] tracking-widest uppercase text-gold">done</span>
                    )}
                  </li>
                );
              })}
            </ul>
            {/* subtle top/bottom fade */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-cream to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-cream to-transparent" />
          </div>
        </div>
      </div>
      {/* Base */}
      <div className="mx-auto h-3 w-[105%] -translate-x-[2.5%] rounded-b-2xl bg-gradient-to-b from-espresso to-espresso-dark shadow-[0_20px_40px_-20px_rgba(44,32,24,0.5)]" />
      <div className="mx-auto h-1 w-[30%] rounded-b-full bg-espresso-dark/60 mt-[-2px]" />

      {/* Ambient gold glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[2rem] bg-gold/10 blur-3xl"
      />
    </div>
  );
}
