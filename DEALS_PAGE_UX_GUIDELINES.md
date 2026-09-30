# Deals Page UX Guidelines
## Nova Electronics Store

Based on the site's existing design system (dark theme #030308, glassmorphism, rounded cards, premium feel) and ui-ux-pro-max best practices.

## 1. Discount Badge Appearance

**Placement & Visual Design:**
- Position: Top-left corner of product card (consistent with existing ProductCard component)
- Size: Minimum 44x44px touch target (per WCAG 2.2 AA and platform guidelines)
- Appearance: 
  - Background: `bg-rose-500/90` (semi-transparent red for high visibility on dark background)
  - Text: `-{discountPercent}%` in white, font-bold, uppercase, tracking-wider
  - Effects: `shadow-md backdrop-blur-md border border-rose-400/30` (matches existing card badge style)
  - Typography: `text-[11px] font-bold` (consistent with existing badge text sizing)
- Accessibility: Ensure 4.5:1 contrast ratio against card background (tested with rose-500/90 on bg-white/[0.03])

**Implementation Example:**
```jsx
{hasDiscount && (
  <span className="absolute top-3 left-3 flex items-center rounded-full bg-rose-500/90 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-md backdrop-blur-md border border-rose-400/30 z-20 pointer-events-none">
    -{discountPercent}%
  </span>
)}
```

**Why This Works:**
- Maintains visual consistency with existing ProductCard badge styling
- High contrast ensures visibility on dark card backgrounds
- Proper touch target size prevents mis-taps
- Uses existing design tokens from the site's CSS system

## 2. Empty/Loading/Error States

**Loading State:**
- Use skeleton screens that mirror the final product card layout
- Show 3-6 skeleton cards in grid formation
- Implement with `animate-pulse` on background gradients
- Maintain layout stability to prevent CLS (Cumulative Layout Shift)

**Empty State:**
- Display when no deals are available
- Include:
  - Illustrative icon (shopping bag with discount tag)
  - Primary message: "No deals available right now"
  - Secondary message: "Check back later for special offers"
  - Primary action: "Browse All Products" button linking to main catalog
- Center content vertically and horizontally
- Use ample whitespace to avoid feeling cramped

**Error State:**
- Show when API/data fails to load
- Include:
  - Warning icon (triangle with exclamation)
  - Primary message: "Unable to load deals"
  - Secondary message: "Please try again later"
  - Primary action: "Retry" button
  - Secondary action: "Visit Homepage" link
- Maintain consistent spacing with loading/empty states

**Implementation Principles:**
- All states should maintain identical layout dimensions to prevent layout shift
- Use consistent spacing (py-10, px-4, etc.) across all states
- Ensure touch targets remain ≥44px in all states
- Maintain accessible contrast ratios in all state variations

## 3. Mobile Layout (Single Column Collapse)

**Breakpoint Strategy:**
- Mobile (< 640px): Single column layout with full-width cards
- Tablet (640px - 1024px): Two-column layout with responsive gaps
- Desktop (> 1024px): Three or four-column layout based on screen width

**Mobile-Specific Optimizations:**
- Card width: 100% with horizontal padding (px-4 on mobile, px-6 lg:px-8)
- Vertical spacing between rows: 6px (space-y-6)
- Image aspect ratio: Maintain consistent 4:3 or 16:9 ratio using `aspect-w-4 aspect-h-3` or similar
- Touch targets: All interactive elements ≥44px (buttons, quick view areas, etc.)
- Typography: Minimum 16px equivalent text (text-base or larger for body text)
- Safe area: Avoid placing critical controls near screen edges; use `safe-area` aware padding

**Grid Implementation:**
```jsx
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {/* Product cards */}
</div>
```

**Performance Considerations:**
- Implement lazy loading for images below the fold
- Use `loading="lazy"` on Next.js Image component
- Prioritize above-the-fold content loading
- Consider code-splitting for non-essential deal components

## 4. Animation Recommendations

**Entrance Animations:**
- Use staggered fade-in-up motion for product cards
- Stagger delay: 50ms between cards (per md motion guidelines)
- Duration: 300ms enter animation
- Easing: cubic-bezier(0.16, 1, 0.3, 1) (spring-like deceleration)
- Respect `prefers-reduced-motion`: disable animations when requested

