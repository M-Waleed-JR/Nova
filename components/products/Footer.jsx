"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaCcVisa,
  FaCcMastercard,
  FaCcApplePay,
  FaCcPaypal,
} from "react-icons/fa6";

/* Footer data */

const TRUST = [
  {
    title: "Free shipping",
    text: "On orders over $99",
    icon: (
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7zM7 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm11 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    ),
  },
  {
    title: "2-year warranty",
    text: "On every device",
    icon: (
      <path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6l8-3zm-3 9l2 2 4-4" />
    ),
  },
  {
    title: "30-day returns",
    text: "Free and hassle-free",
    icon: <path d="M4 12a8 8 0 108-8H7m0 0l3-3M7 4l3 3" />,
  },
  {
    title: "Secure payment",
    text: "Encrypted checkout",
    icon: <path d="M6 11V8a6 6 0 0112 0v3M5 11h14v10H5zM12 15v2" />,
  },
];

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "Phones", href: "/category/phones" },
      { label: "Laptops", href: "/category/laptops" },
      { label: "Tablets", href: "/category/tablets" },
      { label: "Audio", href: "/category/audio" },
      { label: "Accessories", href: "/category/accessories" },
      { label: "New arrivals", href: "/new" },
      { label: "Deals", href: "/deals", badge: "Sale" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Track your order", href: "/track-order" },
      { label: "Shipping & returns", href: "/shipping-returns" },
      { label: "Warranty", href: "/warranty" },
      { label: "Repairs", href: "/repairs" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact us", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Nova", href: "/about" },
      { label: "Design philosophy", href: "/design" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Careers", href: "/careers" },
      { label: "Press kit", href: "/press" },
    ],
  },
];

// Replace these with your own Nova profile URLs when you create the accounts
const SOCIALS = [
  { name: "X (Twitter)", href: "https://x.com", Icon: FaXTwitter },
  { name: "Instagram", href: "https://www.instagram.com", Icon: FaInstagram },
  { name: "YouTube", href: "https://www.youtube.com", Icon: FaYoutube },
  { name: "LinkedIn", href: "https://www.linkedin.com", Icon: FaLinkedinIn },
];

const PAYMENTS = [
  { name: "Visa", Icon: FaCcVisa, color: "#1434CB" },
  { name: "Mastercard", Icon: FaCcMastercard, color: "#EB001B" },
  { name: "Apple Pay", Icon: FaCcApplePay, color: "#000000" },
  { name: "PayPal", Icon: FaCcPaypal, color: "#003087" },
  { name: "Cash on delivery", cod: true },
];

const LEGAL = [
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
  { label: "Cookies", href: "/cookies" },
  { label: "Accessibility", href: "/accessibility" },
];

/* Small pieces */

function Icon({ children, className = "w-5 h-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      // Replace with your real endpoint, e.g. /api/newsletter
      await new Promise((r) => setTimeout(r, 600));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="w-full lg:max-w-md">
      <h3 className="text-base font-semibold text-white">
        Get early access to drops
      </h3>
      <p className="mt-1.5 text-sm text-neutral-400">
        New launches and member-only deals. One email a week, unsubscribe
        anytime.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-4 flex items-stretch gap-1 bg-white/[0.04] border border-white/[0.10] rounded-xl p-1 transition-all focus-within:border-cyan-400/60 focus-within:ring-4 focus-within:ring-cyan-400/10"
      >
        <label htmlFor="footer-email" className="sr-only">
          Email address
        </label>
        <input
          id="footer-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          /* inline style beats any global input:focus rule (the white box) */
          style={{ outline: "none", boxShadow: "none", border: "none" }}
          className="flex-1 min-w-0 bg-transparent text-sm text-white placeholder-neutral-500 px-4 py-3 rounded-lg"
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="shrink-0 text-sm font-semibold text-neutral-950 bg-cyan-400 hover:bg-cyan-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed rounded-lg px-6 transition-all whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        >
          {status === "loading"
            ? "Joining…"
            : status === "success"
              ? "Subscribed"
              : "Subscribe"}
        </button>
      </form>

      <p role="status" aria-live="polite" className="mt-2 h-4 text-xs">
        {status === "success" && (
          <span className="text-cyan-300">
            You&apos;re in. Check your inbox to confirm.
          </span>
        )}
        {status === "error" && (
          <span className="text-red-400">
            Something went wrong. Please try again.
          </span>
        )}
      </p>
    </div>
  );
}

