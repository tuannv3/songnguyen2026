import { prisma } from "@/lib/db/client";

export async function getHomeContent() {
  const row = await prisma.homeContent.findUniqueOrThrow({ where: { id: "singleton" } });
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
  };
}
