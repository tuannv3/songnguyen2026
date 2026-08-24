"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/client";
import { str, num, parseRepeatableField } from "@/lib/cms/form-utils";
import type { ActionState } from "@/lib/cms/actions/types";

function readNewsFields(formData: FormData) {
  const content = parseRepeatableField(formData, "content", ["vi", "en"] as const).filter(
    (p) => p.vi || p.en
  );
  return {
    slug: str(formData, "slug"),
    titleVi: str(formData, "titleVi"),
    titleEn: str(formData, "titleEn"),
    excerptVi: str(formData, "excerptVi"),
    excerptEn: str(formData, "excerptEn"),
    contentVi: content.map((p) => p.vi),
    contentEn: content.map((p) => p.en),
    date: str(formData, "date"),
    authorVi: str(formData, "authorVi") || "Đội ngũ Song Nguyên",
    authorEn: str(formData, "authorEn") || "Song Nguyên Team",
    categoryVi: str(formData, "categoryVi"),
    categoryEn: str(formData, "categoryEn"),
    accentColor: str(formData, "accentColor") || "#2F6F65",
    readingMinutes: num(formData, "readingMinutes") || 3,
  };
}

export async function createNewsPost(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const fields = readNewsFields(formData);
  if (!fields.slug) {
    return { ok: false, message: "Vui lòng nhập slug bài viết." };
  }
  try {
    await prisma.newsPost.create({ data: fields });
  } catch {
    return { ok: false, message: "Slug đã tồn tại, vui lòng chọn slug khác." };
  }
  revalidatePath("/");
  revalidatePath("/tin-tuc");
  redirect("/admin/news");
}

export async function updateNewsPost(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const existing = await prisma.newsPost.findUniqueOrThrow({ where: { id } });
  const fields = readNewsFields(formData);
  try {
    await prisma.newsPost.update({ where: { id }, data: fields });
  } catch {
    return { ok: false, message: "Slug đã tồn tại, vui lòng chọn slug khác." };
  }
  revalidatePath("/");
  revalidatePath("/tin-tuc");
  revalidatePath(`/tin-tuc/${fields.slug}`);
  if (existing.slug !== fields.slug) revalidatePath(`/tin-tuc/${existing.slug}`);
  return { ok: true, message: "Đã lưu thay đổi." };
}

export async function deleteNewsPost(id: string) {
  const existing = await prisma.newsPost.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/tin-tuc");
  revalidatePath(`/tin-tuc/${existing.slug}`);
  revalidatePath("/admin/news");
}
