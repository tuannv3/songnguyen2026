"use client";

import { useLanguage } from "@/lib/i18n/language-provider";
import type { NewsPost } from "@/lib/data/news";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { NewsCard } from "@/components/sections/news-card";

export function NewsPageContent({ posts }: { posts: NewsPost[] }) {
  const { dict } = useLanguage();

  return (
    <>
      <PageHero
        eyebrow={dict.news.eyebrow}
        title={dict.news.heading}
        description={dict.news.subheading}
      />

      <section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <NewsCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
