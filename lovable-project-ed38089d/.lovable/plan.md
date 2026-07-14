# Plan — Saints Studios major pass

## 1. Contact form fixes
- Add **"Other"** option to Step 2 (needs). Selecting it reveals a small free-text input before advancing.
- Remove "Business Bay, Dubai." line in the contact sidebar.
- Replace **all** "within 4 business hours" copy (contact sidebar, hero copy, confirmation card) with **"We'll WhatsApp you back shortly — usually within a few business hours."**
- On submit: in addition to opening WhatsApp, POST the answers to a new server function `submitLead` that appends a row to a Google Sheet via the connected `google_sheets` connector gateway.
  - Server fn creates the spreadsheet on first run (title: `Saints Studios — Leads`), stores its ID in a Lovable Cloud table `app_config(key, value)` so subsequent runs append to the same sheet.
  - Columns: `Timestamp | Name | Business Name | Business & Industry | Need | Website Status | WhatsApp`.
  - Failures are swallowed so the WhatsApp flow always completes for the user.

## 2. Remove Reviews entirely (temporary)
- Delete `src/routes/reviews.tsx`.
- Remove Reviews section from home (`Reviews()` component) and its imports.
- Remove Reviews from Nav and Footer links.
- Keep testimonial styling patterns in `about.tsx` intact (commented block or preserved component) so it's easy to re-add later.

## 3. Rename About → "Why Saints?"
- Route stays `/about` (avoid breaking links); nav label → "Why Saints?", homepage "About Saints Studios" section title → "Why Saints?".
- Page H1 also becomes "Why Saints?" with new animated hero.

## 4. Home page section redesigns
- **"Who we work with"** headline: significantly larger + bolder display type.
- Remove the big industry boxes. Replace with a single centered looping **laptop animation**: a stylized laptop where a checklist of tasks progressively checks off, screen scrolls to reveal more tasks, loops forever (pure CSS/SVG, no heavy 3D).
- **"Three things that set us apart"** — redesign as an interactive stacked/rotating card stack with hover tilt + gold border beam, numbers animate on scroll.
- **"Beautiful is a requirement, not a goal"** section — rework copy to remove the contradiction, add a split-layout with animated typographic treatment (mask reveal on scroll + subtle gold underline sweep). New line: *"Beautiful is the baseline. Performance is the point."*

## 5. Services page overhaul
- New hero: bold animated headline, magnetic CTA, gold particle bg (reuse FX primitives).
- Replace the 3-section stack with a **scroll-driven rotating wheel**: a large circular SVG dial pinned in the viewport (sticky container ~300vh). As user scrolls, the dial rotates 120° per service and the active service's content fades in beside it. Progress dots on the side.
- Ensure the sticky container properly pauses the page backdrop (use `overflow: clip` pattern already established).

## 6. Scroll lag fix (site-wide)
- Root cause candidates: too many parallax `scroll` handlers, particles running everywhere, `backdrop-blur` layers under scroll.
- Actions:
  - Convert `Parallax` transforms to use `will-change: transform` + `transform3d`, and only attach the scroll listener when in view (already done for some) with `requestAnimationFrame` throttling and rAF-coalesced updates.
  - Reduce hero effect stack: keep Aurora + one particle layer, drop GlassOrbs on mobile entirely (already partially done); also drop the third Parallax layer.
  - Replace expensive `backdrop-blur-*` on scrolling sections with `background: rgba(...)` + subtle `box-shadow` (per project knowledge: backdrop-blur over animated bg is the main jank source).
  - Add `content-visibility: auto` and `contain: layout paint` to large below-the-fold sections.
  - Debounce ScrollTheme updates and skip when `prefers-reduced-motion` is set.

## 7. Global UI polish (Pro Max)
- Add gold underline sweep utility for key headings, apply to section H2s.
- Wrap primary CTAs in `Magnet` where not already.
- Add subtle `ShinyText` treatment on high-emphasis words in section headers.
- Ensure no dark-on-dark contrast issues after backdrop palette changes.

## Technical notes
- Google Sheets: use `google_sheets` connector via gateway. Server function reads `GOOGLE_SHEETS_API_KEY` + `LOVABLE_API_KEY`. First-run bootstrap: `POST /v4/spreadsheets` with title + header row, then persist the returned `spreadsheetId`. Store spreadsheetId in a new Cloud table since env-var writes aren't runtime-mutable.
- New table `app_config`: `key text primary key, value text, updated_at timestamptz`. GRANTs to `service_role` only (server-side use).
- Contact submit path: `src/lib/api/leads.functions.ts` (server fn) + `leads.server.ts` helper for the Sheets call.
- Reviews removal is destructive — confirm you want the route file + home section deleted rather than hidden. I'll proceed with delete unless you say otherwise.

## Out of scope for this pass
- Reviews landing background (page is being removed).
- Any pricing changes (already removed previously).

Reply "go" (or with tweaks) and I'll implement in one pass.
