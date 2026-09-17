"use client";

import { useRef, useState } from "react";
import { ArrowDownRight, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Autoplay, EffectFade, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";

const iPhoneProMaxFinishes = [
  { name: "Black", value: "#23252a", image: "/iphone/black.png" },
  { name: "Glacier Blue", value: "#9eb7d7", image: "/iphone/blue.png" },
  { name: "Burgundy", value: "#713641", image: "/iphone/red.png" },
  { name: "Silver", value: "#ededeb", image: "/iphone/white.png" },
];
const iPhoneProFinishes = [
  { name: "Silver", value: "#ededeb", image: "/iphone/white.png" },
  { name: "Glacier Blue", value: "#9eb7d7", image: "/iphone/blue.png" },
  { name: "Black", value: "#23252a", image: "/iphone/black.png" },
  { name: "Burgundy", value: "#713641", image: "/iphone/red.png" },
];
const dueFinishes = [
  {
    name: "Star White",
    value: "#ededeb",
    image: "/due/white.png",
  },
  {
    name: "Night Sky",
    value: "#23252a",
    image: "/due/black.png",
  },
];

const slides = [
  {
    id: "pro-max",
    name: "iPhone 18 Pro Max",
    description:
      "Titanium precision, an uncompromised camera system, and the A20 Pro at its most capable.",
    price: "$1,199",
    specs: ["A20 Pro", "6.9-inch XDR OLED", "48MP Pro camera system"],
    colors: iPhoneProMaxFinishes,
  },
  {
    id: "pro",
    name: "iPhone 18 Pro",
    description:
      "A smaller Pro, calibrated for the hand and engineered for every demanding frame.",
    price: "$1,099",
    specs: ["A20 Pro", "6.3-inch XDR OLED", "120Hz ProMotion"],
    colors: iPhoneProFinishes,
  },
  {
    id: "duo",
    name: "iPhone Duo",
    description:
      "The next frontier unfolds: a continuous display, precise haptics, and an entirely new canvas.",
    price: "$1,599",
    specs: ["A20 Pro", "Dual OLED displays", "Titanium Flex"],
    colors: dueFinishes,
  },
];

export default function HeroSlider({ onExplore }) {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedFinishes, setSelectedFinishes] = useState({});
  const activeSlide = slides[activeIndex] ?? slides[0];
  const selectedFinish = selectedFinishes[activeSlide.id] ?? 0;
  const activeFinish = getFinish(activeSlide, selectedFinish);

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#030308] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_38%,color-mix(in_srgb,var(--slide-accent)_16%,transparent),transparent_25%),radial-gradient(circle_at_16%_86%,rgba(6,214,160,0.13),transparent_28%)]"
        style={{ "--slide-accent": activeFinish.value }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/15" />

      <Swiper
        modules={[Autoplay, EffectFade, Keyboard]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={900}
        autoplay={{ delay: 6500, disableOnInteraction: false }}
        keyboard={{ enabled: true }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="min-h-[100svh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <article className="relative mx-auto grid min-h-[100svh] max-w-[1600px] grid-rows-[auto_1fr_auto] px-5 pb-7 pt-7 sm:px-8 sm:pb-9 sm:pt-9 lg:grid-cols-[minmax(0,0.9fr)_minmax(520px,1.1fr)] lg:grid-rows-[1fr_auto] lg:px-14 lg:pb-10 lg:pt-10 xl:px-20">
              <div className="relative z-10 flex max-w-xl flex-col justify-center py-12 lg:row-start-1 lg:py-0">
                <h1 className="mt-6 max-w-[10ch] text-balance text-[clamp(3.4rem,7vw,7rem)] font-extrabold leading-[0.88] tracking-[-0.04em] text-white">
                  {slide.name}
                </h1>
                <p className="mt-7 max-w-[53ch] text-base leading-7 text-white/65 sm:text-lg">
                  {slide.description}
                </p>

                <div className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold tracking-[0.08em] text-white/55 sm:text-sm">
                  {slide.specs.map((spec) => (
                    <span key={spec}>{spec}</span>
                  ))}
                </div>

                <div className="mt-12 flex items-end gap-4">
                  <span className="text-sm font-medium text-white/45">
                    From
                  </span>
                  <strong className="text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl">
                    {slide.price}
                  </strong>
                </div>

                <div className="mt-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
                    Select a finish
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    {slide.colors.map((color, colorIndex) => {
                      const isSelected =
                        (selectedFinishes[slide.id] ?? 0) === colorIndex;
                      return (
                        <button
                          key={color.name}
                          type="button"
                          aria-label={`Select ${color.name}`}
                          aria-pressed={isSelected}
                          onClick={() =>
                            setSelectedFinishes((current) => ({
                              ...current,
                              [slide.id]: colorIndex,
                            }))
                          }
                          className={`flex h-9 w-9 items-center justify-center rounded-full transition duration-300 ${
                            isSelected
                              ? "ring-1 ring-white ring-offset-4 ring-offset-[#030308]"
                              : "hover:scale-110"
                          }`}
                        >
                          <span
                            className="h-7 w-7 rounded-full border border-white/20"
                            style={{ backgroundColor: color.value }}
                          />
                        </button>
                      );
                    })}
                    <span className="ml-1 text-sm text-white/60">
                      {getFinish(slide, selectedFinishes[slide.id] ?? 0).name}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onExplore}
                  className="group mt-10 flex w-fit items-center gap-3 text-sm font-semibold text-white transition hover:text-white/65"
                >
                  Explore the store
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition duration-300 group-hover:translate-y-1 group-hover:border-white/60">
                    <ArrowDownRight className="h-4 w-4" />
                  </span>
                </button>
              </div>

              <div className="relative order-first min-h-[42svh] overflow-hidden sm:min-h-[46svh] lg:order-none lg:col-start-2 lg:row-start-1 lg:min-h-0">
                <ProductRender
                  slide={slide}
                  finishIndex={selectedFinishes[slide.id] ?? 0}
                />
              </div>

              <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-5 lg:col-span-2">
                <p className="text-xs font-medium tracking-[0.14em] text-white/45">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(slides.length).padStart(2, "0")}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-white/40 hover:bg-white hover:text-black"
                    aria-label="Previous product"
                  >
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
                  </button>
                  <button
                    type="button"
                    onClick={() => swiperRef.current?.slideNext()}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition hover:scale-105"
                    aria-label="Next product"
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                  </button>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

function ProductRender({ slide, finishIndex }) {
  const finish = getFinish(slide, finishIndex);

  return (
    <div
      className="absolute inset-0"
      aria-label={`${slide.name} in ${finish.name}`}
      role="img"
    >
      <div className="absolute inset-[7%_0_6%_4%] rounded-[2rem] bg-white/[0.025]" />
      <div className="absolute inset-x-[16%] bottom-[9%] h-20 rounded-[100%] bg-black/65 blur-2xl" />
      <div className="absolute inset-[2%_0_0_0] transition-opacity duration-500">
        <Image
          fill
          priority={slide.id === "pro-max" && finishIndex === 0}
          sizes="(max-width: 1024px) 100vw, 52vw"
          src={finish.image}
          alt={`${slide.name} in ${finish.name}`}
          className="object-contain drop-shadow-[30px_45px_50px_rgba(0,0,0,0.5)]"
        />
      </div>
    </div>
  );
}

function getFinish(slide, finishIndex) {
  return slide.colors[finishIndex] ?? slide.colors[0];
}
