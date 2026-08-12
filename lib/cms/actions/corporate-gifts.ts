"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/client";
import { str, parseRepeatableField } from "@/lib/cms/form-utils";
import type { ActionState } from "@/lib/cms/actions/types";

export async function updateCorporateGiftsContent(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const keys = ["titleVi", "bodyVi", "titleEn", "bodyEn"] as const;
  const whyItems = parseRepeatableField(formData, "whyItems", keys).filter((i) => i.titleVi || i.titleEn);
  const process = parseRepeatableField(formData, "process", keys).filter((i) => i.titleVi || i.titleEn);

  await prisma.corporateGiftsContent.update({
    where: { id: "singleton" },
    data: {
      eyebrowVi: str(formData, "eyebrowVi"),
      eyebrowEn: str(formData, "eyebrowEn"),
      headingVi: str(formData, "headingVi"),
      headingEn: str(formData, "headingEn"),
      subheadingVi: str(formData, "subheadingVi"),
      subheadingEn: str(formData, "subheadingEn"),
      whyHeadingVi: str(formData, "whyHeadingVi"),
      whyHeadingEn: str(formData, "whyHeadingEn"),
      giftSetsHeadingVi: str(formData, "giftSetsHeadingVi"),
      giftSetsHeadingEn: str(formData, "giftSetsHeadingEn"),
      processHeadingVi: str(formData, "processHeadingVi"),
      processHeadingEn: str(formData, "processHeadingEn"),
      ctaHeadingVi: str(formData, "ctaHeadingVi"),
      ctaHeadingEn: str(formData, "ctaHeadingEn"),
      ctaBodyVi: str(formData, "ctaBodyVi"),
      ctaBodyEn: str(formData, "ctaBodyEn"),
      whyItems,
      process,
    },
  });

  revalidatePath("/qua-tang-doanh-nghiep");
  return { ok: true, message: "Đã lưu thay đổi." };
}
