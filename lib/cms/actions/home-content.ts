"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/client";
import { resolveImageField } from "@/lib/cms/upload";
import { file, str, parseRepeatableField } from "@/lib/cms/form-utils";
import type { ActionState } from "@/lib/cms/actions/types";

export async function updateHomeContent(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const existing = await prisma.homeContent.findUniqueOrThrow({ where: { id: "singleton" } });
  const philosophyImage = await resolveImageField(file(formData, "philosophyImage"), "home", existing.philosophyImage);
  const scienceImage = await resolveImageField(file(formData, "scienceImage"), "home", existing.scienceImage);

  const testimonials = parseRepeatableField(formData, "testimonials", [
    "name",
    "roleVi",
    "roleEn",
    "quoteVi",
    "quoteEn",
    "rating",
  ] as const)
    .filter((t) => t.name || t.quoteVi || t.quoteEn)
    .map((t) => ({
      name: t.name,
      roleVi: t.roleVi,
      roleEn: t.roleEn,
      quoteVi: t.quoteVi,
      quoteEn: t.quoteEn,
      rating: Math.min(5, Math.max(1, Number(t.rating) || 5)),
    }));

  await prisma.homeContent.update({
    where: { id: "singleton" },
    data: {
      philosophyImage,
      philosophyHeadingVi: str(formData, "philosophyHeadingVi"),
      philosophyHeadingEn: str(formData, "philosophyHeadingEn"),
      philosophyBodyVi: str(formData, "philosophyBodyVi"),
      philosophyBodyEn: str(formData, "philosophyBodyEn"),
      philosophyPoint1Vi: str(formData, "philosophyPoint1Vi"),
      philosophyPoint1En: str(formData, "philosophyPoint1En"),
      philosophyPoint2Vi: str(formData, "philosophyPoint2Vi"),
      philosophyPoint2En: str(formData, "philosophyPoint2En"),
      philosophyPoint3Vi: str(formData, "philosophyPoint3Vi"),
      philosophyPoint3En: str(formData, "philosophyPoint3En"),
      scienceImage,
      testimonialsHeadingVi: str(formData, "testimonialsHeadingVi"),
      testimonialsHeadingEn: str(formData, "testimonialsHeadingEn"),
      testimonials,
    },
  });

  revalidatePath("/");
  return { ok: true, message: "Đã lưu thay đổi." };
}
