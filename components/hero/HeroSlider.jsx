"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowDownRight } from "lucide-react";
import { Autoplay, EffectFade, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { heroSlides } from "@/lib/heroSlides";
import "swiper/css";
import "swiper/css/effect-fade";

export default function HeroSlider() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [finishes, setFinishes] = useState({}); // { [slideId]: finishIndex }

  const finishIndexOf = (slide) => finishes[slide.id] ?? 0;
  const activeSlide = heroSlides[activeIndex];
  const activeFinish = activeSlide.colors[finishIndexOf(activeSlide)];

  const selectFinish = (slideId, index) =>
    setFinishes((current) => ({ ...current, [slideId]: index }));

  return (
    <section
      aria-label="Featured phones"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#030308] text-white"
      style={{ "--slide-accent": activeFinish.value }}
    >
      <h1 className="sr-only">NOVA — Latest phones</h1>

      {/* Accent glow follows the selected finish */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_38%,color-mix(in_srgb,var(--slide-accent)_16%,transparent),transparent_25%),radial-gradient(circle_at_16%_86%,rgba(6,214,160,0.13),transparent_28%)]"
      />

      <Swiper
        modules={[Autoplay, EffectFade, Keyboard]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={900}
        autoplay={{
          delay: 6500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true, // don't switch slides while the user is choosing a color
        }}
        keyboard={{ enabled: true }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="min-h-[100svh]"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <Slide
              slide={slide}
              finishIndex={finishIndexOf(slide)}
              onSelectFinish={(i) => selectFinish(slide.id, i)}
              priority={index === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-5 z-20 flex items-center gap-1 sm:left-8 lg:left-14 xl:left-20">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Show ${slide.name}`}
            aria-current={i === activeIndex}
            onClick={() => swiperRef.current?.slideToLoop(i)}
            className="group flex h-6 items-center px-0.5 focus-visible:outline-none"
          >
            <span
              className={`h-1 rounded-full transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-white/60 ${
                i === activeIndex
                  ? "w-8 bg-[var(--slide-accent)]"
                  : "w-3 bg-white/25 group-hover:bg-white/50"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

function FinishPicker({ slide, finishIndex, onSelect, className = "" }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {slide.colors.map((color, i) => (
        <button
          key={color.name}
          type="button"
          aria-label={`Select ${color.name}`}
          aria-pressed={i === finishIndex}
          onClick={() => onSelect(i)}
          className={`flex h-11 w-11 items-center justify-center rounded-full transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 lg:h-9 lg:w-9 ${
            i === finishIndex
              ? "ring-1 ring-white ring-offset-4 ring-offset-[#030308]"
              : "hover:scale-110"
          }`}
        >
          <span
            className="h-7 w-7 rounded-full border border-white/20"
            style={{ backgroundColor: color.value }}
          />
        </button>
      ))}
      <span className="ml-1 text-sm text-white/60">
        {slide.colors[finishIndex].name}
      </span>
    </div>
  );
}

function Slide({ slide, finishIndex, onSelectFinish, priority }) {
  const finish = slide.colors[finishIndex];

  return (
    <article className="relative mx-auto flex min-h-[100svh] max-w-[1600px] flex-col px-5 pb-16 pt-5 sm:px-8 sm:pt-9 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(520px,1.1fr)] lg:grid-rows-[1fr_auto] lg:px-14 lg:pb-16 lg:pt-10 xl:px-20">
      {/* Image + (mobile) finish picker: the color change is visible right where you tap */}
      <div className="order-first flex flex-col lg:order-none lg:col-start-2 lg:row-start-1">
        <div className="relative min-h-[36svh] flex-1 overflow-hidden sm:min-h-[44svh] lg:min-h-0">
          <div
            aria-hidden="true"
            className="absolute inset-[7%_0_6%_4%] rounded-[2rem] bg-white/[0.025]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-[16%] bottom-[9%] h-16 rounded-[100%] bg-black/65 blur-2xl"
          />
          <div className="absolute inset-[2%_0_0_0]">
            <Image
              fill
              priority={priority && finishIndex === 0}
              sizes="(max-width: 1024px) 100vw, 52vw"
              src={finish.image}
              alt={`${slide.name} in ${finish.name}`}
              className={`object-contain drop-shadow-[30px_45px_50px_rgba(0,0,0,0.5)] ${slide.imageClassName ?? ""}`}
            />
          </div>
        </div>

        <FinishPicker
          slide={slide}
          finishIndex={finishIndex}
          onSelect={onSelectFinish}
          className="mt-3 justify-center lg:hidden"
        />
      </div>

      {/* Text column */}
      <div className="relative z-10 flex max-w-xl flex-col justify-center py-8 lg:row-start-1 lg:py-0">
        <h2 className="max-w-[10ch] text-balance text-[clamp(2.6rem,7vw,7rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
          {slide.name}
        </h2>
        <p className="mt-4 line-clamp-3 max-w-[53ch] text-base leading-7 text-white/65 sm:mt-7 sm:line-clamp-none sm:text-lg">
          {slide.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-xs font-semibold tracking-[0.08em] text-white/55 sm:mt-9 sm:text-sm">
          {slide.specs.map((spec) => (
            <li key={spec}>{spec}</li>
          ))}
        </ul>

        <p className="mt-6 flex items-end gap-4 sm:mt-10">
          <span className="text-sm font-medium text-white/45">From</span>
          <strong className="text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
            {slide.price}
          </strong>
        </p>

        {/* Desktop finish picker */}
        <div className="mt-8 hidden lg:block">
          <p className="text-sm text-white/45">Select a finish</p>
          <FinishPicker
            slide={slide}
            finishIndex={finishIndex}
            onSelect={onSelectFinish}
            className="mt-3"
          />
        </div>

        <button
          type="button"
          onClick={() =>
            document
              .getElementById("products")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="group mt-6 flex w-fit items-center gap-3 text-sm font-semibold transition hover:text-white/65 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 sm:mt-10"
        >
          Explore the store
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition duration-300 group-hover:translate-y-1 group-hover:border-white/60">
            <ArrowDownRight className="h-4 w-4" />
          </span>
        </button>
      </div>
    </article>
  );
}
