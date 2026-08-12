import { prisma } from "@/lib/db/client";
import type { JobPosting } from "@/lib/data/careers";

type JobPostingRow = Awaited<ReturnType<typeof prisma.jobPosting.findMany>>[number];
type BilingualRequirement = { vi: string; en: string };
type TitleBodyItem = { titleVi: string; bodyVi: string; titleEn: string; bodyEn: string };

function mapJobPosting(row: JobPostingRow): JobPosting {
  return {
    slug: row.slug,
    title: { vi: row.titleVi, en: row.titleEn },
    location: { vi: row.locationVi, en: row.locationEn },
    type: { vi: row.typeVi, en: row.typeEn },
    summary: { vi: row.summaryVi, en: row.summaryEn },
    requirements: (row.requirements as BilingualRequirement[]).map((r) => ({ vi: r.vi, en: r.en })),
  };
}

export async function getJobPostings(): Promise<JobPosting[]> {
  const rows = await prisma.jobPosting.findMany({ orderBy: { order: "asc" } });
  return rows.map(mapJobPosting);
}

export async function getJobBySlug(slug: string): Promise<JobPosting | undefined> {
  const row = await prisma.jobPosting.findUnique({ where: { slug } });
  return row ? mapJobPosting(row) : undefined;
}

export async function getCareersPageContent() {
  const row = await prisma.careersPageContent.findUniqueOrThrow({ where: { id: "singleton" } });
  const benefits = row.benefits as TitleBodyItem[];
  return {
    eyebrow: { vi: row.eyebrowVi, en: row.eyebrowEn },
    heading: { vi: row.headingVi, en: row.headingEn },
    subheading: { vi: row.subheadingVi, en: row.subheadingEn },
    whyJoinHeading: { vi: row.whyJoinHeadingVi, en: row.whyJoinHeadingEn },
    benefits: benefits.map((b) => ({
      title: { vi: b.titleVi, en: b.titleEn },
      body: { vi: b.bodyVi, en: b.bodyEn },
    })),
    openPositionsHeading: { vi: row.openPositionsHeadingVi, en: row.openPositionsHeadingEn },
    noOpenings: { vi: row.noOpeningsVi, en: row.noOpeningsEn },
  };
}
