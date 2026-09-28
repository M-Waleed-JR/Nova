"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ShoppingBag,
  Heart,
  Share2,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Check,
  Plus,
  Minus,
  ChevronRight,
  Zap,
  Flame,
  Award,
  Lock,
  Clock,
  Eye,
  ArrowLeft,
  Sliders,
  ThumbsUp,
  Cpu,
  Smartphone,
  CheckCheck,
  Radio,
} from "lucide-react";
import ProductCard from "./ProductCard";

// Fallback image in case product image fails
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=800&q=80";

export default function ProductDetailView({ product, relatedProducts = [] }) {
  // Extract and sanitize images
  const images = useMemo(() => {
    if (!product) return [FALLBACK_IMAGE];
    const list = [];
    if (Array.isArray(product.images) && product.images.length > 0) {
      list.push(...product.images);
    }
    if (product.image && !list.includes(product.image)) {
      list.unshift(product.image);
    }
    if (product.thumbnail && !list.includes(product.thumbnail)) {
      list.push(product.thumbnail);
    }
    // Clean strings
    const cleaned = list
      .map((item) => (typeof item === "string" ? item.trim() : ""))
      .filter(Boolean);

    // If only 1 image exists, provide subtle multi-angle simulated views
    if (cleaned.length === 1) {
      return [cleaned[0], cleaned[0], cleaned[0]];
    }
    return cleaned.length > 0 ? cleaned : [FALLBACK_IMAGE];
  }, [product]);

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("specs");

  if (!product) return null;

  // Color Finishes tailored to tech gear
  const colorOptions = [
    { name: "Space Titanium", hex: "#1e1e24", border: "#3f3f46" },
    { name: "Cyber Silver", hex: "#d1d5db", border: "#e5e7eb" },
    { name: "Midnight Nebula", hex: "#1e1b4b", border: "#4338ca" },
    { name: "Emerald Glaze", hex: "#064e3b", border: "#059669" },
  ];

  // Storage / Variant Options
  const storageOptions = [
    { label: "256 GB", priceDelta: 0, tag: "Popular" },
    { label: "512 GB", priceDelta: 120, tag: "Recommended" },
    { label: "1 TB", priceDelta: 280, tag: "Pro Creator" },
  ];

  const currentPrice =
    (product.price || 999) + storageOptions[selectedStorage].priceDelta;
  const originalPrice = product.oldPrice
    ? product.oldPrice + storageOptions[selectedStorage].priceDelta
    : Math.round(currentPrice * 1.15);
  const discountAmount = Math.max(0, originalPrice - currentPrice);
  const discountPercent =
    product.discount ||
    (originalPrice > currentPrice
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : 12);

  const rating = Number(product.rating || 4.8).toFixed(1);
  const reviewsCount = product.reviews || 284;
  const stockCount = product.stock ?? 18;

  // Specs dynamic mapper
  const baseSpecs = product.specs || {};
  const enrichedSpecs = [
    {
      label: "Processor & Architecture",
      value:
        baseSpecs.processor ||
        baseSpecs.chip ||
        "Nova Bionic Neural Architecture",
      icon: Cpu,
    },
    {
      label: "Display Resolution",
      value:
        baseSpecs.screen ||
        baseSpecs.display ||
        '6.7" ProMotion Super Retina XDR OLED 120Hz',
      icon: Smartphone,
    },
    {
      label: "Memory & Storage",
      value: `${storageOptions[selectedStorage].label} NVMe Ultra-Fast Storage`,
      icon: Sliders,
    },
    {
      label: "Battery & Charging",
      value: baseSpecs.battery || "5,000 mAh · 65W Fast Wireless MagCharge",
      icon: Zap,
    },
    {
      label: "Wireless Connectivity",
      value: "Wi-Fi 7 (802.11be) · Dual SIM 5G · Bluetooth 5.4 LE",
      icon: Radio,
    },
    {
      label: "Materials & Durability",
      value:
        baseSpecs.material ||
        "Grade-5 Aerospace Titanium & Ceramic Shield Front",
      icon: ShieldCheck,
    },
  ];

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2400);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const currentImage = images[selectedImageIdx] || images[0] || FALLBACK_IMAGE;

  return (
    <div className="relative min-h-screen bg-[#030308] text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Ambient background glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-10 left-1/4 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[140px]" />
        <div className="absolute top-40 right-1/4 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="absolute bottom-10 left-1/3 h-[500px] w-[500px] rounded-full bg-blue-600/5 blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb Bar */}
        <nav className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-zinc-400">
            <Link
              href="/"
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <span>Home</span>
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-zinc-600" />
            <Link
              href={`/category/${product.category || "smartphones"}`}
              className="capitalize transition-colors hover:text-white"
            >
              {product.category?.replace("-", " ") || "Smartphones"}
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-zinc-600" />
            <span className="max-w-[200px] truncate font-medium text-white sm:max-w-none">
              {product.name}
            </span>
          </div>

          <Link
            href={`/category/${product.category || "smartphones"}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-md transition hover:border-cyan-500/40 hover:bg-white/[0.08] hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to collection</span>
          </Link>
        </nav>

        {/* ========================================================
            HERO PRODUCT STAGE (LEFT: GALLERY | RIGHT: BUY HUB)
            ======================================================== */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ----------------- LEFT: IMAGE GALLERY ----------------- */}
          <div className="flex flex-col gap-4 lg:col-span-7">
            {/* Main Stage Image Showcase */}
            <div className="group relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0a0a16] via-[#070712] to-[#040409] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
              {/* Radial spotlight behind product */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-500/15 via-violet-500/15 to-transparent blur-3xl transition-transform duration-700 group-hover:scale-125" />
              </div>

              {/* Floating Status Badges */}
              <div className="absolute left-5 top-5 z-20 flex flex-col gap-2">
                {discountPercent > 0 && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-rose-500/30 bg-rose-500/20 px-3 py-1 text-xs font-bold text-rose-300 backdrop-blur-md shadow-lg shadow-rose-950/40">
                    <Sparkles className="h-3 w-3" />
                    Save {discountPercent}%
                  </span>
                )}
                {product.isNew && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-violet-500/30 bg-violet-500/20 px-3 py-1 text-xs font-bold text-violet-300 backdrop-blur-md">
                    <Award className="h-3 w-3" />
                    New 2026 Edition
                  </span>
                )}
                {stockCount < 10 && stockCount > 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/20 px-2.5 py-1 text-[11px] font-semibold text-amber-300 backdrop-blur-md">
                    <Flame className="h-3 w-3 text-amber-400" />
                    Only {stockCount} remaining
                  </span>
                )}
              </div>

              {/* Floating Quick Actions (Wishlist & Share) */}
              <div className="absolute right-5 top-5 z-20 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsFavorite(!isFavorite)}
                  aria-label="Wishlist"
                  className={`flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 ${
                    isFavorite
                      ? "border-rose-500/50 bg-rose-500/20 text-rose-400 scale-105"
                      : "border-white/10 bg-black/40 text-zinc-400 hover:border-white/30 hover:bg-black/70 hover:text-white"
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 transition-transform duration-300 ${
                      isFavorite ? "fill-rose-500 scale-110" : ""
                    }`}
                  />
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Share product"
                  className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/40 text-zinc-400 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-black/70 hover:text-white"
                >
                  {copied ? (
                    <CheckCheck className="h-5 w-5 text-emerald-400" />
                  ) : (
                    <Share2 className="h-5 w-5" />
                  )}
                  {copied && (
                    <span className="absolute -bottom-8 right-0 whitespace-nowrap rounded-md bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-black shadow-lg">
                      Link copied!
                    </span>
                  )}
                </button>
              </div>

              {/* Main Product Image Container */}
              <div className="relative z-10 flex h-full w-full items-center justify-center transition-transform duration-500 ease-out group-hover:scale-105">
                <Image
                  src={currentImage}
                  alt={product.name}
                  width={680}
                  height={680}
                  priority
                  unoptimized
                  className="max-h-[85%] max-w-[85%] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] filter"
                />
              </div>

              {/* Stage Floor Reflection / Pedestal Light */}
              <div className="pointer-events-none absolute bottom-4 h-8 w-3/4 rounded-full bg-cyan-400/10 blur-xl" />
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-none">
                {images.map((img, idx) => (
                  <button
                    key={`${img}-${idx}`}
                    type="button"
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`relative flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border bg-black/50 p-2 transition-all duration-200 ${
                      selectedImageIdx === idx
                        ? "border-cyan-400 ring-2 ring-cyan-400/30 scale-105 bg-white/[0.08]"
                        : "border-white/10 opacity-70 hover:border-white/30 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`View ${idx + 1}`}
                      width={70}
                      height={70}
                      unoptimized
                      className="max-h-full max-w-full object-contain"
                    />
                    {selectedImageIdx === idx && (
                      <span className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Assurance Trust Badges Bar */}
            <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="flex items-center gap-2.5 rounded-2xl border border-white/5 bg-white/[0.02] p-3 backdrop-blur-md">
                <Truck className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-semibold text-white">
                    Free Express
                  </div>
                  <div className="text-[10px] text-zinc-400">
                    2-3 day delivery
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-2xl border border-white/5 bg-white/[0.02] p-3 backdrop-blur-md">
                <ShieldCheck className="h-5 w-5 text-violet-400 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-semibold text-white">
                    2-Yr Warranty
                  </div>
                  <div className="text-[10px] text-zinc-400">
                    Official Nova care
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-2xl border border-white/5 bg-white/[0.02] p-3 backdrop-blur-md">
                <RotateCcw className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-semibold text-white">
                    30-Day Return
                  </div>
                  <div className="text-[10px] text-zinc-400">
                    Zero hassle refund
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 rounded-2xl border border-white/5 bg-white/[0.02] p-3 backdrop-blur-md">
                <Lock className="h-5 w-5 text-rose-400 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-xs font-semibold text-white">
                    Secure Pay
                  </div>
                  <div className="text-[10px] text-zinc-400">
                    256-bit encrypted
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ----------------- RIGHT: PURCHASE DECISION HUB ----------------- */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-bold tracking-widest uppercase text-cyan-300">
                  {product.brand || "NOVA PRO"}
                </span>

                {/* Stock indicator */}
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  {stockCount > 0
                    ? "In Stock & Ready to Ship"
                    : "Backorder Available"}
                </span>
              </div>

              {/* Title */}
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
                {product.name}
              </h1>

              {/* Ratings and Reviews */}
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating || 5)
                          ? "fill-amber-400 text-amber-400"
                          : "text-zinc-600"
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-sm font-bold text-white">
                    {rating}
                  </span>
                </div>
                <span className="text-zinc-500">·</span>
                <a
                  href="#reviews"
                  className="text-xs font-medium text-zinc-400 underline-offset-4 hover:text-cyan-300 hover:underline"
                >
                  {reviewsCount} verified customer reviews
                </a>
              </div>
            </div>

            {/* Price Box */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-extrabold tracking-tight text-white">
                  ${(currentPrice * quantity).toLocaleString()}
                </span>
                {originalPrice > currentPrice && (
                  <span className="text-lg text-zinc-500 line-through">
                    ${(originalPrice * quantity).toLocaleString()}
                  </span>
                )}
                {discountAmount > 0 && (
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-bold text-emerald-300 border border-emerald-500/30">
                    Save ${(discountAmount * quantity).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Monthly financing teaser */}
              <div className="mt-2.5 flex items-center gap-2 text-xs text-zinc-400">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" />
                <span>
                  Or 4 interest-free payments of{" "}
                  <strong className="text-white">
                    ${((currentPrice * quantity) / 4).toFixed(2)}
                  </strong>{" "}
                  with NovaPay
                </span>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-sm leading-relaxed text-zinc-300">
              {product.description ||
                "Engineered with pinnacle precision, aerospace-grade materials, and groundbreaking performance. Experience the new benchmark in everyday electronics."}
            </p>

            {/* Color Finish Selector */}
            <div>
              <div className="mb-2.5 flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-300">
                  Select Finish
                </span>
                <span className="font-medium text-cyan-300">
                  {colorOptions[selectedColor].name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {colorOptions.map((c, i) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(i)}
                    aria-label={`Select ${c.name}`}
                    className={`relative flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all ${
                      selectedColor === i
                        ? "border-cyan-400 scale-110 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                        : "border-white/10 hover:border-white/40"
                    }`}
                  >
                    <span
                      className="h-8 w-8 rounded-full shadow-inner"
                      style={{ backgroundColor: c.hex }}
                    />
                    {selectedColor === i && (
                      <Check className="absolute h-4 w-4 text-white drop-shadow stroke-[3]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Storage / Configuration Selector */}
            <div>
              <div className="mb-2.5 flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-300">
                  Storage / Configuration
                </span>
                <span className="text-[11px] text-zinc-400">
                  Ultra-Fast NVMe
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {storageOptions.map((opt, i) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setSelectedStorage(i)}
                    className={`flex flex-col items-center justify-center rounded-2xl border p-3 transition-all ${
                      selectedStorage === i
                        ? "border-cyan-400 bg-cyan-500/10 text-white shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                        : "border-white/10 bg-white/[0.02] text-zinc-300 hover:border-white/25 hover:bg-white/[0.05]"
                    }`}
                  >
                    <span className="text-sm font-bold">{opt.label}</span>
                    <span className="text-[10px] text-zinc-400 mt-0.5">
                      {opt.priceDelta === 0
                        ? "Included"
                        : `+$${opt.priceDelta}`}
                    </span>
                    {opt.tag && (
                      <span className="mt-1.5 rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-semibold text-cyan-300">
                        {opt.tag}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and CTA Button Actions */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Stepper */}
                <div className="flex h-14 items-center rounded-2xl border border-white/15 bg-white/[0.04] p-1 backdrop-blur-md">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-zinc-300 transition hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center text-base font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    disabled={quantity >= 10}
                    className="flex h-11 w-11 items-center justify-center rounded-xl text-zinc-300 transition hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Primary Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`relative flex h-14 flex-1 items-center justify-center gap-2.5 rounded-2xl font-bold text-base transition-all duration-300 active:scale-98 shadow-xl ${
                    isAdded
                      ? "bg-emerald-500 text-black shadow-emerald-500/30"
                      : "bg-white text-black hover:bg-zinc-200 shadow-white/10 hover:shadow-cyan-500/20"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="h-5 w-5 stroke-[3]" />
                      <span>Added to Your Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-5 w-5" />
                      <span>
                        Add to Cart · $
                        {(currentPrice * quantity).toLocaleString()}
                      </span>
                    </>
                  )}
                </button>
              </div>

              {/* Instant Buy Now Button */}
              <button
                type="button"
                className="group relative flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 font-bold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:opacity-95 hover:shadow-cyan-500/40 active:scale-98"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
                <Zap className="h-5 w-5 text-amber-300 fill-amber-300" />
                <span>Instant Checkout with NovaPay</span>
              </button>
            </div>

            {/* Realtime Delivery Estimate Bar */}
            <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-3 text-xs text-zinc-300">
              <Clock className="h-4 w-4 text-cyan-400 flex-shrink-0" />
              <span>
                Order within <strong className="text-white">3h 42m</strong> for
                guaranteed dispatch by tomorrow morning.
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================
            DEEP SPECS & FEATURE TABS SECTION
            ======================================================== */}
        <section className="mt-16 border-t border-white/10 pt-12">
          {/* Tabs Bar */}
          <div className="flex items-center gap-3 overflow-x-auto border-b border-white/10 pb-4">
            <button
              type="button"
              onClick={() => setActiveTab("specs")}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                activeTab === "specs"
                  ? "bg-white text-black shadow-lg shadow-white/10"
                  : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              Technical Specifications
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("highlights")}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                activeTab === "highlights"
                  ? "bg-white text-black shadow-lg shadow-white/10"
                  : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              Hardware Highlights
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("box")}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                activeTab === "box"
                  ? "bg-white text-black shadow-lg shadow-white/10"
                  : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              In the Box & Coverage
            </button>
          </div>

          {/* Tab 1: Specs Grid */}
          {activeTab === "specs" && (
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {enrichedSpecs.map((spec, i) => {
                const IconComponent = spec.icon;
                return (
                  <div
                    key={spec.label}
                    className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-2.5 text-cyan-400">
                      <IconComponent className="h-4 w-4" />
                      <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400">
                        {spec.label}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-white">
                      {spec.value}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 2: Hardware Highlights */}
          {activeTab === "highlights" && (
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-300">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Next-Gen Architecture
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Optimized for demanding creative workflows, heavy gaming, and
                  generative AI execution with unmatched thermal efficiency.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-300">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Precision Craftsmanship
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Forged from surgical titanium and high-durability composites.
                  Designed to feel extraordinarily lightweight yet impervious to
                  daily impact.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white">
                  Nova Intelligent Sync
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Seamless ecosystem pairing across audio gear, workstations,
                  and mobile devices with zero latency spatial telemetry.
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: In the Box */}
          {activeTab === "box" && (
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white">
                What&apos;s in the Box
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                {[
                  `${product.name}`,
                  "Braided USB-C Fast Charge Cable (1.5m)",
                  "Nova 65W GaN Power Adapter",
                  "Documentation & 2-Year NovaCare Warranty Card",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-xs font-medium text-zinc-300"
                  >
                    <Check className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ========================================================
            COMMUNITY REVIEWS SECTION
            ======================================================== */}
        <section id="reviews" className="mt-20 border-t border-white/10 pt-12">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                Community Feedback
              </span>
              <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Customer Ratings & Reviews
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-4xl font-black text-white">{rating}</span>
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <div className="text-xs text-zinc-400">
                  Based on {reviewsCount} verified purchases
                </div>
              </div>
            </div>
          </div>

          {/* Sample Verified Reviews Grid */}
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              {
                name: "Alex Sterling",
                badge: "Verified Buyer",
                date: "2 days ago",
                rating: 5,
                title: "Absolute masterpiece of engineering",
                text: "The build quality feels leaps ahead of the previous model. The tactile feel of the finish and responsive battery life surpassed all expectations.",
              },
              {
                name: "Elena Rostova",
                badge: "Pro Creator",
                date: "1 week ago",
                rating: 5,
                title: "Incredible display & thermal management",
                text: "Running intensive rendering and multitasking all day long without any throttling. The display clarity is breathtaking.",
              },
              {
                name: "Marcus Vance",
                badge: "Verified Buyer",
                date: "2 weeks ago",
                rating: 5,
                title: "Worth every single dollar",
                text: "Fast shipping, luxury unboxing experience, and seamless setup. Nova's customer support also answered my questions in minutes.",
              },
            ].map((rev, i) => (
              <div
                key={i}
                className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl transition hover:border-white/20"
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{rev.name}</span>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                      {rev.badge}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, r) => (
                      <Star key={r} className="h-3.5 w-3.5 fill-amber-400" />
                    ))}
                    <span className="ml-2 text-[11px] text-zinc-500">
                      {rev.date}
                    </span>
                  </div>
                  <h4 className="mt-3 text-sm font-bold text-white">
                    {rev.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                    {rev.text}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2 pt-3 border-t border-white/5 text-[11px] text-zinc-500">
                  <ThumbsUp className="h-3 w-3 text-zinc-400" />
                  <span>Helpful (18)</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            RELATED PRODUCTS SHOWCASE
            ======================================================== */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 border-t border-white/10 pt-12 pb-16">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-violet-400">
                  Recommended For You
                </span>
                <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  More From This Collection
                </h2>
              </div>
              <Link
                href={`/category/${product.category || "smartphones"}`}
                className="text-xs font-semibold text-cyan-400 transition hover:underline"
              >
                View full category →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
