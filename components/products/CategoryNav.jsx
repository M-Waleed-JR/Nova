import Link from "next/link";
import { categories } from "@/lib/categories";

export default function CategoryNav() {
  return (
    <nav className="flex flex-wrap items-center justify-center gap-3 px-6 py-4 bg-[#030308]/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-30">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/products/${category.slug}`}
          className="px-4 py-2 rounded-full text-xs font-semibold tracking-wide bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 hover:border-white/25 transition-all duration-200"
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
}

