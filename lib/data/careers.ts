import type { Bilingual } from "@/lib/i18n/types";

export type JobPosting = {
  slug: string;
  title: Bilingual;
  location: Bilingual;
  type: Bilingual;
  summary: Bilingual;
  requirements: Bilingual[];
};

export const jobPostings: JobPosting[] = [
  {
    slug: "nhan-vien-kinh-doanh-b2b",
    title: { vi: "Nhân viên Kinh doanh B2B (Quà tặng Doanh nghiệp)", en: "B2B Sales Executive (Corporate Gifting)" },
    location: { vi: "TP. Hồ Chí Minh", en: "Ho Chi Minh City" },
    type: { vi: "Toàn thời gian", en: "Full-time" },
    summary: {
      vi: "Phát triển khách hàng doanh nghiệp cho dòng sản phẩm quà tặng tinh dầu, tư vấn và chăm sóc đối tác.",
      en: "Develop corporate accounts for our essential oil gifting line, consulting and supporting partners.",
    },
    requirements: [
      { vi: "Có kinh nghiệm bán hàng B2B từ 1 năm trở lên", en: "1+ years of B2B sales experience" },
      { vi: "Kỹ năng giao tiếp và đàm phán tốt", en: "Strong communication and negotiation skills" },
      { vi: "Chủ động, có tinh thần trách nhiệm cao", en: "Proactive with a strong sense of ownership" },
    ],
  },
  {
    slug: "chuyen-vien-marketing-thuong-hieu",
    title: { vi: "Chuyên viên Marketing Thương hiệu", en: "Brand Marketing Specialist" },
    location: { vi: "TP. Hồ Chí Minh", en: "Ho Chi Minh City" },
    type: { vi: "Toàn thời gian", en: "Full-time" },
    summary: {
      vi: "Xây dựng và triển khai chiến lược nội dung, chiến dịch truyền thông cho thương hiệu Song Nguyên.",
      en: "Build and execute content strategy and communication campaigns for the Song Nguyên brand.",
    },
    requirements: [
      { vi: "Tối thiểu 2 năm kinh nghiệm marketing thương hiệu/ngành F&B, mỹ phẩm", en: "2+ years in brand marketing, F&B or cosmetics preferred" },
      { vi: "Tư duy sáng tạo, thẩm mỹ tốt", en: "Creative thinking with strong aesthetic sense" },
      { vi: "Thành thạo các công cụ thiết kế và quản lý nội dung", en: "Proficient with design and content management tools" },
    ],
  },
  {
    slug: "ky-thuat-vien-chung-cat",
    title: { vi: "Kỹ thuật viên Chưng cất Tinh dầu", en: "Essential Oil Distillation Technician" },
    location: { vi: "Nhà máy Song Nguyên", en: "Song Nguyên Production Facility" },
    type: { vi: "Toàn thời gian", en: "Full-time" },
    summary: {
      vi: "Vận hành dây chuyền chưng cất, đảm bảo quy trình sản xuất đạt tiêu chuẩn chất lượng.",
      en: "Operate the distillation line, ensuring production meets quality standards.",
    },
    requirements: [
      { vi: "Tốt nghiệp Cao đẳng/Đại học chuyên ngành Hóa/Công nghệ thực phẩm", en: "College/university degree in Chemistry or Food Technology" },
      { vi: "Cẩn thận, tỉ mỉ, tuân thủ quy trình", en: "Detail-oriented and process-disciplined" },
      { vi: "Ưu tiên có kinh nghiệm trong ngành sản xuất tinh dầu/dược liệu", en: "Experience in essential oil or herbal production is a plus" },
    ],
  },
];

export function getJobBySlug(slug: string) {
  return jobPostings.find((job) => job.slug === slug);
}
