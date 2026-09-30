"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Heart, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { useCallback, useMemo } from "react";
import { useWishlist } from "@/components/WishlistContext";
import CategoryNav from "@/components/products/CategoryNav";

export default function WishlistPage() {
  const {
    items: wishlistItemsContext,
    count,
    remove: removeFromContext,
    clear: clearContext,
    hydrated,
  } = useWishlist();
  const countNum = count || 0;
  const wishlistItems = useMemo(
    () => wishlistItemsContext || [],
    [wishlistItemsContext],
  );
  const empty = countNum === 0 && hydrated;

  const removeItem = useCallback(
    (id) => {
      removeFromContext(id);
    },
    [removeFromContext],
  );

  const handleClear = useCallback(() => {
    clearContext();
  }, [clearContext]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-amber-400/30 selection:text-amber-50">
      {/* Navigation */}
      <CategoryNav />

      <section
        aria-label="Wishlist"
        className="mx-auto max-w-7xl px-6 py-16 md:py-24"
      >
        {/* Asymmetric header */}
        <div className="mb-12 md:mb-16 lg:mb-20 grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-end">
          <div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[0.9] tracking-[-0.05em] text-white">
              Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-rose-300">
                wishlist.
              </span>
            </h1>
            <p className="mt-6 max-w-md text-base md:text-lg leading-relaxed text-zinc-400">
              Curated picks saved for later. Items added from any product card
              link here. Remove what you no longer want anytime.
            </p>
          </div>
          <div className="flex lg:justify-end items-end gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-2xl bg-white text-black px-6 py-3 text-sm font-extrabold tracking-tight shadow-lg shadow-white/10 transition hover:bg-zinc-100 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Shop Store <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/deals"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
            >
              View Deals
            </Link>
          </div>
        </div>

        {empty ? (
          <div
            className="flex flex-col items-center justify-center py-24 md:py-32 text-center"
            role="region"
            aria-label="Empty wishlist"
          >
            <div className="relative mb-8">
              <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-rose-500/10 to-amber-400/10 border border-white/10 flex items-center justify-center shadow-2xl shadow-rose-900/10 backdrop-blur-md">
                <Heart
                  className="h-10 w-10 text-rose-400/70"
                  aria-hidden="true"
                />
              </div>
              <span
                className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-rose-500 border-2 border-zinc-950 flex items-center justify-center"
                aria-hidden="true"
              >
                <span className="block h-1.5 w-1.5 rounded-full bg-white" />
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              Your wishlist is empty
            </h2>
            <p className="mt-4 max-w-md text-zinc-400">
              Click the heart on any product to save it here, or start exploring
              our catalog.
            </p>
            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-amber-400 text-black px-8 py-4 text-base font-extrabold tracking-tight shadow-[0_10px_40px_-10px_rgba(251,191,36,0.35)] transition hover:bg-amber-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <div
              role="list"
              aria-label="Wishlist items"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {wishlistItems.map((product, idx) => {
                const title = product.name || product.title || "Product";
                const imageSrc = product.image || product.thumbnail || "";
                const slug =
                  product.slug || (product.id ? String(product.id) : "");
                const price =
                  typeof product.price === "number"
                    ? product.price
                    : Number(product.price) || 0;
                const hasDiscount =
                  product.oldPrice && Number(product.oldPrice) > price;
                const originalPrice = hasDiscount
                  ? Number(product.oldPrice)
                  : price;
                return (
                  <article
                    key={`${String(product.id)}-${idx}`}
                    role="listitem"
                    className="group relative flex flex-col overflow-hidden rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] hover:-translate-y-1"
                    aria-label={`Wishlist item: ${title}, $${price}`}
                  >
                    <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-b from-amber-400/10 via-transparent to-rose-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-0" />
                    <div className="relative z-10 w-full overflow-hidden rounded-t-3xl bg-[#080810] pt-[100%]">
                      <Link
                        href={slug ? `/products/${slug}` : `/`}
                        className="absolute inset-0 block"
                        aria-label={`View ${title}`}
                      >
                        <Image
                          src={
                            imageSrc ||
                            "https://picsum.photos/seed/nova/400/400"
                          }
                          alt={title}
                          fill
                          className="object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-[1.03] group-hover:brightness-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          loading="lazy"
                        />
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        aria-label={`Remove ${title} from wishlist`}
                        className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 border border-white/10 text-white/80 backdrop-blur-md transition hover:bg-rose-500 hover:text-white hover:scale-110 hover:border-rose-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/60 active:scale-95"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="relative z-10 flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/40 mb-2">
                        <span className="truncate">
                          {product.brand || product.category || "Nova"}
                        </span>
                        <span className="h-0.5 w-0.5 rounded-full bg-white/30" />
                        <span>{product.category || "Device"}</span>
                      </div>
                      <Link
                        href={slug ? `/products/${slug}` : `/`}
                        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60 focus-visible:rounded-lg"
                      >
                        <h3 className="text-lg font-extrabold tracking-tight text-white leading-snug group-hover:text-amber-300 transition-colors duration-200">
                          {title}
                        </h3>
                      </Link>
                      {product.description && (
                        <p className="mt-2 text-xs text-white/50 leading-relaxed line-clamp-2">
                          {product.description}
                        </p>
                      )}
                      <div className="mt-auto pt-4 flex items-baseline gap-3 border-t border-white/[0.06]">
                        <span className="text-2xl font-extrabold tracking-tight text-white">
                          ${price}
                        </span>
                        {hasDiscount && (
                          <del className="text-sm font-medium text-white/30">
                            ${originalPrice}
                          </del>
                        )}
                      </div>
                      <Link
                        href={slug ? `/products/${slug}` : `/`}
                        className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 text-black px-5 py-2.5 text-sm font-extrabold tracking-tight shadow-[0_6px_24px_-6px_rgba(251,191,36,0.35)] transition hover:bg-amber-300 hover:shadow-[0_8px_28px_-8px_rgba(251,191,36,0.45)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60"
                      >
                        Buy Now <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Bottom summary + clear all */}
            <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-6 py-5 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
                  <Sparkles
                    className="h-5 w-5 text-amber-300"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    {countNum} items saved
                  </p>
                  <p className="text-xs text-zinc-400">
                    Review and remove before checkout
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear wishlist"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-rose-500/10 hover:text-rose-300 hover:border-rose-400/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/60 active:scale-[0.98]"
              >
                Clear all <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
