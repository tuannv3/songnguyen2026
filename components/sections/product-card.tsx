"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-provider";
import { pick } from "@/lib/i18n/types";
import type { Product } from "@/lib/data/products";
import { useCart } from "@/lib/cart/cart-provider";
import { ProductBottle } from "@/components/icons/product-bottle";
import { Badge } from "@/components/ui/badge";

export function ProductCard({ product }: { product: Product }) {
  const { locale, dict } = useLanguage();
  const { addItem } = useCart();
  const bottleVariant = product.bottleVariant ?? (product.category === "accessory" ? "diffuser" : "dropper");

  return (
    <Link
      href={`/san-pham/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div
        className="relative flex h-56 items-center justify-center overflow-hidden"
        style={{ backgroundColor: product.accentColor }}
      >
        {product.badge ? (
          <Badge
            tone={product.badge === "bestseller" ? "accent" : "primary"}
            className="absolute left-4 top-4 z-10 bg-card"
          >
            {product.badge === "bestseller"
              ? dict.common.bestseller
              : product.badge === "new"
                ? dict.common.newLabel
                : dict.common.featured}
          </Badge>
        ) : null}
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            addItem(product);
          }}
          aria-label={dict.cart.addToCart}
          className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-card text-ink shadow-soft transition-colors hover:bg-primary hover:text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
        </button>
        {product.image ? (
          <Image
            src={product.image}
            alt={pick(product.name, locale)}
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 90vw"
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <ProductBottle
            color={product.bottleColor}
            variant={bottleVariant}
            className="h-44 w-auto transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-2"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-serif-display text-xl text-ink">{pick(product.name, locale)}</h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {pick(product.shortDescription, locale)}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-serif-display text-lg text-primary">
            {product.priceFrom.toLocaleString("vi-VN")}₫
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-ink/70 transition-colors group-hover:text-primary">
            {dict.common.viewDetails}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
