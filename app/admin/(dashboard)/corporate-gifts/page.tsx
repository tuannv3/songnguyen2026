import { prisma } from "@/lib/db/client";
import { CorporateGiftsContentForm } from "@/components/admin/corporate-gifts-content-form";

export default async function AdminCorporateGiftsPage() {
  const content = await prisma.corporateGiftsContent.findUniqueOrThrow({ where: { id: "singleton" } });

  return (
    <div>
      <h1 className="font-serif-display text-2xl text-ink">Trang Quà tặng doanh nghiệp</h1>
      <div className="mt-6 max-w-2xl rounded-xl border border-border bg-card p-6 shadow-soft">
        <CorporateGiftsContentForm defaults={content} />
      </div>
    </div>
  );
}
