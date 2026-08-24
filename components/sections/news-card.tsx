"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-provider";
import type { NewsPost } from "@/lib/data/news";
import { BotanicalPattern } from "@/components/icons/botanical";

function formatDate(iso: string, locale: "vi" | "en") {
  return new Date(iso).toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function NewsCard({ post }: { post: NewsPost }) {
  const { locale, dict } = useLanguage();

  return (
    <Link
      href={`/tin-tuc/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div
        className="relative flex h-40 items-center justify-center overflow-hidden"
        style={{ backgroundColor: `${post.accentColor}1a` }}
      >
        {post.image ? (
          <Image
            src={post.image}
            alt=""
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <BotanicalPattern className="h-24 w-24" style={{ color: post.accentColor }} />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.25em]" style={{ color: post.accentColor }}>
          {post.category[locale]}
        </p>
        <h3 className="font-serif-display text-xl leading-snug text-ink">{post.title[locale]}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt[locale]}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatDate(post.date, locale)}</span>
          <span className="inline-flex items-center gap-1 font-medium text-ink/70 transition-colors group-hover:text-primary">
            {dict.common.readMore}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
