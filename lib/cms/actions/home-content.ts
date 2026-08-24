"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/client";
import { resolveImageField } from "@/lib/cms/upload";
import { file } from "@/lib/cms/form-utils";
import type { ActionState } from "@/lib/cms/actions/types";

export async function updateHomeContent(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const existing = await prisma.homeContent.findUniqueOrThrow({ where: { id: "singleton" } });
  const philosophyImage = await resolveImageField(file(formData, "philosophyImage"), "home", existing.philosophyImage);
  const scienceImage = await resolveImageField(file(formData, "scienceImage"), "home", existing.scienceImage);

  await prisma.homeContent.update({
    where: { id: "singleton" },
    data: { philosophyImage, scienceImage },
  });

  revalidatePath("/");
  return { ok: true, message: "Đã lưu thay đổi." };
}
