"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/client";
import { str, parseRepeatableField } from "@/lib/cms/form-utils";
import type { ActionState } from "@/lib/cms/actions/types";

function readJobFields(formData: FormData) {
  const requirements = parseRepeatableField(formData, "requirements", ["vi", "en"] as const).filter(
    (r) => r.vi || r.en
  );
  return {
    slug: str(formData, "slug"),
    titleVi: str(formData, "titleVi"),
    titleEn: str(formData, "titleEn"),
    locationVi: str(formData, "locationVi"),
    locationEn: str(formData, "locationEn"),
    typeVi: str(formData, "typeVi"),
    typeEn: str(formData, "typeEn"),
    summaryVi: str(formData, "summaryVi"),
    summaryEn: str(formData, "summaryEn"),
    requirements,
  };
}

export async function createJobPosting(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const fields = readJobFields(formData);
  if (!fields.slug) {
    return { ok: false, message: "Vui lòng nhập slug tin tuyển dụng." };
  }
  const maxOrder = await prisma.jobPosting.aggregate({ _max: { order: true } });
  try {
    await prisma.jobPosting.create({ data: { ...fields, order: (maxOrder._max.order ?? -1) + 1 } });
  } catch {
    return { ok: false, message: "Slug đã tồn tại, vui lòng chọn slug khác." };
  }
  revalidatePath("/tuyen-dung");
  redirect("/admin/careers");
}

export async function updateJobPosting(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const fields = readJobFields(formData);
  try {
    await prisma.jobPosting.update({ where: { id }, data: fields });
  } catch {
    return { ok: false, message: "Slug đã tồn tại, vui lòng chọn slug khác." };
  }
  revalidatePath("/tuyen-dung");
  return { ok: true, message: "Đã lưu thay đổi." };
}

export async function deleteJobPosting(id: string) {
  await prisma.jobPosting.delete({ where: { id } });
  revalidatePath("/tuyen-dung");
  revalidatePath("/admin/careers");
}

export async function reorderJobPosting(id: string, direction: "up" | "down") {
  const jobs = await prisma.jobPosting.findMany({ orderBy: { order: "asc" } });
  const index = jobs.findIndex((job) => job.id === id);
  if (index === -1) return;
  const swapWith = direction === "up" ? index - 1 : index + 1;
  if (swapWith < 0 || swapWith >= jobs.length) return;

  const a = jobs[index]!;
  const b = jobs[swapWith]!;
  await prisma.$transaction([
    prisma.jobPosting.update({ where: { id: a.id }, data: { order: b.order } }),
    prisma.jobPosting.update({ where: { id: b.id }, data: { order: a.order } }),
  ]);
  revalidatePath("/tuyen-dung");
  revalidatePath("/admin/careers");
}

export async function updateCareersPageContent(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const benefits = parseRepeatableField(formData, "benefits", [
    "titleVi",
    "bodyVi",
    "titleEn",
    "bodyEn",
  ] as const).filter((b) => b.titleVi || b.titleEn);

  await prisma.careersPageContent.update({
    where: { id: "singleton" },
    data: {
      eyebrowVi: str(formData, "eyebrowVi"),
      eyebrowEn: str(formData, "eyebrowEn"),
      headingVi: str(formData, "headingVi"),
      headingEn: str(formData, "headingEn"),
      subheadingVi: str(formData, "subheadingVi"),
      subheadingEn: str(formData, "subheadingEn"),
      whyJoinHeadingVi: str(formData, "whyJoinHeadingVi"),
      whyJoinHeadingEn: str(formData, "whyJoinHeadingEn"),
      benefits,
      openPositionsHeadingVi: str(formData, "openPositionsHeadingVi"),
      openPositionsHeadingEn: str(formData, "openPositionsHeadingEn"),
      noOpeningsVi: str(formData, "noOpeningsVi"),
      noOpeningsEn: str(formData, "noOpeningsEn"),
    },
  });
  revalidatePath("/tuyen-dung");
  return { ok: true, message: "Đã lưu thay đổi." };
}
