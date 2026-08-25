import { prisma } from "@/lib/db/client";
import { HomeContentForm } from "@/components/admin/home-content-form";

export default async function AdminHomeContentPage() {
  const content = await prisma.homeContent.findUniqueOrThrow({ where: { id: "singleton" } });

  return (
    <div>
      <h1 className="font-serif-display text-2xl text-ink">Nội dung trang chủ</h1>
      <p className="mt-1 text-sm text-muted-foreground">Nội dung và hình minh hoạ có thể tự cập nhật tại đây.</p>
      <div className="mt-6 max-w-2xl rounded-xl border border-border bg-card p-6 shadow-soft">
        <HomeContentForm defaults={content} />
      </div>
    </div>
  );
}
