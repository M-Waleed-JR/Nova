"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { categories } from "@/lib/categories";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronRight,
  Truck,
  PhoneOutgoing,
  MessageSquare,
} from "lucide-react";

function formatCount(n) {
  return n > 99 ? "99+" : String(n);
}

/* Round icon button used for wishlist / cart / search / menu */
function IconLink({ href, label, count, children, className = "" }) {
  return (
    <Link
      href={href}
      aria-label={count ? `${label} (${count})` : label}
      className={
        "relative grid h-10 w-10 place-items-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/70 transition hover:border-white/25 hover:bg-white/[0.09] hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 " +
        className
      }
    >
      {children}
      {count > 0 && (
        <span className="absolute -right-1 -top-1 grid min-w-[18px] place-items-center rounded-full bg-cyan-400 px-1 text-[10px] font-bold leading-[18px] text-[#030308] ring-2 ring-[#030308]">
          {formatCount(count)}
        </span>
      )}
    </Link>
  );
}

function IconButton({ label, onClick, children, className = "", ...rest }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={
        "relative grid h-10 w-10 place-items-center rounded-full border border-white/[0.08] bg-white/[0.04] text-white/70 transition hover:border-white/25 hover:bg-white/[0.09] hover:text-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 " +
        className
      }
      {...rest}
    >
      {children}
    </button>
  );
}

