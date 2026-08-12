import type { Metadata } from "next";
import { CorporateGiftsContent } from "@/components/sections/corporate-gifts-content";
import { getProducts } from "@/lib/cms/products";
import { getCorporateGiftsContent } from "@/lib/cms/corporate-gifts";

export const metadata: Metadata = {
  title: "Quà tặng doanh nghiệp",
  description:
    "Giải pháp quà tặng doanh nghiệp từ tinh dầu thiên nhiên Song Nguyên — thiết kế theo thương hiệu, phù hợp mọi dịp lễ và sự kiện tri ân.",
};

export default async function CorporateGiftsPage() {
  const [products, content] = await Promise.all([getProducts(), getCorporateGiftsContent()]);
  const giftProducts = products.filter((product) => product.category === "gift");
  return <CorporateGiftsContent giftProducts={giftProducts} content={content} />;
}
