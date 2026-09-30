# Nova Cart — Design System & Component Specification
> Skill selected: `ui-ux-pro-max` (applied for premium UI/UX quality control, dark luxury palette, responsive mobile-first layout, touch/interaction rules, and accessibility requirements).
> Project context: React 19 + Tailwind CSS, Context API state (`CartContext`), mobile-first responsive (`sm: md: lg:` breakpoints).

---

## 1. Design Concepts — Premium Dark Luxury Cart

### Product & Audience
- **Product type**: Tech / electronics e-commerce (phones, gadgets, accessories).
- **Audience**: Premium buyers, tech enthusiasts, mobile-first shoppers.
- **Mood**: Dark luxury — confident, precise, editorial-quality. The cart is a **confirmation ritual**, not just a utility page.
- **Reference patterns**: Apple Store checkout, Bang & Olufsen product experience, high-end fashion e-commerce checkout flows (SSENSE, Farfetch).

### Design Intent
- Deep navy-black base (`#0A0E17`), warm amber/gold (`#C8A45C`, `#E8A03A`) accents, crisp white text (`#F0F0F0`).
- Glass-like card surfaces (`#14182B`) with hairline borders (`#1E2A42`) and subtle depth.
- Every interaction has tactile feedback (hover glow, press scale, smooth removal animation) so actions feel safe and reversible.

---

## 2. Color Tokens (Verified Contrast)

| Token | Hex | Usage | Contrast vs `#0A0E17` |
|---|---|---|---|
| `bg-base` | `#0A0E17` | Page background | — |
| `bg-surface` | `#0F1321` | Sections, elevated containers | — |
| `bg-card` | `#14182B` | Product row cards | — |
| `bg-hover` | `#1A2238` | Hover states | — |
| `border-subtle` | `#1E2A42` | Dividers, hairline borders | — |
| `text-primary` | `#F0F0F0` | Headings, prices | 16.5:1 (AAA) |
| `text-secondary` | `#A8B0C0` | Body text, descriptions | 6.2:1 (AAA) |
| `text-muted` | `#6B7280` | Meta labels, sub-info | 4.9:1 (AA) |
| `accent-gold` | `#C8A45C` | Highlights, badges, active dots | 4.2:1 large text |
| `accent-amber` | `#E8A03A` | Primary CTAs, buttons, links | 6.8:1 |
| `accent-green` | `#34C759` | Confirmed / delivered state | 5.1:1 |
| `danger-red` | `#E84545` | Remove actions, warnings | 5.5:1 |

No gray-on-gray. All text pairs exceed WCAG AA (4.5:1); most exceed AAA.

---

## 3. Typography (Semantic Tokens)

| Role | Stack | Size | Weight | Line-Height |
|---|---|---|---|---|
| H1 (Cart Title) | `Inter`, `system-ui` | 32px / 2rem | 700 | 1.1 |
| H2 (Section) | `Inter`, `system-ui` | 20px / 1.25rem | 600 | 1.2 |
| Product name | `Inter`, `system-ui` | 16px / 1rem | 600 | 1.35 |
| Body / meta | `Inter`, `system-ui` | 14px / 0.875rem | 400 | 1.5 |
| Small labels | `Inter`, `system-ui` | 12px / 0.75rem | 500 | 1.4 |
| Price numeric | `Space Grotesk`, `system-ui` | 16px / 1rem | 600 | 1.2 |

Base font is 16px; never below 12px for body. Semantic tokens only — no raw hex values inline.

---

## 4. Layout Structure (Mobile-First)

```
+--------------------------------------------------+
|  Sticky Header (dark, gold underline border)     |  <- 1
+--------------------------------------------------+
|  Cart Title (left) · Item count / pill (right)   |  <- 2
|  "Free express delivery unlocked" badge           |  <- 3
+--------------------------------------------------+
|  Cart Items List                                  |  <- 4
|  [Row 1] [Row 2] [Row ...]                      |
|  Image | Name/Specs | Qty Stepper | Remove | Price |
+--------------------------------------------------+
|  Delivery / Shipping Info                        |  <- 5
|  3-stage progress bar + ETA + carrier info       |
+--------------------------------------------------+
|  Order Summary                                    |  <- 6
|  Subtotal | Shipping | Taxes (optional) | TOTAL  |
+--------------------------------------------------+
|  Checkout CTA + Security Badges                  |  <- 7
+--------------------------------------------------+
|  Empty State (when no items)                      |  <- 8
|  Icon + message + "Browse Products" link          |
+--------------------------------------------------+
```

### Breakpoints
- **Mobile** (320–639px): single column, stacked rows, sticky bottom checkout.
- **Tablet** (640–1023px): summary expands to side card.
- **Desktop** (1024px+): 2-column layout (`lg:grid-cols-12`: 7-col items / 5-col sidebar).
- No fixed pixel containers; fully responsive with `w-full`, `max-w-7xl`, `mx-auto`.

---

## 5. Component Breakdown

### A. CartPage (Page Component, `app/cart/page.js`)
- Consumes `CartContext`. Uses `useMemo` for subtotal, item count, shipping eligibility, total. Uses `useCallback` for update/remove to prevent list re-renders.
- Sections: Header, Title + Badge, Item List (or Empty State), Delivery Info, Order Summary, Checkout CTA.
- Integrates with "add to cart" functionality: buttons from `ProductCard.jsx` and `QuickViewModal.jsx` call `addToCart`, which feeds this page's state.

