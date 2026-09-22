import HeroSlider from "@/components/hero/HeroSlider";
import CategoryNav from "@/components/products/CategoryNav";
import ProductCard from "@/components/products/ProductCard";
import { getFeaturedProducts } from "@/lib/data";

export default function Home() {
  const featured = getFeaturedProducts();

  return (
    <main>
      <HeroSlider />
      <div id="products" className="bg-[#030308] text-white">
        <CategoryNav />
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">
                Featured
              </span>
              <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Store picks
              </h2>
            </div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70">
              {featured.length} Products
            </span>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
