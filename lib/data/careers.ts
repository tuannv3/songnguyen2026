import type { Bilingual } from "@/lib/i18n/types";

export type JobPosting = {
  slug: string;
  title: Bilingual;
  location: Bilingual;
  type: Bilingual;
  summary: Bilingual;
  requirements: Bilingual[];
};
