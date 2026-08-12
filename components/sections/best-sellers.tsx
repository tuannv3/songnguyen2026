"use client";

import { useLanguage } from "@/lib/i18n/language-provider";
import type { Product } from "@/lib/data/products";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/sections/product-card";

export function BestSellers({ products }: { products: Product[] }) {
  const { dict } = useLanguage();
  const featured = products.filter((p) => p.badge === "bestseller" || p.badge === "featured").slice(0, 4);

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow={dict.home.bestSellersEyebrow}
            title={dict.home.bestSellersHeading}
            description={dict.home.bestSellersSub}
          />
          <Button href="/san-pham" variant="outline" className="shrink-0">
            {dict.common.viewAll}
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
