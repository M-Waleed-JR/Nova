// lib/data.js — Data Access Layer (refactored Phase 1)
// Imports modular JSON data from lib/data/*.json and preserves all original exports.

import categories from "./data/categories.json";
import productsRaw from "./data/products.json";
import heroSlides from "./data/hero.json";

// Preserve all original product data (base + generated, image overrides kept intact)
const products = productsRaw;

// Helper Query Functions (original signatures preserved)
export const getAllProducts = () => products;
export const getProductById = (id) => products.find((p) => p.id === Number(id));
export const getProductBySlug = (slug) => products.find((p) => p.slug === slug);

const CATEGORY_ALIASES = {
  accessories: "mobile-accessories",
  "mobile-accessory": "mobile-accessories",
  "mobile-and-tech-accessories": "mobile-accessories",
};
const normalize = (s) => {
  const v = String(s).toLowerCase().trim().replace(/_/g, "-");
  return CATEGORY_ALIASES[v] || v;
};
export const getProductsByCategory = (categorySlug) =>
  products.filter((p) => normalize(p.category) === normalize(categorySlug));
export const getFeaturedProducts = () => products.filter((p) => p.isFeatured);
export const getNewProducts = () => products.filter((p) => p.isNew);

export { heroSlides, categories, products };
