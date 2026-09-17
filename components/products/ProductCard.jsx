"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, ShoppingCart, Star, Check, Eye } from "lucide-react";

export default function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  // Calculate discount and original price if discountPercentage is present
  const hasDiscount =
    product.discountPercentage && product.discountPercentage > 0;
  const discountPercent = Math.round(product.discountPercentage || 0);
  const originalPrice = hasDiscount
    ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const toggleFavorite = (e) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white/[0.03] border border-white/10 p-4 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06] hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
      {/* Background Hover Glow */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-white/10 via-transparent to-purple-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 -z-10" />

      {/* Top Section: Image Box & Badges */}
      <div className="relative mb-4 w-full overflow-hidden rounded-xl bg-black/40 border border-white/5 pt-[100%]">
        {/* Product Image */}
        <div className="absolute inset-0 p-4 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
          <Image
            src={product.thumbnail}
            alt={product.title || "Product image"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-2"
          />
        </div>

        {/* Top-Left Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {hasDiscount && (
            <span className="inline-flex items-center rounded-full bg-rose-500/90 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-md backdrop-blur-md border border-rose-400/30">
              -{discountPercent}%
            </span>
          )}
          {product.stock !== undefined &&
            product.stock <= 5 &&
            product.stock > 0 && (
              <span className="inline-flex items-center rounded-full bg-amber-500/80 px-2 py-0.5 text-[10px] font-semibold text-white shadow-md backdrop-blur-md">
                Only {product.stock} left
              </span>
            )}
        </div>

        {/* Top-Right Favorite Button */}
        <button
          type="button"
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 ${
            isFavorite
              ? "bg-rose-500/20 border-rose-500/40 text-rose-500 scale-110"
              : "bg-black/40 border-white/10 text-white/70 hover:bg-black/60 hover:text-white hover:scale-110"
          }`}
        >
          <Heart
            className={`h-4 w-4 transition-transform ${
              isFavorite ? "fill-rose-500 scale-110" : ""
            }`}
          />
        </button>
      </div>

      {/* Middle Section: Meta Info & Title */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          {/* Brand or Category */}
          <div className="mb-1 flex items-center justify-between text-[11px] font-medium uppercase tracking-widest text-white/45">
            <span className="truncate">
              {product.brand || product.category || "Nova"}
            </span>
            {/* Rating Stars */}
            {product.rating !== undefined && (
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-semibold text-white/80">
                  {Number(product.rating).toFixed(1)}
                </span>
              </div>
            )}
          </div>

          {/* Product Title */}
          <h2 className="text-base font-semibold text-white tracking-tight line-clamp-1 group-hover:text-violet-200 transition-colors">
            {product.title}
          </h2>

          {/* Description Snippet */}
          {product.description && (
            <p className="mt-1 text-xs text-white/50 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>

        {/* Bottom Section: Price & Action */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          {/* Pricing */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold tracking-tight text-white">
                ${product.price}
              </span>
              {hasDiscount && originalPrice && (
                <span className="text-xs text-white/40 line-through">
                  ${originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`flex items-center justify-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-200 active:scale-95 shadow-md ${
              isAdded
                ? "bg-emerald-500 text-white shadow-emerald-500/25"
                : "bg-white text-black hover:bg-white/90 shadow-white/10"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="h-3.5 w-3.5 stroke-[3]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-3.5 w-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
