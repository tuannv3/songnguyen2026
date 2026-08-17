import { prisma } from "@/lib/db/client";

export async function getHomeStats() {
  const row = await prisma.homeStats.findUniqueOrThrow({ where: { id: "singleton" } });
  return {
    items: [
      { value: row.stat1Value, label: { vi: row.stat1LabelVi, en: row.stat1LabelEn } },
      { value: row.stat2Value, label: { vi: row.stat2LabelVi, en: row.stat2LabelEn } },
      { value: row.stat3Value, label: { vi: row.stat3LabelVi, en: row.stat3LabelEn } },
      { value: row.stat4Value, label: { vi: row.stat4LabelVi, en: row.stat4LabelEn } },
    ],
  };
}
