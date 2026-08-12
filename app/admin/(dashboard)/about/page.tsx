import { prisma } from "@/lib/db/client";
import { AboutContentForm } from "@/components/admin/about-content-form";

export default async function AdminAboutPage() {
  const content = await prisma.aboutContent.findUniqueOrThrow({ where: { id: "singleton" } });

  return (
    <div>
      <h1 className="font-serif-display text-2xl text-ink">Trang Giới thiệu</h1>
      <div className="mt-6 max-w-2xl rounded-xl border border-border bg-card p-6 shadow-soft">
        <AboutContentForm defaults={content} />
      </div>
    </div>
  );
}
