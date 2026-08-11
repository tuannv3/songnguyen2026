import type { Bilingual } from "@/lib/i18n/types";

export type HeroSlide = {
  eyebrow: Bilingual;
  title: Bilingual;
  subtitle: Bilingual;
  ctaPrimary: { label: Bilingual; href: string };
  ctaSecondary?: { label: Bilingual; href: string };
  bottleColors: [string, string];
  glowColor: string;
};

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: { vi: "Tinh dầu thiên nhiên nguyên chất", en: "Pure Natural Essential Oils" },
    title: {
      vi: "Chắt lọc tinh hoa từ thiên nhiên Việt Nam",
      en: "Distilled from the Heart of Vietnamese Nature",
    },
    subtitle: {
      vi: "Song Nguyên chưng cất tinh dầu nguyên chất từ dược liệu bản địa, gìn giữ trọn vẹn hương thơm và dưỡng chất cho từng khoảnh khắc thư thái của bạn.",
      en: "Song Nguyên distills pure essential oils from native botanicals, preserving their full aroma and nourishing properties for every moment of calm.",
    },
    ctaPrimary: { label: { vi: "Khám phá sản phẩm", en: "Explore Products" }, href: "/san-pham" },
    ctaSecondary: { label: { vi: "Câu chuyện thương hiệu", en: "Our Story" }, href: "/ve-chung-toi" },
    bottleColors: ["#8FB3A8", "#B6924F"],
    glowColor: "rgba(79,142,131,0.35)",
  },
  {
    eyebrow: { vi: "Dành cho doanh nghiệp", en: "For Businesses" },
    title: {
      vi: "Quà tặng doanh nghiệp đậm dấu ấn thương hiệu",
      en: "Corporate Gifts That Carry Your Brand",
    },
    subtitle: {
      vi: "Bộ quà tặng tinh dầu cao cấp, in logo theo yêu cầu — món quà ý nghĩa cho đối tác, nhân viên và dịp lễ quan trọng của doanh nghiệp bạn.",
      en: "Premium, custom-branded essential oil gift sets — a meaningful present for partners, employees and important company milestones.",
    },
    ctaPrimary: {
      label: { vi: "Tìm hiểu giải pháp quà tặng", en: "Explore Gifting Solutions" },
      href: "/qua-tang-doanh-nghiep",
    },
    ctaSecondary: { label: { vi: "Nhận báo giá", en: "Get a Quote" }, href: "/qua-tang-doanh-nghiep#bao-gia" },
    bottleColors: ["#B6924F", "#7B5A6B"],
    glowColor: "rgba(182,146,79,0.32)",
  },
  {
    eyebrow: { vi: "Được yêu thích nhất", en: "Most Loved" },
    title: {
      vi: "Blend Thư Giãn — cân bằng cho ngày dài",
      en: "Relax Blend — Balance for Your Long Days",
    },
    subtitle: {
      vi: "Oải Hương, Cam Bergamot và Gỗ Đàn Hương hòa quyện tạo nên hương thơm ấm áp, lý tưởng cho không gian thiền định, yoga hay phút giây thư giãn cuối ngày.",
      en: "Lavender, Bergamot and Sandalwood blend into a warm, balanced aroma — ideal for meditation, yoga or unwinding at the end of the day.",
    },
    ctaPrimary: {
      label: { vi: "Khám phá Blend Thư Giãn", en: "Discover Relax Blend" },
      href: "/san-pham/blend-thu-gian",
    },
    ctaSecondary: { label: { vi: "Xem tất cả sản phẩm", en: "View All Products" }, href: "/san-pham" },
    bottleColors: ["#5C7F6E", "#7FA05A"],
    glowColor: "rgba(95,143,110,0.32)",
  },
  {
    eyebrow: { vi: "Khoa học & thiên nhiên", en: "Science & Nature" },
    title: {
      vi: "Nguyên chất từ gốc, kiểm định đến từng giọt",
      en: "Pure from the Root, Tested to the Last Drop",
    },
    subtitle: {
      vi: "Kết hợp chưng cất hơi nước truyền thống với kiểm định GC-MS hiện đại — mỗi lô sản phẩm đều được xác nhận độ tinh khiết trước khi đến tay bạn.",
      en: "Traditional steam distillation meets modern GC-MS testing — every batch is verified for purity before it reaches you.",
    },
    ctaPrimary: { label: { vi: "Tìm hiểu quy trình", en: "See Our Process" }, href: "/ve-chung-toi" },
    ctaSecondary: { label: { vi: "Liên hệ tư vấn", en: "Talk to Us" }, href: "/lien-he" },
    bottleColors: ["#4A8E83", "#3E8E7E"],
    glowColor: "rgba(74,142,131,0.35)",
  },
];
