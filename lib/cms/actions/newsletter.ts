"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/client";
import { sendNotificationEmail } from "@/lib/email/send";

export async function subscribeNewsletter(email: string): Promise<{ ok: boolean; message: string }> {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed || !trimmed.includes("@")) {
    return { ok: false, message: "Email không hợp lệ." };
  }

  try {
    await prisma.newsletterSubscriber.create({ data: { email: trimmed } });
  } catch {
    // Unique constraint hit (already subscribed) - still report success to the visitor.
    return { ok: true, message: "Đăng ký thành công." };
  }

  await sendNotificationEmail({
    subject: `[Song Nguyên] Có người đăng ký nhận tin mới`,
    html: `<p>Email <b>${trimmed}</b> vừa đăng ký nhận tin từ website.</p>`,
  });

  revalidatePath("/admin/newsletter");
  revalidatePath("/admin");

  return { ok: true, message: "Đăng ký thành công." };
}

export async function deleteSubscriber(id: string) {
  await prisma.newsletterSubscriber.delete({ where: { id } });
  revalidatePath("/admin/newsletter");
  revalidatePath("/admin");
}
