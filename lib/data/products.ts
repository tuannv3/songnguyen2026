import type { Bilingual } from "@/lib/i18n/types";

export type ProductCategory = "single" | "blend" | "gift" | "accessory";

export type Product = {
  slug: string;
  name: Bilingual;
  category: ProductCategory;
  badge?: "bestseller" | "new" | "featured";
  priceFrom: number; // VND
  volume: string;
  bottleColor: string;
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
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product, count = 3) {
  return products
    .filter((item) => item.slug !== product.slug && item.category === product.category)
    .slice(0, count);
}
