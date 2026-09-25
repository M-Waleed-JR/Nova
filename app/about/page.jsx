import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import CategoryNav from "@/components/products/CategoryNav";
import { categories } from "@/lib/categories";

export const metadata = {
  title: "About Nova | Premium Tech & Electronics",
  description:
    "Nova offers curated premium smartphones, laptops, and audio devices, backed by an industry-leading two-year warranty.",
};

// --- DATA CONFIG & REFINED COPY ---
const ABOUT_HERO = {
  eyebrow: "About Nova",
  title: "Curated tech. Elevated standards.",
  body: "Nova brings together flagship smartphones, high-performance laptops, and premium audio devices—delivering uncompromising build quality and a full two-year warranty on every order.",
  img: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=1120&auto=format&fit=crop",
  alt: "Curated modern personal devices and electronics on a dark surface",
  cta: { label: "Explore Collection", href: "/#products" },
};

const ABOUT_STATS = [
  { value: "8", label: "Product Categories" },
  { value: "2 Years", label: "Comprehensive Warranty" },
  { value: "30 Days", label: "Hassle-Free Returns" },
  { value: "100%", label: "Verified Performance" },
];

const ABOUT_MANIFESTO = {
  title: "We don't list everything. Only the extraordinary.",
  body: "Every product in our collection undergoes rigorous evaluation for performance, thermal efficiency, and long-term reliability before joining our catalog. If a device falls short of real-world performance or durability, it doesn't make the cut. Our commitment is simple: quality over clutter.",
  img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1120&auto=format&fit=crop",
  alt: "Laptop open on a sleek dark desk setup",
};

const ABOUT_VALUES = [
  {
    kind: "image",
    title: "Engineered for Longevity",
    body: "We prioritize hardware that lasts. From battery health management to repairability standards, we curate tech designed to maintain peak performance over time.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1120&auto=format&fit=crop",
    alt: "Precision circuit motherboard hardware on dark background",
  },
  {
    kind: "text",
    title: "Verified Specifications",
    body: "No marketing fluff. Real-world battery tests, true screen brightness ratings, and tested benchmarks—verified so you get exactly what you expect.",
  },
  {
    kind: "text",
    title: "Direct Specialist Support",
    body: "No automated loops. Access dedicated tech specialists who understand the hardware and provide swift solutions to keep you moving.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#030308] text-white">
      <CategoryNav />

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden border-b border-white/6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_8%_88%,rgba(6,214,160,0.08),transparent_28%)]"
        />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
              {ABOUT_HERO.eyebrow}
            </p>
            <h1 className="mt-4 text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {ABOUT_HERO.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              {ABOUT_HERO.body}
            </p>
            <div className="mt-8">
              <Link
                href={ABOUT_HERO.cta.href}
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-[#030308] transition hover:bg-cyan-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                {ABOUT_HERO.cta.label}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/2">
            <div className="relative aspect-4/3 sm:aspect-16/10">
              <Image
                src={ABOUT_HERO.img}
                alt={ABOUT_HERO.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section aria-label="Nova stats" className="border-b border-white/6">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
          {ABOUT_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <dt className="order-2 mt-1.5 text-xs text-white/50 sm:text-sm">
                {stat.label}
              </dt>
              <dd className="order-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Manifesto Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/2">
            <div className="relative aspect-4/3 sm:aspect-16/10">
              <Image
                src={ABOUT_MANIFESTO.img}
                alt={ABOUT_MANIFESTO.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <h2 className="text-balance text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
              {ABOUT_MANIFESTO.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              {ABOUT_MANIFESTO.body}
            </p>
          </div>
        </div>
      </section>

      {/* Values Bento Grid */}
      <section className="border-t border-white/6 bg-white/1">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Our Core Standards
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <article className="flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/2 md:col-span-2 sm:flex-row">
              <div className="relative aspect-4/3 min-h-55 sm:aspect-auto sm:w-1/2">
                <Image
                  src={ABOUT_VALUES[0].img}
                  alt={ABOUT_VALUES[0].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 35vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
                <span className="mb-3 inline-flex w-fit items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                  Sustainability
                </span>
                <h3 className="text-lg font-bold tracking-tight sm:text-xl">
                  {ABOUT_VALUES[0].title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {ABOUT_VALUES[0].body}
                </p>
              </div>
            </article>

            <div className="flex flex-col gap-6">
              <article className="flex flex-1 flex-col justify-center rounded-2xl border border-white/8 bg-white/2 p-6">
                <span className="mb-3 inline-flex w-fit items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                  Transparency
                </span>
                <h3 className="text-lg font-bold tracking-tight">
                  {ABOUT_VALUES[1].title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {ABOUT_VALUES[1].body}
                </p>
              </article>

              <article className="flex flex-1 flex-col justify-center rounded-2xl border border-white/8 bg-white/2 p-6">
                <span className="mb-3 inline-flex w-fit items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                  Dedicated Support
                </span>
                <h3 className="text-lg font-bold tracking-tight">
                  {ABOUT_VALUES[2].title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {ABOUT_VALUES[2].body}
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid (Displays all 8 categories) */}
      <section className="border-t border-white/6">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Explore Categories
          </h2>

          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/category/${category.slug}`}
                  className="group relative block overflow-hidden rounded-2xl border border-white/8 transition hover:border-cyan-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                >
                  <span className="relative block aspect-4/5">
                    <Image
                      src={category.img}
                      alt={category.name}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-linear-to-t from-[#030308] via-[#030308]/30 to-transparent"
                    />
                  </span>

                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-4">
                    <span className="text-sm font-semibold">
                      {category.name}
                    </span>
                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-cyan-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-white/6">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
          <h2 className="text-balance text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            Upgrade with confidence.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base">
            Every product comes with our full two-year warranty and a 30-day
            return window, giving you complete peace of mind.
          </p>
          <div className="mt-8">
            <Link
              href="/#products"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#030308] transition hover:bg-white/90 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Shop the Store
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
