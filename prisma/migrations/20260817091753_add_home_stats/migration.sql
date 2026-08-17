-- CreateTable
CREATE TABLE "HomeStats" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "stat1Value" TEXT NOT NULL,
    "stat1LabelVi" TEXT NOT NULL,
    "stat1LabelEn" TEXT NOT NULL,
    "stat2Value" TEXT NOT NULL,
    "stat2LabelVi" TEXT NOT NULL,
    "stat2LabelEn" TEXT NOT NULL,
    "stat3Value" TEXT NOT NULL,
    "stat3LabelVi" TEXT NOT NULL,
    "stat3LabelEn" TEXT NOT NULL,
    "stat4Value" TEXT NOT NULL,
    "stat4LabelVi" TEXT NOT NULL,
    "stat4LabelEn" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomeStats_pkey" PRIMARY KEY ("id")
);
