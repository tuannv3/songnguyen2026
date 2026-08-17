"use client";

import { Gift, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-provider";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function CorporateTeaser() {
  const { dict } = useLanguage();

  return (
    <section className="py-4 md:py-6">
      <Container>
        <ScrollReveal
          direction="up"
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-dark via-primary to-primary-light px-8 py-14 text-white md:px-16 md:py-20"
        >
          <div
            className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/25 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
              <Gift className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent-light">
              {dict.home.corporateEyebrow}
            </p>
            <h2 className="font-serif-display text-3xl leading-tight text-balance md:text-4xl">
              {dict.home.corporateHeading}
            </h2>
            <p className="max-w-xl text-white/75">{dict.home.corporateBody}</p>
            <Button href="/qua-tang-doanh-nghiep" variant="secondary" size="lg" className="mt-2">
              {dict.home.corporateCta}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
