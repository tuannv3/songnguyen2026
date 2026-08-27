"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/client";
import { str } from "@/lib/cms/form-utils";
import { sendNotificationEmail } from "@/lib/email/send";
import type { ActionState } from "@/lib/cms/actions/types";

export async function createJobApplication(input: {
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  position?: string;
  message: string;
}): Promise<{ ok: boolean; message: string }> {
  const applicantName = input.applicantName.trim();
  const applicantEmail = input.applicantEmail.trim();
  const message = input.message.trim();

  if (!applicantName || !applicantEmail || !message) {
    return { ok: false, message: "Vui lòng nhập đầy đủ họ tên, email và nội dung." };
  }

  const applicantPhone = input.applicantPhone?.trim() ?? "";
  const position = input.position?.trim() ?? "";

  const application = await prisma.jobApplication.create({
    data: { applicantName, applicantEmail, applicantPhone, position, message },
  });

  await sendNotificationEmail({
    subject: `[Song Nguyên] Hồ sơ ứng tuyển mới từ ${applicantName}`,
    html: `
      <h2>Hồ sơ ứng tuyển mới</h2>
      <p><b>Họ tên:</b> ${applicantName}</p>
      <p><b>Email:</b> ${applicantEmail}</p>
      ${applicantPhone ? `<p><b>Điện thoại:</b> ${applicantPhone}</p>` : ""}
      ${position ? `<p><b>Vị trí ứng tuyển:</b> ${position}</p>` : ""}
      <p><b>Nội dung:</b></p>
      <p>${message.replace(/\n/g, "<br/>")}</p>
      <p>Xem chi tiết trong trang quản trị: /admin/job-applications/${application.id}</p>
    `,
  });

  revalidatePath("/admin/job-applications");
  revalidatePath("/admin");

  return { ok: true, message: "Đã gửi hồ sơ ứng tuyển thành công." };
}

export async function updateJobApplicationStatus(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const status = str(formData, "status");
  await prisma.jobApplication.update({ where: { id }, data: { status } });
  revalidatePath("/admin/job-applications");
  revalidatePath(`/admin/job-applications/${id}`);
  revalidatePath("/admin");
  return { ok: true, message: "Đã cập nhật trạng thái." };
}

export async function deleteJobApplication(id: string) {
  await prisma.jobApplication.delete({ where: { id } });
  revalidatePath("/admin/job-applications");
  revalidatePath("/admin");
}
