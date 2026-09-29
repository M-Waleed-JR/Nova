// Shared product helpers — used by ProductCard, QuickViewModal, ProductDetailView
export function normalizeCategory(s) {
  const aliases = {
    accessories: "mobile-accessories",
    "mobile-accessory": "mobile-accessories",
    "mobile-and-tech-accessories": "mobile-accessories",
  };
  const v = String(s).toLowerCase().trim().replace(/_/g, "-");
  return aliases[v] || v;
}

export function getDiscountPercent(product) {
  if (product.discount) return Math.round(product.discount);
  const original =
    product.oldPrice ??
    (product.discountPercentage
      ? Math.round((product.price / (1 - product.discountPercentage / 100)) * 100) / 100
      : null);
  if (!original || !product.price || original <= product.price) return 0;
  return Math.round(((original - product.price) / original) * 100);
}

export function getOriginalPrice(product) {
  if (typeof product.oldPrice === "number") return product.oldPrice;
  const discount = product.discount || product.discountPercentage || 0;
  if (!discount) return null;
  return Number((product.price / (1 - discount / 100)).toFixed(2));
}

export function formatPrice(n) {
  if (n === null || n === undefined) return "";
  return Number(n).toLocaleString();
}
