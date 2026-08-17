"use client";

import { useLanguage } from "@/lib/i18n/language-provider";
import type { NewsPost } from "@/lib/data/news";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { NewsCard } from "@/components/sections/news-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function NewsTeaser({ posts }: { posts: NewsPost[] }) {
  const { dict } = useLanguage();

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <ScrollReveal direction="left">
            <SectionHeading
              eyebrow={dict.home.newsEyebrow}
              title={dict.home.newsHeading}
            />
          </ScrollReveal>
          <ScrollReveal direction="right">
            <Button href="/tin-tuc" variant="outline" className="shrink-0">
              {dict.home.newsCta}
            </Button>
          </ScrollReveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((post, index) => (
            <ScrollReveal key={post.slug} direction="up" delay={index * 80}>
              <NewsCard post={post} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
