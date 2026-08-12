import { prisma } from "@/lib/db/client";
import type { HeroSlide } from "@/lib/data/hero-slides";

type HeroSlideRow = Awaited<ReturnType<typeof prisma.heroSlide.findMany>>[number];

function mapHeroSlide(row: HeroSlideRow): HeroSlide {
  return {
    eyebrow: { vi: row.eyebrowVi, en: row.eyebrowEn },
    title: { vi: row.titleVi, en: row.titleEn },
    subtitle: { vi: row.subtitleVi, en: row.subtitleEn },
    ctaPrimary: {
      label: { vi: row.ctaPrimaryLabelVi, en: row.ctaPrimaryLabelEn },
      href: row.ctaPrimaryHref,
    },
    ctaSecondary:
      row.ctaSecondaryHref && row.ctaSecondaryLabelVi && row.ctaSecondaryLabelEn
        ? {
            label: { vi: row.ctaSecondaryLabelVi, en: row.ctaSecondaryLabelEn },
            href: row.ctaSecondaryHref,
          }
        : undefined,
    bottleColors: [row.bottleColor1, row.bottleColor2],
    glowColor: row.glowColor,
    image: row.image ?? undefined,
  };
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const rows = await prisma.heroSlide.findMany({ orderBy: { order: "asc" } });
  return rows.map(mapHeroSlide);
}
