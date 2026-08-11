import type { Bilingual } from "@/lib/i18n/types";

export type Highlight = {
  title: Bilingual;
  /** Path under /public, e.g. "/highlights/organic-farm.jpg". Leave empty to show the placeholder icon tile. */
  image?: string;
  accentColor: string;
};

export const highlights: Highlight[] = [
  { title: { vi: "100% Nguyên chất", en: "100% Pure" }, accentColor: "#2F6F65" },
  { title: { vi: "Kiểm định GC-MS", en: "GC-MS Tested" }, accentColor: "#4A8E83" },
  { title: { vi: "Hữu cơ 6 vùng nguyên liệu", en: "6 Organic Growing Regions" }, accentColor: "#7FA05A" },
  { title: { vi: "Chưng cất hơi nước truyền thống", en: "Traditional Steam Distillation" }, accentColor: "#B6924F" },
  { title: { vi: "Chứng nhận an toàn", en: "Safety Certified" }, accentColor: "#8FB3A8" },
  { title: { vi: "80+ đối tác tin dùng", en: "80+ Trusted Partners" }, accentColor: "#7B6FA6" },
  { title: { vi: "Đóng gói thủ công tỉ mỉ", en: "Meticulous Handcrafted Packaging" }, accentColor: "#A15A3A" },
  { title: { vi: "Không chất bảo quản", en: "No Preservatives" }, accentColor: "#3E8E7E" },
];
