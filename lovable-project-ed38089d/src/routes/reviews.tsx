import { createFileRoute } from "@tanstack/react-router";
import { Star, Quote, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/site/Layout";
import { SpinningStars } from "@/components/site/Anims";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — What our clients say | Saints Studios" },
      { name: "description", content: "Real reviews from Dubai business owners about Saints Studios — web design, SEO, and lead generation that actually delivers." },
      { property: "og:title", content: "Reviews — Saints Studios" },
      { property: "og:description", content: "Read what Dubai restaurants, clinics, law firms, and consultancies say about working with Saints Studios." },
      { property: "og:url", content: "/reviews" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: ReviewsPage,
});

type Review = {
  name: string;
  role: string;
  area: string;
  industry: "Restaurants" | "Healthcare" | "Legal" | "Fitness" | "Retail" | "Real Estate" | "Consultancy";
  rating: 5;
  initials: string;
  color: string;
  text: string;
  result?: string;
};

const reviews: Review[] = [
  { name: "Layla Hassan", role: "Founder", area: "JBR Hair Atelier", industry: "Retail", rating: 5, initials: "LH", color: "#C9973A",
    text: "They rebuilt our site in a week and our enquiries doubled within the first month. I expected good — I got extraordinary. The team actually listened to what we needed, didn't try to upsell us into things we'd never use, and the WhatsApp button alone has changed how we book appointments.",
    result: "+112% bookings in 30 days" },
  { name: "Dr. Faisal Noor", role: "Practice Owner", area: "Marina Dental", industry: "Healthcare", rating: 5, initials: "FN", color: "#7A6550",
    text: "We finally rank on the first page for 'dentist Dubai Marina'. Three new patient bookings in the first week alone. Domekveer doesn't talk in jargon — he talks in outcomes. That's exactly what I needed.",
    result: "Page 1 of Google in 8 weeks" },
  { name: "Omar Saleh", role: "Managing Director", area: "Oryx Realty", industry: "Real Estate", rating: 5, initials: "OS", color: "#8B6A3E",
    text: "Worth every dirham. The site looks luxury and it sells like it. We've had three off-market apartment enquiries come through the contact form this month — the kind that used to only come via referrals.",
    result: "Luxury inbound enquiries" },
  { name: "Nadia Al-Rashid", role: "Partner", area: "DIFC Advisory", industry: "Consultancy", rating: 5, initials: "NR", color: "#2C2018",
    text: "I've worked with three agencies in Dubai. This is the only one that understood the brief on the first call. Delivered in 6 days, beautiful, and the SEO setup means we now actually show up when people search for our specialism.",
    result: "Saved 3 weeks vs. last agency" },
  { name: "Tariq Mahmoud", role: "Owner", area: "Pulse Fitness", industry: "Fitness", rating: 5, initials: "TM", color: "#C9973A",
    text: "Delivered in 6 days. Beautiful, fast, and our WhatsApp hasn't stopped. The before-and-after on our PageSpeed score alone was worth the investment — and we got the website on top of that.",
    result: "PageSpeed 42 → 96 on mobile" },
  { name: "Sophie Laurent", role: "Founder", area: "Olea & Co.", industry: "Retail", rating: 5, initials: "SL", color: "#7A6550",
    text: "Honest, sharp, and proper craft. Rare combination. They were upfront about scope and timeline from the very first call — no games, no vague answers. We knew exactly what we were getting.",
    result: "Same-week sign-off" },
  { name: "Yousef Khan", role: "Owner", area: "Al Manara Bistro", industry: "Restaurants", rating: 5, initials: "YK", color: "#8B6A3E",
    text: "We launched and bookings tripled in three weeks. I still can't quite believe it. The phone hasn't stopped — we had to hire two new floor staff. Best money we've spent in years.",
    result: "+340% monthly enquiries" },
  { name: "Reem Al-Sayed", role: "Senior Partner", area: "Habibi Legal", industry: "Legal", rating: 5, initials: "RA", color: "#2C2018",
    text: "The strategy call alone was worth the engagement. They actually listen — and then they actually deliver. Our family-law landing page now ranks above three larger firms we used to lose every brief to.",
    result: "Outranking 3 larger firms" },
  { name: "Karim Boutros", role: "CEO", area: "Boutros Group", industry: "Consultancy", rating: 5, initials: "KB", color: "#C9973A",
    text: "Best web investment we've made. Period. Everything from the discovery call to launch felt thought-through. Even six months later, the monthly retainer reports are clear and the numbers are still climbing.",
    result: "Consistent month-on-month growth" },
  { name: "Aisha Mansour", role: "Founder", area: "Maison Aisha", industry: "Retail", rating: 5, initials: "AM", color: "#7A6550",
    text: "From an outdated brochure site to a real growth engine. Couldn't recommend more highly. The retainer means I never have to think about updates — they just happen, and the SEO keeps compounding.",
    result: "From brochure → sales engine" },
  { name: "Hassan Al-Mulla", role: "Founder", area: "DXB Clinic Group", industry: "Healthcare", rating: 5, initials: "HM", color: "#8B6A3E",
    text: "Saints Studios understood the patient journey better than the last agency we hired. The new booking flow has cut our front-desk admin time by a third — and patients are happier.",
    result: "−33% admin time, +24% bookings" },
  { name: "Rana Khalil", role: "Owner", area: "Saffron & Stone", industry: "Restaurants", rating: 5, initials: "RK", color: "#2C2018",
    text: "I was sceptical about the 7-day promise. They delivered on day 6 and the site was better than anything I'd seen from much larger agencies. Friday brunch is now booked out two weeks ahead.",
    result: "Brunch booked out 2 weeks" },
];

