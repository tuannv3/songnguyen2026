"use client";

import Image from "next/image";
import { FlaskConical, ShieldCheck, Sparkles, Leaf, HeartHandshake, Compass, Award, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-provider";
import { pick } from "@/lib/i18n/types";
import type { getAboutContent } from "@/lib/cms/about";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/sections/page-hero";
import { BotanicalPattern } from "@/components/icons/botanical";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const valueIcons = [FlaskConical, ShieldCheck, Sparkles, Leaf, HeartHandshake, Compass];

export function AboutContent({ content }: { content: Awaited<ReturnType<typeof getAboutContent>> }) {
  const { locale } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow={pick(content.eyebrow, locale)}
        title={pick(content.heading, locale)}
        description={pick(content.subheading, locale)}
      />

      {content.storySubheading.vi || content.storySubheading.en ? (
        <section className="py-14 md:py-20">
          <Container className="mx-auto max-w-2xl text-center">
            <ScrollReveal direction="up">
              <p className="font-serif-display text-2xl italic leading-snug text-ink md:text-3xl">
                “{pick(content.storySubheading, locale)}”
              </p>
            </ScrollReveal>
          </Container>
        </section>
      ) : null}

      {content.storySections.length > 0 ? (
        <section className="pb-8 md:pb-12">
          <Container>
            <ScrollReveal direction="up">
              <SectionHeading title={pick(content.storyHeading, locale)} className="mx-auto max-w-xl text-center" align="center" />
            </ScrollReveal>

            <div className="mt-14 space-y-20 md:space-y-28">
              {content.storySections.map((section, index) => {
                const reversed = index % 2 === 1;
                return (
                  <div
                    key={pick(section.heading, locale) || index}
                    className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
                  >
                    <ScrollReveal
                      direction={reversed ? "right" : "left"}
                      className={`relative order-2 flex aspect-[4/5] items-center justify-center ${reversed ? "lg:order-2" : "lg:order-1"}`}
                    >
                      {section.image ? (
                        <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
                          <Image
                            src={section.image}
                            alt=""
                            fill
                            sizes="(min-width: 1024px) 45vw, 90vw"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex h-full w-full items-center justify-center rounded-[2rem] bg-muted">
                          <BotanicalPattern className="h-1/2 w-1/2 text-primary" />
                        </div>
                      )}
                      {(section.caption.vi || section.caption.en) && (
                        <p className="absolute inset-x-4 bottom-4 rounded-full bg-ink/70 px-4 py-2 text-center text-xs text-white backdrop-blur-sm">
                          {pick(section.caption, locale)}
                        </p>
                      )}
                    </ScrollReveal>

                    <ScrollReveal
                      direction={reversed ? "left" : "right"}
                      className={`order-1 ${reversed ? "lg:order-1" : "lg:order-2"}`}
                    >
                      {(section.heading.vi || section.heading.en) && (
                        <h3 className="font-serif-display text-2xl text-ink md:text-[1.75rem]">
                          {pick(section.heading, locale)}
                        </h3>
                      )}
                      <div className="mt-4 space-y-4">
                        {section.body.map((paragraph) => (
                          <p key={pick(paragraph, locale)} className="text-sm leading-relaxed text-ink/75">
                            {pick(paragraph, locale)}
                          </p>
                        ))}
                      </div>
                    </ScrollReveal>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      ) : null}

      {(content.visionTagline.vi || content.visionTagline.en) && (
        <section className="relative overflow-hidden bg-ink py-16 md:py-24">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 20% 20%, rgba(79,142,131,0.25), transparent 55%), linear-gradient(180deg, #0f2420 0%, #163832 100%)",
            }}
            aria-hidden="true"
          />
          <Container className="relative mx-auto max-w-3xl text-center">
            <ScrollReveal direction="up">
              <p className="font-serif-display text-3xl text-white md:text-4xl">{pick(content.visionTagline, locale)}</p>
              {(content.visionSubtitle.vi || content.visionSubtitle.en) && (
                <p className="mt-3 text-sm uppercase tracking-[0.3em] text-accent-light">
                  {pick(content.visionSubtitle, locale)}
                </p>
              )}
            </ScrollReveal>
            {content.visionPoints.length > 0 && (
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {content.visionPoints.map((point, i) => (
                  <ScrollReveal key={pick(point, locale)} direction="up" delay={i * 80}>
                    <p className="rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/80">
                      {pick(point, locale)}
                    </p>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </Container>
        </section>
      )}

      <section className="py-16 md:py-24">
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <ScrollReveal direction="left" className="order-2 lg:order-1">
            <SectionHeading eyebrow="" title={pick(content.missionHeading, locale)} />
            <p className="mt-4 font-serif-display text-lg italic leading-snug text-ink">
              “{pick(content.missionBody, locale)}”
            </p>
            {(content.missionIntro.vi || content.missionIntro.en) && (
              <p className="mt-4 text-sm leading-relaxed text-ink/75">{pick(content.missionIntro, locale)}</p>
            )}
            {content.missionGoals.length > 0 && (
              <ul className="mt-6 space-y-3">
                {content.missionGoals.map((goal) => (
                  <li key={pick(goal, locale)} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink/75">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {pick(goal, locale)}
                  </li>
                ))}
              </ul>
            )}
          </ScrollReveal>

          <ScrollReveal direction="right" className="relative order-1 flex aspect-square items-center justify-center lg:order-2">
            {content.missionImage ? (
              <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
                <Image src={content.missionImage} alt="" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
              </div>
            ) : (
              <BotanicalPattern className="h-3/4 w-3/4 text-primary" />
            )}
            {(content.missionImageCaption.vi || content.missionImageCaption.en) && content.missionImage && (
              <p className="absolute inset-x-4 bottom-4 rounded-full bg-ink/70 px-4 py-2 text-center text-xs text-white backdrop-blur-sm">
                {pick(content.missionImageCaption, locale)}
              </p>
            )}
          </ScrollReveal>
        </Container>
      </section>

      <section className="bg-muted/50 py-16 md:py-24">
        <Container>
          <ScrollReveal direction="up">
            <SectionHeading align="center" title={pick(content.valuesHeading, locale)} className="mx-auto" />
          </ScrollReveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {content.values.map((value, index) => {
              const Icon = valueIcons[index % valueIcons.length];
              return (
                <ScrollReveal key={pick(value.title, locale)} direction="up" delay={index * 60}>
                  <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-serif-display mt-4 text-lg text-ink">{pick(value.title, locale)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pick(value.body, locale)}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <ScrollReveal direction="up">
            <SectionHeading align="center" title={pick(content.timelineHeading, locale)} className="mx-auto" />
          </ScrollReveal>
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

      {(content.promiseLines.length > 0 || content.promiseClosing.vi || content.promiseClosing.en) && (
        <section className="relative overflow-hidden bg-ink py-16 md:py-24">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 80% 30%, rgba(79,142,131,0.25), transparent 55%), linear-gradient(180deg, #0f2420 0%, #163832 100%)",
            }}
            aria-hidden="true"
          />
          <Container className="relative mx-auto max-w-2xl text-center">
            <ScrollReveal direction="up">
              {(content.promiseHeading.vi || content.promiseHeading.en) && (
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent-light">
                  {pick(content.promiseHeading, locale)}
                </p>
              )}
              {content.promiseLines.length > 0 && (
                <div className="mt-6 space-y-2">
                  {content.promiseLines.map((line) => (
                    <p key={pick(line, locale)} className="font-serif-display text-xl text-white md:text-2xl">
                      {pick(line, locale)}
                    </p>
                  ))}
                </div>
              )}
              {(content.promiseClosing.vi || content.promiseClosing.en) && (
                <p className="mt-6 text-sm leading-relaxed text-white/70">{pick(content.promiseClosing, locale)}</p>
              )}
            </ScrollReveal>
          </Container>
        </section>
      )}

      <section className="py-16 md:py-20">
        <Container className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
            <Award className="h-6 w-6" aria-hidden="true" />
          </span>
          <h2 className="font-serif-display text-2xl text-ink">{pick(content.certHeading, locale)}</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{pick(content.certBody, locale)}</p>

          {content.certImages.length > 0 ? (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
              {content.certImages.map((url) => (
                <div
                  key={url}
                  className="relative h-32 w-32 overflow-hidden rounded-xl border border-border bg-card shadow-soft sm:h-40 sm:w-40"
                >
                  <Image src={url} alt="" fill className="object-contain p-2" />
                </div>
              ))}
            </div>
          ) : null}
        </Container>
      </section>
    </>
  );
}
