import { generatedProducts } from "@/lib/generated-products";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, Truck, ShieldCheck, RotateCcw } from "lucide-react";

export async function generateStaticParams() {
  return [];
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = generatedProducts?.find((p) => p.slug === slug || p.id === slug);
  if (!product) return notFound();
  return (
    <main className="min-h-screen bg-[#030308] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-12 md:py-12">
        <Link href={`/category/${product.category || "smartphones"}`} className="mb-6 inline-flex items-center gap-2 text-sm text-cyan-400 hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to category
        </Link>
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#05050b]">
            <Image src={product.image || product.coverImage || "/logo/withOutBackground.png"} alt={product.name || product.title || "Product"} width={800} height={800} className="h-auto w-full object-cover" priority />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">{product.brand || product.category || "Nova Store"}</span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">{product.name || product.title || "Product"}</h1>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold">${product.price}</span>
              {product.oldPrice && <del className="text-lg text-white/40">${product.oldPrice}</del>}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/60">{product.description || "No description available."}</p>
            <div className="mt-6 flex items-center gap-6 text-xs text-white/50">
              <span className="flex items-center gap-1.5"><Truck className="h-3.5 w-3.5 text-cyan-400" /> Free Delivery</span>
              <span className="flex items-center gap-1.5"><RotateCcw className="h-3.5 w-3.5 text-cyan-400" /> 30-Day Return</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-cyan-400" /> Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