**Hover/Interaction Animations:**
- Scale: 1.02-1.05 scale on hover (subtle, not disruptive)
- Shadow: Elevate shadow on hover (0_12px_40px_rgba(0,0,0,0.6) to 0_16px_48px_rgba(0,0,0,0.8))
- Border: Subtle border intensity increase (border-white/10 to border-white/25)
- Duration: 200-300ms for all hover transitions
- Easing: ease-out for hover-in, ease-in for hover-out

**Button Interactions:**
- Press feedback: Scale to 0.95-0.98 on active press
- Duration: 100-150ms for press feedback (per Apple HIG)
- Use `active:scale-95` or similar for immediate tactile feedback

**Loading/Skeleton Animations:**
- Use `animate-pulse` on skeleton elements
- Pulse duration: 1.5s ease-in-out infinite
- Color: Subtle gradient shift (bg-white/[0.02] to bg-white/[0.05])

**Motion Principles:**
- Animate only 1-2 key elements per view max (per excessive-motion guideline)
- All animations must express cause-effect relationships (motion-meaning)
- Ensure animations are interruptible (user can tap during animation)
- Never block user input during animations

## 5. Accessibility Checks

**Visual Accessibility:**
- Contrast Ratios:
  - Text: Minimum 4.5:1 against backgrounds (test all text variants)
  - Icons/Controls: Minimum 3:1 against adjacent colors
  - Focus Rings: Minimum 3:1 contrast against surrounding elements
- Color Not Sole Indicator: Discount badges use both color (%) and text label
- Text Scaling: Support Dynamic Type up to 200% without loss of functionality
- Reduced Motion: Provide `@media (prefers-reduced-motion: reduce)` variants

**Screen Reader Support:**
- ARIA Labels:
  - Product cards: `aria-label="Product: [title]. [Price information]. [Discount information if applicable]. [Availability]. Button to view details."`
  - Discount badges: Ensure announced as "X percent off" not just "-X%"
  - Buttons: Clear, descriptive labels (not just icon-only without aria-label)
- Live Regions: Use for dynamic stock updates ("Only 3 left" announcements)
- Heading Structure: Proper h1→h6 hierarchy on the page
- Landmarks: Use `<section>` with appropriate `aria-label` for deals grid

**Keyboard Navigation:**
- Tab Order: Logical left-to-right, top-to-bottom
- Focus Rings: Visible 2-4px outline on all interactive elements
- Focus Visible: Outline-2 outline-offset-2 focus-visible classes
- Skip Links: Provide "Skip to main content" for keyboard users
- Modal Traps: If implementing quick view modals, trap focus within modal

**Touch & Interaction:**
- Touch Targets: All interactive elements ≥44x44px (visual size + padding)
- Touch Spacing: Minimum 8px between touch targets
- Hover vs Tap: Don't rely on hover states for critical information (ensure tap/click reveals same info)
- Click Handler: Use `onClick` not `onMouseDown` for primary actions
- Cursor Pointer: Apply `cursor-pointer` to all interactive elements

**Form & Feedback** (if applicable for filtering):
- Error Messages: Clear, specific, and placed near problematic fields
- Labels: Visible labels for all form inputs (not placeholder-only)
- Required Indicators: Visual indicators for required fields
- Validation: On-blur validation with clear recovery paths

**Implementation Checklist:**
- [ ] Test with screen reader (VoiceOver, NVDA, TalkBack)
- [ ] Verify with keyboard-only navigation
- [ ] Check contrast ratios with accessibility tools
- [ ] Test touch targets with finger tapping
- [ ] Verify reduced motion preferences respected
- [ ] Confirm Dynamic Type scaling works
- [ ] Validate ARIA labels and live regions
- [ ] Check focus order and visibility
- [ ] Test with various viewport sizes (320px, 375px, 768px, 1024px, 1440px)
- [ ] Verify layout stability (no unexpected shifts during loading)

## Performance Notes

- Use Next.js Image component with proper width/height or aspect-ratio to prevent layout shift
- Implement lazy loading for below-the-fold deal cards
- Consider implementing intersection observer for intersection-based loading
- Use `useMemo` and `useCallback` for expensive computations
- Bundle deal-specific code separately if large enough to warrant code splitting
- Server-side rendering or static generation for initial deal data when possible
- Implement proper caching headers for deal data API responses