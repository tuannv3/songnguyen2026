"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/client";
import { str, parseRepeatableField, file, files, strings } from "@/lib/cms/form-utils";
import { uploadImage, resolveImageField } from "@/lib/cms/upload";
import type { ActionState } from "@/lib/cms/actions/types";

function splitLines(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function updateAboutContent(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const keptCertImages = strings(formData, "certImagesExisting");
  const newCertFiles = files(formData, "certImagesNew");
  const newCertImages = await Promise.all(newCertFiles.map((f) => uploadImage(f, "about")));
  const certImages = [...keptCertImages, ...newCertImages];

  const missionImageExisting = str(formData, "missionImageExisting");
  const missionImage = await resolveImageField(
    file(formData, "missionImage"),
    "about",
    missionImageExisting || null
  );

  const values = parseRepeatableField(formData, "values", [
    "titleVi",
    "bodyVi",
    "titleEn",
    "bodyEn",
  ] as const).filter((v) => v.titleVi || v.titleEn);

  const timeline = parseRepeatableField(formData, "timeline", [
    "yearVi",
    "yearEn",
    "titleVi",
    "bodyVi",
    "titleEn",
    "bodyEn",
  ] as const).filter((t) => t.titleVi || t.titleEn);

  const visionPoints = parseRepeatableField(formData, "visionPoints", ["vi", "en"] as const).filter(
    (p) => p.vi || p.en
  );
  const missionGoals = parseRepeatableField(formData, "missionGoals", ["vi", "en"] as const).filter(
    (p) => p.vi || p.en
  );
  const promiseLines = parseRepeatableField(formData, "promiseLines", ["vi", "en"] as const).filter(
    (p) => p.vi || p.en
  );

  const rawStorySections = parseRepeatableField(formData, "storySections", [
    "headingVi",
    "headingEn",
    "bodyVi",
    "bodyEn",
    "imageExisting",
    "captionVi",
    "captionEn",
  ] as const);
  const storySections = await Promise.all(
    rawStorySections
      .filter((s) => s.headingVi || s.headingEn || s.bodyVi || s.bodyEn)
      .map(async (s, index) => {
        const newFile = file(formData, `storySections.${index}.imageNew`);
        const image = await resolveImageField(newFile, "about", s.imageExisting || null);
        return {
          headingVi: s.headingVi,
          headingEn: s.headingEn,
          bodyVi: splitLines(s.bodyVi),
          bodyEn: splitLines(s.bodyEn),
          image,
          captionVi: s.captionVi,
          captionEn: s.captionEn,
        };
      })
  );

  await prisma.aboutContent.update({
    where: { id: "singleton" },
    data: {
      eyebrowVi: str(formData, "eyebrowVi"),
      eyebrowEn: str(formData, "eyebrowEn"),
      headingVi: str(formData, "headingVi"),
      headingEn: str(formData, "headingEn"),
      subheadingVi: str(formData, "subheadingVi"),
      subheadingEn: str(formData, "subheadingEn"),

      storyHeadingVi: str(formData, "storyHeadingVi"),
      storyHeadingEn: str(formData, "storyHeadingEn"),
      storySubheadingVi: str(formData, "storySubheadingVi"),
      storySubheadingEn: str(formData, "storySubheadingEn"),
      storySections,

      visionTaglineVi: str(formData, "visionTaglineVi"),
      visionTaglineEn: str(formData, "visionTaglineEn"),
      visionSubtitleVi: str(formData, "visionSubtitleVi"),
      visionSubtitleEn: str(formData, "visionSubtitleEn"),
      visionPoints,

      missionHeadingVi: str(formData, "missionHeadingVi"),
      missionHeadingEn: str(formData, "missionHeadingEn"),
      missionBodyVi: str(formData, "missionBodyVi"),
      missionBodyEn: str(formData, "missionBodyEn"),
      missionIntroVi: str(formData, "missionIntroVi"),
      missionIntroEn: str(formData, "missionIntroEn"),
      missionGoals,
      missionImage,
      missionImageCaptionVi: str(formData, "missionImageCaptionVi"),
      missionImageCaptionEn: str(formData, "missionImageCaptionEn"),

      valuesHeadingVi: str(formData, "valuesHeadingVi"),
      valuesHeadingEn: str(formData, "valuesHeadingEn"),
      values,

      promiseHeadingVi: str(formData, "promiseHeadingVi"),
      promiseHeadingEn: str(formData, "promiseHeadingEn"),
      promiseLines,
      promiseClosingVi: str(formData, "promiseClosingVi"),
      promiseClosingEn: str(formData, "promiseClosingEn"),

      timelineHeadingVi: str(formData, "timelineHeadingVi"),
      timelineHeadingEn: str(formData, "timelineHeadingEn"),
      timeline,

      certHeadingVi: str(formData, "certHeadingVi"),
      certHeadingEn: str(formData, "certHeadingEn"),
      certBodyVi: str(formData, "certBodyVi"),
      certBodyEn: str(formData, "certBodyEn"),
      certImages,
    },
  });

  revalidatePath("/ve-chung-toi");
  return { ok: true, message: "Đã lưu thay đổi." };
}
