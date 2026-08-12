import type { Bilingual } from "@/lib/i18n/types";

export type ProductCategory = "single" | "blend" | "gift" | "accessory" | "car";

export type Product = {
  slug: string;
  name: Bilingual;
  category: ProductCategory;
  badge?: "bestseller" | "new" | "featured";
  priceFrom: number; // VND
  volume: string;
  bottleColor: string;
  bottleVariant?: "dropper" | "diffuser" | "car";
  /** Path under /public, e.g. "/products/tinh-dau-cam.jpg". When set, replaces the illustrated placeholder with a real photo. */
  image?: string;
  /** Shopee product listing URL. Falls back to "#" until each product's real link is provided. */
  shopeeUrl?: string;
  accentColor: string;
  shortDescription: Bilingual;
  description: Bilingual;
  benefits: Bilingual[];
  howToUse: Bilingual;
  ingredients: Bilingual;
  origin: Bilingual;
  extraction: Bilingual;
  caution: Bilingual;
};

export const categoryLabels: Record<ProductCategory, Bilingual> = {
  single: { vi: "Tinh dầu đơn", en: "Single-Note Oils" },
  blend: { vi: "Tinh dầu phối hương", en: "Signature Blends" },
  gift: { vi: "Bộ quà tặng doanh nghiệp", en: "Corporate Gift Sets" },
  accessory: { vi: "Phụ kiện khuếch tán", en: "Diffuser Accessories" },
  car: { vi: "Tinh dầu treo xe & khuếch tán", en: "Car & Diffuser Scents" },
};

