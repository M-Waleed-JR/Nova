import CategoryNav from "@/components/products/CategoryNav";
import ProductDetailView from "@/components/products/ProductDetailView";
import {
  getAllProducts,
  getProductById,
  getProductBySlug,
  getProductsByCategory,
  getFeaturedProducts,
} from "@/lib/data";

export function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product =
    getProductById(id) || getProductBySlug(id) || getAllProducts()[0];

  if (!product) {
    return {
      title: "Product Not Found | NOVA Store",
    };
  }

  return {
    title: `${product.name} | NOVA Store`,
    description:
      product.description ||
      `Explore the ${product.name} at NOVA Store with next-gen performance and aerospace precision.`,
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;

  // Resolve dynamic product
  let product = getProductById(id);
  if (!product) {
    product = getProductBySlug(id);
  }
  if (!product) {
    const all = getAllProducts();
    product =
      all.find((p) => String(p.id) === String(id) || p.slug === id) || all[0];
  }

  // Related products from same category or featured items
  const allCategoryProducts = getProductsByCategory(product.category) || [];
  let related = allCategoryProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  if (related.length < 4) {
    const featured = getFeaturedProducts() || [];
    const fillers = featured.filter(
      (p) => p.id !== product.id && !related.some((r) => r.id === p.id),
    );
    related = [...related, ...fillers].slice(0, 4);
  }

  return (
    <main className="min-h-screen bg-[#030308] text-white">
      <CategoryNav />
      <ProductDetailView product={product} relatedProducts={related} />
    </main>
  );
}
