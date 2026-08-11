"use client";

import { Gem, ShieldCheck, PackageCheck, HeartHandshake } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-provider";
import { products } from "@/lib/data/products";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/sections/page-hero";
import { ProductCard } from "@/components/sections/product-card";
import { InquiryForm } from "@/components/sections/inquiry-form";

const whyIcons = [Gem, ShieldCheck, PackageCheck, HeartHandshake];

export function CorporateGiftsContent() {
  const { dict } = useLanguage();
  const giftProducts = products.filter((p) => p.category === "gift");

  return (
    <>
      <PageHero
        eyebrow={dict.corporateGifts.eyebrow}
        title={dict.corporateGifts.heading}
        description={dict.corporateGifts.subheading}
      />

      <section className="py-16 md:py-20">
        <Container>
          <SectionHeading align="center" title={dict.corporateGifts.whyHeading} className="mx-auto" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {dict.corporateGifts.whyItems.map((item, index) => {
              const Icon = whyIcons[index % whyIcons.length];
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft"
                >
                  <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-serif-display mt-4 text-lg text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-muted/50 py-16 md:py-20">
        <Container>
          <SectionHeading align="center" title={dict.corporateGifts.giftSetsHeading} className="mx-auto" />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {giftProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <SectionHeading align="center" title={dict.corporateGifts.processHeading} className="mx-auto" />
          <div className="relative mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {dict.corporateGifts.process.map((step, index) => (
              <div key={step.title} className="relative flex flex-col items-center text-center">
                <span className="font-serif-display flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl text-on-primary">
                  {index + 1}
                </span>
                <h3 className="font-serif-display mt-4 text-lg text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-muted/50 py-16 md:py-20" id="bao-gia">
        <Container className="mx-auto max-w-3xl">
          <SectionHeading
            align="center"
            title={dict.corporateGifts.ctaHeading}
            description={dict.corporateGifts.ctaBody}
            className="mx-auto"
          />
          <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-soft md:p-10">
            <InquiryForm showSubject={false} />
          </div>
        </Container>
      </section>
    </>
  );
}
