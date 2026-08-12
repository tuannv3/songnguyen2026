import { prisma } from "@/lib/db/client";
import { CareersPageContentForm } from "@/components/admin/careers-page-content-form";

export default async function AdminCareersPageContentPage() {
  const content = await prisma.careersPageContent.findUniqueOrThrow({ where: { id: "singleton" } });

  return (
    <div>
      <h1 className="font-serif-display text-2xl text-ink">Nội dung trang Tuyển dụng</h1>
      <p className="mt-1 text-sm text-muted-foreground">Phần giới thiệu và quyền lợi — danh sách tin tuyển dụng quản lý riêng.</p>
      <div className="mt-6 max-w-2xl rounded-xl border border-border bg-card p-6 shadow-soft">
        <CareersPageContentForm defaults={content} />
      </div>
    </div>
  );
}
