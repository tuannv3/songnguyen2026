import { prisma } from "@/lib/db/client";

export async function getHomeContent() {
  const row = await prisma.homeContent.findUniqueOrThrow({ where: { id: "singleton" } });
  return {
    philosophyImage: row.philosophyImage,
    scienceImage: row.scienceImage,
  };
}
