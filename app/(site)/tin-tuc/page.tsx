import type { Metadata } from "next";
import { NewsPageContent } from "@/components/sections/news-page-content";
import { getNewsPosts } from "@/lib/cms/news";

export const metadata: Metadata = {
  title: "Tin tức",
  description: "Cập nhật tin tức, kiến thức tinh dầu và câu chuyện thương hiệu từ Song Nguyên Essential Oils.",
};

export default async function NewsPage() {
  const posts = await getNewsPosts();
  return <NewsPageContent posts={posts} />;
}
