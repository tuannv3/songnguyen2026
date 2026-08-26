"use client";

import { Quote, Star } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-provider";
import { pick } from "@/lib/i18n/types";
import type { getHomeContent } from "@/lib/cms/home-content";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const revealDirections = ["left", "up", "right"] as const;

type Content = Awaited<ReturnType<typeof getHomeContent>>;

export function Testimonials({
  heading,
  testimonials,
}: {
  heading: Content["testimonialsHeading"];
  testimonials: Content["testimonials"];
}) {
  const { dict, locale } = useLanguage();

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <ScrollReveal direction="up">
          <SectionHeading
            align="center"
            eyebrow={dict.home.testimonialsEyebrow}
            title={pick(heading, locale)}
            className="mx-auto"
          />
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <ScrollReveal key={item.name} direction={revealDirections[index % 3]} delay={index * 100}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-soft">
                <Quote className="h-7 w-7 text-accent/60" aria-hidden="true" />
                <div className="mt-3 flex gap-0.5 text-accent" aria-label={`${item.rating} out of 5 stars`}>
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/80">
                  “{pick(item.quote, locale)}”
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <p className="font-serif-display text-base text-ink">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{pick(item.role, locale)}</p>
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
