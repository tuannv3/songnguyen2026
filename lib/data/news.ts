import type { Bilingual } from "@/lib/i18n/types";

export type NewsPost = {
  slug: string;
  title: Bilingual;
  excerpt: Bilingual;
  content: Bilingual[];
  date: string; // ISO
  author: Bilingual;
  category: Bilingual;
  accentColor: string;
  readingMinutes: number;
};
