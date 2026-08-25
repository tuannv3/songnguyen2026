import { prisma } from "@/lib/db/client";

type TitleBodyItem = { titleVi: string; bodyVi: string; titleEn: string; bodyEn: string };
type TimelineItem = { yearVi: string; yearEn: string; titleVi: string; bodyVi: string; titleEn: string; bodyEn: string };
type BilingualLine = { vi: string; en: string };
type StorySectionRow = {
  headingVi: string;
  headingEn: string;
  bodyVi: string[];
  bodyEn: string[];
  image: string | null;
  captionVi: string;
  captionEn: string;
};

export async function getAboutContent() {
  const row = await prisma.aboutContent.findUniqueOrThrow({ where: { id: "singleton" } });
  const values = row.values as TitleBodyItem[];
  const timeline = row.timeline as TimelineItem[];
  const storySections = row.storySections as StorySectionRow[];
  const visionPoints = row.visionPoints as BilingualLine[];
  const missionGoals = row.missionGoals as BilingualLine[];
  const promiseLines = row.promiseLines as BilingualLine[];

  return {
    eyebrow: { vi: row.eyebrowVi, en: row.eyebrowEn },
    heading: { vi: row.headingVi, en: row.headingEn },
    subheading: { vi: row.subheadingVi, en: row.subheadingEn },

    storyHeading: { vi: row.storyHeadingVi, en: row.storyHeadingEn },
    storySubheading: { vi: row.storySubheadingVi, en: row.storySubheadingEn },
    storySections: storySections.map((s) => ({
      heading: { vi: s.headingVi, en: s.headingEn },
      body: s.bodyVi.map((vi, i) => ({ vi, en: s.bodyEn[i] ?? "" })),
      image: s.image,
      caption: { vi: s.captionVi, en: s.captionEn },
    })),

    visionTagline: { vi: row.visionTaglineVi, en: row.visionTaglineEn },
    visionSubtitle: { vi: row.visionSubtitleVi, en: row.visionSubtitleEn },
    visionPoints: visionPoints.map((p) => ({ vi: p.vi, en: p.en })),

    missionHeading: { vi: row.missionHeadingVi, en: row.missionHeadingEn },
    missionBody: { vi: row.missionBodyVi, en: row.missionBodyEn },
    missionIntro: { vi: row.missionIntroVi, en: row.missionIntroEn },
    missionGoals: missionGoals.map((g) => ({ vi: g.vi, en: g.en })),
    missionImage: row.missionImage,
    missionImageCaption: { vi: row.missionImageCaptionVi, en: row.missionImageCaptionEn },

    valuesHeading: { vi: row.valuesHeadingVi, en: row.valuesHeadingEn },
    values: values.map((v) => ({
      title: { vi: v.titleVi, en: v.titleEn },
      body: { vi: v.bodyVi, en: v.bodyEn },
    })),

    promiseHeading: { vi: row.promiseHeadingVi, en: row.promiseHeadingEn },
    promiseLines: promiseLines.map((l) => ({ vi: l.vi, en: l.en })),
    promiseClosing: { vi: row.promiseClosingVi, en: row.promiseClosingEn },

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
