-- AlterTable
ALTER TABLE "HomeContent" ADD COLUMN     "testimonials" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "testimonialsHeadingEn" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "testimonialsHeadingVi" TEXT NOT NULL DEFAULT '';
