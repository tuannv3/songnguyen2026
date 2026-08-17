"use client";

import { Quote, Star } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-provider";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const revealDirections = ["left", "up", "right"] as const;

const testimonials = [
  {
    name: "Nguyễn Thu Hà",
    role: { vi: "Chủ chuỗi Spa An Nhiên", en: "Owner, An Nhiên Spa Chain" },
    quote: {
      vi: "Tinh dầu Song Nguyên có hương thơm rất tự nhiên và giữ mùi lâu. Khách hàng tại spa của tôi phản hồi rất tích cực sau mỗi lần trải nghiệm.",
      en: "Song Nguyên's oils have a wonderfully natural, long-lasting scent. Clients at my spa consistently give great feedback after each session.",
    },
  },
  {
    name: "Trần Minh Khoa",
    role: { vi: "Giám đốc Nhân sự, Tập đoàn Lạc Việt", en: "HR Director, Lac Viet Group" },
    quote: {
      vi: "Bộ quà tặng doanh nghiệp từ Song Nguyên được in logo tinh tế, nhân viên và đối tác của chúng tôi đều rất thích thú khi nhận quà.",
      en: "The corporate gift sets from Song Nguyên feature elegant custom logo printing — our employees and partners loved receiving them.",
    },
  },
  {
    name: "Phạm Bảo Ngọc",
    role: { vi: "Nhà phân phối khu vực miền Trung", en: "Central Region Distributor" },
    quote: {
      vi: "Chất lượng sản phẩm ổn định qua từng lô hàng, đội ngũ hỗ trợ nhanh chóng. Đây là đối tác tôi tin tưởng hợp tác lâu dài.",
      en: "Product quality stays consistent batch after batch, and their support team is responsive. A partner I trust for the long run.",
    },
  },
];

export function Testimonials() {
  const { dict, locale } = useLanguage();

  return (
    <section className="py-20 md:py-28">
      <Container>
        <ScrollReveal direction="up">
          <SectionHeading
            align="center"
            eyebrow={dict.home.testimonialsEyebrow}
            title={dict.home.testimonialsHeading}
            className="mx-auto"
          />
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <ScrollReveal key={item.name} direction={revealDirections[index % 3]} delay={index * 100}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-soft">
                <Quote className="h-7 w-7 text-accent/60" aria-hidden="true" />
                <div className="mt-3 flex gap-0.5 text-accent" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/80">
                  “{item.quote[locale]}”
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <p className="font-serif-display text-base text-ink">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.role[locale]}</p>
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
