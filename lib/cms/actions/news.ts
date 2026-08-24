"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/client";
import { str, num, file, parseRepeatableField } from "@/lib/cms/form-utils";
import { resolveImageField } from "@/lib/cms/upload";
import type { ActionState } from "@/lib/cms/actions/types";

async function readNewsFields(formData: FormData) {
  const rawContent = parseRepeatableField(formData, "content", ["vi", "en", "imageExisting"] as const);
  const contentRows = await Promise.all(
    rawContent.map(async (row, index) => {
      const newFile = file(formData, `content.${index}.imageNew`);
      const image = await resolveImageField(newFile, "news", row.imageExisting || null);
      return { vi: row.vi, en: row.en, image };
    })
  );
  const content = contentRows.filter((p) => p.vi || p.en);
  return {
    slug: str(formData, "slug"),
    titleVi: str(formData, "titleVi"),
    titleEn: str(formData, "titleEn"),
    excerptVi: str(formData, "excerptVi"),
    excerptEn: str(formData, "excerptEn"),
    contentVi: content.map((p) => p.vi),
    contentEn: content.map((p) => p.en),
    contentImages: content.map((p) => p.image),
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
  const fields = await readNewsFields(formData);
  if (!fields.slug) {
    return { ok: false, message: "Vui lòng nhập slug bài viết." };
  }
  const image = await resolveImageField(file(formData, "image"), "news", null);
  try {
    await prisma.newsPost.create({ data: { ...fields, image } });
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
  const fields = await readNewsFields(formData);
  const image = await resolveImageField(file(formData, "image"), "news", existing.image);
  try {
    await prisma.newsPost.update({ where: { id }, data: { ...fields, image } });
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
