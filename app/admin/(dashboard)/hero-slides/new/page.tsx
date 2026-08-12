import { createHeroSlide } from "@/lib/cms/actions/hero-slides";
import { HeroSlideForm } from "@/components/admin/hero-slide-form";

export default function NewHeroSlidePage() {
  return (
    <div>
      <h1 className="font-serif-display text-2xl text-ink">Thêm slide mới</h1>
      <div className="mt-6 max-w-2xl rounded-xl border border-border bg-card p-6 shadow-soft">
        <HeroSlideForm action={createHeroSlide} />
      </div>
    </div>
  );
}
