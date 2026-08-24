"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n/language-provider";
import { categoryLabels, type Product, type ProductCategory } from "@/lib/data/products";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { ProductCard } from "@/components/sections/product-card";

const categories: ProductCategory[] = ["car", "single", "blend", "sachet", "pillow", "gift", "accessory"];

export function ProductsPageContent({ products }: { products: Product[] }) {
  const { dict, locale } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");

  const filtered =
    activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory);

  return (
    <>
      <PageHero
        eyebrow={dict.products.pageEyebrow}
        title={dict.products.pageHeading}
        description={dict.products.pageSubheading}
      />

      <section className="py-16 md:py-20">
        <Container>
          <div
            className="flex flex-wrap items-center justify-center gap-2"
            role="group"
            aria-label={dict.products.filterLabel}
          >
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={clsx(
                "cursor-pointer rounded-full border px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                activeCategory === "all"
                  ? "border-primary bg-primary text-on-primary"
                  : "border-border text-ink/70 hover:border-primary hover:text-primary"
              )}
              aria-pressed={activeCategory === "all"}
            >
              {dict.common.allCategories}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={clsx(
                  "cursor-pointer rounded-full border px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  activeCategory === cat
                    ? "border-primary bg-primary text-on-primary"
                    : "border-border text-ink/70 hover:border-primary hover:text-primary"
                )}
                aria-pressed={activeCategory === cat}
              >
                {categoryLabels[cat][locale]}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <p className="mt-16 text-center text-muted-foreground">{dict.common.noResults}</p>
          )}
        </Container>
      </section>
    </>
  );
}
