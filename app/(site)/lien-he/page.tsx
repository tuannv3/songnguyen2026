import type { Metadata } from "next";
import { ContactContent } from "@/components/sections/contact-content";
import { getSiteSettings } from "@/lib/cms/settings";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Liên hệ với Song Nguyên Essential Oils để được tư vấn sản phẩm, hợp tác đại lý hoặc quà tặng doanh nghiệp.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  return <ContactContent settings={settings} />;
}
