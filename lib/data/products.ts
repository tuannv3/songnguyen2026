import type { Bilingual } from "@/lib/i18n/types";

export type ProductCategory = "single" | "blend" | "gift" | "accessory" | "car" | "sachet" | "pillow";

export type Product = {
  slug: string;
  name: Bilingual;
  category: ProductCategory;
  badge?: "bestseller" | "new" | "featured";
  priceFrom: number; // VND
  volume: string;
  bottleColor: string;
  bottleVariant?: "dropper" | "diffuser" | "car";
  /** Path under /public, e.g. "/products/tinh-dau-cam.jpg". When set, replaces the illustrated placeholder with a real photo. */
  image?: string;
  /** Shopee product listing URL. Falls back to "#" until each product's real link is provided. */
  shopeeUrl?: string;
  accentColor: string;
  shortDescription: Bilingual;
  description: Bilingual;
  benefits: Bilingual[];
  howToUse: Bilingual;
  ingredients: Bilingual;
  origin: Bilingual;
  extraction: Bilingual;
  caution: Bilingual;
};

export const categoryLabels: Record<ProductCategory, Bilingual> = {
  single: { vi: "Tinh dầu đơn", en: "Single-Note Oils" },
  blend: { vi: "Tinh dầu phối hương", en: "Signature Blends" },
  gift: { vi: "Bộ quà tặng doanh nghiệp", en: "Corporate Gift Sets" },
  accessory: { vi: "Phụ kiện khuếch tán", en: "Diffuser Accessories" },
  car: { vi: "Tinh dầu treo xe & khuếch tán", en: "Car & Diffuser Scents" },
  sachet: { vi: "Túi thơm tinh dầu", en: "Scented Sachets" },
  pillow: { vi: "Gối thảo mộc mát-xa Chakra", en: "Chakra Herbal Massage Pillows" },
};
