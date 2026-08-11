import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, newsPosts } from "@/lib/data/news";
import { NewsDetailContent } from "@/components/sections/news-detail-content";

export function generateStaticParams() {
  return newsPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title.vi,
    description: post.excerpt.vi,
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return <NewsDetailContent post={post} />;
}
