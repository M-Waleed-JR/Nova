// Shared finishes: defined once, reordered per model.
const IPHONE = {
  burgundy: { name: "Burgundy", value: "#713641", image: "/iphone/red.png" },
  black: { name: "Black", value: "#23252a", image: "/iphone/black.png" },
  blue: { name: "Glacier Blue", value: "#9eb7d7", image: "/iphone/blue.png" },
  silver: { name: "Silver", value: "#ededeb", image: "/iphone/white.png" },
};

export const heroSlides = [
  {
    id: "pro-max",
    name: "iPhone 18 Pro Max",
    description:
      "Ultimate precision in titanium, an unmatched camera system, and the A20 Pro chip at peak performance.",
    price: "$1,199",
    specs: ["A20 Pro Chip", '6.9" XDR OLED Display', "48MP Pro Camera System"],
    colors: [IPHONE.burgundy, IPHONE.black, IPHONE.blue, IPHONE.silver],
  },
  {
    id: "pro",
    name: "iPhone 18 Pro",
    description:
      "A pro-sized version, meticulously crafted to fit the hand and conquer demanding tasks.",
    price: "$1,099",
    specs: ["A20 Pro Chip", '6.3" XDR OLED Display', "ProMotion 120Hz"],
    colors: [IPHONE.blue, IPHONE.silver, IPHONE.black, IPHONE.burgundy],
  },
  {
    id: "duo",
    name: "iPhone Duo",
    description:
      "New horizons unfold: a connected, foldable screen, ultra-precise haptic response, and an entirely innovative design.",
    price: "$1,599",
    specs: ["A20 Pro Chip", "Dual OLED Displays", "Flexible Titanium Structure"],
    colors: [
      { name: "Star White", value: "#ededeb", image: "/due/white.png" },
      { name: "Night Sky", value: "#23252a", image: "/due/black.png" },
    ],
  },
  {
    id: "redmi-17-5g",
    name: "Xiaomi Redmi 17 5G",
    description:
      "Excellent performance with long-lasting battery: 5G network support, powerful mid-range processor, and a smooth display with adaptive refresh rate.",
    price: "$249",
    specs: [
      "Dimensity 6300 Processor",
      '6.79" FHD+ Display',
      "5000mAh, 33W Fast Charging",
    ],
    colors: [
      { name: "Black", value: "#77787b", image: "/Xiaomi/black.png" },
      { name: "Blue", value: "#007bff", image: "/Xiaomi/blue.png" },
      { name: "Orange", value: "#f75b05", image: "/Xiaomi/orange.png" },
    ],
    imageClassName: "scale-[0.87]",
  },
  {
    id: "samsung-galaxy-s26-ultra",
    name: "Samsung Galaxy S26 Ultra",
    description:
      "Exceptional performance and unmatched power: 5G network support, a leading chip for gaming and apps, a professional-grade camera, and a stunning AMOLED display with an integrated S Pen.",
    price: "$1,299",
    specs: [
      "Snapdragon 8 Gen 5",
      '6.8" Dynamic AMOLED 2X, 120Hz',
      "200MP Quad Camera System",
      "5000mAh, 45W Fast Charging",
    ],
    colors: [
      { name: "Blue", value: "#007bff", image: "/samsung/blue.png" },
      { name: "Black", value: "#23252a", image: "/samsung/black.png" },
      { name: "Titanium White", value: "#ededeb", image: "/samsung/white.png" },
      { name: "Orchid Purple", value: "#800080", image: "/samsung/purple.png" },
    ],
    imageClassName: "scale-[0.87]",
  },
];
