"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/client";
import { str, parseRepeatableField } from "@/lib/cms/form-utils";
import type { ActionState } from "@/lib/cms/actions/types";

export async function updateAboutContent(_prevState: ActionState, formData: FormData): Promise<ActionState> {
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

  const storyBodyPairs = parseRepeatableField(formData, "storyBody", ["vi", "en"] as const).filter(
    (p) => p.vi || p.en
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
      storyBodyVi: storyBodyPairs.map((p) => p.vi),
      storyBodyEn: storyBodyPairs.map((p) => p.en),
      missionHeadingVi: str(formData, "missionHeadingVi"),
      missionHeadingEn: str(formData, "missionHeadingEn"),
      missionBodyVi: str(formData, "missionBodyVi"),
      missionBodyEn: str(formData, "missionBodyEn"),
      valuesHeadingVi: str(formData, "valuesHeadingVi"),
      valuesHeadingEn: str(formData, "valuesHeadingEn"),
      values,
      timelineHeadingVi: str(formData, "timelineHeadingVi"),
      timelineHeadingEn: str(formData, "timelineHeadingEn"),
      timeline,
      certHeadingVi: str(formData, "certHeadingVi"),
      certHeadingEn: str(formData, "certHeadingEn"),
      certBodyVi: str(formData, "certBodyVi"),
      certBodyEn: str(formData, "certBodyEn"),
    },
  });

  revalidatePath("/ve-chung-toi");
  return { ok: true, message: "Đã lưu thay đổi." };
}
