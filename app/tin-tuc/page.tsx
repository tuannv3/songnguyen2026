import type { Metadata } from "next";
import { NewsPageContent } from "@/components/sections/news-page-content";

export const metadata: Metadata = {
  title: "Tin tức",
  description: "Cập nhật tin tức, kiến thức tinh dầu và câu chuyện thương hiệu từ Song Nguyên Essential Oils.",
};

export default function NewsPage() {
  return <NewsPageContent />;
}