const industries = ["All", "Restaurants", "Healthcare", "Legal", "Fitness", "Retail", "Real Estate", "Consultancy"] as const;

function ReviewsPage() {
  const [filter, setFilter] = useState<typeof industries[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = reviews.filter((r) => {
    const matchInd = filter === "All" || r.industry === filter;
    const matchQ = !query || `${r.name} ${r.area} ${r.text}`.toLowerCase().includes(query.toLowerCase());
    return matchInd && matchQ;
  });

  return (
    <SiteLayout backdrop="reviews">
      {/* HERO */}
      <section className="section-pad hero-pattern">
        <div className="container-narrow text-center max-w-3xl mx-auto space-y-7 animate-fade-up">
          <p className="eyebrow">Reviews</p>
          <h1 className="font-display text-5xl md:text-7xl text-espresso leading-[1.05]">
            The only metric that matters: <em className="text-gold font-light">our clients' words.</em>
          </h1>
          <p className="text-[16px] font-light text-warm-brown">
            We don't chase design awards. We chase ringing phones, full inboxes, and
            booked-out calendars. Here's what Dubai business owners say about working with us.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-4">
            <div className="flex items-center gap-3">
              <span className="font-display text-5xl text-espresso">4.9</span>
              <SpinningStars size={20} />
            </div>
            <span className="w-px h-10 bg-warm-border" />
            <span className="text-[13px] text-warm-brown">120+ happy clients</span>
            <span className="w-px h-10 bg-warm-border" />
            <span className="text-[13px] text-warm-brown">98% retention rate</span>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="border-y border-warm-border bg-cream-soft sticky top-[72px] z-30 backdrop-blur">
        <div className="container-narrow py-5 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {industries.map((i) => (
              <button
                key={i}
                onClick={() => setFilter(i)}
                className={`px-4 py-1.5 rounded-full text-[12px] tracking-wider uppercase border transition-all ${
                  filter === i
                    ? "bg-espresso text-ivory border-espresso"
                    : "border-warm-border text-espresso hover:border-gold hover:text-gold"
                }`}
              >
                {i}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-brown" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search reviews…"
              className="w-full pl-9 pr-3 py-2 bg-cream border border-warm-border rounded-full text-[13px] focus:border-gold outline-none transition-colors"
            />
          </div>
        </div>
      </section>

      {/* MASONRY-LIKE GRID */}
      <section className="section-pad">
        <div className="container-narrow">
          {filtered.length === 0 ? (
            <p className="text-center text-warm-brown py-20 font-display italic text-2xl">
              No reviews match — but plenty of happy clients elsewhere.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 [grid-auto-flow:dense]">
              {filtered.map((r, i) => (
                <ReviewCard key={r.name} r={r} feature={i === 0 || i === 5} delay={i * 60} />
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function ReviewCard({ r, feature, delay }: { r: Review; feature?: boolean; delay: number }) {
  const dark = feature;
  return (
    <article
      className={`relative rounded-3xl border p-7 group transition-all duration-300 hover:-translate-y-1 ${
        dark
          ? "bg-espresso text-ivory border-espresso shadow-[0_30px_60px_-30px_rgba(44,32,24,0.4)] md:col-span-2 md:row-span-1"
          : "bg-cream-soft border-warm-border text-espresso hover:border-gold"
      } animate-fade-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <Quote className={`absolute -top-2 left-5 w-14 h-14 ${dark ? "text-ivory/10 fill-ivory/10" : "text-cream-deep fill-cream-deep"}`} />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <SpinningStars size={14} />
          <span className={`text-[10px] tracking-[0.2em] uppercase ${dark ? "text-gold" : "text-gold"}`}>
            {r.industry}
          </span>
        </div>
        <p className={`font-display text-[20px] leading-snug italic ${dark ? "text-ivory" : "text-espresso"}`}>
          "{r.text}"
        </p>

        {r.result && (
          <div className={`mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium ${
            dark ? "bg-gold/20 text-gold" : "bg-gold/10 text-gold-soft"
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            {r.result}
          </div>
        )}

        <div className={`flex items-center gap-3 mt-6 pt-5 border-t ${dark ? "border-ivory/15" : "border-warm-border"}`}>
          <span
            className="w-11 h-11 rounded-full flex items-center justify-center font-display text-lg text-ivory shadow-md group-hover:rotate-6 transition-transform"
            style={{ backgroundColor: r.color }}
          >
            {r.initials}
          </span>
          <div>
            <p className="text-[13px] font-medium">{r.name}</p>
            <p className={`text-[12px] flex items-center gap-1.5 ${dark ? "text-ivory/60" : "text-warm-brown"}`}>
              <MapPin className="w-3 h-3" /> {r.role} · {r.area}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
