"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/client";
import { verifyPassword, hashPassword } from "@/lib/auth/password";
import { setSessionCookie, clearSessionCookie, getSession } from "@/lib/auth/session";
import { str } from "@/lib/cms/form-utils";
import type { ActionState } from "@/lib/cms/actions/types";

export async function login(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const email = str(formData, "email");
  const password = String(formData.get("password") ?? "");

  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return { ok: false, message: "Email hoặc mật khẩu không đúng." };
  }

  await setSessionCookie({ adminId: user.id, email: user.email });
  redirect("/admin");
}

export async function logout() {
  await clearSessionCookie();
  redirect("/admin/login");
}

export async function changePassword(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const session = await getSession();
  if (!session) {
    return { ok: false, message: "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại." };
  }

  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (newPassword.length < 8) {
    return { ok: false, message: "Mật khẩu mới cần tối thiểu 8 ký tự." };
  }
  if (newPassword !== confirmPassword) {
    return { ok: false, message: "Mật khẩu xác nhận không khớp." };
  }

  const user = await prisma.adminUser.findUniqueOrThrow({ where: { id: session.adminId } });
  if (!(await verifyPassword(currentPassword, user.passwordHash))) {
    return { ok: false, message: "Mật khẩu hiện tại không đúng." };
  }

  const passwordHash = await hashPassword(newPassword);
  await prisma.adminUser.update({ where: { id: user.id }, data: { passwordHash } });

  return { ok: true, message: "Đã đổi mật khẩu thành công." };
}
