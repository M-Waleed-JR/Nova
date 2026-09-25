"use client";

import Link from "next/link";
import {
  FaXTwitter,
  FaInstagram,
  FaFacebook,
  FaCcVisa,
  FaCcMastercard,
  FaCcApplePay,
  FaCcPaypal,
} from "react-icons/fa6";

const CATEGORIES = [
  { label: "Smartphones", href: "/category/smartphones" },
  { label: "Laptops", href: "/category/laptops" },
  { label: "Tablets", href: "/category/tablets" },
  { label: "Audio Gear", href: "/category/audio" },
  { label: "Accessories", href: "/category/accessories" },
];

const HELP_LINKS = [
  { label: "Partnerships", href: "/partnerships" },
  { label: "Shipping Policy", href: "/shipping" },
  { label: "Returns & Refund", href: "/returns" },
  { label: "Support Chat", href: "/contact" },
];

const SOCIAL_LINKS = [
  { name: "Facebook", href: "https://facebook.com", Icon: FaFacebook },
  { name: "Instagram", href: "https://instagram.com", Icon: FaInstagram },
  { name: "X", href: "https://x.com", Icon: FaXTwitter },
];

/* Payment Methods*/
const PAYMENTS = [
  { name: "Visa", Icon: FaCcVisa, color: "#1434CB" },
  { name: "Mastercard", Icon: FaCcMastercard, color: "#EB001B" },
  { name: "Apple Pay", Icon: FaCcApplePay, color: "#000000" },
  { name: "PayPal", Icon: FaCcPaypal, color: "#003087" },
];

export default function Footer() {
  return (
    <footer className="bg-[#080b11] text-neutral-400 text-sm border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Grid: Clean & Spaced Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          {/* Col 1: Brand & Social */}
          <div className="lg:col-span-2 space-y-3">
            <Link
              href="/"
              className="inline-block text-2xl font-black text-white tracking-wider"
            >
              NOVA<span className="text-cyan-400">.</span>
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Your modern online store for high-performance devices, premium
              audio, and electronics.
            </p>

            <div className="flex items-center gap-2 pt-3">
              {SOCIAL_LINKS.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-cyan-400 hover:border-cyan-400/40 transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Products */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Products
            </h4>
            <ul className="space-y-2.5 text-xs">
              {CATEGORIES.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-cyan-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Other */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Others
            </h4>
            <ul className="space-y-2.5 text-xs">
              {HELP_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-cyan-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <Link href="/about" className="hover:text-cyan-300">
                  About Nova
                </Link>
              </li>
              <li>Cairo, Egypt</li>
              <li>
                <a
                  href="mailto:support@novastore.com"
                  className="hover:text-cyan-300 transition-colors"
                >
                  support@novastore.com
                </a>
              </li>
              <li>+20 100 000 0000</li>
            </ul>
          </div>
        </div>

        {/* Payment Methods Row */}
        <div className="py-8 border-t border-white/5 flex flex-col items-center justify-center gap-3 text-center">
          <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-300">
            <span>We Accept All Payment Methods</span>
          </div>

          <ul className="flex items-center justify-center gap-2.5 flex-wrap">
            {PAYMENTS.map(({ name, Icon, color }) => (
              <li
                key={name}
                title={name}
                className="px-3 py-1.5 rounded-md bg-white shadow-sm flex items-center justify-center hover:scale-105 transition-transform"
              >
                <Icon className="w-7 h-7" style={{ color }} />
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} NOVA Store. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="hover:text-neutral-300 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="hover:text-neutral-300 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
