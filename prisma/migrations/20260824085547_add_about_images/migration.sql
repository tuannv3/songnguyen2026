-- AlterTable
ALTER TABLE "AboutContent" ADD COLUMN     "certImages" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "storyImage" TEXT;
