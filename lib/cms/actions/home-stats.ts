"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/client";
import { str } from "@/lib/cms/form-utils";
import type { ActionState } from "@/lib/cms/actions/types";

export async function updateHomeStats(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  await prisma.homeStats.update({
    where: { id: "singleton" },
    data: {
      stat1Value: str(formData, "stat1Value"),
      stat1LabelVi: str(formData, "stat1LabelVi"),
      stat1LabelEn: str(formData, "stat1LabelEn"),
      stat2Value: str(formData, "stat2Value"),
      stat2LabelVi: str(formData, "stat2LabelVi"),
      stat2LabelEn: str(formData, "stat2LabelEn"),
      stat3Value: str(formData, "stat3Value"),
      stat3LabelVi: str(formData, "stat3LabelVi"),
      stat3LabelEn: str(formData, "stat3LabelEn"),
      stat4Value: str(formData, "stat4Value"),
      stat4LabelVi: str(formData, "stat4LabelVi"),
      stat4LabelEn: str(formData, "stat4LabelEn"),
    },
  });

  revalidatePath("/");
  return { ok: true, message: "Đã lưu thay đổi." };
}
