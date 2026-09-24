"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  Plus,
  Minus,
  Zap,
  Sparkles,
  Shield,
  Award,
  RotateCcw,
} from "lucide-react";
import { useQuickView } from "./QuickViewContext";

// Fallback image in case product has no valid images
const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=800&q=80";

// Helper function to extract and sanitize valid image URLs
function getValidImages(product) {
  if (!product) return [PLACEHOLDER_IMAGE];

  const candidateImages =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [product.image, product.thumbnail, product.img, product.coverImage];

  const validImages = candidateImages
    .map((img) => {
      if (typeof img === "string") return img.trim();
      if (img && typeof img === "object") return img.url || img.src || "";
      return "";
    })
    .filter((url) => typeof url === "string" && url.trim().length > 0);

  return validImages.length > 0 ? validImages : [PLACEHOLDER_IMAGE];
}

export default function QuickViewModal() {
  const { product, closeQuickView } = useQuickView();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const stopDialogClick = useCallback((event) => {
    event.stopPropagation();
  }, []);

  useEffect(() => {
    if (!product) return undefined;

    setSelectedImageIndex(0);
    setQuantity(1);
    setIsAdded(false);

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

  // Extract cleaned, safe image URLs
  const images = getValidImages(product);

  // Safe image selection bounds
  const currentIdx =
    selectedImageIndex < images.length ? selectedImageIndex : 0;
  const currentImageSrc = images[currentIdx] || PLACEHOLDER_IMAGE;

  const title = product.name || product.title || "Product";
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

  // Dynamic Price Calculation
  const unitPrice = Number(product.price) || 0;
  const totalPrice = (unitPrice * quantity).toLocaleString();
  const totalOriginalPrice = originalPrice
    ? (originalPrice * quantity).toLocaleString()
    : null;

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
      onClick={closeQuickView}
      role="presentation"
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#080810]/95 shadow-[0_0_80px_rgba(0,0,0,0.95)] backdrop-blur-2xl transition-all duration-300 animate-in zoom-in-95 md:flex-row"
        onClick={stopDialogClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={closeQuickView}
          aria-label="Close modal"
          className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/70 backdrop-blur-md transition-all hover:scale-110 hover:border-cyan-500/50 hover:bg-cyan-500 hover:text-black"
        >
          <X className="h-5 w-5" />
        </button>

        {/* ------------------- FULL-SCREEN IMAGE LEFT SIDE ------------------- */}
        <div className="relative flex w-full flex-col justify-between overflow-hidden border-b border-white/10 bg-[#05050b] p-5 md:w-1/2 md:border-b-0 md:border-r md:p-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />

          {/* Badges Bar */}
          <div className="flex items-center justify-between z-10 gap-2 mb-3">
            {hasDiscount ? (
              <span className="flex items-center gap-1 rounded-full border border-rose-500/30 bg-rose-500/15 px-3 py-1 text-xs font-black tracking-wider text-rose-300 backdrop-blur-md shadow-[0_0_12px_rgba(244,63,94,0.2)]">
                <Sparkles className="h-3 w-3" /> -{discountPercent}% OFF
              </span>
            ) : (
              <span className="flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-300 backdrop-blur-md">
                <Award className="h-3 w-3" /> Authentic Guarantee
              </span>
            )}

            <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-white/70 backdrop-blur-md">
              <Zap className="h-3 w-3 text-amber-400" /> Best Seller
            </span>
          </div>

          {/* Main Full-Bleed Image Display */}
          <div className="group/img relative flex-1 min-h-[300px] sm:min-h-[340px] md:min-h-[370px] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#030308] transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_25px_rgba(6,182,212,0.12)] my-auto">
            <Image
              src={currentImageSrc}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover/img:scale-105"
              priority
            />
          </div>

          {/* Dynamic Thumbnails Bar */}
          {images.length > 1 && (
            <div className="mt-3 flex justify-center gap-2.5 overflow-x-auto py-1 no-scrollbar z-10">
              {images.map((imgSrc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border transition-all duration-300 ${
                    currentIdx === idx
                      ? "border-cyan-400 bg-white/5 scale-105 shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                      : "border-white/10 bg-black/40 opacity-50 hover:opacity-100 hover:border-white/30"
                  }`}
                >
                  <Image src={imgSrc} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Highlights Grid */}
          <div className="mt-4 grid grid-cols-2 gap-2 z-10">
            <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] p-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Zap className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-white">
                  Ultra Performance
                </span>
                <span className="text-[10px] text-white/40">
                  Verified Grade A
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] p-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20">
                <Shield className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-white">
                  2 Year Warranty
                </span>
                <span className="text-[10px] text-white/40">
                  Official Protection
                </span>
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="mt-3 flex items-center justify-around rounded-xl border border-white/5 bg-black/50 py-2 px-3 text-[11px] text-white/50 z-10">
            <span className="flex items-center gap-1.5">
              <Truck className="h-3.5 w-3.5 text-cyan-400" /> Free Delivery
            </span>
            <span className="h-3 w-[1px] bg-white/10" />
            <span className="flex items-center gap-1.5">
              <RotateCcw className="h-3.5 w-3.5 text-cyan-400" /> 30-Day Return
            </span>
          </div>
        </div>

        {/* ------------------- RIGHT SIDE DETAILS ------------------- */}
        <div className="flex w-full flex-col justify-between overflow-y-auto p-6 text-white md:w-1/2 md:p-8 no-scrollbar">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                {product.brand || product.category || "Nova Store"}
              </span>
              {ratingValue && (
                <div className="flex items-center gap-1.5 rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-1 text-xs font-semibold text-amber-300">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span>{ratingValue}</span>
                  {product.reviews !== undefined && (
                    <span className="text-white/40">({product.reviews})</span>
                  )}
                </div>
              )}
            </div>

            <h2
              id="quick-view-title"
              className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl"
            >
              {title}
            </h2>

            {/* Price Display */}
            <div className="mt-4 flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl font-extrabold tracking-tight text-white">
                ${totalPrice}
              </span>
              {hasDiscount && (
                <del className="text-lg font-medium text-white/40">
                  ${totalOriginalPrice}
                </del>
              )}
              {quantity > 1 && (
                <span className="text-xs font-medium text-cyan-400/80 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                  (${unitPrice.toLocaleString()} / item)
                </span>
              )}
            </div>

            {product.description && (
              <p className="mt-4 text-sm leading-relaxed text-white/60 line-clamp-3">
                {product.description}
              </p>
            )}

            {product.specs && (
              <div className="mt-5 rounded-2xl border border-white/5 bg-white/[0.02] p-3.5">
                <ul className="divide-y divide-white/5 text-xs">
                  {Object.entries(product.specs)
                    .slice(0, 3)
                    .map(([key, value]) => (
                      <li key={key} className="flex justify-between py-1.5">
                        <span className="text-white/40 capitalize">{key}</span>
                        <span className="font-medium text-white/90">
                          {value}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {stockStatus && (
              <div className="mt-4 flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${stockStatus.dotColor}`}
                />
                <span
                  className={`text-xs font-semibold ${stockStatus.className}`}
                >
                  {stockStatus.label}
                </span>
              </div>
            )}
          </div>

          <div className="mt-6 border-t border-white/10 pt-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-bold">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex flex-1 items-center justify-center gap-2 rounded-2xl py-3.5 px-4 text-sm font-bold transition-all duration-300 ${
                  isAdded
                    ? "bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    : "bg-cyan-400 text-black hover:bg-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] active:scale-98"
                }`}
              >
                <ShoppingBag className="h-4 w-4" />
                <span>{isAdded ? "Added to Cart!" : "Add to Cart"}</span>
              </button>

              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/70 transition hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-400"
              >
                <Heart className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-white/40">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Truck className="h-3.5 w-3.5 text-cyan-400" /> Fast Shipping
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />{" "}
                  Guarantee
                </span>
              </div>
              <Link
                href={`/products/${product.id || product.slug || ""}`}
                onClick={closeQuickView}
                className="font-semibold text-cyan-400 hover:underline"
              >
                View full details →
              </Link>
            </div>
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
      dotColor: "bg-amber-400 animate-pulse",
      label: `Only ${stock} items left in stock`,
    };
  }

  return {
    className: "text-emerald-400",
    dotColor: "bg-emerald-400",
    label: "In Stock & Ready to Ship",
  };
}
