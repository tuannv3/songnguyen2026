"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n/language-provider";
import { heroSlides } from "@/lib/data/hero-slides";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ProductBottle } from "@/components/icons/product-bottle";

const AUTOPLAY_MS = 6000;

const stats: { value: string; key: "statBrands" | "statProducts" | "statClients" | "statOrigin" }[] = [
  { value: "5+", key: "statBrands" },
  { value: "12+", key: "statProducts" },
  { value: "80+", key: "statClients" },
  { value: "6", key: "statOrigin" },
];

export function Hero() {
  const { dict, locale } = useLanguage();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slideCount = heroSlides.length;

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % slideCount) + slideCount) % slideCount);
    },
    [slideCount]
  );

  useEffect(() => {
    if (paused) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slideCount);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, slideCount]);

  return (
    <section
      className="relative overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label={dict.carousel.regionLabel}
    >
      <div className="relative flex w-full overflow-hidden">
        <div
          className="flex w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {heroSlides.map((slide, slideIndex) => {
            const active = slideIndex === index;
            return (
              <div
                key={slide.title.vi}
                className="relative w-full shrink-0"
                aria-hidden={!active}
                inert={!active ? true : undefined}
                role="group"
                aria-roledescription="slide"
                aria-label={`${slideIndex + 1} / ${slideCount}`}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at 15% 20%, ${slide.glowColor}, transparent 45%), radial-gradient(circle at 85% 0%, rgba(79,142,131,0.28), transparent 50%), linear-gradient(160deg, #0f2420 10%, #14302b 55%, #1c3f38 100%)`,
                  }}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay" aria-hidden="true">
                  <svg width="100%" height="100%">
                    <pattern id={`grain-${slideIndex}`} width="3" height="3" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="0.6" fill="white" />
                    </pattern>
                    <rect width="100%" height="100%" fill={`url(#grain-${slideIndex})`} />
                  </svg>
                </div>

                <Container className="relative flex flex-col items-center gap-14 py-24 md:py-32 lg:flex-row lg:items-center lg:gap-10 lg:py-36">
                  <div className="max-w-xl text-center lg:text-left">
                    <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.3em] text-accent-light">
                      {slide.eyebrow[locale]}
                    </p>
                    <h1 className="font-serif-display text-4xl leading-[1.1] text-white text-balance md:text-5xl lg:text-6xl">
                      {slide.title[locale]}
                    </h1>
                    <p className="mt-6 text-base leading-relaxed text-white/70 md:text-lg">
                      {slide.subtitle[locale]}
                    </p>
                    <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                      <Button href={slide.ctaPrimary.href} size="lg" tabIndex={active ? 0 : -1}>
                        {slide.ctaPrimary.label[locale]}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      {slide.ctaSecondary ? (
                        <Button
                          href={slide.ctaSecondary.href}
                          variant="outline"
                          size="lg"
                          tabIndex={active ? 0 : -1}
                          className="text-white border-white/25 hover:bg-white/10"
                        >
                          {slide.ctaSecondary.label[locale]}
                        </Button>
                      ) : null}
                    </div>
                  </div>

                  <div className="relative flex w-full max-w-md items-center justify-center lg:max-w-lg">
                    <div className="absolute h-72 w-72 rounded-full bg-primary-light/20 blur-3xl" aria-hidden="true" />
                    <div className="relative grid grid-cols-2 gap-5 md:gap-8">
                      <ProductBottle
                        color={slide.bottleColors[0]}
                        className="h-64 w-auto translate-y-6 drop-shadow-2xl md:h-80"
                      />
                      <ProductBottle
                        color={slide.bottleColors[1]}
                        className="h-52 w-auto -translate-y-4 drop-shadow-2xl md:h-64"
                      />
                    </div>
                  </div>
                </Container>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label={dict.carousel.previousSlide}
          className="absolute left-3 top-1/2 hidden -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/5 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:flex md:left-6"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label={dict.carousel.nextSlide}
          className="absolute right-3 top-1/2 hidden -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/5 p-2.5 text-white backdrop-blur-sm transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:flex md:right-6"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="relative z-10 flex items-center justify-center gap-2 pb-6">
        {heroSlides.map((slide, slideIndex) => (
          <button
            key={slide.title.vi}
            type="button"
            onClick={() => goTo(slideIndex)}
            aria-label={`${dict.carousel.goToSlide} ${slideIndex + 1}`}
            aria-current={slideIndex === index}
            className={clsx(
              "h-1.5 cursor-pointer rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              slideIndex === index ? "w-7 bg-accent" : "w-1.5 bg-white/30 hover:bg-white/50"
            )}
          />
        ))}
      </div>

      <Container className="relative z-10 pb-12 md:pb-16">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-8 sm:grid-cols-4 lg:gap-x-8">
          {stats.map((stat) => (
            <div key={stat.key} className="text-center">
              <dt className="sr-only">{dict.home[stat.key]}</dt>
              <dd className="font-serif-display text-3xl text-accent-light">{stat.value}</dd>
              <p className="mt-1 text-xs leading-snug text-white/55">{dict.home[stat.key]}</p>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
