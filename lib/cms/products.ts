import { prisma } from "@/lib/db/client";
import type { Product, ProductCategory } from "@/lib/data/products";

type ProductRow = Awaited<ReturnType<typeof prisma.product.findMany>>[number];
type BilingualBenefit = { vi: string; en: string };

function mapProduct(row: ProductRow): Product {
  return {
    slug: row.slug,
    name: { vi: row.nameVi, en: row.nameEn },
    category: row.category as ProductCategory,
    badge: (row.badge ?? undefined) as Product["badge"],
    priceFrom: row.priceFrom,
    volume: row.volume,
    bottleColor: row.bottleColor,
    bottleVariant: (row.bottleVariant ?? undefined) as Product["bottleVariant"],
    image: row.image ?? undefined,
    shopeeUrl: row.shopeeUrl ?? undefined,
    accentColor: row.accentColor,
    shortDescription: { vi: row.shortDescriptionVi, en: row.shortDescriptionEn },
    description: { vi: row.descriptionVi, en: row.descriptionEn },
    benefits: (row.benefits as BilingualBenefit[]).map((b) => ({ vi: b.vi, en: b.en })),
    howToUse: { vi: row.howToUseVi, en: row.howToUseEn },
    ingredients: { vi: row.ingredientsVi, en: row.ingredientsEn },
    origin: { vi: row.originVi, en: row.originEn },
    extraction: { vi: row.extractionVi, en: row.extractionEn },
    caution: { vi: row.cautionVi, en: row.cautionEn },
  };
}

export async function getProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({ orderBy: { createdAt: "asc" } });
  return rows.map(mapProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const row = await prisma.product.findUnique({ where: { slug } });
  return row ? mapProduct(row) : undefined;
}

export async function getRelatedProducts(product: Product, count = 3): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { category: product.category, slug: { not: product.slug } },
    take: count,
    orderBy: { createdAt: "asc" },
  });
  return rows.map(mapProduct);
}
