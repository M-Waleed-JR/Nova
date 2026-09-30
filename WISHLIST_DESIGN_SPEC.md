# Design Spec Deliverable
Mode: Experience (gallery/curation). Dials: Variance 8 / Motion 6 / Density 4.
Stack: Next.js 16 + React 19 + Tailwind v4.
Font: Plus Jakarta Sans (no Inter, no serif UI). Icons: lucide-react installed; Phosphor absent. No emojis.
---

Skills applied: ui-ux-pro-max (a11y, states, no emoji), design-taste-frontend-v1 (variance 8, motion 6, density 4, anti-center, 1 accent #c75b5b, liquid-glass hero only, no Inter, no pure #000), impeccable (craft floor, composed empty state, tactile feedback).
Colors: surface #0b0c10 (not #000), card #131418/80, glass border-white/[0.08] + inset shadow, text primary #f2f2f0, secondary #a1a1a9, accent #c75b5b (only), hairline #2a2a2e. Contrast all >4.5:1.
Typography: hero text-6xl/text-8xl tracking-tighter; sub uppercase tracking-[0.25em]; card name text-xl tracking-tight; price tabular-nums; CTA underline-offset-4.
Layout: asymmetric hero (left title md:w-2/3, right image md:-mb-24 overlap); grid lg:grid-cols-3 gap-x-8 gap-y-16 staggered; mobile single column; min-h-[100dvh] (no h-screen).
Components: hero with aria-label, card with aria-label+alt, image with loading=lazy, remove button w-11 h-11 (44px) with aria-label, focus ring, active translate/scale; empty state composed (icon+headline+description+CTA); footer with back-to-shop link.
Motion: CSS stagger animation-delay calc(var(--i)*90ms); card hover -translate-y-1 + tinted shadow + scale-105; reduced-motion media query.
Accessibility: aria-labels everywhere, keyboard focus, 44px targets, alt text, contrast verified, no emoji, lucide-react strokeWidth={1.5}.
No code written to app/wishlist/page.js; only this spec file delivered.
Verify: npm run build / npm run dev; no Claude signatures in commits.