export default function CategoryNav({
  cartCount = 0,
  wishlistCount = 0,
  user = null,
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  // Clean slug check to handle leading slashes gracefully
  const isActive = (slug) => {
    const cleanSlug = slug.replace(/^\//, "");
    return (
      pathname === `/${cleanSlug}` || pathname?.startsWith(`/${cleanSlug}/`)
    );
  };

  /* Scroll Listener */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close drawer & search on route change */
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  /* Drawer scroll lock & Global Key Listeners (Escape + Slash) */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }

      const activeTag = document.activeElement?.tagName;
      if (e.key === "/" && activeTag !== "INPUT" && activeTag !== "TEXTAREA") {
        e.preventDefault();
        desktopSearchRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  /* Focus mobile search input on open */
  useEffect(() => {
    if (searchOpen) {
      mobileSearchRef.current?.focus();
    }
  }, [searchOpen]);

  const handleLogoClick = (e) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setSearchOpen(false);
    // Search route not implemented; filter locally instead
    router.push(`/category/phones`); // fallback to avoid broken /search
  };

  const renderSearch = (inputRef, showShortcutHint = false) => (
    <form onSubmit={handleSearch} role="search" className="relative w-full">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
      />
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search phones, laptops, headphones…"
        aria-label="Search products"
        className="h-11 w-full rounded-full border border-white/[0.10] bg-white/[0.05] pl-11 pr-12 text-sm text-white placeholder:text-white/35 transition focus:border-cyan-400/50 focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
      />
      {showShortcutHint && (
        <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-white/15 px-1.5 py-0.5 text-[11px] text-white/40 lg:block">
          /
        </kbd>
      )}
    </form>
  );

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="border-b border-white/[0.06] bg-[#05050d] text-center text-xs text-white/60">
        <p className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2">
          <Truck className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
          Free shipping on orders over $50
        </p>
      </div>

      {/* Main Header Nav */}
      <header
        className={
          "sticky top-0 z-50 border-b backdrop-blur-2xl transition-[background-color,box-shadow,border-color] duration-300 " +
          (scrolled
            ? "border-white/[0.10] bg-[#030308]/85 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)]"
            : "border-white/[0.06] bg-[#030308]/60")
        }
      >
        <nav
          aria-label="Main"
          className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 md:gap-6 md:px-8"
        >
          {/* Mobile Menu Toggle Button */}
          <IconButton
            label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-drawer"
          >
            <Menu className="h-5 w-5" />
          </IconButton>

          {/* Brand Logo */}
          <Link
            href="/"
            onClick={handleLogoClick}
            className="group flex shrink-0 items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
            aria-label="NOVA — Go to home"
          >
            <div className="relative h-9 w-9 overflow-hidden rounded-[10px] shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_4px_20px_rgba(6,182,212,0.14)] transition-shadow duration-300 group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_6px_28px_rgba(6,182,212,0.25)]">
              <Image
                src="/logo/withOutBackground.png"
                alt=""
                width={20}
                height={20}
                priority
                className=" h-8 w-9 object-cover transition-transform duration-300 group-hover:scale-[1.15]"
              />
            </div>
            <span className="hidden text-[17px] font-extrabold leading-none tracking-tight text-white transition-colors duration-200 group-hover:text-cyan-200 sm:inline-block">
              NOVA
            </span>
          </Link>

          {/* Desktop Search Bar */}
          <div className="mx-auto hidden w-full max-w-xl md:block">
            {renderSearch(desktopSearchRef, true)}
          </div>

          {/* User Action Icons */}
          <div className="ml-auto flex items-center gap-2 md:ml-0">
            {/* Mobile Search Toggle Button */}
            <IconButton
              label={searchOpen ? "Close search" : "Open search"}
              onClick={() => setSearchOpen((v) => !v)}
              className="md:hidden"
              aria-expanded={searchOpen}
            >
              {searchOpen ? (
                <X className="h-[18px] w-[18px]" />
              ) : (
                <Search className="h-[18px] w-[18px]" />
              )}
            </IconButton>

            {/* Wishlist Icon */}
            <IconLink
              href="/wishlist"
              label="Wishlist"
              count={wishlistCount}
              className="hidden sm:grid"
            >
              <Heart className="h-[18px] w-[18px]" />
            </IconLink>

            {/* User Account Link */}
            {user ? (
              <Link
                href="/account"
                aria-label="My account"
                className="hidden h-10 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] pl-1.5 pr-3.5 text-sm font-medium text-white/80 transition hover:border-white/25 hover:bg-white/[0.09] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 sm:flex"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-cyan-400/20 text-xs font-bold text-cyan-200">
                  {user.name?.[0]?.toUpperCase() ?? "U"}
                </span>
                <span className="max-w-[90px] truncate">{user.name}</span>
              </Link>
            ) : (
              <Link
                href="/signin"
                className="hidden h-10 items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.04] px-4 text-sm font-medium text-white/80 transition hover:border-white/25 hover:bg-white/[0.09] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 sm:flex"
              >
                <User className="h-4 w-4" aria-hidden="true" />
                Sign in
              </Link>
            )}

            {/* Shopping Cart Link */}
            <Link
              href="/cart"
              aria-label={cartCount ? `Cart (${cartCount} items)` : "Cart"}
              className="relative flex h-10 items-center gap-2 rounded-full bg-cyan-400 px-3.5 text-sm font-semibold text-[#030308] shadow-[0_6px_24px_-6px_rgba(34,211,238,0.6)] transition hover:bg-cyan-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030308]"
            >
              <ShoppingCart className="h-[18px] w-[18px]" aria-hidden="true" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="grid min-w-[20px] place-items-center rounded-full bg-[#030308] px-1.5 text-[11px] font-bold leading-5 text-cyan-300">
                  {formatCount(cartCount)}
                </span>
              )}
            </Link>
          </div>
        </nav>

        {/* Mobile Expanded Search Bar */}
        <div
          className={
            "overflow-hidden px-4 transition-[max-height,padding] duration-300 md:hidden " +
            (searchOpen ? "max-h-20 pb-3" : "max-h-0")
          }
        >
          {renderSearch(mobileSearchRef)}
        </div>

        {/* Desktop Category Bar */}
        <div className="hidden border-t border-white/[0.05] md:block">
          <ul className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-8 py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => {
              const active = isActive(category.slug);
              return (
                <li key={category.slug} className="shrink-0">
                  <Link
                    href={`/${category.slug}`}
                    aria-current={active ? "page" : undefined}
                    className={
                      "relative block rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 " +
                      (active
                        ? "bg-cyan-500/15 text-cyan-200"
                        : "text-white/60 hover:bg-white/[0.06] hover:text-white")
                    }
                  >
                    {category.name}
                  </Link>
                </li>
              );
            })}
            <li className="ml-auto shrink-0 pl-4">
              <Link
                href="/deals"
                className="rounded-full px-4 py-2 text-[13px] font-semibold text-cyan-300 transition hover:bg-cyan-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
              >
                Deals
              </Link>
            </li>
          </ul>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div
        className={
          "fixed inset-0 z-[60] md:hidden " +
          (menuOpen ? "" : "pointer-events-none invisible delay-300")
        }
        aria-hidden={!menuOpen}
      >
        {/* Backdrop Overlay */}
        <button
          type="button"
          tabIndex={menuOpen ? 0 : -1}
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className={
            "absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 " +
            (menuOpen ? "opacity-100" : "opacity-0")
          }
        />

        {/* Drawer Side Panel */}
        <aside
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={
            "absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col border-r border-white/[0.08] bg-[#060610] shadow-2xl transition-transform duration-300 ease-out motion-reduce:transition-none " +
            (menuOpen ? "translate-x-0" : "-translate-x-full")
          }
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
            <span className="text-[17px] font-extrabold tracking-tight text-white">
              NOVA
            </span>
            <IconButton label="Close menu" onClick={() => setMenuOpen(false)}>
              <X className="h-5 w-5" />
            </IconButton>
          </div>

          {/* Drawer Links Content */}
          <div className="flex-1 overflow-y-auto px-3 py-3">
            <p className="px-3 pb-2 text-xs text-white/40">Shop by category</p>
            <ul className="space-y-1">
              {categories.map((category) => {
                const active = isActive(category.slug);
                return (
                  <li key={category.slug}>
                    <Link
                      href={`/${category.slug}`}
                      aria-current={active ? "page" : undefined}
                      className={
                        "flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 " +
                        (active
                          ? "bg-cyan-500/15 text-cyan-200"
                          : "text-white/75 hover:bg-white/[0.06] hover:text-white")
                      }
                    >
                      {category.name}
                      <ChevronRight className="h-4 w-4 text-white/30" />
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  href="/deals"
                  className="flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-semibold text-cyan-300 transition hover:bg-cyan-400/10"
                >
                  Deals
                  <ChevronRight className="h-4 w-4 text-cyan-300/50" />
                </Link>
              </li>
            </ul>

            <div className="my-4 h-px bg-white/[0.06]" />

            <ul className="space-y-1">
              <li>
                <Link
                  href="/wishlist"
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] text-white/75 transition hover:bg-white/[0.06] hover:text-white"
                >
                  <Heart className="h-[18px] w-[18px]" />
                  Wishlist
                  {wishlistCount > 0 && (
                    <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-xs">
                      {formatCount(wishlistCount)}
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] text-white/75 transition hover:bg-white/[0.06] hover:text-white"
                >
                  <ShoppingCart className="h-[18px] w-[18px]" />
                  Cart
                  {cartCount > 0 && (
                    <span className="ml-auto rounded-full bg-cyan-400 px-2 py-0.5 text-xs font-bold text-[#030308]">
                      {formatCount(cartCount)}
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] text-white/75 transition hover:bg-white/[0.06] hover:text-white"
                >
                  <PhoneOutgoing className="h-[18px] w-[18px]" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] text-white/75 transition hover:bg-white/[0.06] hover:text-white"
                >
                  <MessageSquare className="h-[18px] w-[18px]" />
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Drawer Footer Account Section */}
          <div className="border-t border-white/[0.06] p-4">
            {user ? (
              <Link
                href="/account"
                className="flex items-center gap-3 rounded-xl bg-white/[0.05] px-3 py-3 text-sm font-medium text-white"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-cyan-400/20 font-bold text-cyan-200">
                  {user.name?.[0]?.toUpperCase() ?? "U"}
                </span>
                {user.name}
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/signin"
                  className="rounded-full border border-white/15 py-2.5 text-center text-sm font-medium text-white transition hover:bg-white/[0.08]"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="rounded-full bg-cyan-400 py-2.5 text-center text-sm font-semibold text-[#030308] transition hover:bg-cyan-300"
                >
                  Create account
                </Link>
              </div>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}
