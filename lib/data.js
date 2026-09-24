// lib/data.js
import { generatedProducts, imageOverrides } from "./generated-products";
// NOVA Store — Expanded Clean Product Database (Expanded Product Database)

export const categories = [
  { id: "smartphones", name: "Smartphones", slug: "smartphones" },
  { id: "laptops", name: "Laptops", slug: "laptops" },
  { id: "tablets", name: "Tablets", slug: "tablets" },
  { id: "audio", name: "Audio", slug: "audio" },
  { id: "smartwatches", name: "Smart Watches", slug: "smartwatches" },
  { id: "gaming", name: "Gaming", slug: "gaming" },
  { id: "cameras", name: "Cameras", slug: "cameras" },
  {
    id: "mobile-accessories",
    name: "Mobile Accessories",
    slug: "mobile-accessories",
  },
];

const baseProducts = [
  // ==================== 1. SMARTPHONES ====================
  {
    id: 1,
    name: "iPhone X Silver with AirPods",
    slug: "iphone-x-silver-with-airpods",
    category: "smartphones",
    brand: "Apple",
    price: 1199,
    oldPrice: 1299,
    discount: 8,
    rating: 4.8,
    reviews: 342,
    stock: 28,
    image:
      "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "Silver glass-back iPhone with dual rear camera and Face ID, plus wireless AirPods.",
    specs: {
      screen: "5.8 inch Super Retina OLED",
      storage: "256GB",
      ram: "3GB",
      battery: "2716mAh",
    },
    isNew: true,
    isFeatured: true,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    category: "smartphones",
    brand: "Samsung",
    price: 1099,
    oldPrice: 1199,
    discount: 8,
    rating: 4.7,
    reviews: 289,
    stock: 34,
    image:
      "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "Sleek black flagship with vivid AMOLED display, always-on screen, and 200MP camera.",
    specs: {
      screen: "6.8 inch Dynamic AMOLED 2X",
      storage: "512GB",
      ram: "12GB",
      battery: "5000mAh",
    },
    isNew: true,
    isFeatured: true,
  },
  {
    id: 3,
    name: "Google Pixel 8 Pro",
    slug: "google-pixel-8-pro",
    category: "smartphones",
    brand: "Google",
    price: 899,
    oldPrice: 999,
    discount: 10,
    rating: 4.6,
    reviews: 201,
    stock: 19,
    image:
      "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "Tensor G3 processor with AI photo Magic Eraser and Best Take camera features.",
    specs: {
      screen: "6.7 inch Super Actua display",
      storage: "128GB",
      ram: "12GB",
      battery: "5050mAh",
    },
    isNew: false,
    isFeatured: false,
  },
  {
    id: 4,
    name: "OnePlus 12",
    slug: "oneplus-12",
    category: "smartphones",
    brand: "OnePlus",
    price: 799,
    oldPrice: 899,
    discount: 11,
    rating: 4.7,
    reviews: 156,
    stock: 22,
    image:
      "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "Snapdragon 8 Gen 3 flagship with 100W SUPERVOOC charging and Hasselblad Camera System.",
    specs: {
      screen: "6.82 inch 2K 120Hz AMOLED",
      storage: "256GB",
      ram: "12GB",
      battery: "5400mAh",
    },
    isNew: true,
    isFeatured: false,
  },
  {
    id: 5,
    name: "Xiaomi 14 Ultra",
    slug: "xiaomi-14-ultra",
    category: "smartphones",
    brand: "Xiaomi",
    price: 999,
    oldPrice: 1099,
    discount: 9,
    rating: 4.8,
    reviews: 112,
    stock: 15,
    image:
      "https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "Browse your Leica-tuned shots on a bright AMOLED display with a 1-inch main sensor.",
    specs: {
      screen: "6.73 inch AMOLED 120Hz",
      storage: "512GB",
      ram: "16GB",
      battery: "5000mAh",
    },
    isNew: true,
    isFeatured: true,
  },

  // ==================== 2. LAPTOPS ====================
  {
    id: 6,
    name: 'MacBook Pro 14" M3',
    slug: "macbook-pro-14-m3",
    category: "laptops",
    brand: "Apple",
    price: 1999,
    oldPrice: 2199,
    discount: 9,
    rating: 4.9,
    reviews: 412,
    stock: 15,
    image:
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "Silver aluminum laptop with a Liquid Retina XDR display and 18-hour battery life.",
    specs: {
      cpu: "Apple M3 Pro",
      ram: "18GB Unified",
      storage: "512GB SSD",
      screen: "14.2 inch",
    },
    isNew: true,
    isFeatured: true,
  },
  {
    id: 7,
    name: 'MacBook Air 13" M2',
    slug: "macbook-air-13-m2",
    category: "laptops",
    brand: "Apple",
    price: 1599,
    oldPrice: 1799,
    discount: 11,
    rating: 4.6,
    reviews: 187,
    stock: 22,
    image:
      "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "Ultra-thin silver aluminum laptop with backlit keyboard and all-day battery life.",
    specs: {
      cpu: "Apple M2",
      ram: "16GB Unified",
      storage: "512GB SSD",
      screen: "13.6 inch Liquid Retina",
    },
    isNew: false,
    isFeatured: true,
  },
  {
    id: 8,
    name: "Lenovo ThinkPad X1 Carbon Gen 11",
    slug: "lenovo-thinkpad-x1-carbon",
    category: "laptops",
    brand: "Lenovo",
    price: 1429,
    oldPrice: 1599,
    discount: 10,
    rating: 4.8,
    reviews: 95,
    stock: 14,
    image:
      "https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/1.webp",
    images: [
      "https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/1.webp",
    ],
    description:
      "Ultralight carbon-fiber business laptop built for maximum durability.",
    specs: {
      cpu: "Intel Core i7-1365U",
      ram: "32GB LPDDR5",
      storage: "1TB SSD",
      screen: "14 inch WUXGA",
    },
    isNew: false,
    isFeatured: false,
  },
  {
    id: 9,
    name: "ASUS ZenBook 14 OLED",
    slug: "asus-zenbook-14-oled",
    category: "laptops",
    brand: "ASUS",
    price: 1899,
    oldPrice: 2099,
    discount: 9,
    rating: 4.8,
    reviews: 134,
    stock: 11,
    image:
      "https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "Ultra-slim silver laptop with a vivid OLED display, made for work and study.",
    specs: {
      cpu: "Intel Core Ultra 7",
      ram: "16GB LPDDR5X",
      storage: "1TB SSD",
      screen: "14 inch OLED",
    },
    isNew: true,
    isFeatured: true,
  },

  // ==================== 3. TABLETS ====================
  {
    id: 10,
    name: 'iPad 10.2" 9th Gen',
    slug: "ipad-10-2-9th-gen",
    category: "tablets",
    brand: "Apple",
    price: 1099,
    oldPrice: 1199,
    discount: 8,
    rating: 4.8,
    reviews: 267,
    stock: 24,
    image:
      "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "Classic iPad with a Retina display, Touch ID home button, and Apple Pencil support.",
    specs: {
      screen: "10.2 inch Retina",
      storage: "64GB",
      ram: "3GB",
      chip: "Apple A13 Bionic",
    },
    isNew: true,
    isFeatured: true,
  },
  {
    id: 11,
    name: "Samsung Galaxy Tab S9 Ultra",
    slug: "samsung-galaxy-tab-s9-ultra",
    category: "tablets",
    brand: "Samsung",
    price: 999,
    oldPrice: 1119,
    discount: 10,
    rating: 4.7,
    reviews: 142,
    stock: 16,
    image:
      "https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/1.webp",
    images: [
      "https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/1.webp",
    ],
    description:
      "Massive 14.6-inch Dynamic AMOLED 2X display with S Pen included and IP68 resistance.",
    specs: {
      screen: "14.6 inch AMOLED 120Hz",
      storage: "256GB",
      ram: "12GB",
      battery: "11200mAh",
    },
    isNew: true,
    isFeatured: false,
  },
  {
    id: 12,
    name: "iPad Air 5th Gen",
    slug: "ipad-air-5th-gen",
    category: "tablets",
    brand: "Apple",
    price: 599,
    oldPrice: 649,
    discount: 7,
    rating: 4.7,
    reviews: 310,
    stock: 30,
    image:
      "https://images.pexels.com/photos/1334598/pexels-photo-1334598.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/1334598/pexels-photo-1334598.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "Lightweight power tablet with Apple M1 chip, 12MP Ultra Wide front camera with Center Stage.",
    specs: {
      screen: "10.9 inch Liquid Retina",
      storage: "64GB",
      ram: "8GB",
      chip: "Apple M1",
    },
    isNew: false,
    isFeatured: false,
  },
  {
    id: 13,
    name: "Microsoft Surface Pro 9",
    slug: "microsoft-surface-pro-9",
    category: "tablets",
    brand: "Microsoft",
    price: 899,
    oldPrice: 999,
    discount: 10,
    rating: 4.5,
    reviews: 120,
    stock: 18,
    image:
      "https://images.pexels.com/photos/3082341/pexels-photo-3082341.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/3082341/pexels-photo-3082341.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "2-in-1 tablet versatility with full Windows 11 power and built-in kickstand.",
    specs: {
      screen: "13 inch PixelSense 120Hz",
      storage: "256GB SSD",
      ram: "16GB",
      cpu: "Intel Core i5",
    },
    isNew: false,
    isFeatured: false,
  },

  // ==================== 4. AUDIO ====================
  {
    id: 14,
    name: "Beats Studio Wireless Headphones",
    slug: "beats-studio-wireless-headphones",
    category: "audio",
    brand: "Beats",
    price: 399,
    oldPrice: 449,
    discount: 11,
    rating: 4.9,
    reviews: 523,
    stock: 60,
    image:
      "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "Iconic silver over-ear headphones with deep bass and plush ear cushions.",
    specs: {
      type: "Over-ear Wireless",
      battery: "20 hours",
      noiseCancelling: "Active Noise Cancelling",
    },
    isNew: false,
    isFeatured: true,
  },
  {
    id: 15,
    name: "Apple AirPods Pro 2",
    slug: "apple-airpods-pro-2",
    category: "audio",
    brand: "Apple",
    price: 249,
    oldPrice: 279,
    discount: 11,
    rating: 4.8,
    reviews: 678,
    stock: 85,
    image:
      "https://images.pexels.com/photos/16149965/pexels-photo-16149965.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/16149965/pexels-photo-16149965.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "Compact wireless earbuds with H2 chip, Active Noise Cancellation, and charging case.",
    specs: {
      type: "In-ear Wireless",
      battery: "6 hours per charge",
      caseBattery: "30 hours",
    },
    isNew: true,
    isFeatured: true,
  },
  {
    id: 16,
    name: "Bose QuietComfort Ultra",
    slug: "bose-quietcomfort-ultra",
    category: "audio",
    brand: "Bose",
    price: 429,
    oldPrice: 479,
    discount: 10,
    rating: 4.7,
    reviews: 215,
    stock: 25,
    image:
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "Breakthrough spatialized audio and world-class quiet with CustomTune technology.",
    specs: {
      type: "Over-ear Wireless",
      battery: "24 hours",
      spatialAudio: "Bose Immersive Audio",
    },
    isNew: true,
    isFeatured: false,
  },
  {
    id: 17,
    name: "Sennheiser Momentum 4 Wireless",
    slug: "sennheiser-momentum-4-wireless",
    category: "audio",
    brand: "Sennheiser",
    price: 349,
    oldPrice: 399,
    discount: 12,
    rating: 4.6,
    reviews: 140,
    stock: 32,
    image:
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "Audiophile-inspired 42mm transducer system with massive 60-hour battery life.",
    specs: {
      type: "Over-ear Wireless",
      battery: "60 hours",
      driver: "42mm Transducer",
    },
    isNew: false,
    isFeatured: false,
  },

  // ==================== 5. SMART WATCHES ====================
  {
    id: 18,
    name: "Apple Watch Series 9",
    slug: "apple-watch-series-9",
    category: "smartwatches",
    brand: "Apple",
    price: 429,
    oldPrice: 449,
    discount: 4,
    rating: 4.8,
    reviews: 389,
    stock: 47,
    image:
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "Space Gray watch with analog face, black sport band, and Double Tap gesture control.",
    specs: {
      screen: "45mm OLED Retina",
      battery: "18 hours",
      waterResistant: "50 meters",
    },
    isNew: true,
    isFeatured: true,
  },
  {
    id: 19,
    name: "Samsung Galaxy Watch 6 Classic",
    slug: "samsung-galaxy-watch-6-classic",
    category: "smartwatches",
    brand: "Samsung",
    price: 349,
    oldPrice: 399,
    discount: 12,
    rating: 4.6,
    reviews: 178,
    stock: 39,
    image:
      "https://images.pexels.com/photos/277406/pexels-photo-277406.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/277406/pexels-photo-277406.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "Iconic rotating bezel with advanced sleep coaching, HR zone guidance, and ECG.",
    specs: {
      screen: "47mm Super AMOLED",
      battery: "40 hours",
      frame: "Stainless Steel",
    },
    isNew: false,
    isFeatured: false,
  },
  {
    id: 20,
    name: "Apple Watch Series 8 Blue Sport Band",
    slug: "apple-watch-series-8-blue-sport-band",
    category: "smartwatches",
    brand: "Apple",
    price: 799,
    oldPrice: 849,
    discount: 5,
    rating: 4.9,
    reviews: 198,
    stock: 14,
    image:
      "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "Silver smartwatch with a sky-blue sport band for workouts and health tracking.",
    specs: {
      screen: "45mm Always-On Retina",
      battery: "18 hours",
      waterResistant: "50 meters",
    },
    isNew: true,
    isFeatured: true,
  },
  {
    id: 21,
    name: "Garmin Fenix 7 Pro Sapphire Solar",
    slug: "garmin-fenix-7-pro",
    category: "smartwatches",
    brand: "Garmin",
    price: 899,
    oldPrice: 949,
    discount: 5,
    rating: 4.8,
    reviews: 87,
    stock: 12,
    image:
      "https://images.pexels.com/photos/5081914/pexels-photo-5081914.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/5081914/pexels-photo-5081914.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "Multisport GPS watch with solar charging lens, built-in LED flashlight, and topo maps.",
    specs: {
      screen: "1.3 inch Memory-in-Pixel",
      battery: "Up to 22 days",
      glass: "Sapphire Solar",
    },
    isNew: false,
    isFeatured: false,
  },

  // ==================== 6. GAMING ====================
  {
    id: 22,
    name: "PlayStation 1 Retro Console",
    slug: "playstation-1-retro-console",
    category: "gaming",
    brand: "Sony",
    price: 499,
    oldPrice: 549,
    discount: 9,
    rating: 4.9,
    reviews: 812,
    stock: 14,
    image:
      "https://images.pexels.com/photos/4219883/pexels-photo-4219883.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/4219883/pexels-photo-4219883.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "Original gray PlayStation console with a classic controller for retro gaming nights.",
    specs: {
      media: "CD-ROM",
      output: "Composite AV",
      players: "2 Controller Ports",
    },
    isNew: true,
    isFeatured: true,
  },
  {
    id: 23,
    name: "ASUS ROG Dual Monitor Gaming Setup",
    slug: "asus-rog-dual-monitor-gaming-setup",
    category: "gaming",
    brand: "ASUS",
    price: 899,
    oldPrice: 999,
    discount: 10,
    rating: 4.8,
    reviews: 88,
    stock: 15,
    image:
      "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "Dual-screen battle station with blue RGB ambient lighting and 144Hz gaming panels.",
    specs: {
      setup: "Dual Monitor",
      resolution: "2560 x 1440 per screen",
      refreshRate: "144Hz",
      panel: "IPS",
    },
    isNew: true,
    isFeatured: true,
  },
  {
    id: 24,
    name: "Xbox Series X",
    slug: "xbox-series-x",
    category: "gaming",
    brand: "Microsoft",
    price: 499,
    oldPrice: 529,
    discount: 5,
    rating: 4.8,
    reviews: 540,
    stock: 20,
    image:
      "https://images.pexels.com/photos/1298601/pexels-photo-1298601.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/1298601/pexels-photo-1298601.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "12 teraflops of raw graphic processing power with Quick Resume for seamless multi-game switching.",
    specs: {
      storage: "1TB Custom NVMe SSD",
      performance: "4K @ 120 FPS",
      architecture: "AMD Zen 2 & RDNA 2",
    },
    isNew: false,
    isFeatured: false,
  },
  {
    id: 25,
    name: "Nintendo Switch OLED Model",
    slug: "nintendo-switch-oled",
    category: "gaming",
    brand: "Nintendo",
    price: 349,
    oldPrice: 379,
    discount: 8,
    rating: 4.7,
    reviews: 620,
    stock: 35,
    image:
      "https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "7-inch vibrant OLED screen, wide adjustable stand, LAN port dock, and 64GB storage.",
    specs: {
      screen: "7 inch OLED",
      storage: "64GB",
      modes: "TV, Tabletop, Handheld",
    },
    isNew: false,
    isFeatured: false,
  },

  // ==================== 7. CAMERAS ====================
  {
    id: 26,
    name: "Nikon DSLR Camera with Zoom Lens",
    slug: "nikon-dslr-camera-zoom-lens",
    category: "cameras",
    brand: "Nikon",
    price: 2499,
    oldPrice: 2699,
    discount: 7,
    rating: 4.9,
    reviews: 76,
    stock: 9,
    image:
      "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "Classic DSLR with optical viewfinder and versatile zoom lens for everyday shooting.",
    specs: {
      sensor: "24MP APS-C CMOS",
      video: "Full HD 1080p",
      viewfinder: "Optical Pentaprism",
    },
    isNew: true,
    isFeatured: true,
  },
  {
    id: 27,
    name: "Sony Alpha a7 IV",
    slug: "sony-alpha-a7-iv",
    category: "cameras",
    brand: "Sony",
    price: 2499,
    oldPrice: 2499,
    discount: 0,
    rating: 4.8,
    reviews: 112,
    stock: 11,
    image:
      "https://images.pexels.com/photos/212372/pexels-photo-212372.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/212372/pexels-photo-212372.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "33MP full-frame Exmor R sensor with Real-time Eye AF for Humans and Animals.",
    specs: { sensor: "33MP Full-Frame", video: "4K 60p", iso: "100-51200" },
    isNew: false,
    isFeatured: false,
  },
  {
    id: 28,
    name: "Vintage 35mm Rangefinder Film Camera",
    slug: "vintage-35mm-rangefinder-film-camera",
    category: "cameras",
    brand: "Vintage",
    price: 1699,
    oldPrice: 1799,
    discount: 5,
    rating: 4.8,
    reviews: 64,
    stock: 8,
    image:
      "https://images.pexels.com/photos/1203803/pexels-photo-1203803.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/1203803/pexels-photo-1203803.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "Classic all-metal rangefinder with a collapsible lens for timeless 35mm film shots.",
    specs: {
      format: "35mm Film",
      lens: "Collapsible Prime",
      focus: "Manual Rangefinder",
    },
    isNew: true,
    isFeatured: true,
  },
  {
    id: 29,
    name: "GoPro HERO12 Black",
    slug: "gopro-hero12-black",
    category: "cameras",
    brand: "GoPro",
    price: 399,
    oldPrice: 449,
    discount: 11,
    rating: 4.6,
    reviews: 180,
    stock: 25,
    image:
      "https://images.pexels.com/photos/2378079/pexels-photo-2378079.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/2378079/pexels-photo-2378079.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "Action camera with HDR 5.3K video, HyperSmooth 6.0 stabilization, and 33ft waterproofing.",
    specs: {
      video: "5.3K 60fps / 4K 120fps",
      photo: "27MP",
      waterproof: "10m / 33ft",
    },
    isNew: false,
    isFeatured: false,
  },

  // ==================== 8. MOBILE ACCESSORIES ====================
  {
    id: 30,
    name: "Anker Rugged Solar Power Bank 10,000mAh",
    slug: "anker-rugged-solar-power-bank-10000mah",
    category: "mobile-accessories",
    brand: "Anker",
    price: 89,
    oldPrice: 99,
    discount: 10,
    rating: 4.8,
    reviews: 134,
    stock: 42,
    image:
      "https://images.pexels.com/photos/16814787/pexels-photo-16814787.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/16814787/pexels-photo-16814787.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "Rugged 10,000mAh power bank with a solar panel for camping and outdoor trips.",
    specs: {
      capacity: "10,000mAh",
      charging: "Solar + USB",
      protection: "Rugged Shockproof Body",
    },
    isNew: true,
    isFeatured: true,
  },
  {
    id: 31,
    name: "UGREEN USB-C Fast Charger 65W",
    slug: "ugreen-usb-c-fast-charger-65w",
    category: "mobile-accessories",
    brand: "UGREEN",
    price: 39,
    oldPrice: 49,
    discount: 20,
    rating: 4.7,
    reviews: 210,
    stock: 65,
    image:
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/thumbnail.webp",
    images: [
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/thumbnail.webp",
    ],
    description:
      "Multi-port GaN fast charger suitable for smartphones, tablets, and laptops.",
    specs: {
      ports: "2x USB-C, 1x USB-A",
      power: "65W Max",
      tech: "GaN Fast Charge",
    },
    isNew: false,
    isFeatured: false,
  },
  {
    id: 32,
    name: "Belkin Lightning Cable & Adapter Set",
    slug: "belkin-lightning-cable-adapter-set",
    category: "mobile-accessories",
    brand: "Belkin",
    price: 149,
    oldPrice: 169,
    discount: 11,
    rating: 4.8,
    reviews: 92,
    stock: 20,
    image:
      "https://images.pexels.com/photos/4219861/pexels-photo-4219861.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/4219861/pexels-photo-4219861.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "White Lightning cable and adapter set for fast charging and syncing your iPhone.",
    specs: {
      connector: "Lightning",
      output: "Fast Charge Ready",
      compatibility: "iPhone, iPad, AirPods",
    },
    isNew: true,
    isFeatured: true,
  },
  {
    id: 33,
    name: "Spigen MagArmor MagSafe Case",
    slug: "spigen-magarmor-magsafe-case",
    category: "mobile-accessories",
    brand: "Spigen",
    price: 29,
    oldPrice: 35,
    discount: 17,
    rating: 4.7,
    reviews: 310,
    stock: 100,
    image:
      "https://images.pexels.com/photos/4071887/pexels-photo-4071887.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/4071887/pexels-photo-4071887.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "Protective slim TPU case with built-in magnetic ring for MagSafe accessories.",
    specs: {
      material: "TPU & Air Cushion Tech",
      feature: "MagSafe Compatible",
      protection: "Military Grade Drop test",
    },
    isNew: false,
    isFeatured: false,
  },
  {
    id: 34,
    name: "Anker 737 Power Bank (PowerCore 24K)",
    slug: "anker-737-power-bank",
    category: "mobile-accessories",
    brand: "Anker",
    price: 139,
    oldPrice: 159,
    discount: 12,
    rating: 4.9,
    reviews: 420,
    stock: 28,
    image:
      "https://images.pexels.com/photos/14706040/pexels-photo-14706040.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/14706040/pexels-photo-14706040.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "Ultra-powerful 24,000mAh power bank with 140W bi-directional fast charging and smart digital display.",
    specs: {
      capacity: "24,000mAh",
      power: "140W Max Output",
      display: "Smart Color Display",
    },
    isNew: true,
    isFeatured: false,
  },
  {
    id: 35,
    name: "Baseus Metal Gravity Car Phone Holder",
    slug: "baseus-metal-gravity-car-holder",
    category: "mobile-accessories",
    brand: "Baseus",
    price: 19,
    oldPrice: 25,
    discount: 24,
    rating: 4.5,
    reviews: 145,
    stock: 80,
    image:
      "https://images.pexels.com/photos/30954662/pexels-photo-30954662.jpeg?auto=compress&cs=tinysrgb&w=800",
    images: [
      "https://images.pexels.com/photos/30954662/pexels-photo-30954662.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    description:
      "Air vent mount holder with gravity linkage design for single-handed smartphone placement.",
    specs: {
      mount: "Air Vent Clamp",
      material: "Aluminum Alloy",
      compatibility: "4.7 - 6.7 inches",
    },
    isNew: false,
    isFeatured: false,
  },
];

// Extra products + verified image URLs, produced by:  node scripts/generate-products.mjs
const baseSlugs = new Set(baseProducts.map((p) => p.slug));
export const products = [
  ...baseProducts,
  ...generatedProducts.filter((p) => !baseSlugs.has(p.slug)),
].map((p) => {
  const fixed = { ...p, rating: Math.round(p.rating * 10) / 10 }; // avoids 4.8999999
  return imageOverrides[p.id]
    ? { ...fixed, image: imageOverrides[p.id], images: [imageOverrides[p.id]] }
    : fixed;
});

// Helper Query Functions
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
