"use client";

import Image from "next/image";
import { Leaf, Droplets, Recycle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-provider";
import { pick } from "@/lib/i18n/types";
import type { getHomeContent } from "@/lib/cms/home-content";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { BlobShape, BotanicalPattern } from "@/components/icons/botanical";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const pointIcons = [Leaf, Droplets, Recycle];

type Content = Awaited<ReturnType<typeof getHomeContent>>;

export function Philosophy({
  image,
  heading,
  body,
  points,
}: {
  image?: string | null;
  heading: Content["philosophyHeading"];
  body: Content["philosophyBody"];
  points: Content["philosophyPoints"];
}) {
  const { dict, locale } = useLanguage();

  return (
    <section className="bg-muted/60 py-20 md:py-28">
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <ScrollReveal direction="left" className="relative order-2 flex aspect-square items-center justify-center lg:order-1">
          {image ? (
            <Image
              src={image}
              alt=""
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="rounded-[2rem] object-cover"
            />
          ) : (
            <>
              <BlobShape color="var(--color-primary)" className="absolute inset-0 h-full w-full opacity-10" />
              <BotanicalPattern className="h-3/4 w-3/4 text-primary" />
            </>
          )}
        </ScrollReveal>

        <ScrollReveal direction="right" className="order-1 lg:order-2">
          <SectionHeading
            eyebrow={dict.home.philosophyEyebrow}
            title={pick(heading, locale)}
            description={pick(body, locale)}
          />

          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {points.map((point, index) => {
              const Icon = pointIcons[index % pointIcons.length];
              const label = pick(point, locale);
              if (!label) return null;
              return (
                <li
                  key={index}
                  className="flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium text-ink">{label}</span>
                </li>
              );
            })}
          </ul>

          <Button href="/ve-chung-toi" variant="outline" className="mt-8">
            {dict.home.philosophyCta}
          </Button>
        </ScrollReveal>
      </Container>
    </section>
  );
}
