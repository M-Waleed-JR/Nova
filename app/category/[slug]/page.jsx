import Link from "next/link";
import { getProductsByCategory } from "@/lib/data";
import { categories } from "@/lib/categories";
import CategoryNav from "@/components/products/CategoryNav";
import ProductCard from "@/components/products/ProductCard";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return categories.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const currentCategory = categories.find(({ slug: s }) => s === slug);
  if (!currentCategory) return {};

  return {
    title: `${currentCategory.name} | NOVA Store`,
    description: `Explore our collection of ${currentCategory.name.toLowerCase()} at NOVA Store.`,
  };
}

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const { sort = "featured", brand: selectedBrand = "all" } =
    (await searchParams) || {};

  const currentCategory = categories.find(({ slug: s }) => s === slug);
  if (!currentCategory) notFound();

  let products = getProductsByCategory(slug) || [];

  // Extract brands dynamically from products
  const availableBrands = Array.from(
    new Set(products.map((p) => p.brand).filter(Boolean)),
  );

  // Apply Brand Filter
  if (selectedBrand !== "all") {
    products = products.filter(
      (p) => p.brand?.toLowerCase() === selectedBrand.toLowerCase(),
    );
  }

  // Apply Sorting
  products = [...products].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <main className="min-h-screen bg-[#030308] text-white">
      <CategoryNav />

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-4 flex items-center gap-2 text-xs font-medium text-zinc-400">
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-400">Categories</span>
          <span className="text-zinc-600">/</span>
          <span className="font-semibold text-white">
            {currentCategory.name}
          </span>
        </nav>

        {/* Dynamic Category Hero Banner */}
        <div className="relative mb-8 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-10 shadow-2xl">
          {/* Background Image from categories.js (img property) */}
          {currentCategory.img && (
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
              style={{ backgroundImage: `url(${currentCategory.img})` }}
            />
          )}

          {/* Dark Overlay Mask for Pure Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030308] via-[#030308]/90 to-transparent sm:w-3/4" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030308] via-transparent to-transparent" />

          {/* Banner Text Content */}
          <div className="relative z-10 max-w-xl">
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              {currentCategory.name}
            </h1>

            <p className="mt-5 text-sm text-zinc-300 leading-relaxed">
              Explore our top-rated selection of{" "}
              {currentCategory.name.toLowerCase()} with official warranty and
              instant shipping.
            </p>
          </div>
        </div>

        {/* Filter & Sort Bar */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-3.5 backdrop-blur-md sm:flex-row sm:items-center">
          {/* Brand Filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-2 text-xs font-medium text-zinc-500">
              Brand:
            </span>
            <Link
              href={`/category/${slug}?sort=${sort}&brand=all`}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                selectedBrand === "all"
                  ? "bg-violet-600 text-white shadow-md shadow-violet-600/20"
                  : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
              }`}
            >
              All
            </Link>
            {availableBrands.map((b) => {
              const isActive = selectedBrand.toLowerCase() === b.toLowerCase();
              return (
                <Link
                  key={b}
                  href={`/category/${slug}?sort=${sort}&brand=${encodeURIComponent(b)}`}
                  className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                    isActive
                      ? "bg-violet-600 text-white shadow-md shadow-violet-600/20"
                      : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                  }`}
                >
                  {b}
                </Link>
              );
            })}
          </div>

          {/* Sort Menu */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs font-medium text-zinc-500">Sort:</span>
            <div className="flex flex-wrap gap-1 rounded-lg border border-zinc-800 bg-zinc-950 p-1">
              {[
                { label: "Featured", value: "featured" },
                { label: "Price: Low to High", value: "price-asc" },
                { label: "Price: High to Low", value: "price-desc" },
                { label: "Top Rated", value: "rating" },
              ].map((item) => (
                <Link
                  key={item.value}
                  href={`/category/${slug}?sort=${item.value}&brand=${selectedBrand}`}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                    sort === item.value
                      ? "bg-zinc-800 text-white font-semibold"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/40 p-12 text-center">
            <p className="text-sm text-zinc-400">
              No products match your selected filter.
            </p>
            <Link
              href={`/category/${slug}`}
              className="mt-4 rounded-lg bg-violet-600 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-violet-500"
            >
              Reset Filters
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
