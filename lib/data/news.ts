import type { Bilingual } from "@/lib/i18n/types";

export type NewsPost = {
  slug: string;
  title: Bilingual;
  excerpt: Bilingual;
  content: (Bilingual & { image?: string | null })[];
  date: string; // ISO
  author: Bilingual;
  category: Bilingual;
  accentColor: string;
  readingMinutes: number;
  image?: string | null;
};
