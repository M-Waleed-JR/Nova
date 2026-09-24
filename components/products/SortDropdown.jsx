"use client";

import { useState, useRef, useEffect } from "react";

export default function SortDropdown({ slug, sort, selectedBrand }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDown(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const options = [
    { label: "Featured", value: "featured" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Top Rated", value: "rating" },
  ];

  const current = options.find((o) => o.value === sort)?.label || "Sort";

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="sort-menu"
        className="cursor-pointer select-none rounded-lg bg-[#030308]/80 px-3 py-1.5 text-xs font-medium text-zinc-200 ring-1 ring-white/10 transition hover:bg-[#030308] hover:ring-white/20 flex items-center gap-1.5"
      >
        {current}
        <span className={`text-[10px] text-zinc-500 transition duration-200 ${open ? "rotate-180" : ""}`}>▼</span>
      </button>

      {open && (
        <div
          id="sort-menu"
          className="absolute right-0 top-full z-50 mt-2 min-w-36 overflow-hidden rounded-2xl border border-white/15 bg-[#060610] shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06)]"
        >
          {options.map((item) => (
            <a
              key={item.value}
              href={`/category/${slug}?sort=${item.value}&brand=${selectedBrand}`}
              onClick={() => setOpen(false)}
              className={`block px-3.5 py-2 text-xs font-medium transition ${
                sort === item.value
                  ? "bg-violet-500/15 text-violet-300"
                  : "text-zinc-300 hover:bg-white/6 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
