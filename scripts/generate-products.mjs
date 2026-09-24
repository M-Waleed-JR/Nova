// Usage (from project root):
//   node scripts/generate-products.mjs
// Optional (recommended for Gaming/Cameras images): free Pexels API key from https://www.pexels.com/api/
//   PowerShell:  $env:PEXELS_API_KEY="YOUR_KEY"; node scripts/generate-products.mjs
//   CMD:         set PEXELS_API_KEY=YOUR_KEY && node scripts/generate-products.mjs
// Without a key, Gaming/Cameras images are searched on Wikimedia Commons instead.
//
// What it does:
//  1. Pulls REAL products + images from DummyJSON: smartphones, laptops, tablets,
//     and splits its "mobile-accessories" into audio / smartwatches / mobile-accessories.
//  2. Adds extra Gaming + Cameras products and finds a matching image for each
//     (Pexels API if key is set, otherwise Wikimedia Commons).
//  3. Checks every image URL really loads, and skips any product whose image doesn't.
//  4. Fixes the broken images of a few existing products.
//  Output: lib/generated-products.js

import { writeFileSync } from "node:fs";

const API = "https://dummyjson.com/products";
const PEXELS_KEY = process.env.PEXELS_API_KEY;
const UA = { "User-Agent": "nova-store-seed/1.0 (learning project)" };

