import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";

export function Floating() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="https://wa.me/971507619289"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 group flex items-center gap-2 bg-espresso text-ivory rounded-full px-4 h-14 animate-gold-pulse hover:bg-gold-soft transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden group-hover:inline text-[13px] font-medium pr-1">
          Chat on WhatsApp
        </span>
      </a>
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 right-6 z-40 w-10 h-10 rounded-full bg-espresso text-ivory flex items-center justify-center hover:bg-gold-soft transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </>
  );
}
