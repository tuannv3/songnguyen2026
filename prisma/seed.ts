import "./load-env";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/client";

/**
 * One-time-safe initializer: creates the admin account and the singleton
 * content rows the app requires to exist (About/Corporate Gifts/Careers page
 * copy, Site Settings). Hero slides, products, news and job postings are
 * managed entirely through /admin — an empty list on first run is expected
 * and the admin can add real entries right away.
 */

async function seedAdminUser() {
  const email = process.env.ADMIN_EMAIL;
  const initialPassword = process.env.ADMIN_INITIAL_PASSWORD;
  if (!email || !initialPassword) {
    throw new Error("ADMIN_EMAIL and ADMIN_INITIAL_PASSWORD must be set in .env.local");
  }
  const passwordHash = await bcrypt.hash(initialPassword, 12);
  await prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash },
  });
  console.log(`✓ Admin user ready: ${email}`);
}

async function seedAboutContent() {
  await prisma.aboutContent.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      eyebrowVi: "Câu chuyện Song Nguyên",
      eyebrowEn: "The Song Nguyên Story",
      headingVi: "Về chúng tôi",
      headingEn: "About Us",
      subheadingVi: "Nội dung giới thiệu — cập nhật trong trang quản trị.",
      subheadingEn: "Introduction content — update this from the admin panel.",
      storyHeadingVi: "Hành trình của chúng tôi",
      storyHeadingEn: "Our Journey",
      storyBodyVi: ["Nội dung câu chuyện thương hiệu — cập nhật trong trang quản trị."],
      storyBodyEn: ["Brand story content — update this from the admin panel."],
      storyImage: null,
      missionHeadingVi: "Sứ mệnh",
      missionHeadingEn: "Our Mission",
      missionBodyVi: "Nội dung sứ mệnh — cập nhật trong trang quản trị.",
      missionBodyEn: "Mission content — update this from the admin panel.",
      valuesHeadingVi: "Giá trị cốt lõi",
      valuesHeadingEn: "Core Values",
      values: [],
      timelineHeadingVi: "Các dấu mốc",
      timelineHeadingEn: "Milestones",
      timeline: [],
      certHeadingVi: "Chứng nhận & tiêu chuẩn",
      certHeadingEn: "Certifications & Standards",
      certBodyVi: "Nội dung chứng nhận — cập nhật trong trang quản trị.",
      certBodyEn: "Certification content — update this from the admin panel.",
      certImages: [],
    },
  });
  console.log("✓ About content ready");
}

async function seedCorporateGiftsContent() {
  await prisma.corporateGiftsContent.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      eyebrowVi: "Giải pháp quà tặng",
      eyebrowEn: "Gifting Solutions",
      headingVi: "Quà tặng doanh nghiệp từ tinh dầu thiên nhiên",
      headingEn: "Corporate Gifts from Natural Essential Oils",
      subheadingVi: "Nội dung giới thiệu — cập nhật trong trang quản trị.",
      subheadingEn: "Introduction content — update this from the admin panel.",
      whyHeadingVi: "Vì sao chọn quà tặng Song Nguyên",
      whyHeadingEn: "Why Choose Song Nguyên Gifts",
      giftSetsHeadingVi: "Bộ quà tặng gợi ý",
      giftSetsHeadingEn: "Suggested Gift Sets",
      processHeadingVi: "Quy trình đặt hàng",
      processHeadingEn: "Ordering Process",
      ctaHeadingVi: "Nhận báo giá cho doanh nghiệp của bạn",
      ctaHeadingEn: "Get a Quote for Your Business",
      ctaBodyVi: "Để lại thông tin, đội ngũ Song Nguyên sẽ liên hệ tư vấn trong 24h làm việc.",
      ctaBodyEn: "Leave your details and our team will reach out within 24 business hours.",
      whyItems: [],
      process: [],
    },
  });
  console.log("✓ Corporate Gifts content ready");
}

async function seedCareersPageContent() {
  await prisma.careersPageContent.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      eyebrowVi: "Gia nhập đội ngũ",
      eyebrowEn: "Join Our Team",
      headingVi: "Tuyển dụng tại Song Nguyên",
      headingEn: "Careers at Song Nguyên",
      subheadingVi: "Nội dung giới thiệu — cập nhật trong trang quản trị.",
      subheadingEn: "Introduction content — update this from the admin panel.",
      whyJoinHeadingVi: "Vì sao chọn Song Nguyên",
      whyJoinHeadingEn: "Why Join Song Nguyên",
      benefits: [],
      openPositionsHeadingVi: "Vị trí đang tuyển",
      openPositionsHeadingEn: "Open Positions",
      noOpeningsVi: "Hiện chưa có vị trí phù hợp — hãy gửi CV để chúng tôi lưu vào hồ sơ ứng viên tiềm năng.",
      noOpeningsEn: "No suitable openings right now — send us your CV to join our talent pool.",
    },
  });
  console.log("✓ Careers page content ready");
}

async function seedSiteSettings() {
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      footerAboutVi:
        "Song Nguyên Essential Oils chuyên sản xuất và cung cấp tinh dầu thiên nhiên nguyên chất, chưng cất từ dược liệu Việt Nam.",
      footerAboutEn:
        "Song Nguyên Essential Oils produces and supplies pure natural essential oils, distilled from Vietnamese botanicals.",
      addressVi: "",
      addressEn: "",
      phone: "",
      email: "",
      workingHoursVi: "Thứ 2 – Thứ 7, 8:00 – 17:30",
      workingHoursEn: "Mon – Sat, 8:00 AM – 5:30 PM",
      zaloUrl: "https://zalo.me",
      messengerUrl: "https://m.me",
      facebookUrl: "https://facebook.com",
      instagramUrl: "https://instagram.com",
      youtubeUrl: null,
    },
  });
  console.log("✓ Site settings ready");
}

async function seedHomeStats() {
  await prisma.homeStats.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      stat1Value: "5+",
      stat1LabelVi: "năm kinh nghiệm chưng cất",
      stat1LabelEn: "years of distilling craft",
      stat2Value: "12+",
      stat2LabelVi: "dòng sản phẩm tinh dầu",
      stat2LabelEn: "essential oil product lines",
      stat3Value: "80+",
      stat3LabelVi: "đối tác & doanh nghiệp tin dùng",
      stat3LabelEn: "trusted partners & businesses",
      stat4Value: "6",
      stat4LabelVi: "vùng nguyên liệu hữu cơ",
      stat4LabelEn: "organic growing regions",
    },
  });
  console.log("✓ Home stats ready");
}

async function seedHomeContent() {
  await prisma.homeContent.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      philosophyImage: null,
    },
  });
  console.log("✓ Home content ready");
}

async function main() {
  await seedAdminUser();
  await seedAboutContent();
  await seedCorporateGiftsContent();
  await seedCareersPageContent();
  await seedSiteSettings();
  await seedHomeStats();
  await seedHomeContent();
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