export const products: Product[] = [
  {
    slug: "tinh-dau-sa-chanh",
    name: { vi: "Tinh Dầu Sả Chanh", en: "Lemongrass Essential Oil" },
    category: "single",
    badge: "bestseller",
    priceFrom: 185000,
    volume: "10ml / 30ml",
    bottleColor: "#7FA05A",
    accentColor: "#DDE9C8",
    shortDescription: {
      vi: "Hương thơm tươi mát, xua muỗi tự nhiên và thư giãn tinh thần.",
      en: "A fresh, citrusy aroma that naturally repels insects and eases the mind.",
    },
    description: {
      vi: "Chưng cất từ sả chanh trồng hữu cơ tại Tây Nguyên, tinh dầu sả chanh Song Nguyên mang hương thơm the mát, sảng khoái — lý tưởng để khuếch tán trong không gian sống, xua đuổi côn trùng và giải tỏa căng thẳng sau ngày dài.",
      en: "Distilled from organically grown lemongrass in the Central Highlands, Song Nguyên's lemongrass oil offers a crisp, refreshing scent — perfect for diffusing at home, repelling insects and easing stress after a long day.",
    },
    benefits: [
      { vi: "Xua đuổi côn trùng tự nhiên", en: "Naturally repels insects" },
      { vi: "Thanh lọc không khí, khử mùi", en: "Purifies air and neutralizes odors" },
      { vi: "Giảm căng thẳng, tăng tỉnh táo", en: "Reduces stress and boosts alertness" },
    ],
    howToUse: {
      vi: "Nhỏ 3–5 giọt vào máy khuếch tán, hoặc pha loãng với dầu nền để massage.",
      en: "Add 3–5 drops to a diffuser, or dilute with carrier oil for massage.",
    },
    ingredients: { vi: "100% tinh dầu Sả Chanh nguyên chất (Cymbopogon citratus)", en: "100% pure Lemongrass oil (Cymbopogon citratus)" },
    origin: { vi: "Vùng nguyên liệu hữu cơ Tây Nguyên, Việt Nam", en: "Organic farming region, Central Highlands, Vietnam" },
    extraction: { vi: "Chưng cất hơi nước", en: "Steam distillation" },
    caution: { vi: "Không thoa trực tiếp lên da, tránh xa tầm tay trẻ em.", en: "Do not apply directly to skin undiluted. Keep out of reach of children." },
  },
  {
    slug: "tinh-dau-bac-ha",
    name: { vi: "Tinh Dầu Bạc Hà", en: "Peppermint Essential Oil" },
    category: "single",
    badge: "bestseller",
    priceFrom: 195000,
    volume: "10ml / 30ml",
    bottleColor: "#3E8E7E",
    accentColor: "#CFEAE3",
    shortDescription: {
      vi: "Hương bạc hà the mát, hỗ trợ hô hấp và tăng sự tập trung.",
      en: "Cool, invigorating mint that supports breathing and focus.",
    },
    description: {
      vi: "Tinh dầu bạc hà nguyên chất mang lại cảm giác the mát tức thì, thường được dùng để hỗ trợ hô hấp, giảm đau đầu nhẹ và tăng sự tỉnh táo, tập trung trong công việc.",
      en: "This pure peppermint oil delivers an instant cooling sensation — often used to support easy breathing, ease minor headaches, and sharpen focus during work.",
    },
    benefits: [
      { vi: "Hỗ trợ hô hấp, thông thoáng", en: "Supports clear breathing" },
      { vi: "Giảm cảm giác đau đầu nhẹ", en: "Eases minor headache tension" },
      { vi: "Tăng tỉnh táo, tập trung", en: "Boosts alertness and focus" },
    ],
    howToUse: {
      vi: "Khuếch tán 3–4 giọt, hoặc pha loãng thoa thái dương khi cần thư giãn.",
      en: "Diffuse 3–4 drops, or dilute and apply to temples when needed.",
    },
    ingredients: { vi: "100% tinh dầu Bạc Hà nguyên chất (Mentha piperita)", en: "100% pure Peppermint oil (Mentha piperita)" },
    origin: { vi: "Vùng nguyên liệu Lâm Đồng, Việt Nam", en: "Lâm Đồng growing region, Vietnam" },
    extraction: { vi: "Chưng cất hơi nước", en: "Steam distillation" },
    caution: { vi: "Không dùng cho trẻ dưới 6 tuổi, tránh vùng mắt.", en: "Not for children under 6. Avoid eye area." },
  },
  {
    slug: "tinh-dau-oai-huong",
    name: { vi: "Tinh Dầu Oải Hương", en: "Lavender Essential Oil" },
    category: "single",
    badge: "featured",
    priceFrom: 225000,
    volume: "10ml / 30ml",
    bottleColor: "#7B6FA6",
    accentColor: "#E4DFF2",
    shortDescription: {
      vi: "Hương thơm dịu nhẹ, hỗ trợ giấc ngủ sâu và thư thái.",
      en: "A gentle floral scent that supports deep, restful sleep.",
    },
    description: {
      vi: "Được mệnh danh là 'nữ hoàng' của các loại tinh dầu, oải hương Song Nguyên mang hương thơm dịu dàng, giúp làm dịu tâm trí, hỗ trợ giấc ngủ ngon và cân bằng cảm xúc.",
      en: "Known as the queen of essential oils, our lavender offers a soothing floral aroma that calms the mind, supports restful sleep and helps balance emotions.",
    },
    benefits: [
      { vi: "Hỗ trợ giấc ngủ sâu", en: "Supports deep sleep" },
      { vi: "Làm dịu căng thẳng, lo âu", en: "Calms stress and anxiety" },
      { vi: "Cân bằng cảm xúc", en: "Balances mood" },
    ],
    howToUse: {
      vi: "Khuếch tán trước khi ngủ 30 phút, hoặc nhỏ vài giọt lên gối.",
      en: "Diffuse 30 minutes before bed, or add a few drops to your pillow.",
    },
    ingredients: { vi: "100% tinh dầu Oải Hương nguyên chất (Lavandula angustifolia)", en: "100% pure Lavender oil (Lavandula angustifolia)" },
    origin: { vi: "Nhập nguyên liệu chọn lọc, chưng cất tại Việt Nam", en: "Curated botanicals, distilled in Vietnam" },
    extraction: { vi: "Chưng cất hơi nước", en: "Steam distillation" },
    caution: { vi: "Ngưng sử dụng nếu có dấu hiệu kích ứng da.", en: "Discontinue use if skin irritation occurs." },
  },
  {
    slug: "tinh-dau-tram-tra",
    name: { vi: "Tinh Dầu Tràm Trà", en: "Tea Tree Essential Oil" },
    category: "single",
    priceFrom: 175000,
    volume: "10ml / 30ml",
    bottleColor: "#4C7A6B",
    accentColor: "#D6E8DF",
    shortDescription: {
      vi: "Kháng khuẩn tự nhiên, hỗ trợ làm sạch không gian sống.",
      en: "A natural antibacterial to help keep your space clean.",
    },
    description: {
      vi: "Tinh dầu tràm trà có đặc tính kháng khuẩn tự nhiên, thường được dùng để làm sạch không khí, hỗ trợ chăm sóc da và không gian sống luôn tươi mới.",
      en: "Tea tree oil has natural antibacterial properties, commonly used to purify the air and support skin and home cleanliness routines.",
    },
    benefits: [
      { vi: "Kháng khuẩn, khử mùi tự nhiên", en: "Naturally antibacterial and deodorizing" },
      { vi: "Hỗ trợ làm sạch da", en: "Supports clear skin routines" },
      { vi: "An toàn cho không gian sống", en: "Safe for everyday home use" },
    ],
    howToUse: {
      vi: "Khuếch tán 3–5 giọt hoặc pha loãng dùng lau dọn nhà cửa.",
      en: "Diffuse 3–5 drops or dilute for household cleaning.",
    },
    ingredients: { vi: "100% tinh dầu Tràm Trà nguyên chất (Melaleuca alternifolia)", en: "100% pure Tea Tree oil (Melaleuca alternifolia)" },
    origin: { vi: "Vùng nguyên liệu Long An, Việt Nam", en: "Long An growing region, Vietnam" },
    extraction: { vi: "Chưng cất hơi nước", en: "Steam distillation" },
    caution: { vi: "Không uống, chỉ dùng ngoài da sau khi pha loãng.", en: "Not for internal use; topical use only when diluted." },
  },
  {
    slug: "tinh-dau-que",
    name: { vi: "Tinh Dầu Quế", en: "Cinnamon Essential Oil" },
    category: "single",
    badge: "new",
    priceFrom: 210000,
    volume: "10ml",
    bottleColor: "#A15A3A",
    accentColor: "#F0DCCB",
    shortDescription: {
      vi: "Hương ấm nồng, mang lại cảm giác ấm áp cho không gian.",
      en: "A warm, spicy aroma that brings coziness to any room.",
    },
    description: {
      vi: "Tinh dầu quế mang hương thơm ấm nồng đặc trưng, phù hợp khuếch tán vào mùa lạnh, tạo cảm giác ấm cúng và kích thích tinh thần làm việc.",
      en: "With its signature warm, spicy scent, cinnamon oil is ideal for cooler months — creating a cozy atmosphere and an energizing mood.",
    },
    benefits: [
      { vi: "Tạo không gian ấm cúng", en: "Creates a warm, cozy ambiance" },
      { vi: "Kích thích tinh thần làm việc", en: "Energizes and uplifts mood" },
      { vi: "Hương thơm lưu giữ lâu", en: "Long-lasting fragrance" },
    ],
    howToUse: {
      vi: "Khuếch tán 2–3 giọt, kết hợp cùng cam ngọt để tăng hương ấm áp.",
      en: "Diffuse 2–3 drops, blend with sweet orange for extra warmth.",
    },
    ingredients: { vi: "100% tinh dầu Quế nguyên chất (Cinnamomum cassia)", en: "100% pure Cinnamon oil (Cinnamomum cassia)" },
    origin: { vi: "Vùng nguyên liệu Yên Bái, Việt Nam", en: "Yên Bái growing region, Vietnam" },
    extraction: { vi: "Chưng cất hơi nước", en: "Steam distillation" },
    caution: { vi: "Nồng độ cao, cần pha loãng kỹ trước khi dùng trên da.", en: "High potency — dilute thoroughly before skin contact." },
  },
  {
    slug: "blend-thu-gian",
    name: { vi: "Blend Thư Giãn", en: "Relax Blend" },
    category: "blend",
    badge: "bestseller",
    priceFrom: 265000,
    volume: "10ml",
    bottleColor: "#5C7F6E",
    accentColor: "#DCE7DE",
    shortDescription: {
      vi: "Phối hợp Oải Hương, Cam Bergamot và Gỗ Đàn Hương giúp thư giãn sâu.",
      en: "A blend of Lavender, Bergamot and Sandalwood for deep relaxation.",
    },
    description: {
      vi: "Sự kết hợp tinh tế giữa Oải Hương, Cam Bergamot và Gỗ Đàn Hương tạo nên hương thơm ấm áp, cân bằng — lý tưởng cho không gian thiền định, yoga hay những phút giây thư giãn cuối ngày.",
      en: "A refined blend of Lavender, Bergamot and Sandalwood creates a warm, balanced scent — perfect for meditation, yoga or unwinding at the end of the day.",
    },
    benefits: [
      { vi: "Thư giãn sâu, giảm căng thẳng", en: "Deep relaxation and stress relief" },
      { vi: "Cân bằng cảm xúc", en: "Emotional balance" },
      { vi: "Phù hợp không gian thiền, yoga", en: "Ideal for meditation and yoga spaces" },
    ],
    howToUse: {
      vi: "Khuếch tán 4–5 giọt trong không gian yên tĩnh.",
      en: "Diffuse 4–5 drops in a quiet space.",
    },
    ingredients: { vi: "Tinh dầu Oải Hương, Cam Bergamot, Gỗ Đàn Hương", en: "Lavender, Bergamot and Sandalwood essential oils" },
    origin: { vi: "Phối chế và đóng chai tại Việt Nam", en: "Blended and bottled in Vietnam" },
    extraction: { vi: "Phối hương từ các tinh dầu chưng cất hơi nước", en: "Blended from steam-distilled essential oils" },
    caution: { vi: "Kiểm tra phản ứng da trước khi sử dụng rộng rãi.", en: "Patch test before broader use." },
  },
  {
    slug: "blend-ngu-ngon",
    name: { vi: "Blend Ngủ Ngon", en: "Sleep Well Blend" },
    category: "blend",
    priceFrom: 265000,
    volume: "10ml",
    bottleColor: "#4A5F8A",
    accentColor: "#DCE2F0",
    shortDescription: {
      vi: "Oải Hương, Hoa Cúc La Mã và Gỗ Tuyết Tùng cho giấc ngủ trọn vẹn.",
      en: "Lavender, Chamomile and Cedarwood for a truly restful night.",
    },
    description: {
      vi: "Blend Ngủ Ngon kết hợp Oải Hương dịu nhẹ, Hoa Cúc La Mã ấm áp và Gỗ Tuyết Tùng trầm ấm, hỗ trợ thư thái tâm trí và đưa bạn vào giấc ngủ sâu hơn mỗi đêm.",
      en: "Sleep Well brings together gentle Lavender, warm Chamomile and grounding Cedarwood to quiet the mind and support deeper rest each night.",
    },
    benefits: [
      { vi: "Hỗ trợ đi vào giấc ngủ nhanh hơn", en: "Helps you fall asleep faster" },
      { vi: "Giảm suy nghĩ miên man trước khi ngủ", en: "Quiets racing thoughts before bed" },
      { vi: "Hương thơm nhẹ nhàng, không gắt", en: "Soft, non-overpowering scent" },
    ],
    howToUse: {
      vi: "Khuếch tán 30 phút trước khi ngủ trong phòng ngủ.",
      en: "Diffuse in the bedroom 30 minutes before sleep.",
    },
    ingredients: { vi: "Tinh dầu Oải Hương, Hoa Cúc La Mã, Gỗ Tuyết Tùng", en: "Lavender, Chamomile and Cedarwood essential oils" },
    origin: { vi: "Phối chế và đóng chai tại Việt Nam", en: "Blended and bottled in Vietnam" },
    extraction: { vi: "Phối hương từ các tinh dầu chưng cất hơi nước", en: "Blended from steam-distilled essential oils" },
    caution: { vi: "Không dùng cho phụ nữ mang thai 3 tháng đầu.", en: "Avoid during the first trimester of pregnancy." },
  },
  {
    slug: "blend-tuoi-moi",
    name: { vi: "Blend Tươi Mới", en: "Fresh Focus Blend" },
    category: "blend",
    badge: "new",
    priceFrom: 255000,
    volume: "10ml",
    bottleColor: "#C79A3E",
    accentColor: "#F3E7C9",
    shortDescription: {
      vi: "Chanh, Bạc Hà và Bưởi mang năng lượng tươi mới cho ngày làm việc.",
      en: "Lemon, Peppermint and Grapefruit for an energized workday.",
    },
    description: {
      vi: "Blend Tươi Mới kết hợp vị chua thanh của Chanh, sự the mát của Bạc Hà và hương cam quýt của Bưởi, mang lại năng lượng tích cực, tăng sự tập trung cho không gian làm việc.",
      en: "Fresh Focus combines bright Lemon, cooling Peppermint and zesty Grapefruit for a burst of positive energy and sharper focus at work.",
    },
    benefits: [
      { vi: "Tăng năng lượng, giảm mệt mỏi", en: "Boosts energy and reduces fatigue" },
      { vi: "Hỗ trợ tập trung khi làm việc", en: "Supports focus while working" },
      { vi: "Làm tươi mới không gian văn phòng", en: "Freshens up office spaces" },
    ],
    howToUse: {
      vi: "Khuếch tán vào buổi sáng hoặc giữa giờ làm việc.",
      en: "Diffuse in the morning or during a midday work break.",
    },
    ingredients: { vi: "Tinh dầu Chanh, Bạc Hà, Bưởi", en: "Lemon, Peppermint and Grapefruit essential oils" },
    origin: { vi: "Phối chế và đóng chai tại Việt Nam", en: "Blended and bottled in Vietnam" },
    extraction: { vi: "Phối hương từ các tinh dầu ép lạnh và chưng cất hơi nước", en: "Blended from cold-pressed and steam-distilled oils" },
    caution: { vi: "Tránh tiếp xúc trực tiếp ánh nắng sau khi thoa da.", en: "Avoid direct sun exposure after topical application." },
  },
  {
    slug: "bo-qua-tang-tinh-hoa",
    name: { vi: "Bộ Quà Tặng Doanh Nghiệp Tinh Hoa", en: "Premium Corporate Gift Set" },
    category: "gift",
    badge: "featured",
    priceFrom: 890000,
    volume: "3 x 10ml + máy khuếch tán mini",
    bottleColor: "#B6924F",
    image: "/products/qua-tang-doanh-nghiep.jpg",
    accentColor: "#F1E6CC",
    shortDescription: {
      vi: "Bộ 3 tinh dầu signature cùng máy khuếch tán mini, hộp in logo theo yêu cầu.",
      en: "Three signature oils with a mini diffuser, custom logo packaging available.",
    },
    description: {
      vi: "Bộ quà tặng cao cấp gồm 3 chai tinh dầu signature, máy khuếch tán mini và hộp quà thiết kế sang trọng — có thể in logo, thông điệp riêng theo yêu cầu doanh nghiệp. Món quà ý nghĩa cho đối tác và nhân viên trong các dịp lễ, sự kiện tri ân.",
      en: "A premium gift set featuring three signature essential oils, a mini diffuser and an elegant gift box — customizable with your logo and message. A meaningful gift for partners and employees during holidays and appreciation events.",
    },
    benefits: [
      { vi: "In logo & thông điệp theo yêu cầu", en: "Custom logo and message printing" },
      { vi: "Hộp quà sang trọng, sẵn sàng tặng", en: "Elegant, gift-ready packaging" },
      { vi: "Linh hoạt số lượng đặt hàng", en: "Flexible order quantities" },
    ],
    howToUse: {
      vi: "Liên hệ đội ngũ tư vấn để được thiết kế bộ quà tặng phù hợp.",
      en: "Contact our team to design a gift set tailored to your needs.",
    },
    ingredients: { vi: "3 tinh dầu signature chọn lọc + máy khuếch tán mini", en: "3 curated signature oils + mini diffuser" },
    origin: { vi: "Sản xuất và đóng gói tại Việt Nam", en: "Produced and packaged in Vietnam" },
    extraction: { vi: "Chưng cất hơi nước & phối hương thủ công", en: "Steam distillation & hand-blended" },
    caution: { vi: "Đặt hàng số lượng lớn vui lòng liên hệ trước tối thiểu 2 tuần.", en: "For bulk orders, please contact us at least 2 weeks in advance." },
  },
  {
    slug: "bo-qua-tang-tri-an",
    name: { vi: "Bộ Quà Tặng Tri Ân Đối Tác", en: "Partner Appreciation Set" },
    category: "gift",
    priceFrom: 650000,
    volume: "2 x 10ml + nến thơm",
    bottleColor: "#7B5A6B",
    accentColor: "#EBDAE4",
    shortDescription: {
      vi: "2 tinh dầu chọn lọc cùng nến thơm handmade, thiệp cảm ơn đi kèm.",
      en: "Two curated oils with a handmade candle and a thank-you card.",
    },
    description: {
      vi: "Bộ quà tặng nhỏ gọn gồm 2 tinh dầu chọn lọc, nến thơm handmade và thiệp cảm ơn — phù hợp làm quà tri ân khách hàng, đối tác nhân dịp cuối năm hoặc các sự kiện đặc biệt.",
      en: "A compact gift set with two curated oils, a handmade candle and a thank-you card — ideal for year-end appreciation or special occasions with clients and partners.",
    },
    benefits: [
      { vi: "Thiết kế nhỏ gọn, dễ vận chuyển", en: "Compact, easy to ship" },
      { vi: "Thiệp cảm ơn cá nhân hóa", en: "Personalized thank-you card" },
      { vi: "Giá thành phù hợp tặng số lượng lớn", en: "Cost-effective for bulk gifting" },
    ],
    howToUse: {
      vi: "Liên hệ đội ngũ tư vấn để được thiết kế bộ quà tặng phù hợp.",
      en: "Contact our team to design a gift set tailored to your needs.",
    },
    ingredients: { vi: "2 tinh dầu chọn lọc + nến thơm handmade", en: "2 curated oils + handmade candle" },
    origin: { vi: "Sản xuất và đóng gói tại Việt Nam", en: "Produced and packaged in Vietnam" },
    extraction: { vi: "Chưng cất hơi nước & phối hương thủ công", en: "Steam distillation & hand-blended" },
    caution: { vi: "Đặt hàng số lượng lớn vui lòng liên hệ trước tối thiểu 2 tuần.", en: "For bulk orders, please contact us at least 2 weeks in advance." },
  },
  {
    slug: "may-khuech-tan-gom-su",
    name: { vi: "Máy Khuếch Tán Tinh Dầu Gốm Sứ", en: "Ceramic Essential Oil Diffuser" },
    category: "accessory",
    priceFrom: 450000,
    volume: "300ml",
    bottleColor: "#8FA7A0",
    accentColor: "#E5EBE9",
    shortDescription: {
      vi: "Thiết kế gốm sứ tối giản, ánh sáng dịu nhẹ, vận hành êm ái.",
      en: "Minimalist ceramic design with soft lighting and silent operation.",
    },
    description: {
      vi: "Máy khuếch tán tinh dầu thiết kế gốm sứ tối giản, phù hợp mọi không gian nội thất. Vận hành êm ái, ánh sáng dịu nhẹ có thể điều chỉnh, dung tích 300ml cho thời gian khuếch tán liên tục lên đến 8 giờ.",
      en: "This minimalist ceramic diffuser complements any interior. Silent operation with adjustable soft lighting, and a 300ml capacity for up to 8 hours of continuous diffusion.",
    },
    benefits: [
      { vi: "Vận hành êm ái, không tiếng ồn", en: "Silent, quiet operation" },
      { vi: "Ánh sáng dịu có thể điều chỉnh", en: "Adjustable ambient lighting" },
      { vi: "Tự ngắt an toàn khi hết nước", en: "Auto shut-off when water runs low" },
    ],
    howToUse: {
      vi: "Đổ nước đến vạch quy định, nhỏ 5–8 giọt tinh dầu yêu thích.",
      en: "Fill with water to the marked line, add 5–8 drops of your favorite oil.",
    },
    ingredients: { vi: "Thân gốm sứ, công nghệ phun sương siêu âm", en: "Ceramic body, ultrasonic misting technology" },
    origin: { vi: "Thiết kế độc quyền Song Nguyên", en: "Song Nguyên exclusive design" },
    extraction: { vi: "—", en: "—" },
    caution: { vi: "Không đổ tinh dầu nguyên chất trực tiếp vào bình chứa.", en: "Do not pour undiluted oil directly into the water tank." },
  },
  {
    slug: "may-khuech-tan-go-soi",
    name: { vi: "Máy Khuếch Tán Tinh Dầu Gỗ Sồi", en: "Oak Wood Essential Oil Diffuser" },
    category: "accessory",
    priceFrom: 520000,
    volume: "500ml",
    bottleColor: "#8A6A4A",
    accentColor: "#EAE0D2",
    shortDescription: {
      vi: "Chất liệu gỗ sồi tự nhiên, dung tích lớn cho không gian rộng.",
      en: "Natural oak finish with a large capacity for bigger rooms.",
    },
    description: {
      vi: "Kết hợp giữa gỗ sồi tự nhiên và công nghệ phun sương hiện đại, máy khuếch tán dung tích 500ml phù hợp cho phòng khách, văn phòng rộng, mang đến không gian ấm cúng và thư thái.",
      en: "Combining natural oak with modern misting technology, this 500ml diffuser suits living rooms and larger offices, bringing a warm, calming atmosphere.",
    },
    benefits: [
      { vi: "Dung tích lớn, phù hợp không gian rộng", en: "Large capacity for bigger spaces" },
      { vi: "Chất liệu gỗ sồi tự nhiên sang trọng", en: "Elegant natural oak material" },
      { vi: "Hẹn giờ linh hoạt 1h/3h/6h/liên tục", en: "Flexible timer: 1h/3h/6h/continuous" },
    ],
    howToUse: {
      vi: "Đổ nước đến vạch quy định, nhỏ 6–10 giọt tinh dầu yêu thích.",
      en: "Fill with water to the marked line, add 6–10 drops of your favorite oil.",
    },
    ingredients: { vi: "Thân gỗ sồi tự nhiên, công nghệ phun sương siêu âm", en: "Natural oak body, ultrasonic misting technology" },
    origin: { vi: "Thiết kế độc quyền Song Nguyên", en: "Song Nguyên exclusive design" },
    extraction: { vi: "—", en: "—" },
    caution: { vi: "Không đổ tinh dầu nguyên chất trực tiếp vào bình chứa.", en: "Do not pour undiluted oil directly into the water tank." },
  },
  {
    slug: "tinh-dau-treo-xe-sa",
    name: { vi: "Tinh Dầu Hương Sả", en: "Lemongrass Essential Oil — Grass Scent" },
    category: "car",
    badge: "bestseller",
    priceFrom: 65000,
    volume: "5ml / 8ml (treo xe) · 20ml / 50ml (chai)",
    bottleColor: "#4C8A6A",
    bottleVariant: "car",
    accentColor: "#DCEEE0",
    shortDescription: {
      vi: "Thanh lọc không khí, xua muỗi tự nhiên, thư giãn giảm stress.",
      en: "Purifies the air, naturally repels insects and eases stress.",
    },
    description: {
      vi: "Tinh dầu hương Sả nguyên chất 100% từ thiên nhiên, sẵn có ở dạng treo xe tiện lợi (5ml, 8ml) và chai tinh dầu khuếch tán (20ml, 50ml). Hương thơm the mát giúp thanh lọc không khí, loại bỏ mùi khó chịu và mang lại cảm giác dễ chịu cho mọi không gian.",
      en: "100% pure natural lemongrass essential oil, available as a convenient car hanging diffuser (5ml, 8ml) and as a bottle for home diffusers (20ml, 50ml). Its crisp aroma purifies the air, removes unpleasant odors and brings a pleasant feeling to any space.",
    },
    benefits: [
      { vi: "Thanh lọc không khí, loại bỏ mùi khó chịu", en: "Purifies air and removes unpleasant odors" },
      { vi: "Thư giãn, giảm stress, cân bằng cảm xúc", en: "Relaxes, reduces stress and balances mood" },
      { vi: "Lưu hương dài lâu, lan tỏa bền bỉ", en: "Long-lasting, steadily diffusing fragrance" },
    ],
    howToUse: {
      vi: "Treo trực tiếp trong xe hơi, hoặc nhỏ 5–8 giọt vào máy khuếch tán tại phòng khách, phòng ngủ, phòng làm việc.",
      en: "Hang directly in your car, or add 5–8 drops to a diffuser in the living room, bedroom or office.",
    },
    ingredients: { vi: "100% tinh dầu Sả nguyên chất, chiết xuất thiên nhiên, Organic", en: "100% pure Lemongrass oil, natural extract, Organic" },
    origin: { vi: "Nguồn nguyên liệu thiên nhiên Việt Nam", en: "Natural botanicals sourced in Vietnam" },
    extraction: { vi: "Chưng cất hơi nước", en: "Steam distillation" },
    caution: { vi: "Không phun/nhỏ trực tiếp lên da hoặc bề mặt nội thất xe.", en: "Do not spray or drip directly onto skin or car interior surfaces." },
  },
  {
    slug: "tinh-dau-que-thanh",
    name: { vi: "Tinh Dầu Quế Thanh", en: "Cinnamon Essential Oil — Cinnamon Rever" },
    category: "car",
    priceFrom: 95000,
    volume: "50ml (chai khuếch tán gỗ)",
    bottleColor: "#A15A3A",
    bottleVariant: "dropper",
    image: "/products/tinh-dau-que-thanh.jpg",
    accentColor: "#F0DCCB",
    shortDescription: {
      vi: "Ấm áp và đầy năng lượng — hương quế ngọt, cay nhẹ, ấm nồng.",
      en: "Warm and energizing — sweet, lightly spicy cinnamon bark aroma.",
    },
    description: {
      vi: "Mùi hương ngọt, cay nhẹ, ấm nồng đặc trưng của vỏ quế tạo cảm giác gần gũi và trấn an. Sưởi ấm không gian, giúp thư giãn và lan tỏa cảm giác dễ chịu trong những ngày mưa lạnh.",
      en: "A sweet, lightly spicy, warm aroma characteristic of cinnamon bark, creating a comforting, reassuring feeling. Warms up any space, aids relaxation and spreads a pleasant feeling on cold, rainy days.",
    },
    benefits: [
      { vi: "Sưởi ấm không gian sống", en: "Warms up your living space" },
      { vi: "Giúp thư giãn tinh thần", en: "Supports mental relaxation" },
      { vi: "Lan tỏa cảm giác gần gũi, dễ chịu", en: "Spreads a comforting, pleasant feeling" },
    ],
    howToUse: {
      vi: "Nhỏ 5–8 giọt vào máy khuếch tán, đặt tại phòng khách hoặc phòng ngủ vào mùa lạnh.",
      en: "Add 5–8 drops to a diffuser, placed in the living room or bedroom during colder months.",
    },
    ingredients: { vi: "100% tinh dầu Quế Thanh nguyên chất, Organic", en: "100% pure Cinnamon oil, Organic" },
    origin: { vi: "Nguồn nguyên liệu thiên nhiên Việt Nam", en: "Natural botanicals sourced in Vietnam" },
    extraction: { vi: "Chưng cất hơi nước", en: "Steam distillation" },
    caution: { vi: "Nồng độ cao, không thoa trực tiếp lên da khi chưa pha loãng.", en: "High potency — do not apply undiluted to skin." },
  },
  {
    slug: "tinh-dau-huong-thao",
    name: { vi: "Tinh Dầu Hương Thảo", en: "Rosemary Essential Oil — Rosemary Haven" },
    category: "car",
    priceFrom: 95000,
    volume: "50ml (chai khuếch tán gỗ)",
    bottleColor: "#5C7F6E",
    bottleVariant: "dropper",
    image: "/products/tinh-dau-huong-thao.jpg",
    accentColor: "#DCE7DE",
    shortDescription: {
      vi: "Tỉnh táo và sáng suốt — hương thảo mộc nhẹ, hơi the mát.",
      en: "Alert and clear-minded — a light herbal, slightly cooling aroma.",
    },
    description: {
      vi: "Hương thảo mộc nhẹ nhàng, hơi the mát, phảng phất mùi rừng khô, rất dễ chịu và tươi mới. Giúp tập trung tinh thần và có đặc tính kháng khuẩn nhẹ.",
      en: "A gentle herbal scent with a light cooling touch and a hint of dry woodland — refreshing and pleasant. Helps sharpen focus and offers mild antibacterial properties.",
    },
    benefits: [
      { vi: "Hỗ trợ tập trung tinh thần", en: "Supports mental focus" },
      { vi: "Kháng khuẩn nhẹ, thanh lọc không khí", en: "Mild antibacterial, purifies air" },
      { vi: "Hương thơm tươi mới, sảng khoái", en: "Fresh, invigorating fragrance" },
    ],
    howToUse: {
      vi: "Nhỏ 5–8 giọt vào máy khuếch tán tại không gian làm việc để tăng sự tập trung.",
      en: "Add 5–8 drops to a diffuser in your workspace to boost focus.",
    },
    ingredients: { vi: "100% tinh dầu Hương Thảo nguyên chất, Organic", en: "100% pure Rosemary oil, Organic" },
    origin: { vi: "Nguồn nguyên liệu thiên nhiên Việt Nam", en: "Natural botanicals sourced in Vietnam" },
    extraction: { vi: "Chưng cất hơi nước", en: "Steam distillation" },
    caution: { vi: "Không dùng cho phụ nữ mang thai và người bị động kinh.", en: "Avoid use during pregnancy or for those with epilepsy." },
  },
  {
    slug: "tinh-dau-trac-bach-diep",
    name: { vi: "Tinh Dầu Trắc Bách Diệp", en: "Cypress Essential Oil — Cypress Whisper" },
    category: "car",
    badge: "new",
    priceFrom: 145000,
    volume: "100ml (chai khuếch tán gỗ)",
    bottleColor: "#3E5F6E",
    bottleVariant: "dropper",
    image: "/products/tinh-dau-trac-bach-diep.jpg",
    accentColor: "#D6E4E8",
    shortDescription: {
      vi: "Thư giãn sâu và cân bằng cảm xúc — hương mộc mạc, thanh mát.",
      en: "Deep relaxation and emotional balance — an earthy, cool aroma.",
    },
    description: {
      vi: "Hương mộc mạc, thanh mát, hơi gỗ gợi cảm giác như đang đi giữa khu rừng nguyên sinh. Giải tỏa cảm xúc tiêu cực, giảm lo âu, giúp kết nối với nội tâm và thanh lọc không khí.",
      en: "An earthy, cool, woody aroma that evokes walking through untouched forest. Releases negative emotions, eases anxiety, helps you connect inward, and purifies the air.",
    },
    benefits: [
      { vi: "Giải tỏa cảm xúc tiêu cực, giảm lo âu", en: "Releases negative emotions and eases anxiety" },
      { vi: "Giúp kết nối với nội tâm", en: "Helps you connect with your inner self" },
      { vi: "Thanh lọc không khí trong lành", en: "Purifies and freshens the air" },
    ],
    howToUse: {
      vi: "Nhỏ 5–8 giọt vào máy khuếch tán khi thiền định, yoga hoặc trước khi ngủ.",
      en: "Add 5–8 drops to a diffuser during meditation, yoga, or before bed.",
    },
    ingredients: { vi: "100% tinh dầu Trắc Bách Diệp nguyên chất, Organic", en: "100% pure Cypress oil, Organic" },
    origin: { vi: "Nguồn nguyên liệu thiên nhiên Việt Nam", en: "Natural botanicals sourced in Vietnam" },
    extraction: { vi: "Chưng cất hơi nước", en: "Steam distillation" },
    caution: { vi: "Không dùng cho phụ nữ mang thai 3 tháng đầu.", en: "Avoid during the first trimester of pregnancy." },
  },
  {
    slug: "tinh-dau-dinh-huong",
    name: { vi: "Tinh Dầu Đinh Hương", en: "Clove Essential Oil — Clove Tropica" },
    category: "car",
    priceFrom: 65000,
    volume: "5ml / 8ml (treo xe) · 20ml (chai)",
    bottleColor: "#2F6F65",
    bottleVariant: "car",
    image: "/products/tinh-dau-dinh-huong.jpg",
    accentColor: "#D6E8E4",
    shortDescription: {
      vi: "Hương thơm trầm ấm, hơi cay nồng mang đến cảm giác an yên.",
      en: "A deep, warm, lightly spicy aroma that brings a sense of calm.",
    },
    description: {
      vi: "Hương thơm trầm ấm, hơi cay nồng của đinh hương mang đến cảm giác an yên, gần gũi. Có sẵn ở dạng treo xe tiện lợi và chai khuếch tán tại nhà.",
      en: "A deep, warm, lightly spicy clove aroma that brings a sense of calm and familiarity. Available as a convenient car hanging diffuser and as a home diffuser bottle.",
    },
    benefits: [
      { vi: "Mang lại cảm giác an yên, gần gũi", en: "Brings a calm, comforting feeling" },
      { vi: "Thanh lọc không khí trong xe và nhà ở", en: "Purifies air in cars and homes" },
      { vi: "Lưu hương bền lâu", en: "Long-lasting fragrance" },
    ],
    howToUse: {
      vi: "Treo trực tiếp trong xe hơi, hoặc nhỏ 5–8 giọt vào máy khuếch tán.",
      en: "Hang directly in your car, or add 5–8 drops to a diffuser.",
    },
    ingredients: { vi: "100% tinh dầu Đinh Hương nguyên chất, Organic", en: "100% pure Clove oil, Organic" },
    origin: { vi: "Nguồn nguyên liệu thiên nhiên Việt Nam", en: "Natural botanicals sourced in Vietnam" },
    extraction: { vi: "Chưng cất hơi nước", en: "Steam distillation" },
    caution: { vi: "Nồng độ cao, không thoa trực tiếp lên da khi chưa pha loãng.", en: "High potency — do not apply undiluted to skin." },
  },
  {
    slug: "tinh-dau-hoa-hong",
    name: { vi: "Tinh Dầu Hoa Hồng", en: "Rose Essential Oil — Neroli Breeze" },
    category: "car",
    badge: "featured",
    priceFrom: 65000,
    volume: "5ml / 8ml (treo xe) · 20ml (chai)",
    bottleColor: "#B06B7A",
    bottleVariant: "car",
    image: "/products/tinh-dau-hoa-hong.jpg",
    accentColor: "#F3DEE3",
    shortDescription: {
      vi: "Mùi hương quyến rũ, sang trọng — điểm nhấn ấn tượng cho không gian.",
      en: "A seductive, elegant aroma — a striking accent for any space.",
    },
    description: {
      vi: "Mùi hương quyến rũ, sang trọng từ hoa hồng tạo điểm nhấn ấn tượng cho xe hơi hay không gian sống của bạn. Nhẹ nhàng lan tỏa, mang lại cảm giác nữ tính, tinh tế.",
      en: "A seductive, elegant rose aroma that adds a striking accent to your car or living space. Gently diffuses, bringing a feminine, refined feeling.",
    },
    benefits: [
      { vi: "Hương thơm sang trọng, quyến rũ", en: "Elegant, seductive fragrance" },
      { vi: "Tạo điểm nhấn ấn tượng cho không gian", en: "Adds a striking accent to any space" },
      { vi: "Thư giãn nhẹ nhàng, cân bằng cảm xúc", en: "Gentle relaxation and emotional balance" },
    ],
    howToUse: {
      vi: "Treo trực tiếp trong xe hơi, hoặc nhỏ 5–8 giọt vào máy khuếch tán.",
      en: "Hang directly in your car, or add 5–8 drops to a diffuser.",
    },
    ingredients: { vi: "100% tinh dầu Hoa Hồng nguyên chất, Organic", en: "100% pure Rose oil, Organic" },
    origin: { vi: "Nguồn nguyên liệu thiên nhiên Việt Nam", en: "Natural botanicals sourced in Vietnam" },
    extraction: { vi: "Chưng cất hơi nước", en: "Steam distillation" },
    caution: { vi: "Kiểm tra phản ứng da trước khi sử dụng rộng rãi.", en: "Patch test before broader use." },
  },
  {
    slug: "tinh-dau-cam",
    name: { vi: "Tinh Dầu Cam", en: "Orange Essential Oil — Citrus Bloom" },
    category: "car",
    priceFrom: 65000,
    volume: "5ml / 8ml (treo xe) · 20ml (chai)",
    bottleColor: "#D98B2E",
    bottleVariant: "car",
    image: "/products/tinh-dau-cam.jpg",
    accentColor: "#FBE7CE",
    shortDescription: {
      vi: "Hương cam ngọt dịu lan tỏa, gợi cảm giác sum vầy và hạnh phúc.",
      en: "A soft, sweet orange scent evoking togetherness and joy.",
    },
    description: {
      vi: "Hương cam ngọt dịu lan tỏa nhẹ nhàng, gợi cảm giác sum vầy và hạnh phúc. Thích hợp cho xe hơi và mọi không gian trong nhà, mang lại năng lượng tích cực mỗi ngày.",
      en: "A soft, sweet orange scent that gently diffuses, evoking togetherness and happiness. Suited for cars and any room in the home, bringing positive energy every day.",
    },
    benefits: [
      { vi: "Mang lại cảm giác vui tươi, tích cực", en: "Brings a cheerful, positive feeling" },
      { vi: "Thơm dịu nhẹ, không gây nồng", en: "Softly fragrant, never overpowering" },
      { vi: "Phù hợp cho cả xe hơi và không gian sống", en: "Suited for both cars and living spaces" },
    ],
    howToUse: {
      vi: "Treo trực tiếp trong xe hơi, hoặc nhỏ 5–8 giọt vào máy khuếch tán.",
      en: "Hang directly in your car, or add 5–8 drops to a diffuser.",
    },
    ingredients: { vi: "100% tinh dầu Cam nguyên chất, Organic", en: "100% pure Orange oil, Organic" },
    origin: { vi: "Nguồn nguyên liệu thiên nhiên Việt Nam", en: "Natural botanicals sourced in Vietnam" },
    extraction: { vi: "Ép lạnh từ vỏ cam", en: "Cold-pressed from orange peel" },
    caution: { vi: "Tránh tiếp xúc trực tiếp ánh nắng sau khi thoa da.", en: "Avoid direct sun exposure after topical application." },
  },
  {
    slug: "tinh-dau-buoi",
    name: { vi: "Tinh Dầu Bưởi", en: "Pomelo Essential Oil — Pomelo Élite" },
    category: "car",
    priceFrom: 65000,
    volume: "5ml / 8ml (treo xe) · 20ml (chai)",
    bottleColor: "#8FAE5C",
    bottleVariant: "car",
    image: "/products/tinh-dau-buoi.jpg",
    accentColor: "#E7F0D9",
    shortDescription: {
      vi: "Mùi hương nhẹ nhàng, tươi mới từ vỏ bưởi, mang lại cảm giác dễ chịu.",
      en: "A light, fresh pomelo-peel scent that brings a pleasant feeling.",
    },
    description: {
      vi: "Mùi hương nhẹ nhàng, tươi mới từ vỏ bưởi mang lại cảm giác dễ chịu, thư thái. Là lựa chọn thanh nhã cho những ai yêu thích hương cam quýt dịu nhẹ, không gắt.",
      en: "A light, fresh scent from pomelo peel that brings a pleasant, relaxed feeling. An elegant choice for those who love a soft, gentle citrus note.",
    },
    benefits: [
      { vi: "Hương tươi mới, dễ chịu", en: "Fresh, pleasant fragrance" },
      { vi: "Thanh lọc không khí trong xe và nhà ở", en: "Purifies air in cars and homes" },
      { vi: "Hương cam quýt dịu nhẹ, không gắt", en: "Soft, gentle citrus note" },
    ],
    howToUse: {
      vi: "Treo trực tiếp trong xe hơi, hoặc nhỏ 5–8 giọt vào máy khuếch tán.",
      en: "Hang directly in your car, or add 5–8 drops to a diffuser.",
    },
    ingredients: { vi: "100% tinh dầu Bưởi nguyên chất, Organic", en: "100% pure Pomelo oil, Organic" },
    origin: { vi: "Nguồn nguyên liệu thiên nhiên Việt Nam", en: "Natural botanicals sourced in Vietnam" },
    extraction: { vi: "Ép lạnh từ vỏ bưởi", en: "Cold-pressed from pomelo peel" },
    caution: { vi: "Tránh tiếp xúc trực tiếp ánh nắng sau khi thoa da.", en: "Avoid direct sun exposure after topical application." },
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product, count = 3) {
  return products
    .filter((item) => item.slug !== product.slug && item.category === product.category)
    .slice(0, count);
}
