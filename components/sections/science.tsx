"use client";

import { FlaskConical, ShieldCheck, Award, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-provider";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductBottle } from "@/components/icons/product-bottle";

const items = [
  {
    icon: FlaskConical,
    title: { vi: "Kiểm định GC-MS", en: "GC-MS Testing" },
    body: {
      vi: "Mỗi lô sản phẩm được phân tích thành phần để đảm bảo độ tinh khiết tối đa.",
      en: "Every batch is lab-analyzed to guarantee maximum purity.",
    },
  },
  {
    icon: ShieldCheck,
    title: { vi: "An toàn tuyệt đối", en: "Uncompromising Safety" },
    body: {
      vi: "Không chất bảo quản, không pha tạp — an toàn cho cả gia đình bạn.",
      en: "No preservatives, no dilution — safe for your entire family.",
    },
  },
  {
    icon: Award,
    title: { vi: "Đạt chuẩn chất lượng", en: "Quality Certified" },
    body: {
      vi: "Tuân thủ quy trình sản xuất đạt tiêu chuẩn an toàn hiện hành.",
      en: "Produced in compliance with current safety standards.",
    },
  },
  {
    icon: Sparkles,
    title: { vi: "Hương thơm nguyên bản", en: "True-to-Source Aroma" },
    body: {
      vi: "Giữ trọn hương thơm và dưỡng chất tự nhiên từ nguyên liệu tươi.",
      en: "Preserves the full natural aroma and nutrients of fresh botanicals.",
    },
  },
];

export function Science() {
  const { dict, locale } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-ink py-20 md:py-28">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, rgba(79,142,131,0.25), transparent 55%), linear-gradient(180deg, #0f2420 0%, #163832 100%)",
        }}
        aria-hidden="true"
      />
      <Container className="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="order-2 flex items-center justify-center gap-6 lg:order-1">
          <ProductBottle color="#4A8E83" className="h-72 w-auto drop-shadow-2xl md:h-96" />
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow={dict.home.ingredientsEyebrow}
            title={dict.home.ingredientsHeading}
            description={dict.home.ingredientsSub}
            tone="dark"
          />

          <dl className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {items.map(({ icon: Icon, title, body }) => (
              <div key={title.vi} className="flex gap-4">
                <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-light">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <dt className="font-serif-display text-lg text-white">{title[locale]}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-white/60">{body[locale]}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
