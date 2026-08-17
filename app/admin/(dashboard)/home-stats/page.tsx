import { prisma } from "@/lib/db/client";
import { HomeStatsForm } from "@/components/admin/home-stats-form";

export default async function AdminHomeStatsPage() {
  const stats = await prisma.homeStats.findUniqueOrThrow({ where: { id: "singleton" } });

  return (
    <div>
      <h1 className="font-serif-display text-2xl text-ink">Chỉ số thống kê trang chủ</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        4 con số hiển thị bên dưới Slide trang chủ (có hiệu ứng nhảy số khi khách lướt đến).
      </p>
      <div className="mt-6 max-w-2xl rounded-xl border border-border bg-card p-6 shadow-soft">
        <HomeStatsForm defaults={stats} />
      </div>
    </div>
  );
}
