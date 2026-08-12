import { prisma } from "@/lib/db/client";

type TitleBodyItem = { titleVi: string; bodyVi: string; titleEn: string; bodyEn: string };

export async function getCorporateGiftsContent() {
  const row = await prisma.corporateGiftsContent.findUniqueOrThrow({ where: { id: "singleton" } });
  const whyItems = row.whyItems as TitleBodyItem[];
  const process = row.process as TitleBodyItem[];

  return {
    eyebrow: { vi: row.eyebrowVi, en: row.eyebrowEn },
    heading: { vi: row.headingVi, en: row.headingEn },
    subheading: { vi: row.subheadingVi, en: row.subheadingEn },
    whyHeading: { vi: row.whyHeadingVi, en: row.whyHeadingEn },
    giftSetsHeading: { vi: row.giftSetsHeadingVi, en: row.giftSetsHeadingEn },
    processHeading: { vi: row.processHeadingVi, en: row.processHeadingEn },
    ctaHeading: { vi: row.ctaHeadingVi, en: row.ctaHeadingEn },
    ctaBody: { vi: row.ctaBodyVi, en: row.ctaBodyEn },
    whyItems: whyItems.map((item) => ({
      title: { vi: item.titleVi, en: item.titleEn },
      body: { vi: item.bodyVi, en: item.bodyEn },
    })),
    process: process.map((item) => ({
      title: { vi: item.titleVi, en: item.titleEn },
      body: { vi: item.bodyVi, en: item.bodyEn },
    })),
  };
}
