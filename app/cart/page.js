"use client";
import Link from "next/link";
import CategoryNav from "@/components/products/CategoryNav";
import { useMemo } from "react";
import {
  Trash2,
  Plus,
  Minus,
  Package,
  Truck,
  ShieldCheck,
  Clock,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/components/CartContext";

// Shipping feed / delivery progress data
const SHIPPING_STEPS = [
  {
    id: 1,
    label: "Order Confirmed",
    status: "done",
    date: "Sep 28",
    icon: Package,
  },
  {
    id: 2,
    label: "Processed",
    status: "done",
    date: "Sep 29",
    icon: ShieldCheck,
  },
  { id: 3, label: "Shipped", status: "active", date: "Sep 30", icon: Truck },
  { id: 4, label: "Delivered", status: "pending", date: "Oct 2", icon: Clock },
];

export default function CartPage() {
  const { items, remove, updateQty } = useCart();

  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.price * i.qty, 0),
    [items],
  );
  const shipping = subtotal > 500 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <main className="min-h-[100dvh] bg-[#0b0d12] text-white selection:bg-amber-500/30">
      <CategoryNav />

      <section className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        {/* Empty state */}
        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white/[0.03] to-white/[0.06] border border-white/10 flex items-center justify-center mb-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <ShoppingBag
                className="w-10 h-10 text-amber-400/80"
                strokeWidth={1.2}
              />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
              Cart is empty
            </h2>
            <p className="text-white/50 text-base md:text-lg mb-8">
              Explore the latest tech and add something great.
            </p>
            <div className="flex items-center gap-5">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-amber-400 text-[#0b0d12] font-semibold hover:bg-amber-300 transition shadow-[0_0_30px_rgba(251,191,36,0.2)]"
              >
                Continue Shopping <ChevronRight className="w-4 h-4" />
              </Link>

              <Link
                href="/deals"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-amber-400 text-[#0b0d12] font-semibold hover:bg-amber-300 transition shadow-[0_0_30px_rgba(251,191,36,0.2)]"
              >
                Go to Deals <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {items.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16">
            {/* Left: Items */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">
                Items{" "}
                <span className="text-white/30 font-normal ml-2">
                  ({items.length})
                </span>
              </h2>

              <div className="divide-y divide-white/[0.07] border-t border-b border-white/[0.07]">
                {items.map((item) => (
                  <article
                    key={item.id}
                    className="grid grid-cols-[110px_1fr_auto] gap-5 py-6 items-start group hover:bg-white/[0.02] -mx-3 px-3 rounded-2xl transition"
                  >
                    <a
                      href="#"
                      className="relative block overflow-hidden rounded-xl aspect-[4/3] shadow-lg"
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
                        loading="lazy"
                      />
                    </a>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-lg leading-snug mb-1 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-white/50 mb-4">
                        {item.variant}
                      </p>
                      <div className="flex items-center gap-3 text-sm font-medium text-amber-300">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 flex items-center justify-center transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="min-w-[1.5rem] text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 flex items-center justify-center transition"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right min-w-[5rem]">
                      <div className="font-bold text-lg">
                        ${(item.price * item.qty).toLocaleString()}
                      </div>
                      <button
                        onClick={() => remove(item.id)}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-white/30 hover:text-rose-400 transition"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5 " /> Remove
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Right: Summary + Checkout */}
            <aside className="lg:self-start lg:sticky lg:top-24">
              <div className="rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/[0.08] p-7 md:p-9 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                <h2 className="text-xl font-bold tracking-tight mb-6">
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

                <button className="w-full py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-[#0b0d12] font-bold text-base hover:brightness-110 transition shadow-[0_0_40px_rgba(251,191,36,0.25)] active:scale-[0.99]">
                  Proceed to Checkout
                </button>

                <div className="mt-6 flex items-center gap-2 text-xs text-white/40 justify-center">
                  <ShieldCheck className="w-3.5 h-3.5" /> Secure checkout · Free
                  returns within 14 days
                </div>
              </div>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
