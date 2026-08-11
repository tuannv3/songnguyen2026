"use client";

import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-provider";
import { pick } from "@/lib/i18n/types";
import { categoryLabels, getRelatedProducts, type Product } from "@/lib/data/products";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductBottle } from "@/components/icons/product-bottle";
import { ProductCard } from "@/components/sections/product-card";
import { SectionHeading } from "@/components/ui/section-heading";

export function ProductDetailContent({ product }: { product: Product }) {
  const { dict, locale } = useLanguage();
  const related = getRelatedProducts(product);
  const isAccessory = product.category === "accessory";

  const specs: { label: string; value: string }[] = [
    { label: dict.products.volumeLabel, value: product.volume },
    { label: dict.products.originLabel, value: pick(product.origin, locale) },
    { label: dict.products.extractionLabel, value: pick(product.extraction, locale) },
    { label: dict.products.ingredientsLabel, value: pick(product.ingredients, locale) },
  ];

  return (
    <>
      <section className="border-b border-border bg-muted/40 py-5">
        <Container>
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/san-pham" className="hover:text-primary">
              {dict.nav.products}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-ink/70">{categoryLabels[product.category][locale]}</span>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-ink" aria-current="page">
              {pick(product.name, locale)}
            </span>
          </nav>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div
            className="flex h-80 items-center justify-center rounded-3xl md:h-[28rem]"
            style={{ backgroundColor: product.accentColor }}
          >
            <ProductBottle
              color={product.bottleColor}
              variant={isAccessory ? "diffuser" : "dropper"}
              className="h-64 w-auto md:h-80"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <Badge tone="primary">{categoryLabels[product.category][locale]}</Badge>
              {product.badge ? (
                <Badge tone="accent">
                  {product.badge === "bestseller"
                    ? dict.common.bestseller
                    : product.badge === "new"
                      ? dict.common.newLabel
                      : dict.common.featured}
                </Badge>
              ) : null}
            </div>

            <h1 className="font-serif-display mt-4 text-3xl text-ink md:text-4xl">
              {pick(product.name, locale)}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {pick(product.shortDescription, locale)}
            </p>

            <p className="font-serif-display mt-6 text-3xl text-primary">
              {product.priceFrom.toLocaleString("vi-VN")}₫
              <span className="ml-2 text-sm font-sans font-normal text-muted-foreground">
                / {product.volume}
              </span>
            </p>

            <ul className="mt-6 space-y-2.5">
              {product.benefits.map((benefit) => (
                <li key={benefit.vi} className="flex items-start gap-2.5 text-sm text-ink/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {pick(benefit, locale)}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/lien-he" size="lg">
                {dict.common.addToInquiry}
              </Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{dict.products.inquiryNote}</p>

            <dl className="mt-10 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2">
              {specs.map((spec) => (
                <div key={spec.label}>
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {spec.label}
                  </dt>
                  <dd className="mt-1 text-sm text-ink">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section className="bg-muted/50 py-14 md:py-16">
        <Container className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="font-serif-display text-2xl text-ink">
              {locale === "vi" ? "Mô tả sản phẩm" : "Product Description"}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink/75">
              {pick(product.description, locale)}
            </p>

            <h3 className="font-serif-display mt-8 text-xl text-ink">{dict.products.howToUse}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/75">{pick(product.howToUse, locale)}</p>
          </div>

          <div className="rounded-2xl border border-accent/30 bg-accent/10 p-6">
            <h3 className="font-serif-display text-lg text-ink">{dict.products.cautionLabel}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{pick(product.caution, locale)}</p>
          </div>
        </Container>
      </section>

      {related.length > 0 ? (
        <section className="py-16 md:py-20">
          <Container>
            <SectionHeading title={dict.common.relatedProducts} />
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
