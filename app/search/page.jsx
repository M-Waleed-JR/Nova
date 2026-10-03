import Link from "next/link";
import { getAllProducts } from "@/lib/data";
import ProductCard from "@/components/products/ProductCard";
import CategoryNav from "@/components/products/CategoryNav";

export default async function SearchPage({ searchParams }) {
  const params = await searchParams || {};
  const q = (params.q || "").toString().trim();

  let products = getAllProducts();

  if (q) {
    const term = q.toLowerCase();
    products = products.filter((p) => {
      const text = [
        p.name,
        p.brand,
        p.description,
        p.category,
        ...(p.specs ? Object.values(p.specs) : []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return text.includes(term);
    });
  }

  return (
    <main className="min-h-screen bg-[#030308] text-white">
      <CategoryNav />
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <nav className="mb-4 flex items-center gap-2 text-xs font-medium text-zinc-400">
          <Link href="/" className="transition-colors hover:text-white">Home</Link>
          <span className="text-zinc-600">/</span>
          <span className="font-semibold text-white">Search</span>
        </nav>

        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
          {q ? `Search: "${q}"` : "Search"}
        </h1>
        <p className="mt-3 text-sm text-zinc-400">
          {q ? `${products.length} result${products.length !== 1 ? "s" : ""} found.` : "Enter a term above to find products."}
        </p>

        <div className="mt-6 mb-8 flex items-center gap-2">
          <Link
            href="/"
            className="rounded-lg bg-violet-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-violet-500"
          >
            Back to Home
          </Link>
          {q && (
            <Link
              href="/search"
              className="rounded-lg border border-zinc-800 px-4 py-2 text-xs font-medium text-zinc-300 transition hover:bg-zinc-900"
            >
              Clear search
            </Link>
          )}
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/40 p-12 text-center">
            <p className="text-sm text-zinc-400">
              {q ? `No products match "${q}".` : "Start typing in the search bar."}
            </p>
            {q && (
              <Link
                href="/search"
                className="mt-4 rounded-lg bg-violet-600 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-violet-500"
              >
                Clear search
              </Link>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
