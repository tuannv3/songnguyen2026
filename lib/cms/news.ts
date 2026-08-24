import { prisma } from "@/lib/db/client";
import type { NewsPost } from "@/lib/data/news";

type NewsPostRow = Awaited<ReturnType<typeof prisma.newsPost.findMany>>[number];

function mapNewsPost(row: NewsPostRow): NewsPost {
  const contentVi = row.contentVi as string[];
  const contentEn = row.contentEn as string[];
  return {
    slug: row.slug,
    title: { vi: row.titleVi, en: row.titleEn },
    excerpt: { vi: row.excerptVi, en: row.excerptEn },
    content: contentVi.map((vi, i) => ({ vi, en: contentEn[i] ?? "" })),
    date: row.date,
    author: { vi: row.authorVi, en: row.authorEn },
    category: { vi: row.categoryVi, en: row.categoryEn },
    accentColor: row.accentColor,
    readingMinutes: row.readingMinutes,
    image: row.image,
  };
}

export async function getNewsPosts(): Promise<NewsPost[]> {
  const rows = await prisma.newsPost.findMany({ orderBy: { date: "desc" } });
  return rows.map(mapNewsPost);
}

export async function getPostBySlug(slug: string): Promise<NewsPost | undefined> {
  const row = await prisma.newsPost.findUnique({ where: { slug } });
  return row ? mapNewsPost(row) : undefined;
}
