import Link from "next/link";
import { ArrowUpRight, Boxes, ShieldCheck, Wrench } from "lucide-react";

import CategoryNav from "@/components/products/CategoryNav";
import { categories } from "@/lib/categories";
import { getAllProducts } from "@/lib/data";

export const metadata = {
  title: "Partnerships | NOVA Store",
  description:
    "Discover the trusted technology brands available at NOVA Store, including Apple, Samsung, Sony, Anker and more.",
};

// --- DATA CONFIG WITH DOMAINS FOR 100% RELIABLE LOGOS ---
const PARTNER_BRANDS = [
  { name: "Apple", tier: "Flagship", domain: "apple.com" },
  { name: "Samsung", tier: "Flagship", domain: "samsung.com" },
  { name: "Anker", tier: "Power", domain: "anker.com" },
  { name: "Sony", tier: "Entertainment", domain: "sony.com" },
  { name: "Bose", tier: "Audio", domain: "bose.com" },
  { name: "Microsoft", tier: "Computing", domain: "microsoft.com" },
  { name: "Google", tier: "Smartphones", domain: "google.com" },
  { name: "ASUS", tier: "Computing", aliases: ["Asus"], domain: "asus.com" },
  { name: "Canon", tier: "Imaging", domain: "canon.com" },
  { name: "Fujifilm", tier: "Imaging", domain: "fujifilm.com" },
  { name: "GoPro", tier: "Action", domain: "gopro.com" },
  { name: "Garmin", tier: "Wearables", domain: "garmin.com" },
  { name: "Nintendo", tier: "Gaming", domain: "nintendo.com" },
  { name: "Lenovo", tier: "Computing", domain: "lenovo.com" },
  { name: "Sennheiser", tier: "Audio", domain: "sennheiser.com" },
  { name: "Belkin", tier: "Accessories", domain: "belkin.com" },
];

const PARTNERS_PILLARS = [
  {
    title: "Curated catalog",
    body: "We keep the line-up focused, so every brand has a clear place in the store instead of getting lost in a crowded marketplace.",
  },
  {
    title: "Clear product details",
    body: "Stock status, specifications and delivery information live on each product page, where they are useful to your decision.",
  },
  {
    title: "Support after checkout",
    body: "Every order comes with the same support, returns and warranty terms — whether you buy a cable or a flagship device.",
  },
];

const PILLAR_ICONS = [Boxes, ShieldCheck, Wrench];

// --- HELPER FUNCTIONS ---
const categorySlug = (category) =>
  category === "mobile-accessories" ? "accessories" : category;

const categoryName = (slug) =>
  categories.find((category) => category.slug === categorySlug(slug))?.name ||
  slug;

const getBrandProducts = (products, partner) => {
  const names = [partner.name, ...(partner.aliases || [])].map((name) =>
    name.toLowerCase(),
  );

  return products.filter((product) =>
    names.includes(product.brand?.toLowerCase()),
  );
};

export default function PartnershipsPage() {
  const products = getAllProducts();

  const partners = PARTNER_BRANDS.map((partner) => {
    const brandProducts = getBrandProducts(products, partner);
    const productCategories = [
      ...new Set(brandProducts.map((product) => product.category)),
    ];

    return {
      ...partner,
      count: brandProducts.length,
      categories: productCategories.map((category) => ({
        label: categoryName(category),
        href: `/category/${categorySlug(category)}?brand=${encodeURIComponent(partner.name)}`,
      })),
    };
  }).filter((partner) => partner.count > 0);

  const coveredCategories = new Set(
    partners.flatMap((partner) => partner.categories.map((c) => c.label)),
  ).size;

  const PARTNER_STATS = [
    { value: partners.length, label: "Brands stocked" },
    { value: coveredCategories, label: "Categories covered" },
    { value: "2 yr", label: "Warranty on every device" },
    { value: "$50", label: "Free shipping threshold" },
  ];

  return (
    <main className="min-h-screen bg-[#030308] text-white">
      <CategoryNav />

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden border-b border-white/6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.12),transparent_32%),radial-gradient(circle_at_10%_90%,rgba(6,214,160,0.07),transparent_30%)]"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
            Partnerships
          </p>
          <h1 className="mt-4 max-w-3xl text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            The brands that make the cut.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">
            We keep the catalog focused on technology from brands people know
            and return to. Explore the lines we currently stock across phones,
            computers, audio, gaming and accessories.
          </p>

          <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-white/8 pt-8 lg:grid-cols-4">
            {PARTNER_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="order-2 mt-1.5 text-xs text-white/50 sm:text-sm">
                  {stat.label}
                </dt>
                <dd className="order-1 text-2xl font-bold tracking-tight sm:text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Brands in the store
          </h2>
          <p className="text-sm text-white/50">
            Browse each line by the categories it appears in.
          </p>
        </div>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <li key={partner.name}>
              <article className="group flex h-full flex-col rounded-2xl border border-white/8 bg-white/2 p-6 transition duration-300 hover:border-cyan-400/40 hover:bg-white/[0.04]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    {/* Reliable Brand Logo Container */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 transition duration-300 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10">
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${partner.domain}&sz=128`}
                        alt={`${partner.name} logo`}
                        className="h-6 w-6 object-contain rounded-md transition duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">
                      {partner.name}
                    </h3>
                  </div>

                  <span className="shrink-0 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-semibold text-cyan-300">
                    {partner.tier}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  {partner.count} {partner.count === 1 ? "product" : "products"}{" "}
                  currently available in the Nova catalog.
                </p>

                <ul className="mt-5 flex flex-1 flex-wrap content-start gap-1.5">
                  {partner.categories.map((category) => (
                    <li key={category.label}>
                      <Link
                        href={category.href}
                        className="inline-flex items-center rounded-full border border-white/8 bg-white/2 px-2.5 py-1 text-[11px] text-white/60 transition hover:border-cyan-400/40 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                      >
                        {category.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex justify-end border-t border-white/8 pt-4 text-xs">
                  <Link
                    href={partner.categories[0]?.href || "#"}
                    className="inline-flex items-center gap-1 font-semibold text-cyan-300 transition hover:gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  >
                    Shop {partner.name}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      {/* Pillars Section */}
      <section className="border-y border-white/6 bg-white/1">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Why we keep the list focused
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {PARTNERS_PILLARS.map((pillar, index) => {
              const Icon = PILLAR_ICONS[index] ?? Boxes;

              return (
                <article
                  key={pillar.title}
                  className="rounded-2xl border border-white/8 bg-white/2 p-6"
                >
                  <Icon className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-bold tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {pillar.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,211,238,0.14),transparent_55%)]"
        />

        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
          <h2 className="text-balance text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            Find the device that fits your setup.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base">
            Compare products by category, then choose the brand and specs that
            matter most to you.
          </p>
          <div className="mt-8">
            <Link
              href="/#products"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-[#030308] transition hover:bg-cyan-300 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              Shop the store
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
