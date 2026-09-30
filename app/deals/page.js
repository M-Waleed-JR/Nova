import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowUpRight, Clock, Zap } from "lucide-react";
import { getProductsByCategory } from "@/lib/data";
import { getDiscountPercent, getOriginalPrice } from "@/lib/utils/product-helpers";

function DealBadge({ percent, label = "OFF" }) {
  return (
    <span
      aria-label={`${percent} percent discount`}
      className="inline-flex items-center gap-1 rounded-full bg-rose-500/90 px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider text-white shadow-[0_8px_24px_rgba(244,63,94,0.35)] backdrop-blur-md border border-rose-400/40"
    >
      <Sparkles className="h-3 w-3" aria-hidden="true" />
      -{percent}% {label}
    </span>
  );
}

function DealCard({ product }) {
  const title = product.name || product.title;
  const imageSrc = product.image || product.thumbnail;
  const discountPercent = getDiscountPercent(product);
  const originalPrice = getOriginalPrice(product);
  const hasDiscount = originalPrice > product.price;

  return (
    <article
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm transition-all duration-300 hover:border-amber-400/30 hover:bg-white/[0.06] hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]"
    >
      {/* Subtle inner glow */}
      <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-b from-amber-400/10 via-transparent to-rose-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0" />

      <div className="relative z-10 w-full overflow-hidden rounded-t-3xl bg-[#080810]">
        <Link href={`/products/${product.id || product.slug}`} className="block">
          <div className="pt-[100%]">
            <Image
              src={imageSrc}
              alt={title || "Deal product"}
              fill
              className="object-contain p-5 transition-all duration-500 ease-out group-hover:scale-[1.04] group-hover:brightness-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />
          </div>
        </Link>

        {/* Discount badge — top-left corner (per request) */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
          {hasDiscount && (
            <DealBadge percent={discountPercent} />
          )}
          {product.isNew && (
            <span className="inline-flex items-center rounded-full bg-violet-500/90 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-md backdrop-blur-md border border-violet-400/30">
              New
            </span>
          )}
          {product.stock !== undefined && product.stock <= 5 && product.stock > 0 && (
            <span className="inline-flex items-center rounded-full bg-amber-500/80 px-2 py-0.5 text-[10px] font-semibold text-white shadow-md backdrop-blur-md">
              Only {product.stock} left
            </span>
          )}
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/40 mb-2">
          <span className="truncate">{product.brand || product.category || "Nova"}</span>
          <span className="h-0.5 w-0.5 rounded-full bg-white/30" />
          <span>{product.category || "Device"}</span>
        </div>

        <Link href={`/products/${product.id || product.slug}`}>
          <h3 className="text-lg font-extrabold tracking-tight text-white leading-snug group-hover:text-amber-300 transition-colors duration-200">
            {title}
          </h3>
        </Link>

        {product.description && (
          <p className="mt-2 text-xs text-white/50 leading-relaxed line-clamp-2">{product.description}</p>
        )}

        <div className="mt-auto pt-4 flex items-baseline gap-3 border-t border-white/[0.06]">
          <span className="text-2xl font-extrabold tracking-tight text-white">${product.price}</span>
          {hasDiscount && (
            <del className="text-sm font-medium text-white/30">${originalPrice}</del>
          )}
        </div>

        <Link
          href={`/products/${product.id || product.slug}`}
          className="mt-4 inline-flex w-fit items-center gap-2 rounded-xl bg-rose-500/10 border border-rose-400/20 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-rose-300 transition hover:bg-rose-500 hover:text-white hover:border-rose-400 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/60"
        >
          View Deal <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default function DealsPage() {
  // Select deal products: budget + mid-range + a few high-end with enhanced discounts
  const all = getProductsByCategory("smartphones").concat(
    getProductsByCategory("laptops"),
    getProductsByCategory("tablets"),
    getProductsByCategory("cameras")
  );
  const deals = all.filter((p) => p.isDeal || p.discount >= 40);

  // Fallback if data hasn't been updated yet: show a curated list using IDs
  const curatedIds = new Set([
    "duo", "pro", "pro-max", "4", "2", 111, 112, 119, 7, 10, 13, 26, 27, 28, 122, 11, 12,
  ]);
  const curated = all.filter((p) => {
    const idStr = String(p.id);
    const slug = p.slug || "";
    return curatedIds.has(idStr) || curatedIds.has(slug) || curatedIds.has(p.id);
  });

  const featured = curated.slice(0, 1)[0];
  const rest = curated.slice(1);

  return (
    <main className="min-h-screen bg-[#030308] text-white">
      {/* Announcement bar */}
      <div className="border-b border-white/[0.06] bg-[#05050d] text-center text-xs text-white/60">
        <p className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2.5">
          <Zap className="h-3.5 w-3.5 text-amber-300" aria-hidden="true" />
          Exclusive savings — prices unchanged, discounts up to 50%
        </p>
      </div>

      {/* Hero section — split-screen asymmetric (design-taste v1: variance 8) */}
      <section
        aria-label="Deals hero"
        className="relative isolate overflow-hidden bg-gradient-to-br from-[#06060e] via-[#030308] to-[#0a0a14]"
      >
        {/* Mesh gradient backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(244,63,94,0.12),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(251,191,36,0.08),transparent_35%)]"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="grid lg:grid-cols-[1fr_1.1fr] lg:gap-16 items-center">
            {/* Left: headline content */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 mb-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 border border-rose-400/20 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-rose-300">
                  <Clock className="h-3 w-3" aria-hidden="true" /> Limited Time
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-amber-300">
                  Up to 50% OFF
                </span>
              </div>

              <h1 className="text-balance text-[clamp(3rem,8vw,7rem)] font-extrabold leading-[0.9] tracking-[-0.05em] text-white">
                Deals that{" "}
                <span className="bg-gradient-to-r from-amber-300 via-rose-300 to-cyan-300 bg-clip-text text-transparent">
                  actually matter.
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
                Budget, mid-range, and a few flagship picks — all at serious discounts.
                Prices stay the same. Your savings grow.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href="#deals"
                  className="inline-flex items-center gap-2.5 rounded-2xl bg-rose-500 px-7 py-3.5 text-sm font-extrabold tracking-tight text-white shadow-[0_10px_40px_-10px_rgba(244,63,94,0.45)] transition hover:bg-rose-400 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/60"
                >
                  Browse Deals <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/[0.10] bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white/80 transition hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                >
                  Back to Store
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-6 text-xs text-white/40">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-400 animate-pulse" />
                  17 products
                </div>
                <span className="h-3 w-px bg-white/10" />
                <span>Discounts up to 50%</span>
                <span className="h-3 w-px bg-white/10" />
                <span>Prices unchanged</span>
              </div>
            </div>

            {/* Right: featured deal card (asymmetric) */}
            <div className="mt-12 lg:mt-0 lg:pl-8">
              {featured && (
                <Link href={`/products/${featured.id || featured.slug}`} className="block group">
                  <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#080810]/80 backdrop-blur-xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] transition hover:border-amber-400/30 hover:shadow-[0_50px_100px_-20px_rgba(244,63,94,0.15)]">
                    <div className="absolute top-4 left-4 z-20">
                      <DealBadge percent={getDiscountPercent(featured)} />
                    </div>
                    <div className="relative w-full pt-[85%] bg-[#050508]">
                      <Image
                        src={featured.image || featured.thumbnail}
                        alt={featured.name || "Featured deal"}
                        fill
                        className="object-contain p-8 transition-transform duration-700 ease-out group-hover:scale-105"
                        priority
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-6 sm:p-8">
                      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/40 mb-2">
                        <span>{featured.category || "Device"}</span>
                        <span className="h-0.5 w-0.5 rounded-full bg-white/30" />
                        <span>{featured.brand || "Nova"}</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-none group-hover:text-amber-300 transition-colors">
                        {featured.name || featured.title}
                      </h2>
                      <p className="mt-3 text-sm text-white/50 leading-relaxed line-clamp-2">{featured.description}</p>
                      <div className="mt-5 flex items-baseline gap-3">
                        <span className="text-3xl font-extrabold tracking-tight text-white">${featured.price}</span>
                        {getOriginalPrice(featured) > featured.price && (
                          <del className="text-lg text-white/30 font-medium">${getOriginalPrice(featured)}</del>
                        )}
                      </div>
                      <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                        View Featured Deal <ArrowUpRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Deal grid — masonry-style asymmetric (design-taste v1) */}
      <section id="deals" aria-label="Deal products" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end sm:gap-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-[0.15em] text-violet-400">Curated</span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">Active Deals</h2>
            <p className="mt-2 text-sm text-white/50 max-w-md">Hand-picked budget and mid-range picks — plus a few flagship highlights. Discounts shown reflect the updated rates.</p>
          </div>
          <span className="rounded-full bg-white/[0.05] border border-white/[0.08] px-4 py-1.5 text-xs font-semibold text-white/70">
            {rest.length + (featured ? 1 : 0)} products
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {(featured ? [featured, ...rest] : rest).map((product, index) => (
            <DealCard
              key={product.id || product.slug || index}
              product={product}
            />
          ))}
        </div>

        {/* If no deal products matched in data yet */}
        {rest.length === 0 && (
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-12 text-center">
            <h3 className="text-xl font-extrabold tracking-tight text-white">No active deals</h3>
            <p className="mt-2 text-sm text-white/50">Check back soon. All product prices remain unchanged.</p>
          </div>
        )}
      </section>

      {/* Footer note */}
      <section aria-label="Deal terms" className="border-t border-white/[0.06] bg-[#05050d]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-white/30 leading-relaxed">
            Discount badges reflect updated promotional rates. All listed prices remain unchanged — no price increases.
            Deal selections include budget, mid-range, and a few high-end devices.
          </p>
        </div>
      </section>
    </main>
  );
}
