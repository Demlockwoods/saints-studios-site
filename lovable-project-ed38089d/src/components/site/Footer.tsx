import { Link } from "@tanstack/react-router";
import { Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-espresso-dark text-ivory/80">
      <div className="container-narrow py-20 grid gap-12 md:grid-cols-4">
        <div className="space-y-5">
          <div className="font-display text-2xl text-ivory">
            Saints <span className="text-gold">·</span> Studios
          </div>
          <p className="text-[13px] leading-relaxed text-ivory/60">
            A Dubai web design and growth studio building sites that actually
            make your phone ring.
          </p>
          <div className="flex gap-3">
            {[
              { Icon: Linkedin, href: "#" },
              { Icon: Instagram, href: "https://www.instagram.com/saintsstudiosae/" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="w-9 h-9 rounded-full border border-ivory/15 flex items-center justify-center hover:border-gold hover:text-gold hover:-translate-y-0.5 transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <p className="text-[12px] text-ivory/50">
            Based in Dubai, UAE. Serving businesses across the Emirates.
          </p>
        </div>

        <FooterCol
          title="Studio"
          items={[
            ["Why Saints?", "/about"],
            ["Journal", "/journal"],
            ["Contact", "/contact"],
          ]}
        />
        <FooterCol
          title="Services"
          items={[
            ["Web Design", "/services"],
            ["SEO", "/services"],
            ["Lead Generation", "/services"],
            ["Landing Pages", "/services"],
            ["Monthly Retainer", "/services"],
          ]}
        />
        <div className="space-y-3 text-[13px]">
          <h4 className="text-[11px] tracking-[0.25em] uppercase text-gold font-medium mb-4">
            Contact
          </h4>
          <p>hello@saintsstudios.ae</p>
          <p>+971 50 761 9289</p>
          <a
            href="https://wa.me/971507619289"
            className="block text-gold hover:underline"
          >
            WhatsApp us
          </a>
          <p className="text-ivory/50 text-[12px]">
            We'll WhatsApp you back shortly , usually within a few business hours.
          </p>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-narrow py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-ivory/40">
          <p>© {new Date().getFullYear()} Saints Studios. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#">Privacy</a>
            <Link to="/terms">Terms</Link>

            <span>Built by us. Obviously.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div className="space-y-3 text-[13px]">
      <h4 className="text-[11px] tracking-[0.25em] uppercase text-gold font-medium mb-4">
        {title}
      </h4>
      {items.map(([label, href]) => (
        <Link
          key={label + href}
          to={href}
          className="block text-ivory/70 hover:text-gold hover:translate-x-1 transition-all"
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
