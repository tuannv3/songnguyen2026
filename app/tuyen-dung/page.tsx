import type { Metadata } from "next";
import { CareersContent } from "@/components/sections/careers-content";

export const metadata: Metadata = {
  title: "Tuyển dụng",
  description: "Cơ hội nghề nghiệp tại Song Nguyên Essential Oils — cùng lan tỏa giá trị tinh dầu thiên nhiên Việt Nam.",
};

export default function CareersPage() {
  return <CareersContent />;
}
