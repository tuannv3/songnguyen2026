"use client";

import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-provider";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ProductBottle } from "@/components/icons/product-bottle";

const stats: { value: string; key: "statBrands" | "statProducts" | "statClients" | "statOrigin" }[] = [
  { value: "5+", key: "statBrands" },
  { value: "12+", key: "statProducts" },
  { value: "80+", key: "statClients" },
  { value: "6", key: "statOrigin" },
];

export function Hero() {
  const { dict } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-ink">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 15% 20%, rgba(182,146,79,0.18), transparent 45%), radial-gradient(circle at 85% 0%, rgba(79,142,131,0.35), transparent 50%), linear-gradient(160deg, #0f2420 10%, #14302b 55%, #1c3f38 100%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 opacity-[0.07] mix-blend-overlay" aria-hidden="true">
        <svg width="100%" height="100%">
          <pattern id="grain" width="3" height="3" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.6" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grain)" />
        </svg>
      </div>

      <Container className="relative flex flex-col items-center gap-14 py-24 md:py-32 lg:flex-row lg:items-center lg:gap-10 lg:py-36">
        <div className="max-w-xl text-center lg:text-left animate-fade-up">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.3em] text-accent-light">
            {dict.home.heroEyebrow}
          </p>
          <h1 className="font-serif-display text-4xl leading-[1.1] text-white text-balance md:text-5xl lg:text-6xl">
            {dict.home.heroTitle}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-white/70 md:text-lg">
            {dict.home.heroSubtitle}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Button href="/san-pham" size="lg">
              {dict.home.heroCtaPrimary}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/ve-chung-toi" variant="outline" size="lg" className="text-white border-white/25 hover:bg-white/10">
              {dict.home.heroCtaSecondary}
            </Button>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-8 sm:grid-cols-4 lg:gap-x-8">
            {stats.map((stat) => (
              <div key={stat.key} className="text-center lg:text-left">
                <dt className="sr-only">{dict.home[stat.key]}</dt>
                <dd className="font-serif-display text-3xl text-accent-light">{stat.value}</dd>
                <p className="mt-1 text-xs leading-snug text-white/55">{dict.home[stat.key]}</p>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative flex w-full max-w-md items-center justify-center lg:max-w-lg animate-fade-in">
          <div className="absolute h-72 w-72 rounded-full bg-primary-light/20 blur-3xl" aria-hidden="true" />
          <div className="relative grid grid-cols-2 gap-5 md:gap-8">
            <ProductBottle
              color="#8FB3A8"
              className="h-64 w-auto translate-y-6 drop-shadow-2xl md:h-80"
            />
            <ProductBottle
              color="#B6924F"
              className="h-52 w-auto -translate-y-4 drop-shadow-2xl md:h-64"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
