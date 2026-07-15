import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/Layout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Saints Studios" },
      { name: "description", content: "Saints Studios web design and development services agreement. Scope, responsibilities, limitations, and governing law." },
      { property: "og:title", content: "Terms of Service | Saints Studios" },
      { property: "og:description", content: "Our client services agreement, plain and complete." },
      { property: "og:url", content: "https://saints-studios.com/terms" },
    ],
    links: [{ rel: "canonical", href: "https://saints-studios.com/terms" }],
  }),
  component: TermsPage,
});

const sections: Array<{ n: string; title: string; body: React.ReactNode }> = [
  {
    n: "1",
    title: "Scope of Services",
    body: (
      <p>
        The Studio agrees to provide website design, development, and/or related digital services ("the Services") as outlined in the accompanying proposal, quote, or scope document agreed between both parties. Any work outside this agreed scope constitutes a change request and will be quoted separately before commencing.
      </p>
    ),
  },
  {
    n: "2",
    title: "No Guarantee of Results",
    body: (
      <div className="space-y-3">
        <p>The Client acknowledges and agrees that:</p>
        <p><strong>(a)</strong> The Studio provides design, development, and technical optimisation services only. The Studio does not guarantee any specific outcome, including but not limited to: increased leads, enquiries, bookings, sales, revenue, website traffic, search engine rankings, or search engine placement.</p>
        <p><strong>(b)</strong> Search engine rankings, visibility, and traffic are influenced by factors outside the Studio's control, including but not limited to search engine algorithm changes, competitor activity, market conditions, and the Client's own business operations, pricing, and customer service.</p>
        <p><strong>(c)</strong> Any figures, case studies, timelines, or outcomes referenced by the Studio in marketing materials, proposals, or conversation are illustrative or historical only and do not constitute a promise, warranty, or guarantee of similar results for the Client.</p>
        <p><strong>(d)</strong> The Client's business results depend on numerous factors beyond the website itself, including the Client's sales process, pricing, staffing, market conditions, and industry competition, none of which are within the Studio's control.</p>
      </div>
    ),
  },
  {
    n: "3",
    title: "Client Responsibilities",
    body: (
      <div className="space-y-3">
        <p>The Client agrees to:</p>
        <p><strong>(a)</strong> Provide accurate, complete, and lawful content, images, copy, and business information for use on the website;</p>
        <p><strong>(b)</strong> Confirm they hold the rights to use any content, images, trademarks, or third-party material they supply to the Studio;</p>
        <p><strong>(c)</strong> Respond to requests for feedback, approvals, or information within a reasonable timeframe, as delays may affect delivery timelines;</p>
        <p><strong>(d)</strong> Review and approve the website prior to launch. Approval constitutes acceptance of the delivered work as fulfilling the agreed scope.</p>
      </div>
    ),
  },
  {
    n: "4",
    title: "Limitation of Liability",
    body: (
      <div className="space-y-3">
        <p><strong>(a)</strong> To the maximum extent permitted under UAE law, the Studio's total liability arising out of or relating to this Agreement, whether in contract, tort, or otherwise, shall not exceed the total fees paid by the Client to the Studio under this Agreement.</p>
        <p><strong>(b)</strong> The Studio shall not be liable for any indirect, incidental, consequential, or special damages, including loss of profits, loss of business, or loss of data, arising from the use of, or inability to use, the delivered website or services.</p>
        <p><strong>(c)</strong> The Studio is not liable for third-party service failures, including but not limited to hosting providers, domain registrars, payment processors, plugins, APIs, or platforms (e.g. Lovable, Google, Meta) that the website or its functionality depends on.</p>
        <p><strong>(d)</strong> The Studio is not responsible for the security, uptime, or maintenance of the website following handover, unless the Client is enrolled in an active maintenance or retainer agreement covering these services.</p>
      </div>
    ),
  },
  {
    n: "5",
    title: "Content Accuracy & Legal Compliance",
    body: (
      <p>
        The Client is solely responsible for ensuring that all content, claims, pricing, and representations published on their website comply with applicable UAE laws and regulations relevant to their industry (including but not limited to consumer protection, advertising standards, and sector-specific licensing requirements). The Studio is not responsible for reviewing or verifying the legal accuracy of Client-provided content.
      </p>
    ),
  },
  {
    n: "6",
    title: "Intellectual Property",
    body: (
      <p>
        Upon full payment, the Client owns the final delivered website design and content created specifically for them. The Studio retains the right to showcase the completed work in its portfolio, case studies, and marketing materials unless the Client requests otherwise in writing.
      </p>
    ),
  },
  {
    n: "7",
    title: "Payment Terms",
    body: (
      <p>
        A 50% deposit is due upon signing and the remaining 50% is due upon completion prior to launch. Work will not go live until final payment is received. Late payments may pause work and extend delivery timelines.
      </p>
    ),
  },
  {
    n: "8",
    title: "Timelines",
    body: (
      <p>
        Delivery timelines (e.g. "7 days") are estimates based on the Client meeting their responsibilities under Section 3. Delays caused by the Client providing late content, feedback, or approvals will extend the delivery timeline accordingly and do not constitute a breach by the Studio.
      </p>
    ),
  },
  {
    n: "9",
    title: "Termination",
    body: (
      <p>
        Either party may terminate this Agreement with written notice. Fees for work completed up to the point of termination remain payable. Deposits are non-refundable once work has commenced.
      </p>
    ),
  },
  {
    n: "10",
    title: "Governing Law & Dispute Resolution",
    body: (
      <p>
        This Agreement is governed by the laws of the United Arab Emirates. Any disputes arising from this Agreement shall first be attempted to be resolved amicably between the parties, and, failing resolution, shall be subject to the exclusive jurisdiction of the courts of Dubai.
      </p>
    ),
  },
  {
    n: "11",
    title: "Entire Agreement",
    body: (
      <p>
        This Agreement, together with the agreed proposal/scope document, constitutes the entire agreement between the parties and supersedes any prior discussions or representations, written or verbal.
      </p>
    ),
  },
];

function TermsPage() {
  return (
    <SiteLayout backdrop="about">
      <section className="section-pad">
        <div className="container-narrow max-w-3xl">
          <p className="eyebrow">Legal</p>
          <h1 className="font-display text-5xl md:text-6xl text-espresso mt-3">
            Terms of <em className="text-gold font-light">Service</em>
          </h1>
          <p className="mt-4 text-[14px] text-warm-brown font-light">
            Saints Studios , Web Design & Development Services Agreement. This
            Agreement is entered into between Saints Studios ("the Studio," "we,"
            "us") and the undersigned client ("the Client," "you"), effective as
            of the date of signature.
          </p>

          <div className="mt-12 space-y-10 text-[15px] text-espresso/85 font-light leading-relaxed">
            {sections.map((s) => (
              <section key={s.n} className="border-l-2 border-gold/40 pl-6">
                <h2 className="font-display text-2xl text-espresso mb-3">
                  <span className="text-gold mr-2">{s.n}.</span>
                  {s.title}
                </h2>
                {s.body}
              </section>
            ))}
          </div>

          <p className="mt-16 text-[12px] text-warm-brown">
            For questions about these terms, email{" "}
            <a href="mailto:saintsstudiosae@gmail.com" className="text-gold hover:underline">
              saintsstudiosae@gmail.com
            </a>
            .
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
