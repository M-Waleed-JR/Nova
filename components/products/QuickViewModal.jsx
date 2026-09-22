"use client";

import { useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Star, Check } from "lucide-react";
import { useQuickView } from "./QuickViewContext";

export default function QuickViewModal() {
  const { product, closeQuickView } = useQuickView();

  const stopDialogClick = useCallback((event) => {
    event.stopPropagation();
  }, []);

  useEffect(() => {
    if (!product) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeQuickView();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeQuickView, product]);

  if (!product) return null;

  const title = product.name || product.title || "Product";
  const imageSrc = product.image || product.thumbnail || "";
  const discount = product.discount || product.discountPercentage || 0;
  const originalPrice = getOriginalPrice(product, discount);
  const hasDiscount = originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(
        discount || ((originalPrice - product.price) / originalPrice) * 100,
      )
    : 0;
  const ratingValue =
    product.rating !== undefined ? Number(product.rating).toFixed(1) : null;
  const stockStatus = getStockStatus(product.stock);

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={closeQuickView}
      role="presentation"
    >
      <div
        className="relative grid max-h-[90vh] w-full max-w-3xl grid-cols-1 overflow-y-auto rounded-2xl border border-white/10 bg-[#0d0d14] shadow-2xl animate-[popIn_0.2s_ease] md:grid-cols-2"
        onClick={stopDialogClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
      >
        <button
          type="button"
          onClick={closeQuickView}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/70 transition hover:bg-black/70 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative border-b border-white/5 bg-black/40 md:border-b-0 md:border-r md:border-white/5">
          {hasDiscount && (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-rose-500/90 px-2.5 py-0.5 text-[11px] font-bold text-white">
              -{discountPercent}%
            </span>
          )}
          <div className="relative h-64 min-h-[300px] md:h-full">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-6"
              />
            ) : null}
          </div>
        </div>

        {/* Details */}
        <div className="p-6 text-white">
          <span className="text-xs uppercase tracking-widest text-white/40">
            {product.brand || product.category || "Nova"}
          </span>
          <h2 id="quick-view-title" className="mt-1 text-2xl font-bold tracking-tight">
            {title}
          </h2>

          {ratingValue && (
            <div className="mt-2 flex items-center gap-1 text-sm text-amber-400">
              <Star className="h-4 w-4 fill-amber-400" />
              <span className="font-semibold text-white/80">
                {ratingValue}
              </span>
              {product.reviews !== undefined && (
                <span className="text-white/40">
                  ({product.reviews} reviews)
                </span>
              )}
            </div>
          )}

          <div className="mt-3 flex items-baseline gap-3">
            <strong className="text-3xl">${product.price}</strong>
            {hasDiscount && (
              <del className="text-white/40">${originalPrice}</del>
            )}
          </div>

          {product.description && (
            <p className="mt-3 text-sm leading-relaxed text-white/50">
              {product.description}
            </p>
          )}

          {product.specs && (
            <ul className="mt-4 divide-y divide-white/10 text-sm">
              {Object.entries(product.specs).map(([key, value]) => (
                <li key={key} className="flex justify-between py-2">
                  <span className="text-white/40">{key}</span>
                  <span className="font-medium text-white/80">{value}</span>
                </li>
              ))}
            </ul>
          )}

          {stockStatus && (
            <p className={`mt-3 text-sm font-medium ${stockStatus.className}`}>
              {stockStatus.label}
            </p>
          )}

          <div className="mt-5 flex items-center gap-4">
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90 active:scale-95"
            >
              <Check className="h-4 w-4" />
              Add to cart
            </button>
            <Link
              href={`/products/${product.category}`}
              onClick={closeQuickView}
              className="text-sm text-violet-300 underline underline-offset-4 hover:text-violet-200"
            >
              Browse category →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function getOriginalPrice(product, discount) {
  if (typeof product.oldPrice === "number") return product.oldPrice;

  if (!discount) return null;

  return Number((product.price / (1 - discount / 100)).toFixed(2));
}

function getStockStatus(stock) {
  if (stock === undefined) return null;

  if (stock < 10) {
    return {
      className: "text-amber-400",
      label: `⚠️ Only ${stock} left in stock`,
    };
  }

  return {
    className: "text-emerald-400",
    label: "✅ In stock",
  };
}
