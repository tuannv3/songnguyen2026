"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/client";
import { str, optStr } from "@/lib/cms/form-utils";
import type { ActionState } from "@/lib/cms/actions/types";

export async function updateSiteSettings(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  await prisma.siteSettings.update({
    where: { id: "singleton" },
    data: {
      footerAboutVi: str(formData, "footerAboutVi"),
      footerAboutEn: str(formData, "footerAboutEn"),
      addressVi: str(formData, "addressVi"),
      addressEn: str(formData, "addressEn"),
      phone: str(formData, "phone"),
      email: str(formData, "email"),
      workingHoursVi: str(formData, "workingHoursVi"),
      workingHoursEn: str(formData, "workingHoursEn"),
      zaloUrl: str(formData, "zaloUrl"),
      messengerUrl: str(formData, "messengerUrl"),
      facebookUrl: str(formData, "facebookUrl"),
      instagramUrl: str(formData, "instagramUrl"),
      youtubeUrl: optStr(formData, "youtubeUrl") ?? null,
    },
  });

  revalidatePath("/", "layout");
  return { ok: true, message: "Đã lưu thay đổi." };
}
