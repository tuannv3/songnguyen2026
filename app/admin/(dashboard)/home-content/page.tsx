import { prisma } from "@/lib/db/client";
import { HomeContentForm } from "@/components/admin/home-content-form";

export default async function AdminHomeContentPage() {
  const content = await prisma.homeContent.findUniqueOrThrow({ where: { id: "singleton" } });

  return (
    <div>
      <h1 className="font-serif-display text-2xl text-ink">Hình ảnh trang chủ</h1>
      <p className="mt-1 text-sm text-muted-foreground">Các hình minh hoạ có thể thay bằng ảnh thật của bạn.</p>
      <div className="mt-6 max-w-2xl rounded-xl border border-border bg-card p-6 shadow-soft">
        <HomeContentForm philosophyImage={content.philosophyImage} scienceImage={content.scienceImage} />
      </div>
    </div>
  );
}
