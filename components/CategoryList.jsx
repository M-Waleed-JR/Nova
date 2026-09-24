"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { categories } from "@/lib/categories";

const CategoryList = () => {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Drag States
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);

    const slider = sliderRef.current;

    // Prevent vertical page scroll when using mouse wheel over the slider
    const handleWheel = (e) => {
      if (!slider) return;
      if (e.deltaY !== 0) {
        e.preventDefault(); // Stops the page from scrolling vertically
        slider.scrollLeft += e.deltaY * 1.5;
      }
    };

    if (slider) {
      slider.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      window.removeEventListener("resize", checkScroll);
      if (slider) {
        slider.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  // Button Scroll
  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * 0.75;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Mouse Drag Logic
  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;
    setIsMouseDown(true);
    setIsDragging(false);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeftPos(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    // Reset dragging with a slight delay to allow click event handling
    setTimeout(() => setIsDragging(false), 50);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll Sensitivity Speed

    if (Math.abs(walk) > 5) {
      setIsDragging(true);
    }
    sliderRef.current.scrollLeft = scrollLeftPos - walk;
  };

  // Scroll to section on initial mount or hash change
  useEffect(() => {
    const handleHashScroll = () => {
      if (
        typeof window !== "undefined" &&
        window.location.hash === "#categories"
      ) {
        // رفع التأخير لـ 300ms يضمن تحميل قسم الـ Hero والصور بالكامل
        const timer = setTimeout(() => {
          const element = document.getElementById("categories");
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 300);

        return () => clearTimeout(timer);
      }
    };

    handleHashScroll();

    // الاستماع لأي تغيير في الـ Hash أثنناء التنقل
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, []);

  return (
    <div
      id="categories"
      className="relative w-full my-8 group/section select-none scroll-mt-24"
    >
      {/* Header section with Slider Navigation Buttons */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            Browse
          </span>
          <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
            Top Categories
          </h3>
        </div>

        {/* Action Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition-all hover:bg-cyan-500 hover:text-black hover:border-cyan-400 disabled:opacity-20 disabled:hover:bg-white/5 disabled:hover:text-white disabled:cursor-not-allowed"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition-all hover:bg-cyan-500 hover:text-black hover:border-cyan-400 disabled:opacity-20 disabled:hover:bg-white/5 disabled:hover:text-white disabled:cursor-not-allowed"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Categories Slider Container */}
      <div
        ref={sliderRef}
        onScroll={checkScroll}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex gap-5 sm:gap-7 overflow-x-auto py-3 px-1 cursor-grab active:cursor-grabbing no-scrollbar`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category, index) => {
          const uniqueKey = category.id ? `${category.id}-${index}` : index;

          return (
            <Link
              key={uniqueKey}
              href={`/category/${category.slug}`}
              onClick={(e) => {
                if (isDragging) {
                  e.preventDefault(); // Don't navigate if user was dragging/swiping
                }
              }}
              draggable={false}
              className="group flex-shrink-0 flex flex-col items-center gap-3.5 w-48 sm:w-60 transition-all duration-300 hover:-translate-y-1.5"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 via-white/5 to-transparent p-4 backdrop-blur-md transition-all duration-300 group-hover:border-cyan-400/60 group-hover:shadow-[0_10px_30px_rgba(6,182,212,0.3)]">
                <img
                  src={category.img}
                  alt={category.name}
                  draggable={false}
                  className="h-full w-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-30 group-hover:opacity-10 transition-opacity" />
              </div>

              <span className="text-base font-bold text-white/90 transition-colors group-hover:text-cyan-400 capitalize text-center tracking-wide">
                {category.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
