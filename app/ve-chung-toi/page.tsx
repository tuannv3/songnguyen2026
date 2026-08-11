import type { Metadata } from "next";
import { AboutContent } from "@/components/sections/about-content";

export const metadata: Metadata = {
  title: "Về chúng tôi",
  description:
    "Câu chuyện thương hiệu Song Nguyên — hành trình chưng cất tinh dầu nguyên chất từ dược liệu Việt Nam, sứ mệnh và giá trị cốt lõi.",
};

export default function AboutPage() {
  return <AboutContent />;
}
