import type { Bilingual } from "@/lib/i18n/types";

export type HeroSlide = {
  eyebrow: Bilingual;
  title: Bilingual;
  subtitle: Bilingual;
  ctaPrimary: { label: Bilingual; href: string };
  ctaSecondary?: { label: Bilingual; href: string };
  bottleColors: [string, string];
  glowColor: string;
  /** Path under /public, e.g. "/hero/slide-1.jpg". When set, replaces the two illustrated bottles with a real photo. */
  image?: string;
};
