-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeroSlide" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "eyebrowVi" TEXT NOT NULL,
    "eyebrowEn" TEXT NOT NULL,
    "titleVi" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "subtitleVi" TEXT NOT NULL,
    "subtitleEn" TEXT NOT NULL,
    "ctaPrimaryLabelVi" TEXT NOT NULL,
    "ctaPrimaryLabelEn" TEXT NOT NULL,
    "ctaPrimaryHref" TEXT NOT NULL,
    "ctaSecondaryLabelVi" TEXT,
    "ctaSecondaryLabelEn" TEXT,
    "ctaSecondaryHref" TEXT,
    "bottleColor1" TEXT NOT NULL,
    "bottleColor2" TEXT NOT NULL,
    "glowColor" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HeroSlide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nameVi" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "badge" TEXT,
    "priceFrom" INTEGER NOT NULL,
    "volume" TEXT NOT NULL,
    "bottleColor" TEXT NOT NULL,
    "bottleVariant" TEXT,
    "image" TEXT,
    "shopeeUrl" TEXT,
    "accentColor" TEXT NOT NULL,
    "shortDescriptionVi" TEXT NOT NULL,
    "shortDescriptionEn" TEXT NOT NULL,
    "descriptionVi" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "benefits" JSONB NOT NULL,
    "howToUseVi" TEXT NOT NULL,
    "howToUseEn" TEXT NOT NULL,
    "ingredientsVi" TEXT NOT NULL,
    "ingredientsEn" TEXT NOT NULL,
    "originVi" TEXT NOT NULL,
    "originEn" TEXT NOT NULL,
    "extractionVi" TEXT NOT NULL,
    "extractionEn" TEXT NOT NULL,
    "cautionVi" TEXT NOT NULL,
    "cautionEn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsPost" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titleVi" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "excerptVi" TEXT NOT NULL,
    "excerptEn" TEXT NOT NULL,
    "contentVi" JSONB NOT NULL,
    "contentEn" JSONB NOT NULL,
    "date" TEXT NOT NULL,
    "authorVi" TEXT NOT NULL,
    "authorEn" TEXT NOT NULL,
    "categoryVi" TEXT NOT NULL,
    "categoryEn" TEXT NOT NULL,
    "accentColor" TEXT NOT NULL,
    "readingMinutes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobPosting" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "titleVi" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "locationVi" TEXT NOT NULL,
    "locationEn" TEXT NOT NULL,
    "typeVi" TEXT NOT NULL,
    "typeEn" TEXT NOT NULL,
    "summaryVi" TEXT NOT NULL,
    "summaryEn" TEXT NOT NULL,
    "requirements" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobPosting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AboutContent" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "eyebrowVi" TEXT NOT NULL,
    "eyebrowEn" TEXT NOT NULL,
    "headingVi" TEXT NOT NULL,
    "headingEn" TEXT NOT NULL,
    "subheadingVi" TEXT NOT NULL,
    "subheadingEn" TEXT NOT NULL,
    "storyHeadingVi" TEXT NOT NULL,
    "storyHeadingEn" TEXT NOT NULL,
    "storyBodyVi" JSONB NOT NULL,
    "storyBodyEn" JSONB NOT NULL,
    "missionHeadingVi" TEXT NOT NULL,
    "missionHeadingEn" TEXT NOT NULL,
    "missionBodyVi" TEXT NOT NULL,
    "missionBodyEn" TEXT NOT NULL,
    "valuesHeadingVi" TEXT NOT NULL,
    "valuesHeadingEn" TEXT NOT NULL,
    "values" JSONB NOT NULL,
    "timelineHeadingVi" TEXT NOT NULL,
    "timelineHeadingEn" TEXT NOT NULL,
    "timeline" JSONB NOT NULL,
    "certHeadingVi" TEXT NOT NULL,
    "certHeadingEn" TEXT NOT NULL,
    "certBodyVi" TEXT NOT NULL,
    "certBodyEn" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AboutContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CorporateGiftsContent" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "eyebrowVi" TEXT NOT NULL,
    "eyebrowEn" TEXT NOT NULL,
    "headingVi" TEXT NOT NULL,
    "headingEn" TEXT NOT NULL,
    "subheadingVi" TEXT NOT NULL,
    "subheadingEn" TEXT NOT NULL,
    "whyHeadingVi" TEXT NOT NULL,
    "whyHeadingEn" TEXT NOT NULL,
    "giftSetsHeadingVi" TEXT NOT NULL,
    "giftSetsHeadingEn" TEXT NOT NULL,
    "processHeadingVi" TEXT NOT NULL,
    "processHeadingEn" TEXT NOT NULL,
    "ctaHeadingVi" TEXT NOT NULL,
    "ctaHeadingEn" TEXT NOT NULL,
    "ctaBodyVi" TEXT NOT NULL,
    "ctaBodyEn" TEXT NOT NULL,
    "whyItems" JSONB NOT NULL,
    "process" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CorporateGiftsContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareersPageContent" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "eyebrowVi" TEXT NOT NULL,
    "eyebrowEn" TEXT NOT NULL,
    "headingVi" TEXT NOT NULL,
    "headingEn" TEXT NOT NULL,
    "subheadingVi" TEXT NOT NULL,
    "subheadingEn" TEXT NOT NULL,
    "whyJoinHeadingVi" TEXT NOT NULL,
    "whyJoinHeadingEn" TEXT NOT NULL,
    "benefits" JSONB NOT NULL,
    "openPositionsHeadingVi" TEXT NOT NULL,
    "openPositionsHeadingEn" TEXT NOT NULL,
    "noOpeningsVi" TEXT NOT NULL,
    "noOpeningsEn" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CareersPageContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "footerAboutVi" TEXT NOT NULL,
    "footerAboutEn" TEXT NOT NULL,
    "addressVi" TEXT NOT NULL,
    "addressEn" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "workingHoursVi" TEXT NOT NULL,
    "workingHoursEn" TEXT NOT NULL,
    "zaloUrl" TEXT NOT NULL,
    "messengerUrl" TEXT NOT NULL,
    "facebookUrl" TEXT NOT NULL,
    "instagramUrl" TEXT NOT NULL,
    "youtubeUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE INDEX "HeroSlide_order_idx" ON "HeroSlide"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "NewsPost_slug_key" ON "NewsPost"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "JobPosting_slug_key" ON "JobPosting"("slug");

-- CreateIndex
CREATE INDEX "JobPosting_order_idx" ON "JobPosting"("order");
