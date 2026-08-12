import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/client";
import { updateHeroSlide } from "@/lib/cms/actions/hero-slides";
import { HeroSlideForm } from "@/components/admin/hero-slide-form";

export default async function EditHeroSlidePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const slide = await prisma.heroSlide.findUnique({ where: { id } });
  if (!slide) notFound();

  return (
    <div>
      <h1 className="font-serif-display text-2xl text-ink">Sửa slide</h1>
      <div className="mt-6 max-w-2xl rounded-xl border border-border bg-card p-6 shadow-soft">
        <HeroSlideForm action={updateHeroSlide.bind(null, id)} defaults={slide} />
      </div>
    </div>
  );
}
