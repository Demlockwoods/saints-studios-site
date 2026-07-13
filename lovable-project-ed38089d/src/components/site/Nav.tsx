import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";

const links = [
  { to: "/services", label: "Services" },
  { to: "/reviews", label: "Reviews" },
  { to: "/about", label: "About" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-cream/95 backdrop-blur border-b border-warm-border"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="container-narrow flex items-center justify-between h-[72px]">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-display text-2xl text-espresso tracking-tight">Saints</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold transition-transform group-hover:scale-150 group-hover:rotate-180 duration-500" />
            <span className="font-display text-2xl text-espresso tracking-tight italic">Studios</span>
          </Link>

          <nav className="hidden md:flex items-center gap-9">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="relative text-[13px] text-espresso/80 hover:text-gold transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full"
                activeProps={{ className: "text-gold" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/971507619289"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-9 h-9 rounded-full flex items-center justify-center border border-warm-border text-espresso hover:border-gold hover:text-gold hover:rotate-12 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <Link to="/contact" className="btn-primary !py-2.5 !px-5 !text-[13px]">
              Get a free audit
            </Link>
          </div>

          <button
            className="md:hidden text-espresso"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] bg-espresso text-ivory flex flex-col animate-fade-up">
          <div className="flex items-center justify-between p-6">
            <span className="font-display text-2xl">Saints <span className="text-gold">·</span> Studios</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X className="w-7 h-7" />
            </button>
          </div>
          <nav className="flex-1 flex flex-col items-center justify-center gap-8">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="font-display text-4xl text-ivory hover:text-gold transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-gold mt-6">
              Get a free audit
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
