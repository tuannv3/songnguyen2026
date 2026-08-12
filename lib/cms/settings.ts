import { prisma } from "@/lib/db/client";

export async function getSiteSettings() {
  const row = await prisma.siteSettings.findUniqueOrThrow({ where: { id: "singleton" } });
  return {
    footerAbout: { vi: row.footerAboutVi, en: row.footerAboutEn },
    address: { vi: row.addressVi, en: row.addressEn },
    phone: row.phone,
    email: row.email,
    workingHours: { vi: row.workingHoursVi, en: row.workingHoursEn },
    zaloUrl: row.zaloUrl,
    messengerUrl: row.messengerUrl,
    facebookUrl: row.facebookUrl,
    instagramUrl: row.instagramUrl,
    youtubeUrl: row.youtubeUrl ?? undefined,
  };
}
