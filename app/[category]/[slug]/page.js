import Link from "next/link";
import Image from "next/image";
import { products, getProductsByCategory } from "@/lib/data";
import { Star, ShoppingBag, ArrowLeft, SlidersHorizontal } from "lucide-react";

// تفاصيل وأسماء الأقسام للعرض والتنسيق
const CATEGORY_DETAILS = {
  gaming: {
    title: "Gaming Zone",
    subtitle: "Consoles, High-Performance GPUs, Monitors & Gaming Gear",
    banner:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=80",
  },
  smartphones: {
    title: "Smartphones",
    subtitle: "Explore the latest flagship mobile devices and specs",
    banner:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=80",
  },
  laptops: {
    title: "Laptops & Workstations",
    subtitle: "Power meets portability for developers, creators, and gamers",
    banner:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1600&q=80",
  },
  tablets: {
    title: "Tablets & iPads",
    subtitle: "Versatile screens for productivity and digital illustration",
    banner:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1600&q=80",
  },
  audio: {
    title: "Headphones & Audio",
    subtitle:
      "Immersive sound, active noise cancellation, and high-fidelity audio",
    banner:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80",
  },
  smartwatches: {
    title: "Smart Watches & Wearables",
    subtitle: "Track your fitness, health metrics, and stay connected",
    banner:
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1600&q=80",
  },
  cameras: {
    title: "Cameras & Photography",
    subtitle: "Full-frame mirrorless cameras, lenses, and cinema gear",
    banner:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&q=80",
  },
  accessories: {
    title: "Mobile & Tech Accessories",
    subtitle: "Hubs, chargers, protective cases, and desk setups",
    banner:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=1600&q=80",
  },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const categoryInfo = CATEGORY_DETAILS[slug?.toLowerCase()] || {
    title: slug?.toUpperCase(),
  };

  return {
    title: `${categoryInfo.title} | NOVA Store`,
    description: categoryInfo.subtitle || `Browse our collection of ${slug}`,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const normalizedSlug = slug?.toLowerCase();

  // جلب المنتجات التابعة للقسم الحالية
  const categoryProducts = getProductsByCategory(normalizedSlug);
  const info = CATEGORY_DETAILS[normalizedSlug] || {
    title: slug.charAt(0).toUpperCase() + slug.slice(1),
    subtitle: `Explore top quality items in ${slug}`,
    banner:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80",
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 pb-20 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm text-zinc-400 mb-6">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <span>/</span>
          <Link href="/#categories" className="hover:text-white transition">
            Categories
          </Link>
          <span>/</span>
          <span className="text-cyan-400 capitalize font-medium">{slug}</span>
        </div>

        {/* Hero Banner for Category */}
        <div className="relative rounded-2xl overflow-hidden border border-zinc-800 mb-10 h-52 sm:h-64 md:h-72 flex items-center">
          <img
            src={info.banner}
            alt={info.title}
            className="absolute inset-0 w-full h-full object-cover brightness-[0.35]"
          />
          <div className="relative z-10 p-6 sm:p-10 max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 mb-3 tracking-wide uppercase">
              Category
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-2">
              {info.title}
            </h1>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {info.subtitle}
            </p>
          </div>
        </div>

        {/* Controls / Filter Bar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5 mb-8">
          <div>
            <h2 className="text-xl font-bold text-white">
              Products{" "}
              <span className="text-zinc-500 text-sm font-normal">
                ({categoryProducts.length})
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <button className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-lg hover:border-zinc-700 transition text-zinc-300">
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              Filter & Sort
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Badges */}
                  <div className="absolute top-6 left-6 z-10 flex flex-col gap-1">
                    {product.isNew && (
                      <span className="bg-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                        NEW
                      </span>
                    )}
                    {product.discount > 0 && (
                      <span className="bg-red-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                        -{product.discount}%
                      </span>
                    )}
                  </div>

                  {/* Image Container */}
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-zinc-950 mb-4 border border-zinc-800/50 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex items-center justify-between mb-1 text-xs text-zinc-400">
                    <span className="uppercase tracking-wider font-semibold text-zinc-500">
                      {product.brand}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{product.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-semibold text-white text-base line-clamp-1 group-hover:text-cyan-400 transition mb-2">
                    {product.name}
                  </h3>

                  <p className="text-zinc-400 text-xs line-clamp-2 mb-4 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Price & Add Button */}
                <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-white">
                      ${product.price}
                    </div>
                    {product.oldPrice && (
                      <div className="text-xs text-zinc-500 line-through">
                        ${product.oldPrice}
                      </div>
                    )}
                  </div>

                  <button className="flex items-center gap-1.5 bg-zinc-800 hover:bg-cyan-500 text-zinc-200 hover:text-black font-semibold text-xs px-3 py-2 rounded-xl transition duration-200">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State if no products exist yet for this category */
          <div className="text-center py-20 bg-zinc-900/30 rounded-2xl border border-dashed border-zinc-800">
            <h3 className="text-xl font-bold text-white mb-2">
              No products found
            </h3>
            <p className="text-zinc-400 text-sm mb-6">
              We are adding more products to the{" "}
              <span className="text-cyan-400 font-semibold">{slug}</span>{" "}
              category soon!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
