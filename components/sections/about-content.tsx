"use client";

import { Sparkles, ShieldCheck, Sprout, HeartHandshake, Award } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-provider";
import { pick } from "@/lib/i18n/types";
import type { getAboutContent } from "@/lib/cms/about";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/sections/page-hero";
import { BotanicalPattern } from "@/components/icons/botanical";

const valueIcons = [Sparkles, ShieldCheck, Sprout, HeartHandshake];

export function AboutContent({ content }: { content: Awaited<ReturnType<typeof getAboutContent>> }) {
  const { locale } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow={pick(content.eyebrow, locale)}
        title={pick(content.heading, locale)}
        description={pick(content.subheading, locale)}
      />

      <section className="py-16 md:py-24">
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div className="relative order-2 flex aspect-square items-center justify-center lg:order-1">
            <BotanicalPattern className="h-3/4 w-3/4 text-primary" />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading title={pick(content.storyHeading, locale)} />
            <div className="mt-5 space-y-4">
              {content.storyBody.map((paragraph) => (
                <p key={pick(paragraph, locale)} className="text-sm leading-relaxed text-ink/75">
                  {pick(paragraph, locale)}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-ink py-16 md:py-24">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 80% 30%, rgba(79,142,131,0.28), transparent 55%), linear-gradient(180deg, #0f2420 0%, #163832 100%)",
          }}
          aria-hidden="true"
        />
        <Container className="relative mx-auto max-w-2xl text-center">
          <SectionHeading
            align="center"
            eyebrow=""
            title={pick(content.missionHeading, locale)}
            description={pick(content.missionBody, locale)}
            tone="dark"
            className="mx-auto"
          />
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading align="center" title={pick(content.valuesHeading, locale)} className="mx-auto" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.values.map((value, index) => {
              const Icon = valueIcons[index % valueIcons.length];
              return (
                <div
                  key={pick(value.title, locale)}
                  className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft"
                >
                  <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-serif-display mt-4 text-lg text-ink">{pick(value.title, locale)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pick(value.body, locale)}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-muted/50 py-16 md:py-24">
        <Container>
          <SectionHeading align="center" title={pick(content.timelineHeading, locale)} className="mx-auto" />
          <ol className="relative mt-14 space-y-10 border-l border-border pl-8 sm:mx-auto sm:max-w-2xl">
            {content.timeline.map((item) => (
              <li key={pick(item.title, locale)} className="relative">
                <span className="absolute -left-[2.35rem] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-background" />
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent">{pick(item.year, locale)}</p>
                <h3 className="font-serif-display mt-1 text-lg text-ink">{pick(item.title, locale)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{pick(item.body, locale)}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
            <Award className="h-6 w-6" aria-hidden="true" />
          </span>
          <h2 className="font-serif-display text-2xl text-ink">{pick(content.certHeading, locale)}</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{pick(content.certBody, locale)}</p>
        </Container>
      </section>
    </>
  );
}
