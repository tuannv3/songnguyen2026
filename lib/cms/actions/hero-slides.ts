"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/client";
import { resolveImageField } from "@/lib/cms/upload";
import { str, optStr, file } from "@/lib/cms/form-utils";
import type { ActionState } from "@/lib/cms/actions/types";

function readHeroSlideFields(formData: FormData) {
  return {
    eyebrowVi: str(formData, "eyebrowVi"),
    eyebrowEn: str(formData, "eyebrowEn"),
    titleVi: str(formData, "titleVi"),
    titleEn: str(formData, "titleEn"),
    subtitleVi: str(formData, "subtitleVi"),
    subtitleEn: str(formData, "subtitleEn"),
    ctaPrimaryLabelVi: str(formData, "ctaPrimaryLabelVi"),
    ctaPrimaryLabelEn: str(formData, "ctaPrimaryLabelEn"),
    ctaPrimaryHref: str(formData, "ctaPrimaryHref") || "/san-pham",
    ctaSecondaryLabelVi: optStr(formData, "ctaSecondaryLabelVi"),
    ctaSecondaryLabelEn: optStr(formData, "ctaSecondaryLabelEn"),
    ctaSecondaryHref: optStr(formData, "ctaSecondaryHref"),
    bottleColor1: str(formData, "bottleColor1") || "#2F6F65",
    bottleColor2: str(formData, "bottleColor2") || "#B6924F",
    glowColor: str(formData, "glowColor") || "rgba(47,111,101,0.32)",
  };
}

export async function createHeroSlide(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const fields = readHeroSlideFields(formData);
  const image = await resolveImageField(file(formData, "image"), "hero", null);
  const maxOrder = await prisma.heroSlide.aggregate({ _max: { order: true } });
  await prisma.heroSlide.create({
    data: { ...fields, image, order: (maxOrder._max.order ?? -1) + 1 },
  });
  revalidatePath("/");
  redirect("/admin/hero-slides");
}

export async function updateHeroSlide(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const existing = await prisma.heroSlide.findUniqueOrThrow({ where: { id } });
  const fields = readHeroSlideFields(formData);
  const image = await resolveImageField(file(formData, "image"), "hero", existing.image);
  await prisma.heroSlide.update({ where: { id }, data: { ...fields, image } });
  revalidatePath("/");
  return { ok: true, message: "Đã lưu thay đổi." };
}

export async function deleteHeroSlide(id: string) {
  await prisma.heroSlide.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/hero-slides");
}

export async function reorderHeroSlide(id: string, direction: "up" | "down") {
  const slides = await prisma.heroSlide.findMany({ orderBy: { order: "asc" } });
  const index = slides.findIndex((slide) => slide.id === id);
  if (index === -1) return;
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (swapWith < 0 || swapWith >= slides.length) return;

  const a = slides[index]!;
  const b = slides[swapWith]!;
  await prisma.$transaction([
    prisma.heroSlide.update({ where: { id: a.id }, data: { order: b.order } }),
    prisma.heroSlide.update({ where: { id: b.id }, data: { order: a.order } }),
  ]);
  revalidatePath("/");
  revalidatePath("/admin/hero-slides");
}
