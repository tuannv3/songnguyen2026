import type { Bilingual } from "@/lib/i18n/types";

export type NewsPost = {
  slug: string;
  title: Bilingual;
  excerpt: Bilingual;
  content: Bilingual[];
  date: string; // ISO
  author: Bilingual;
  category: Bilingual;
  accentColor: string;
  readingMinutes: number;
};

export const newsPosts: NewsPost[] = [
  {
    slug: "5-loi-ich-tinh-dau-oai-huong",
    title: {
      vi: "5 lợi ích của tinh dầu Oải Hương cho giấc ngủ",
      en: "5 Benefits of Lavender Oil for Better Sleep",
    },
    excerpt: {
      vi: "Khám phá vì sao Oải Hương được xem là loại tinh dầu 'quốc dân' hỗ trợ giấc ngủ và cách sử dụng hiệu quả nhất.",
      en: "Discover why Lavender is a go-to essential oil for sleep support, and how to use it most effectively.",
    },
    content: [
      {
        vi: "Tinh dầu Oải Hương từ lâu đã được biết đến với khả năng làm dịu tâm trí và hỗ trợ giấc ngủ sâu. Trong bài viết này, Song Nguyên chia sẻ 5 lợi ích nổi bật và cách sử dụng đúng cách để đạt hiệu quả tốt nhất.",
        en: "Lavender essential oil has long been known for its ability to calm the mind and support deep sleep. In this article, Song Nguyên shares 5 standout benefits and how to use it correctly for the best results.",
      },
      {
        vi: "1. Hỗ trợ đi vào giấc ngủ nhanh hơn — hương thơm dịu nhẹ giúp hệ thần kinh thư giãn. 2. Giảm lo âu, căng thẳng. 3. Cân bằng cảm xúc. 4. Hỗ trợ chăm sóc da nhẹ nhàng. 5. Kết hợp tốt với nhiều loại tinh dầu khác trong các blend thư giãn.",
        en: "1. Helps you fall asleep faster — its gentle aroma relaxes the nervous system. 2. Reduces anxiety and stress. 3. Balances mood. 4. Gently supports skin care routines. 5. Blends well with many other oils in relaxing combinations.",
      },
      {
        vi: "Để đạt hiệu quả tốt nhất, hãy khuếch tán tinh dầu Oải Hương khoảng 30 phút trước khi ngủ trong không gian phòng ngủ thoáng khí.",
        en: "For best results, diffuse Lavender oil about 30 minutes before bedtime in a well-ventilated bedroom.",
      },
    ],
    date: "2026-06-12",
    author: { vi: "Đội ngũ Song Nguyên", en: "Song Nguyên Team" },
    category: { vi: "Kiến thức tinh dầu", en: "Essential Oil Knowledge" },
    accentColor: "#7B6FA6",
    readingMinutes: 4,
  },
  {
    slug: "quy-trinh-chung-cat-tinh-dau",
    title: {
      vi: "Bên trong quy trình chưng cất tinh dầu tại Song Nguyên",
      en: "Inside Song Nguyên's Essential Oil Distillation Process",
    },
    excerpt: {
      vi: "Cùng tìm hiểu hành trình từ vùng nguyên liệu hữu cơ đến chai tinh dầu nguyên chất trên tay bạn.",
      en: "Follow the journey from organic farmland to the pure essential oil bottle in your hands.",
    },
    content: [
      {
        vi: "Mỗi chai tinh dầu Song Nguyên đều trải qua quy trình kiểm soát chất lượng nghiêm ngặt, bắt đầu từ khâu chọn giống, canh tác hữu cơ cho đến chưng cất và kiểm định.",
        en: "Every bottle of Song Nguyên essential oil goes through a rigorous quality control process, starting from seed selection and organic farming through to distillation and testing.",
      },
      {
        vi: "Nguyên liệu được thu hoạch vào đúng thời điểm hàm lượng tinh dầu đạt đỉnh, sau đó đưa vào chưng cất hơi nước ở nhiệt độ và áp suất được kiểm soát chặt chẽ để giữ trọn dưỡng chất.",
        en: "Botanicals are harvested at the peak of their essential oil content, then steam-distilled under carefully controlled temperature and pressure to preserve their full properties.",
      },
      {
        vi: "Sau chưng cất, mỗi lô sản phẩm đều được kiểm định thành phần bằng phương pháp GC-MS trước khi đóng chai và đưa ra thị trường.",
        en: "After distillation, every batch is tested using GC-MS analysis before bottling and distribution.",
      },
    ],
    date: "2026-05-02",
    author: { vi: "Đội ngũ Song Nguyên", en: "Song Nguyên Team" },
    category: { vi: "Câu chuyện thương hiệu", en: "Brand Story" },
    accentColor: "#2F6F65",
    readingMinutes: 5,
  },
  {
    slug: "qua-tang-doanh-nghiep-cuoi-nam",
    title: {
      vi: "Xu hướng quà tặng doanh nghiệp cuối năm 2026",
      en: "2026 Year-End Corporate Gifting Trends",
    },
    excerpt: {
      vi: "Vì sao ngày càng nhiều doanh nghiệp chọn tinh dầu thiên nhiên làm quà tặng tri ân khách hàng và nhân viên.",
      en: "Why more businesses are choosing natural essential oils as appreciation gifts for clients and employees.",
    },
    content: [
      {
        vi: "Quà tặng doanh nghiệp không chỉ là một món đồ, mà còn là thông điệp thể hiện sự quan tâm và đẳng cấp thương hiệu. Tinh dầu thiên nhiên đang trở thành lựa chọn được ưa chuộng nhờ tính ứng dụng cao và giá trị chăm sóc sức khỏe.",
        en: "Corporate gifts aren't just items — they carry a message of care and brand identity. Natural essential oils are becoming a favored choice thanks to their practicality and wellness value.",
      },
      {
        vi: "Các bộ quà tặng có thể tùy chỉnh bao bì, in logo doanh nghiệp giúp tăng nhận diện thương hiệu trong lòng đối tác và khách hàng.",
        en: "Customizable packaging with your company logo helps strengthen brand recognition among partners and clients.",
      },
    ],
    date: "2026-04-18",
    author: { vi: "Đội ngũ Song Nguyên", en: "Song Nguyên Team" },
    category: { vi: "Quà tặng doanh nghiệp", en: "Corporate Gifting" },
    accentColor: "#B6924F",
    readingMinutes: 3,
  },
];

export function getPostBySlug(slug: string) {
  return newsPosts.find((post) => post.slug === slug);
}
