import type { Metadata } from "next";
import { ProductsPageContent } from "@/components/sections/products-page-content";
import { getProducts } from "@/lib/cms/products";

export const metadata: Metadata = {
  title: "Sản phẩm",
  description:
    "Khám phá đầy đủ dòng sản phẩm tinh dầu thiên nhiên Song Nguyên: tinh dầu đơn, tinh dầu phối hương, bộ quà tặng doanh nghiệp và phụ kiện khuếch tán.",
};

export default async function ProductsPage() {
  const products = await getProducts();
  return <ProductsPageContent products={products} />;
}
