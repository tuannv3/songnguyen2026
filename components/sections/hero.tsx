"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n/language-provider";
import { heroSlides } from "@/lib/data/hero-slides";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ProductBottle } from "@/components/icons/product-bottle";

const AUTOPLAY_MS = 6000;
const WORD_BASE_DELAY = 0.1;
const WORD_STEP = 0.06;

const stats: { value: string; key: "statBrands" | "statProducts" | "statClients" | "statOrigin" }[] = [
  { value: "5+", key: "statBrands" },
  { value: "12+", key: "statProducts" },
  { value: "80+", key: "statClients" },
  { value: "6", key: "statOrigin" },
];

function AnimatedTitle({ text, active, className }: { text: string; active: boolean; className?: string }) {
  const words = text.split(" ");
  return (
    <h1 className={clsx("flex flex-wrap overflow-hidden", className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className={clsx(
            "mr-[0.28em] inline-block",
            active ? "animate-word-reveal" : "translate-y-[110%] opacity-0 blur-[4px]"
          )}
          style={active ? { animationDelay: `${WORD_BASE_DELAY + i * WORD_STEP}s` } : undefined}
        >
          {word}
        </span>
      ))}
    </h1>
  );
}

function RevealUp({
  active,
  delay,
  className,
  children,
}: {
  active: boolean;
  delay: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={clsx(className, active ? "animate-reveal-up" : "translate-y-[30px] opacity-0 blur-[4px]")}
      style={active ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

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
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label={dict.carousel.regionLabel}
    >
      <div className="relative min-h-[900px] w-full overflow-hidden sm:min-h-[760px] lg:min-h-[680px]">
        {heroSlides.map((slide, slideIndex) => {
          const active = slideIndex === index;
          return (
            <div
              key={slide.title.vi}
              className={clsx(
                "inset-0 transition-opacity ease-out",
                active
                  ? "relative z-10 opacity-100 duration-1000"
                  : "absolute z-0 opacity-0 duration-700 pointer-events-none"
              )}
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
                  <RevealUp
                    active={active}
                    delay={0}
                    className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.3em] text-accent-light"
                  >
                    {slide.eyebrow[locale]}
                  </RevealUp>
                  <AnimatedTitle
                    text={slide.title[locale]}
                    active={active}
                    className="font-serif-display justify-center text-4xl leading-[1.1] text-white text-balance md:text-5xl lg:justify-start lg:text-6xl"
                  />
                  <RevealUp
                    active={active}
                    delay={0.5}
                    className="mt-6 text-base leading-relaxed text-white/70 md:text-lg"
                  >
                    {slide.subtitle[locale]}
                  </RevealUp>
                  <RevealUp
                    active={active}
                    delay={0.65}
                    className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
                  >
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
                  </RevealUp>
                </div>

                <div className="relative flex w-full max-w-md items-center justify-center lg:max-w-lg">
                  <div className="absolute h-72 w-72 rounded-full bg-primary-light/20 blur-3xl" aria-hidden="true" />
                  {slide.image ? (
                    <div
                      className={clsx(
                        "hero-visual relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] ring-1 ring-white/15 shadow-2xl",
                        active && "is-active"
                      )}
                    >
                      <Image
                        src={slide.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 32vw, 80vw"
                        className="object-contain"
                        priority={slideIndex === 0}
                      />
                    </div>
                  ) : (
                    <div className={clsx("hero-visual relative grid grid-cols-2 gap-5 md:gap-8", active && "is-active")}>
                      <ProductBottle
                        color={slide.bottleColors[0]}
                        className="h-64 w-auto translate-y-6 drop-shadow-2xl md:h-80"
                      />
                      <ProductBottle
                        color={slide.bottleColors[1]}
                        className="h-52 w-auto -translate-y-4 drop-shadow-2xl md:h-64"
                      />
                    </div>
                  )}
                </div>
              </Container>
            </div>
          );
        })}

      </div>

      <div className="relative z-10 flex items-center justify-center gap-4 pb-6">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label={dict.carousel.previousSlide}
          className="hidden cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/5 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:flex"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2">
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

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label={dict.carousel.nextSlide}
          className="hidden cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/5 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:flex"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
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
