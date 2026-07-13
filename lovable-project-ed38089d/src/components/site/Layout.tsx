import { useEffect, type ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Floating } from "./Floating";
import { ScrollProgress } from "./FX";
import { PageBackdrop } from "./PageBackdrop";

type BackdropVariant = "landing" | "services" | "reviews" | "about" | "contact" | "journal";

export function SiteLayout({
  children,
  backdrop = "landing",
}: {
  children: ReactNode;
  backdrop?: BackdropVariant;
}) {
  useEffect(() => {
    const selector = ".reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-blur, .reveal-clip";
    const observe = () => {
      const els = document.querySelectorAll<HTMLElement>(selector);
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
      els.forEach((el) => {
        if (!el.classList.contains("in")) io.observe(el);
      });
      return io;
    };
    const io = observe();
    const mo = new MutationObserver(() => observe());
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-screen text-espresso">
      <PageBackdrop variant={backdrop} />
      <ScrollProgress />
      <Nav />
      <main className="pt-[72px]">{children}</main>
      <Footer />
      <Floating />
    </div>
  );
}
