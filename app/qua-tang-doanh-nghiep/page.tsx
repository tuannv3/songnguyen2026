import type { Metadata } from "next";
import { CorporateGiftsContent } from "@/components/sections/corporate-gifts-content";

export const metadata: Metadata = {
  title: "Quà tặng doanh nghiệp",
  description:
    "Giải pháp quà tặng doanh nghiệp từ tinh dầu thiên nhiên Song Nguyên — thiết kế theo thương hiệu, phù hợp mọi dịp lễ và sự kiện tri ân.",
};

export default function CorporateGiftsPage() {
  return <CorporateGiftsContent />;
}