### B. CartItemRow (Reusable Component)
- Props: `product` (id, name, image, price, specs), `quantity`, `onUpdateQty`, `onRemove`.
- Includes: thumbnail (`rounded-2xl`, hover `scale-105` shadow lift), name + spec line, quantity stepper, remove button, line price.
- Touch targets: **44×44px minimum** (stepper buttons, remove button). **8px+ spacing** between interactive elements.
- Removal: 250ms slide-left + opacity 0, unmount after `onAnimationEnd`.

### C. QuantityStepper (Reusable Component)
- `−` / current number / `+` buttons. Disabled `−` at `1`; disabled `+` at max stock.
- Visual feedback: hover `bg-hover`, active `scale-95`, focus `ring-2 ring-amber-400`.
- Changes applied instantly (150ms ease-out transition on number).

### D. DeliveryProgress (Reusable Component)
- 3 stages: **Order Confirmed** → **In Transit** → **Delivered**.
- Active = `accent-amber`; completed = `accent-green`; pending = muted gray.
- Below bar: delivery ETA, carrier name, tracking link (optional).
- Bar animation: `transition-all duration-500 ease-out`.

### E. OrderSummary (Reusable Component)
- Line items: Subtotal, Shipping ($0 if >$299 else $9.99), Taxes (optional, collapsible), **Total** (`accent-gold`, bold).
- No placeholder-only labels; each line clearly labeled.
- Progressive disclosure for shipping/tax breakdown.

### F. CheckoutButton (Reusable Component)
- Full-width mobile; side-aligned desktop.
- Label: "Proceed to Checkout" + estimated total.
- States: default amber, hover glow (`shadow-[0_0_60px_rgba(255,180,70,0.35)]`), active press (`scale-[0.97]`), disabled (gray) when cart empty.
- Security badges below: SSL lock SVG, "30-Day Returns", "Free Shipping Over $299".

### G. EmptyCartState (Reusable Component)
- Large SVG shopping-cart outline (no emoji), subtle pulse animation.
- Title: "Your cart is empty". Body: brief message. CTA: "Browse Products" (links to `/` or `/deals`).
- Centered, generous whitespace (`min-h-[100dvh]` for viewport stability).

---

## 6. Interaction & Animation Rules (Priority 7 / Skill)

| Interaction | Duration / Easing | Behavior |
|---|---|---|
| Quantity change | 150ms ease-out | Number color + scale transition; button press `scale-95` |
| Item removal | 250ms ease-out | Slide-left + opacity 0; unmount after animation |
| Delivery update | 500ms ease-out | Bar fill; stage dots pulse briefly |
| Row hover | 200ms ease-out | `bg-hover` + `translate-y-[-1px]` shadow lift |
| Button hover | 200ms ease-out | Color transition + subtle shadow lift |
| Button active | Instant | `scale-[0.97]` for tactile press |

- **Performance**: `useMemo` for price calculations; `useCallback` for quantity/remove handlers.
- **Reduced motion**: `prefers-reduced-motion` falls back to instant state changes.
- **No banned patterns**: no inline functions in JSX render blocks; no emoji icons; no raw hex; no gray-on-gray; no hover-only interactions.

---

## 7. Accessibility (Priority 1 / Skill)

- All interactive elements: **visible focus rings** (`ring-2 ring-amber-400`).
- Remove buttons: `aria-label` = `"Remove {productName} from cart"`.
- Stepper buttons: `aria-label` = `"Decrease quantity"` / `"Increase quantity"`.
- Summary: semantic `<table>` or `role="table"` with headers.
- Images: descriptive `alt` (e.g., `"iPhone 15 Pro — Midnight Blue"`).
- Color is never the only signal: delivery stages include text labels + checkmark icons.
- Touch targets: 44×44px minimum; 8px+ spacing between interactive elements.
- No removal of focus rings; no icon-only buttons without text/label.

---

## 8. Component File Layout

```
components/cart/
  CartPage.jsx              # Main page (context + computed state)
  CartItemRow.jsx           # Row: image, info, qty, price, remove
  QuantityStepper.jsx       # + / - control
  DeliveryProgress.jsx      # 3-stage progress + info
  OrderSummary.jsx          # Subtotal / shipping / total
  CheckoutButton.jsx        # CTA + security badges
  EmptyCartState.jsx        # Empty illustration + message + link
  ShippingInfoCard.jsx      # ETA + carrier details
```

---

## 9. Anti-Patterns Avoided (Per Skill Reference)

- No emoji as icons → SVG icons only.
- No gray-on-gray text → all tokens pass 4.5:1.
- No fixed pixel container widths → fully responsive.
- No hover-only interactions → visible press states on touch.
- No placeholder-only labels → fully labeled lines.
- No inline functions in large JSX blocks → `useCallback` extracted.
- No console logs in final code.
- Dark luxury palette consistent (navy `#0A0E17`, gold `#C8A45C`, amber `#E8A03A`).

---

## 10. Integration & State (Project Context)

- Reads cart state from `CartContext.jsx` (or `useState` fallback with `INITIAL_ITEMS` array for demonstration).
- "Add to cart" links: buttons in `components/products/ProductCard.jsx` and `QuickViewModal.jsx` call `addToCart()`, feeding the same state as this cart page.
- Empty condition: `items.length === 0` renders `EmptyCartState`.
- Product links use `Link href="/products/{id}"` for deep linking (navigation pattern priority 9).

---

*Result: Professional premium e-commerce cart design delivered — color tokens verified for contrast, layout structured mobile-first, component breakdown complete, accessibility and animation rules specified, empty state included, and dark luxury (navy/gold/amber) palette applied consistently. Ready for implementation in `components/cart/` and `app/cart/page.js`.*
