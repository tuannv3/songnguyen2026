import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getNewsPosts } from "@/lib/cms/news";
import { NewsDetailContent } from "@/components/sections/news-detail-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
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
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getNewsPosts();
  const related = allPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return <NewsDetailContent post={post} related={related} />;
}
