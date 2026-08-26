import { prisma } from "@/lib/db/client";

type TestimonialRow = {
  name: string;
  roleVi: string;
  roleEn: string;
  quoteVi: string;
  quoteEn: string;
  rating: number;
};

export async function getHomeContent() {
  const row = await prisma.homeContent.findUniqueOrThrow({ where: { id: "singleton" } });
  const testimonials = row.testimonials as TestimonialRow[];

  return {
    philosophyImage: row.philosophyImage,
    philosophyHeading: { vi: row.philosophyHeadingVi, en: row.philosophyHeadingEn },
    philosophyBody: { vi: row.philosophyBodyVi, en: row.philosophyBodyEn },
    philosophyPoints: [
      { vi: row.philosophyPoint1Vi, en: row.philosophyPoint1En },
      { vi: row.philosophyPoint2Vi, en: row.philosophyPoint2En },
      { vi: row.philosophyPoint3Vi, en: row.philosophyPoint3En },
    ],
    scienceImage: row.scienceImage,
    testimonialsHeading: { vi: row.testimonialsHeadingVi, en: row.testimonialsHeadingEn },
    testimonials: testimonials.map((t) => ({
      name: t.name,
      role: { vi: t.roleVi, en: t.roleEn },
      quote: { vi: t.quoteVi, en: t.quoteEn },
      rating: t.rating,
    })),
  };
}