/* ---------- Footer ---------- */

export default function Footer() {
  return (
    <footer className="relative bg-[#030308] text-neutral-300 border-t border-white/[0.06]">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      {/* Trust bar */}
      <div className="border-b border-white/[0.06]">
        <ul className="max-w-7xl mx-auto px-6 md:px-12 py-8 grid grid-cols-2 lg:grid-cols-4 gap-y-6 lg:divide-x lg:divide-white/[0.06]">
          {TRUST.map((t) => (
            <li
              key={t.title}
              className="flex items-center justify-center gap-3 px-4"
            >
              <span className="shrink-0 grid place-items-center w-10 h-10 rounded-full bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20">
                <Icon>{t.icon}</Icon>
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{t.title}</p>
                <p className="text-xs text-neutral-500">{t.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-14 pb-8">
        {/* Brand + newsletter */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 pb-12 border-b border-white/[0.06]">
          <div className="max-w-sm space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                NOVA
              </span>
              <span className="w-[5px] h-[5px] rounded-full bg-cyan-400/70 group-hover:bg-cyan-300 transition-colors" />
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Premium electronics with next-level design. Built for those who
              expect more.
            </p>

            <address className="not-italic text-sm text-neutral-400 space-y-1.5">
              <a
                href="mailto:support@nova.com"
                className="block hover:text-cyan-300 transition-colors"
              >
                support@nova.com
              </a>
              <a
                href="tel:+10000000000"
                className="block hover:text-cyan-300 transition-colors"
              >
                +1 (000) 000-0000
              </a>
              <span className="block text-neutral-500">
                Support: every day, 9 AM to 9 PM
              </span>
            </address>
          </div>

          <Newsletter />
        </div>

        {/* Link columns */}
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 py-12"
        >
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="inline-flex items-center gap-2 text-neutral-400 hover:text-cyan-300 transition-colors"
                    >
                      {l.label}
                      {l.badge && (
                        <span className="rounded-full bg-cyan-400/15 text-cyan-300 text-[10px] font-semibold px-1.5 py-0.5">
                          {l.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Follow + payments */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-sm font-semibold text-white mb-4">
              Follow Nova
            </h4>
            <ul className="flex items-center gap-2">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    title={s.name}
                    className="grid place-items-center w-9 h-9 rounded-lg border border-white/[0.08] text-neutral-400 hover:text-cyan-300 hover:border-cyan-400/40 hover:bg-cyan-400/5 transition-colors"
                  >
                    <s.Icon className="w-[16px] h-[16px]" />
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="text-sm font-semibold text-white mt-8 mb-3">
              We accept
            </h4>
            <ul className="flex flex-wrap gap-2">
              {PAYMENTS.map((p) => (
                <li
                  key={p.name}
                  title={p.name}
                  className="flex items-center justify-center h-9 px-2 rounded-md bg-white shadow-sm"
                >
                  {p.cod ? (
                    <span className="flex items-center gap-1.5 px-1 text-[11px] font-semibold text-neutral-800">
                      <Icon className="w-4 h-4">
                        <path d="M3 7h18v10H3zM12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM6 10v4M18 10v4" />
                      </Icon>
                      Cash on delivery
                    </span>
                  ) : (
                    <p.Icon
                      className="w-8 h-8"
                      style={{ color: p.color }}
                      aria-label={p.name}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/[0.06] pt-6">
          <p className="text-xs text-neutral-500">
            © 2026 Nova. All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs">
            {LEGAL.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  className="text-neutral-500 hover:text-cyan-300 transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-cyan-300 transition-colors"
          >
            Back to top
            <Icon className="w-3.5 h-3.5">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </Icon>
          </button>
        </div>
      </div>
    </footer>
  );
}