const getJSON = async (url, headers = {}) => {
  const res = await fetch(url, { headers: { ...UA, ...headers } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
};
const dj = async (cat) => (await getJSON(`${API}/category/${cat}?limit=0`)).products;

async function imageOk(url) {
  try {
    let r = await fetch(url, { method: "HEAD", headers: UA });
    if (!r.ok) r = await fetch(url, { headers: UA });
    return r.ok && (r.headers.get("content-type") || "").startsWith("image");
  } catch {
    return false;
  }
}

async function searchImage(queries) {
  for (const query of queries) {
    try {
      if (PEXELS_KEY) {
        const j = await getJSON(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5&orientation=square`,
          { Authorization: PEXELS_KEY },
        );
        for (const ph of j.photos || []) {
          const u = ph.src?.large;
          if (u && (await imageOk(u))) return u;
        }
      } else {
        const api =
          `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search` +
          `&gsrnamespace=6&gsrlimit=8&gsrsearch=${encodeURIComponent(query + " filetype:bitmap")}` +
          `&prop=imageinfo&iiprop=url|mime&iiurlwidth=800`;
        const j = await getJSON(api);
        const pages = Object.values(j.query?.pages || {}).sort((a, b) => a.index - b.index);
        for (const p of pages) {
          const info = p.imageinfo?.[0];
          const u = info?.thumburl || info?.url;
          if (u && /jpe?g|png/i.test(info.mime || "") && (await imageOk(u))) return u;
        }
      }
    } catch (e) {
      console.log(`  (search failed for "${query}": ${e.message})`);
    }
  }
  return null;
}

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function build({ id, name, category, brand, price, oldPrice, rating, reviews, stock, images, description, specs, i }) {
  const discount = oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
  return {
    id, name, slug: slugify(name), category, brand: brand || "Generic",
    price, oldPrice: oldPrice || price, discount,
    rating, reviews, stock, image: images[0], images,
    description, specs,
    isNew: i % 2 === 0, isFeatured: i % 3 === 0,
  };
}

function fromDummy(p, id, category, i) {
  const discount = Math.round(p.discountPercentage || 0);
  const price = Math.max(1, Math.round(p.price));
  const images = p.images?.length ? p.images : [p.thumbnail];
  return build({
    id, name: p.title, category, brand: p.brand,
    price,
    oldPrice: discount ? Math.round(price / (1 - discount / 100)) : price,
    rating: Math.round(p.rating * 10) / 10,
    reviews: p.reviews?.length ? p.reviews.length * 37 : 25,
    stock: p.stock ?? 20,
    images, description: p.description,
    specs: {
      warranty: p.warrantyInformation || "1 year warranty",
      shipping: p.shippingInformation || "Ships in 1-2 days",
      ...(p.tags?.[0] ? { type: p.tags[0] } : {}),
    },
    i,
  });
}

// Extra products for categories DummyJSON doesn't cover.
const EXTRA = [
  // ---- Gaming ----
  { name: "Sony DualSense Wireless Controller", brand: "Sony", category: "gaming", price: 69, oldPrice: 79, description: "Wireless controller with haptic feedback and adaptive triggers for PlayStation 5.", specs: { connection: "Bluetooth / USB-C", feature: "Haptic Feedback", platform: "PS5, PC" }, queries: ["playstation controller", "game controller"] },
  { name: "Xbox Wireless Controller", brand: "Microsoft", category: "gaming", price: 59, oldPrice: 64, description: "Comfortable wireless controller with textured grips for Xbox and Windows PC.", specs: { connection: "Bluetooth / Wireless", battery: "AA batteries", platform: "Xbox, PC" }, queries: ["xbox controller", "gamepad"] },
  { name: "Nintendo Switch Pro Controller", brand: "Nintendo", category: "gaming", price: 69, oldPrice: 74, description: "Full-size controller with motion controls and HD rumble for Nintendo Switch.", specs: { connection: "Bluetooth / USB", battery: "40 hours", platform: "Switch" }, queries: ["nintendo switch controller", "nintendo switch"] },
  { name: "Meta Quest 3 VR Headset", brand: "Meta", category: "gaming", price: 499, oldPrice: 549, description: "Standalone mixed-reality headset for immersive games and apps.", specs: { type: "Standalone VR", storage: "128GB", tracking: "Inside-out" }, queries: ["vr headset", "virtual reality headset"] },
  { name: "HyperX Cloud II Gaming Headset", brand: "HyperX", category: "gaming", price: 99, oldPrice: 109, description: "Comfortable over-ear gaming headset with a detachable microphone.", specs: { type: "Over-ear Wired", mic: "Detachable", platform: "PC, Console" }, queries: ["gaming headset", "headset gaming"] },
  { name: "Corsair K70 RGB Mechanical Keyboard", brand: "Corsair", category: "gaming", price: 159, oldPrice: 179, description: "Mechanical gaming keyboard with per-key RGB lighting.", specs: { switches: "Mechanical", lighting: "Per-key RGB", layout: "Full-size" }, queries: ["mechanical gaming keyboard", "rgb keyboard"] },
  { name: "Razer DeathAdder V3 Gaming Mouse", brand: "Razer", category: "gaming", price: 69, oldPrice: 79, description: "Lightweight ergonomic gaming mouse built for fast, precise aim.", specs: { type: "Wired Ergonomic", sensor: "Optical", buttons: "6 programmable" }, queries: ["gaming mouse", "computer mouse rgb"] },
  // ---- Cameras ----
  { name: "Canon EOS R6 Mark II", brand: "Canon", category: "cameras", price: 2499, oldPrice: 2599, description: "Full-frame mirrorless camera with fast autofocus for photo and video.", specs: { sensor: "24MP Full-Frame", video: "4K 60p", stabilization: "In-body" }, queries: ["canon mirrorless camera", "canon camera"] },
  { name: "Fujifilm X-T5", brand: "Fujifilm", category: "cameras", price: 1699, oldPrice: 1799, description: "Retro-styled APS-C mirrorless camera with a high-resolution sensor.", specs: { sensor: "40MP APS-C", video: "6.2K", body: "Weather-sealed" }, queries: ["fujifilm camera", "mirrorless camera"] },
  { name: "Fujifilm Instax Mini 12", brand: "Fujifilm", category: "cameras", price: 79, oldPrice: 89, description: "Fun instant camera that prints credit-card-sized photos in seconds.", specs: { type: "Instant Film", film: "Instax Mini", flash: "Auto" }, queries: ["instax camera", "instant camera"] },
  { name: "DJI Mini 4 Pro Drone", brand: "DJI", category: "cameras", price: 759, oldPrice: 799, description: "Compact folding drone with a stabilized 4K camera and obstacle sensing.", specs: { video: "4K HDR", weight: "Under 249g", flight: "Up to 34 min" }, queries: ["dji drone", "camera drone"] },
  { name: "Canon RF 24-70mm f/2.8 Lens", brand: "Canon", category: "cameras", price: 2299, oldPrice: 2399, description: "Professional standard zoom lens with a bright constant f/2.8 aperture.", specs: { mount: "Canon RF", aperture: "f/2.8", range: "24-70mm" }, queries: ["camera lens zoom", "canon lens"] },
  { name: "Manfrotto Camera Tripod", brand: "Manfrotto", category: "cameras", price: 149, oldPrice: 169, description: "Sturdy adjustable tripod for stable photos and smooth video.", specs: { material: "Aluminum", height: "Adjustable", head: "Ball head" }, queries: ["camera tripod", "tripod"] },
];

async function main() {
  console.log(PEXELS_KEY ? "Using Pexels API for Gaming/Cameras images." : "No PEXELS_API_KEY: using Wikimedia Commons for Gaming/Cameras images.");

  const [phones, laptops, tablets, acc] = await Promise.all([
    dj("smartphones"), dj("laptops"), dj("tablets"), dj("mobile-accessories"),
  ]);

  const audioRe = /airpods|earphone|headphone|beats|homepod|echo/i;
  const watchRe = /watch/i;
  const groups = [
    ["smartphones", phones],
    ["laptops", laptops],
    ["tablets", tablets],
    ["audio", acc.filter((p) => audioRe.test(p.title))],
    ["smartwatches", acc.filter((p) => watchRe.test(p.title) && !audioRe.test(p.title))],
    ["mobile-accessories", acc.filter((p) => !audioRe.test(p.title) && !watchRe.test(p.title))],
  ];

  const generatedProducts = [];
  let id = 100, skipped = 0;
  for (const [category, list] of groups) {
    for (const [i, p] of list.entries()) {
      const prod = fromDummy(p, id++, category, i);
      if (await imageOk(prod.image)) generatedProducts.push(prod);
      else { skipped++; console.log(`  skipped (image failed): ${p.title}`); }
    }
  }

  for (const [i, e] of EXTRA.entries()) {
    const url = await searchImage(e.queries);
    if (!url) { skipped++; console.log(`  skipped (no image found): ${e.name}`); id++; continue; }
    generatedProducts.push(build({
      id: id++, name: e.name, category: e.category, brand: e.brand,
      price: e.price, oldPrice: e.oldPrice,
      rating: Math.round((4.3 + ((i * 3) % 7) / 10) * 10) / 10, reviews: 40 + i * 23, stock: 10 + i * 4,
      images: [url], description: e.description, specs: e.specs, i,
    }));
  }

  // Fix broken images of existing products
  const pick = (p, n = 0) => p && (p.images?.[n] || p.images?.[0] || p.thumbnail);
  const find = (list, re) => list.find((p) => re.test(p.title));
  const imageOverrides = {};
  const set = (pid, url) => url && (imageOverrides[pid] = url);
  set(8, pick(find(laptops, /lenovo/i)));            // Lenovo ThinkPad
  set(11, pick(find(tablets, /samsung/i)));          // Galaxy Tab S9 Ultra
  set(31, pick(find(acc, /iphone charger/i)));       // UGREEN charger
  set(32, pick(find(acc, /iphone charger/i), 1));    // Belkin cable & adapter set
  set(33, pick(find(acc, /silicone case|case/i)));   // Spigen case

  writeFileSync(
    "lib/generated-products.js",
    `// AUTO-GENERATED by scripts/generate-products.mjs — do not edit by hand.\n` +
      `export const generatedProducts = ${JSON.stringify(generatedProducts, null, 2)};\n\n` +
      `export const imageOverrides = ${JSON.stringify(imageOverrides, null, 2)};\n`,
  );

  const counts = {};
  generatedProducts.forEach((p) => (counts[p.category] = (counts[p.category] || 0) + 1));
  console.log("\n✅ Done. Written to lib/generated-products.js");
  console.table(counts);
  console.log(`Image fixes: ${Object.keys(imageOverrides).length} | Skipped: ${skipped}`);
}

main().catch((e) => { console.error("❌", e.message); process.exit(1); });
