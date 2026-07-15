import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle, X } from "lucide-react";
import tigerMascot from "@/assets/tiger-mascot.png";

export function Floating() {
  const [show, setShow] = useState(false);
  const [tigerVisible, setTigerVisible] = useState(false);
  const [tigerOpen, setTigerOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("tiger-dismissed") === "1") {
      setDismissed(true);
      return;
    }
    const t = window.setTimeout(() => setTigerVisible(true), 10000);
    return () => window.clearTimeout(t);
  }, []);

  const dismissTiger = () => {
    setTigerVisible(false);
    setTigerOpen(false);
    setDismissed(true);
    try { sessionStorage.setItem("tiger-dismissed", "1"); } catch {
      // sessionStorage may be unavailable in private mode
    }
  };

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

      {/* Tiger popup */}
      {tigerVisible && !dismissed && (
        <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 flex items-end gap-3 max-w-[92vw] animate-fade-in">
          {/* Speech bubble */}
          {!tigerOpen ? (
            <button
              onClick={() => setTigerOpen(true)}
              className="relative bg-cream/95 backdrop-blur-xl border border-gold/40 rounded-2xl px-4 py-3 text-espresso text-[13px] font-medium shadow-[0_20px_50px_-20px_rgba(44,32,24,0.4)] hover:border-gold hover:-translate-y-0.5 transition-all max-w-[180px] text-left"
              aria-label="Read the tiger's message"
            >
              hey , click on me!
              <span className="absolute -right-1.5 bottom-4 w-3 h-3 rotate-45 bg-cream/95 border-r border-b border-gold/40" />
            </button>
          ) : (
            <div className="relative bg-cream/95 backdrop-blur-xl border border-gold/40 rounded-2xl p-5 text-espresso shadow-[0_30px_70px_-20px_rgba(44,32,24,0.5)] max-w-[280px] md:max-w-[340px]">
              <button
                onClick={dismissTiger}
                className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-warm-brown hover:bg-warm-border/40"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
              <p className="font-display text-lg leading-snug text-espresso pr-4">
                Don't just take their word for it!
              </p>
              <p className="text-[13px] text-warm-brown font-light mt-2 leading-relaxed">
                I own a restaurant in Dubai Marina and had a site that hadn't
                been touched since 2017. Within 90 days of Saints Studios's
                services we've reached page 1 on Google and have gotten
                customers like never before. That could be you.
              </p>
              <span className="absolute -right-1.5 bottom-6 w-3 h-3 rotate-45 bg-cream/95 border-r border-b border-gold/40" />
            </div>
          )}

          <div className="relative">
            <button
              onClick={() => (tigerOpen ? dismissTiger() : setTigerOpen(true))}
              className={`relative rounded-full overflow-hidden border-2 border-gold/60 shadow-[0_20px_40px_-15px_rgba(201,151,58,0.5)] bg-cream hover:scale-105 transition-transform ${
                tigerOpen ? "w-24 h-24 md:w-28 md:h-28" : "w-16 h-16 md:w-20 md:h-20 animate-bounce"
              }`}
              aria-label={tigerOpen ? "Close tiger" : "Open tiger message"}
              style={{ animationDuration: "2.2s" }}
            >
              <img src={tigerMascot} alt="Saints Studios tiger mascot" className="w-full h-full object-cover" />
            </button>
            {!tigerOpen && (
              <button
                onClick={dismissTiger}
                className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-espresso text-ivory flex items-center justify-center hover:bg-gold-soft"
                aria-label="Close"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
