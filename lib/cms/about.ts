import { prisma } from "@/lib/db/client";

type TitleBodyItem = { titleVi: string; bodyVi: string; titleEn: string; bodyEn: string };
type TimelineItem = { yearVi: string; yearEn: string; titleVi: string; bodyVi: string; titleEn: string; bodyEn: string };

export async function getAboutContent() {
  const row = await prisma.aboutContent.findUniqueOrThrow({ where: { id: "singleton" } });
  const values = row.values as TitleBodyItem[];
  const timeline = row.timeline as TimelineItem[];
  const storyBodyVi = row.storyBodyVi as string[];
  const storyBodyEn = row.storyBodyEn as string[];

  return {
    eyebrow: { vi: row.eyebrowVi, en: row.eyebrowEn },
    heading: { vi: row.headingVi, en: row.headingEn },
    subheading: { vi: row.subheadingVi, en: row.subheadingEn },
    storyHeading: { vi: row.storyHeadingVi, en: row.storyHeadingEn },
    storyBody: storyBodyVi.map((vi, i) => ({ vi, en: storyBodyEn[i] ?? "" })),
    storyImage: row.storyImage,
    missionHeading: { vi: row.missionHeadingVi, en: row.missionHeadingEn },
    missionBody: { vi: row.missionBodyVi, en: row.missionBodyEn },
    valuesHeading: { vi: row.valuesHeadingVi, en: row.valuesHeadingEn },
    values: values.map((v) => ({
      title: { vi: v.titleVi, en: v.titleEn },
      body: { vi: v.bodyVi, en: v.bodyEn },
    })),
    timelineHeading: { vi: row.timelineHeadingVi, en: row.timelineHeadingEn },
    timeline: timeline.map((t) => ({
      year: { vi: t.yearVi, en: t.yearEn },
      title: { vi: t.titleVi, en: t.titleEn },
      body: { vi: t.bodyVi, en: t.bodyEn },
    })),
    certHeading: { vi: row.certHeadingVi, en: row.certHeadingEn },
    certBody: { vi: row.certBodyVi, en: row.certBodyEn },
    certImages: row.certImages as string[],
  };
}
