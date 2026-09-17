import { getProductsByCategory } from "@/lib/data";
import CategoryNav from "@/components/products/CategoryNav";
import ProductCard from "@/components/products/ProductCard";

export default async function ProductsPage({ params }) {
  const { category } = await params;
  const products = await getProductsByCategory(category);

  // Capitalize display category title
  const formattedCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ")
    : "Products";

  return (
    <main className="min-h-screen bg-[#030308] text-white">
      <CategoryNav />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">
              Collection
            </span>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {formattedCategory}
            </h1>
          </div>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70">
            {products?.length || 0} Products
          </span>
        </div>

        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 p-12 text-center">
            <p className="text-base text-white/60">No products found in this category.</p>
          </div>
        )}
      </section>
    </main>
  );
}

