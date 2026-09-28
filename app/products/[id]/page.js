import CategoryNav from "@/components/products/CategoryNav";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const SinglePage = () => {
  return (
    <>
      <CategoryNav />
      <div className="min-h-screen text-white px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* زر العودة للمنتجات */}
        <div className="mb-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </Link>
        </div>

        {/* container*/}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 bg-[#080810]/80 p-6 sm:p-8 lg:p-12 rounded-3xl border border-white/10 shadow-2xl">
          {/* image section*/}
          <div className="w-full lg:w-1/2 flex justify-center items-center relative">
            <img
              src="https://api.mobilaty.com/storage/uploads/1-1758807550.png"
              alt="iPhone 17 Pro Max"
              className="w-full max-w-md lg:max-w-full h-auto object-contain rounded-2xl md:rounded-3xl shadow-lg"
            />
          </div>

          {/* details section*/}
          <div className="w-full lg:w-1/2 flex flex-col justify-between gap-6">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                iPhone 17 Pro Max
              </h1>

              <p className="text-sm sm:text-base text-[#B7B7B7] leading-relaxed">
                The iPhone 17 Pro Max features a titanium design, a powerful A17
                Pro chip, and an advanced camera system that lets you capture
                stunning photos and videos in any lighting condition. With its
                large display and long-lasting battery, you can enjoy your
                favorite apps, games, and entertainment all day long.
              </p>

              <div className="text-2xl sm:text-3xl font-bold text-white">
                Price: <span className="text-green-400">$1,299</span>
              </div>
            </div>

            {/* action buttons */}
            <div className="mt-6 sm:mt-10 lg:mt-16 flex flex-row justify-between">
              <button className="bg">
                <span>Choose a Quantity</span>
              </button>
              <button className="">
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePage;

// import CategoryNav from "@/components/products/CategoryNav";
// import ProductDetailView from "@/components/products/ProductDetailView";
// import {
//   getAllProducts,
//   getProductById,
//   getProductBySlug,
//   getProductsByCategory,
//   getFeaturedProducts,
// } from "@/lib/data";

// export function generateStaticParams() {
//   const products = getAllProducts();
//   return products.map((p) => ({ id: String(p.id) }));
// }

// export async function generateMetadata({ params }) {
//   const { id } = await params;
//   const product =
//     getProductById(id) || getProductBySlug(id) || getAllProducts()[0];

//   if (!product) {
//     return {
//       title: "Product Not Found | NOVA Store",
//     };
//   }

//   return {
//     title: `${product.name} | NOVA Store`,
//     description:
//       product.description ||
//       `Explore the ${product.name} at NOVA Store with next-gen performance and aerospace precision.`,
//   };
// }

// export default async function ProductPage({ params }) {
//   const { id } = await params;

//   // Resolve dynamic product
//   let product = getProductById(id);
//   if (!product) {
//     product = getProductBySlug(id);
//   }
//   if (!product) {
//     const all = getAllProducts();
//     product =
//       all.find((p) => String(p.id) === String(id) || p.slug === id) || all[0];
//   }

//   // Related products from same category or featured items
//   const allCategoryProducts = getProductsByCategory(product.category) || [];
//   let related = allCategoryProducts
//     .filter((p) => p.id !== product.id)
//     .slice(0, 4);

//   if (related.length < 4) {
//     const featured = getFeaturedProducts() || [];
//     const fillers = featured.filter(
//       (p) => p.id !== product.id && !related.some((r) => r.id === p.id),
//     );
//     related = [...related, ...fillers].slice(0, 4);
//   }

//   return (
//     <main className="min-h-screen bg-[#030308] text-white">
//       <CategoryNav />
//       <ProductDetailView product={product} relatedProducts={related} />
//     </main>
//   );
// }
