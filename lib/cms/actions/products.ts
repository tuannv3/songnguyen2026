"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/client";
import { resolveImageField } from "@/lib/cms/upload";
import { str, optStr, num, file, parseRepeatableField } from "@/lib/cms/form-utils";
import type { ActionState } from "@/lib/cms/actions/types";

function readProductFields(formData: FormData) {
  const benefits = parseRepeatableField(formData, "benefits", ["vi", "en"] as const).filter(
    (b) => b.vi || b.en
  );
  return {
    slug: str(formData, "slug"),
    nameVi: str(formData, "nameVi"),
    nameEn: str(formData, "nameEn"),
    category: str(formData, "category") || "single",
    badge: optStr(formData, "badge"),
    priceFrom: num(formData, "priceFrom"),
    volume: str(formData, "volume"),
    bottleColor: str(formData, "bottleColor") || "#2F6F65",
    bottleVariant: optStr(formData, "bottleVariant"),
    shopeeUrl: optStr(formData, "shopeeUrl"),
    accentColor: str(formData, "accentColor") || "#DCE7DE",
    shortDescriptionVi: str(formData, "shortDescriptionVi"),
    shortDescriptionEn: str(formData, "shortDescriptionEn"),
    descriptionVi: str(formData, "descriptionVi"),
    descriptionEn: str(formData, "descriptionEn"),
    benefits,
    howToUseVi: str(formData, "howToUseVi"),
    howToUseEn: str(formData, "howToUseEn"),
    ingredientsVi: str(formData, "ingredientsVi"),
    ingredientsEn: str(formData, "ingredientsEn"),
    originVi: str(formData, "originVi"),
    originEn: str(formData, "originEn"),
    extractionVi: str(formData, "extractionVi"),
    extractionEn: str(formData, "extractionEn"),
    cautionVi: str(formData, "cautionVi"),
    cautionEn: str(formData, "cautionEn"),
  };
}

export async function createProduct(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const fields = readProductFields(formData);
  if (!fields.slug) {
    return { ok: false, message: "Vui lòng nhập slug sản phẩm." };
  }
  const image = await resolveImageField(file(formData, "image"), "products", null);

  try {
    await prisma.product.create({ data: { ...fields, image } });
  } catch {
    return { ok: false, message: "Slug đã tồn tại, vui lòng chọn slug khác." };
  }

  revalidatePath("/san-pham");
  redirect("/admin/products");
}

export async function updateProduct(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const existing = await prisma.product.findUniqueOrThrow({ where: { id } });
  const fields = readProductFields(formData);
  const image = await resolveImageField(file(formData, "image"), "products", existing.image);

  try {
    await prisma.product.update({ where: { id }, data: { ...fields, image } });
  } catch {
    return { ok: false, message: "Slug đã tồn tại, vui lòng chọn slug khác." };
  }

  revalidatePath("/san-pham");
  revalidatePath(`/san-pham/${fields.slug}`);
  if (existing.slug !== fields.slug) revalidatePath(`/san-pham/${existing.slug}`);
  return { ok: true, message: "Đã lưu thay đổi." };
}

export async function deleteProduct(id: string) {
  const existing = await prisma.product.delete({ where: { id } });
  revalidatePath("/san-pham");
  revalidatePath(`/san-pham/${existing.slug}`);
  revalidatePath("/admin/products");
}
