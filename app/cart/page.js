"use client";

import Link from "next/link";
import CategoryNav from "@/components/products/CategoryNav";
import { useMemo, useState } from "react";
import {
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  ChevronRight,
  ShoppingBag,
  X,
} from "lucide-react";
import { useCart } from "@/components/CartContext";

// ==========================================
// 1. مكون القائمة الجانبية المنزلقة (Slide Drawer)
// ==========================================
function CartSlideDrawer({ isOpen, onClose, items, remove, subtotal }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* خلفية معتمة بالكامل لحجب محتوى الصفحة خلف القائمة */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* حاوي القائمة: w-full للموبايل لمنع القص من اليسار */}
      <div className="fixed inset-y-0 right-0 z-[101] flex max-w-full">
        <div className="w-screen max-w-full sm:w-[400px] bg-[#0b0d12] text-white border-l border-white/10 flex flex-col shadow-2xl h-full">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#0b0d12] shrink-0">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-base sm:text-lg tracking-wider text-white">
                YOUR CART
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/30">
                {items.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-white/[0.06]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <p className="text-white/50 text-sm">Your cart is empty</p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="pt-3 first:pt-0 flex items-center gap-3"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover bg-white/5 shrink-0 border border-white/10"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-white truncate">
                      {item.name}
                    </h3>
                    <div className="text-amber-400 font-bold text-xs mt-0.5">
                      ${item.price.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-white/50 mt-0.5">
                      Qty: {item.qty}
                    </div>
                  </div>
                  <button
                    onClick={() => remove(item.id)}
                    className="p-2 text-white/30 hover:text-rose-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-4 border-t border-white/10 bg-[#0b0d12] shrink-0 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">Subtotal</span>
                <span className="font-bold text-amber-400 text-base">
                  ${subtotal.toLocaleString()}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-full bg-amber-400 text-[#0b0d12] font-bold text-sm hover:bg-amber-300 transition"
              >
                Close Menu
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. الصفحة الرئيسية (CartPage)
// ==========================================
export default function CartPage() {
  const { items, remove, updateQty } = useCart();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.price * i.qty, 0),
    [items],
  );
  const shipping = subtotal > 500 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <main className="min-h-[100dvh] bg-[#0b0d12] text-white selection:bg-amber-500/30 pb-24 lg:pb-12 overflow-x-hidden">
      <CategoryNav />

      <CartSlideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        items={items}
        remove={remove}
        subtotal={subtotal}
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-16">
        {/* Empty state */}
        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 sm:py-32 text-center px-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-white/[0.03] to-white/[0.06] border border-white/10 flex items-center justify-center mb-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <ShoppingBag
                className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400/80"
                strokeWidth={1.2}
              />
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
              Cart is empty
            </h2>
            <p className="text-white/50 text-sm sm:text-base md:text-lg mb-8 max-w-md">
              Explore the latest tech and add something great.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full sm:w-auto">
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-amber-400 text-[#0b0d12] font-semibold hover:bg-amber-300 transition shadow-[0_0_30px_rgba(251,191,36,0.2)] text-sm sm:text-base"
              >
                Continue Shopping <ChevronRight className="w-4 h-4" />
              </Link>

              <Link
                href="/deals"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-full bg-white/10 text-white font-semibold hover:bg-white/15 transition border border-white/10 text-sm sm:text-base"
              >
                Go to Deals <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {items.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-16 items-start">
            {/* Left Column: Items */}
            <div>
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight flex items-center">
                  Items{" "}
                  <span className="text-white/30 font-normal text-lg sm:text-xl ml-2">
                    ({items.length})
                  </span>
                </h2>
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="text-xs font-semibold text-amber-400 hover:underline sm:hidden"
                >
                  Quick View
                </button>
              </div>

              <div className="divide-y divide-white/[0.07] border-t border-b border-white/[0.07]">
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 py-5 sm:py-6 group hover:bg-white/[0.02] sm:-mx-3 sm:px-3 rounded-2xl transition"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <a
                        href="#"
                        className="relative shrink-0 block overflow-hidden rounded-xl w-20 h-20 sm:w-28 sm:h-24 shadow-lg bg-white/5"
                      >
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
                          loading="lazy"
                        />
                      </a>

                      <div className="min-w-0 flex-1 sm:hidden">
                        <h3 className="font-semibold text-base leading-snug truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-white/50 mb-2">
                          {item.variant}
                        </p>
                        <div className="font-bold text-base text-amber-300">
                          ${(item.price * item.qty).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="min-w-0 flex-1 hidden sm:block">
                      <h3 className="font-semibold text-base sm:text-lg leading-snug mb-1 truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/50 mb-3">
                        {item.variant}
                      </p>
                      <div className="flex items-center gap-3 text-sm font-medium text-amber-300">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 flex items-center justify-center transition active:scale-95"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="min-w-[1.5rem] text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 flex items-center justify-center transition active:scale-95"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex sm:hidden items-center justify-between w-full pt-2 border-t border-white/[0.05]">
                      <div className="flex items-center gap-3 text-sm font-medium text-amber-300">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 flex items-center justify-center transition active:scale-95"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="min-w-[1.5rem] text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 flex items-center justify-center transition active:scale-95"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => remove(item.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-400/80 hover:text-rose-400 transition py-1 px-2.5 rounded-lg bg-rose-500/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>

                    <div className="hidden sm:block text-right min-w-[5rem]">
                      <div className="font-bold text-lg">
                        ${(item.price * item.qty).toLocaleString()}
                      </div>
                      <button
                        onClick={() => remove(item.id)}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-white/30 hover:text-rose-400 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* اليمين: ملخص الطلب */}
            <aside className="lg:self-start lg:sticky lg:top-24">
              <div className="rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/[0.08] p-6 sm:p-7 md:p-9 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                <h2 className="text-lg sm:text-xl font-bold tracking-tight mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm mb-5">
                  <div className="flex justify-between text-white/70">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-emerald-300 font-medium">
                          Free
                        </span>
                      ) : (
                        `$${shipping}`
                      )}
                    </span>
                  </div>
                  <div className="h-px bg-white/[0.07]" />
                  <div className="flex justify-between text-base font-bold">
                    <span>Total</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                </div>

                <button className="w-full py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-[#0b0d12] font-bold text-sm sm:text-base hover:brightness-110 transition shadow-[0_0_40px_rgba(251,191,36,0.25)] active:scale-[0.99]">
                  Proceed to Checkout
                </button>

                <div className="mt-5 sm:mt-6 flex items-center gap-2 text-xs text-white/40 justify-center text-center">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Secure checkout · Free returns within 14 days</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </section>

      {/* الشريط السفلي للموبايل */}
      {items.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-[#0b0d12]/95 backdrop-blur-xl border-t border-white/10 z-40 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs text-white/50">Total</div>
            <div className="text-lg font-bold text-amber-400">
              ${total.toLocaleString()}
            </div>
          </div>
          <button className="flex-1 py-3 px-6 rounded-full bg-amber-400 text-[#0b0d12] font-bold text-sm hover:bg-amber-300 transition shadow-[0_0_20px_rgba(251,191,36,0.25)] active:scale-[0.98]">
            Proceed to Checkout
          </button>
        </div>
      )}
    </main>
  );
}
