"use client";

import { useState } from "react";
import { MapPin, Briefcase, ChevronDown, TrendingUp, Wallet, Users, Leaf } from "lucide-react";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n/language-provider";
import { pick } from "@/lib/i18n/types";
import type { JobPosting } from "@/lib/data/careers";
import type { getCareersPageContent } from "@/lib/cms/careers";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/sections/page-hero";
import { InquiryForm } from "@/components/sections/inquiry-form";

const benefitIcons = [TrendingUp, Wallet, Users, Leaf];

export function CareersContent({
  jobs,
  content,
}: {
  jobs: JobPosting[];
  content: Awaited<ReturnType<typeof getCareersPageContent>>;
}) {
  const { dict, locale } = useLanguage();
  const [openSlug, setOpenSlug] = useState<string | null>(jobs[0]?.slug ?? null);

  return (
    <>
      <PageHero
        eyebrow={pick(content.eyebrow, locale)}
        title={pick(content.heading, locale)}
        description={pick(content.subheading, locale)}
      />

      <section className="py-16 md:py-20">
        <Container>
          <SectionHeading align="center" title={pick(content.whyJoinHeading, locale)} className="mx-auto" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.benefits.map((benefit, index) => {
              const Icon = benefitIcons[index % benefitIcons.length];
              return (
                <div
                  key={pick(benefit.title, locale)}
                  className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft"
                >
                  <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-serif-display mt-4 text-lg text-ink">{pick(benefit.title, locale)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pick(benefit.body, locale)}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-muted/50 py-16 md:py-20">
        <Container className="mx-auto max-w-3xl">
          <SectionHeading align="center" title={pick(content.openPositionsHeading, locale)} className="mx-auto" />

          {jobs.length > 0 ? (
            <div className="mt-10 space-y-4">
              {jobs.map((job) => {
                const isOpen = openSlug === job.slug;
                return (
                  <div key={job.slug} className="overflow-hidden rounded-2xl border border-border bg-card">
                    <button
                      type="button"
                      onClick={() => setOpenSlug(isOpen ? null : job.slug)}
                      className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-expanded={isOpen}
                      aria-controls={`job-${job.slug}`}
                    >
                      <div>
                        <h3 className="font-serif-display text-lg text-ink">{job.title[locale]}</h3>
                        <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                            {job.location[locale]}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                            {job.type[locale]}
                          </span>
                        </div>
                      </div>
                      <ChevronDown
                        className={clsx(
                          "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200",
                          isOpen && "rotate-180"
                        )}
                        aria-hidden="true"
                      />
                    </button>
                    <div
                      id={`job-${job.slug}`}
                      className={clsx(
                        "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      )}
                    >
                      <div className="min-h-0 border-t border-border px-6 pb-6 pt-4">
                        <p className="text-sm leading-relaxed text-ink/75">{job.summary[locale]}</p>
                        <ul className="mt-4 space-y-2">
                          {job.requirements.map((req) => (
                            <li key={req.vi} className="flex items-start gap-2 text-sm text-ink/70">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              {req[locale]}
                            </li>
                          ))}
                        </ul>
                        <a
                          href="#ung-tuyen"
                          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                        >
                          {dict.careers.applyCta}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="mt-10 text-center text-muted-foreground">{pick(content.noOpenings, locale)}</p>
          )}
        </Container>
      </section>

      <section className="py-16 md:py-20" id="ung-tuyen">
        <Container className="mx-auto max-w-3xl">
          <SectionHeading align="center" title={dict.careers.applyCta} className="mx-auto" />
          <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-soft md:p-10">
            <InquiryForm showCompany={false} />
          </div>
        </Container>
      </section>
    </>
  );
}
