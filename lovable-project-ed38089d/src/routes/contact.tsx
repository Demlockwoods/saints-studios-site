import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Mail, Phone, MessageCircle, type LucideIcon } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Book a free strategy call | Saints Studios" },
      { name: "description", content: "Book a free 30-minute strategy call with Saints Studios. No pitch. No pressure. Just an honest conversation about your Dubai business." },
      { property: "og:title", content: "Contact — Saints Studios" },
      { property: "og:description", content: "Let's talk about what your website could be doing for you." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const WHATSAPP_NUMBER = "971507619289";
const TOTAL_STEPS = 4;

type Answers = {
  businessAndIndustry: string;
  need: string;
  websiteStatus: string;
  name: string;
  whatsapp: string;
  businessName: string;
};

function ContactPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [sent, setSent] = useState(false);
  const [answers, setAnswers] = useState<Answers>({
    businessAndIndustry: "",
    need: "",
    websiteStatus: "",
    name: "",
    whatsapp: "",
    businessName: "",
  });

  const goNext = () => { setDirection(1); setStep((s) => Math.min(s + 1, TOTAL_STEPS)); };
  const goBack = () => { setDirection(-1); setStep((s) => Math.max(s - 1, 1)); };

  const pick = (key: keyof Answers, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    setTimeout(goNext, 180);
  };

  const submit = () => {
    if (!answers.name || !answers.whatsapp || !answers.businessName) return;
    const msg =
      `New strategy call request from Saints Studios site\n\n` +
      `Name: ${answers.name}\n` +
      `Business: ${answers.businessName}\n` +
      `Business & industry: ${answers.businessAndIndustry}\n` +
      `Needs: ${answers.need}\n` +
      `Current website: ${answers.websiteStatus}\n` +
      `WhatsApp: ${answers.whatsapp}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <SiteLayout backdrop="contact">
      <section className="section-pad">
        <div className="container-narrow grid lg:grid-cols-[1.2fr_1fr] gap-16">
          <div className="space-y-10">
            <div className="space-y-5">
              <h1 className="font-display text-4xl md:text-[54px] leading-[1.1] text-espresso">
                Let's talk about what your website could be doing <em className="text-gold font-light">for you.</em>
              </h1>
              <p className="text-[16px] font-light text-warm-brown max-w-xl">
                Answer 4 quick questions and we'll WhatsApp you within 4 business hours.
                No pitch. No pressure.
              </p>
            </div>

            {sent ? (
              <ConfirmationCard name={answers.name} />
            ) : (
              <div className="bg-cream-soft/95 backdrop-blur border border-warm-border rounded-3xl p-7 md:p-10 shadow-sm">
                <ProgressBar step={step} total={TOTAL_STEPS} onBack={step > 1 ? goBack : undefined} />

                <div className="mt-8 relative overflow-hidden">
                  <div
                    key={step}
                    className="animate-step-in"
                    style={{ ["--dir" as any]: direction }}
                  >
                    {step === 1 && (
                      <Step1
                        value={answers.businessAndIndustry}
                        onChange={(v) => setAnswers((a) => ({ ...a, businessAndIndustry: v }))}
                        onContinue={() => answers.businessAndIndustry.trim() && goNext()}
                      />
                    )}
                    {step === 2 && (
                      <StepChoice
                        title="What does your business need?"
                        options={["New website", "Website redesign", "SEO / more traffic", "Not sure yet"]}
                        selected={answers.need}
                        onPick={(v) => pick("need", v)}
                      />
                    )}
                    {step === 3 && (
                      <StepChoice
                        title="Do you have a website right now?"
                        options={["Yes, but it's outdated", "Yes, but it's not getting leads", "No, starting fresh"]}
                        selected={answers.websiteStatus}
                        onPick={(v) => pick("websiteStatus", v)}
                      />
                    )}
                    {step === 4 && (
                      <Step4
                        answers={answers}
                        setAnswers={setAnswers}
                        onSubmit={submit}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="bg-cream-soft border border-warm-border rounded-2xl p-6 space-y-3">
              <h3 className="font-display italic text-2xl text-espresso">Why the questions?</h3>
              <p className="text-[14px] font-light text-warm-brown">
                So your strategy call is actually about <em>your</em> business — not a generic intro
                deck. We show up prepared.
              </p>
            </div>

            <div className="bg-espresso text-ivory rounded-2xl p-6 space-y-3 text-[14px]">
              <ContactItem icon={Mail} label="hello@saintsstudios.ae" />
              <ContactItem icon={Phone} label="+971 50 761 9289" />
              <ContactItem icon={MessageCircle} label="WhatsApp us (preferred)" />
              <p className="text-[12px] text-ivory/50 pt-2 border-t border-ivory/10">
                Business Bay, Dubai. Replies within 4 business hours.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}

function ProgressBar({ step, total, onBack }: { step: number; total: number; onBack?: () => void }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={!onBack}
          className="inline-flex items-center gap-1 text-[12px] tracking-[0.2em] uppercase text-warm-brown hover:text-espresso disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>
        <span className="text-[12px] tracking-[0.2em] uppercase text-warm-brown">
          {step} of {total}
        </span>
      </div>
      <div className="h-1 w-full bg-warm-border/60 rounded-full overflow-hidden">
        <div
          className="h-full bg-gold transition-[width] duration-500 ease-out"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

function Step1({
  value, onChange, onContinue,
}: { value: string; onChange: (v: string) => void; onContinue: () => void }) {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl md:text-3xl text-espresso leading-snug">
        What is your business's name and industry?
      </h2>
      <input
        autoFocus
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); onContinue(); } }}
        placeholder="e.g. Nour Kitchen — Lebanese restaurant"
        className="w-full bg-transparent border-0 border-b border-warm-border focus:border-gold outline-none py-3 text-[17px] placeholder:text-warm-brown/50 transition-colors"
      />
      <button
        type="button"
        onClick={onContinue}
        disabled={!value.trim()}
        className="btn-primary inline-flex disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function StepChoice({
  title, options, selected, onPick,
}: { title: string; options: string[]; selected: string; onPick: (v: string) => void }) {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl md:text-3xl text-espresso leading-snug">{title}</h2>
      <div className="grid gap-3">
        {options.map((opt) => {
          const active = selected === opt;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onPick(opt)}
              className={[
                "group w-full text-left rounded-2xl px-5 py-5 md:py-6 text-[16px] md:text-[17px]",
                "border transition-all duration-200",
                "bg-ivory/70 hover:bg-ivory",
                active
                  ? "border-gold shadow-[0_0_0_2px_rgba(201,151,58,0.25)] text-espresso"
                  : "border-warm-border hover:border-gold/60 text-espresso",
              ].join(" ")}
            >
              <span className="flex items-center justify-between gap-4">
                <span className="font-light">{opt}</span>
                <span
                  className={[
                    "w-6 h-6 rounded-full border flex items-center justify-center transition-all",
                    active ? "border-gold bg-gold text-ivory" : "border-warm-border/70 text-transparent group-hover:border-gold/60",
                  ].join(" ")}
                  aria-hidden
                >
                  <Check className="w-3.5 h-3.5" />
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step4({
  answers, setAnswers, onSubmit,
}: { answers: Answers; setAnswers: (fn: (a: Answers) => Answers) => void; onSubmit: () => void }) {
  const valid = answers.name.trim() && answers.whatsapp.trim() && answers.businessName.trim();
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
      className="space-y-6"
    >
      <h2 className="font-display text-2xl md:text-3xl text-espresso leading-snug">
        Where should we reach you?
      </h2>
      <TextInput
        label="Your name"
        value={answers.name}
        onChange={(v) => setAnswers((a) => ({ ...a, name: v }))}
        autoFocus
      />
      <TextInput
        label="WhatsApp number"
        type="tel"
        placeholder="+971 …"
        value={answers.whatsapp}
        onChange={(v) => setAnswers((a) => ({ ...a, whatsapp: v }))}
      />
      <TextInput
        label="Business name"
        value={answers.businessName}
        onChange={(v) => setAnswers((a) => ({ ...a, businessName: v }))}
      />
      <button
        type="submit"
        disabled={!valid}
        className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Get my free strategy call <ArrowRight className="w-4 h-4" />
      </button>
      <p className="text-[12px] text-warm-brown text-center">
        Opens WhatsApp with your details pre-filled. We never share your info.
      </p>
    </form>
  );
}

function TextInput({
  label, value, onChange, type = "text", placeholder, autoFocus,
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; autoFocus?: boolean;
}) {
  return (
    <div>
      <label className="text-[11px] tracking-[0.2em] uppercase text-warm-brown">{label}</label>
      <input
        autoFocus={autoFocus}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full bg-transparent border-0 border-b border-warm-border focus:border-gold outline-none py-2 text-[16px] placeholder:text-warm-brown/50 transition-colors"
      />
    </div>
  );
}

function ConfirmationCard({ name }: { name: string }) {
  return (
    <div className="bg-cream-soft border border-warm-border rounded-3xl p-10 space-y-5 text-center animate-step-in">
      <div className="mx-auto w-16 h-16 rounded-full bg-gold text-ivory flex items-center justify-center shadow-[0_0_0_6px_rgba(201,151,58,0.15)]">
        <Check className="w-8 h-8" strokeWidth={3} />
      </div>
      <h2 className="font-display italic text-3xl md:text-4xl text-espresso">
        Thanks {name || "friend"},
      </h2>
      <p className="text-[15px] font-light text-warm-brown max-w-md mx-auto">
        we'll WhatsApp you within 4 business hours. If WhatsApp didn't open automatically,
        tap below to send us your details directly.
      </p>
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary inline-flex mt-2"
      >
        <MessageCircle className="w-4 h-4" /> Open WhatsApp
      </a>
    </div>
  );
}

function ContactItem({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-8 h-8 rounded-full bg-ivory/10 flex items-center justify-center text-gold">
        <Icon className="w-4 h-4" />
      </span>
      {label}
    </div>
  );
}
