"use client";

import Link from "next/link";
import { ChevronRight, CalendarDays, User } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-provider";
import type { NewsPost } from "@/lib/data/news";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { NewsCard } from "@/components/sections/news-card";

function formatDate(iso: string, locale: "vi" | "en") {
  return new Date(iso).toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function NewsDetailContent({ post, related }: { post: NewsPost; related: NewsPost[] }) {
  const { dict, locale } = useLanguage();

  return (
    <>
      <section className="border-b border-border bg-muted/40 py-5">
        <Container>
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/tin-tuc" className="hover:text-primary">
              {dict.nav.news}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-ink truncate" aria-current="page">
              {post.title[locale]}
            </span>
          </nav>
        </Container>
      </section>

      <article className="py-14 md:py-20">
        <Container className="mx-auto max-w-3xl">
          <p
            className="text-xs font-medium uppercase tracking-[0.3em]"
            style={{ color: post.accentColor }}
          >
            {post.category[locale]}
          </p>
          <h1 className="font-serif-display mt-4 text-3xl leading-tight text-ink md:text-4xl">
            {post.title[locale]}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-5 border-b border-border pb-6 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {formatDate(post.date, locale)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4" aria-hidden="true" />
              {post.author[locale]}
            </span>
            <span>{post.readingMinutes} {dict.common.minutesRead}</span>
          </div>

          <div className="mt-8 space-y-5">
            {post.content.map((paragraph) => (
              <p key={paragraph[locale]} className="text-base leading-relaxed text-ink/80">
                {paragraph[locale]}
              </p>
            ))}
          </div>
        </Container>
      </article>

      {related.length > 0 ? (
        <section className="bg-muted/50 py-16 md:py-20">
          <Container>
            <SectionHeading title={dict.common.relatedArticles} />
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <NewsCard key={item.slug} post={item} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
