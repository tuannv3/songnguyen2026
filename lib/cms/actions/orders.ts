"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/client";
import { str } from "@/lib/cms/form-utils";
import { sendNotificationEmail } from "@/lib/email/send";
import type { OrderItem } from "@/lib/data/orders";
import type { ActionState } from "@/lib/cms/actions/types";

export async function createOrder(input: {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerNote?: string;
  items: OrderItem[];
}): Promise<{ ok: boolean; message: string }> {
  const customerName = input.customerName.trim();
  const customerPhone = input.customerPhone.trim();

  if (!customerName || !customerPhone) {
    return { ok: false, message: "Vui lòng nhập họ tên và số điện thoại." };
  }
  if (!input.items || input.items.length === 0) {
    return { ok: false, message: "Giỏ hàng đang trống." };
  }

  const customerEmail = input.customerEmail?.trim() ?? "";
  const customerNote = input.customerNote?.trim() ?? "";

  const order = await prisma.order.create({
    data: {
      customerName,
      customerPhone,
      customerEmail,
      customerNote,
      items: input.items,
    },
  });

  const total = input.items.reduce((sum, item) => sum + item.priceFrom * item.quantity, 0);
  const itemsHtml = input.items
    .map((item) => `<li>${item.name} × ${item.quantity} — ${item.priceFrom.toLocaleString("vi-VN")}₫</li>`)
    .join("");

  await sendNotificationEmail({
    subject: `[Song Nguyên] Đơn hàng mới từ ${customerName}`,
    html: `
      <h2>Đơn hàng mới</h2>
      <p><b>Khách hàng:</b> ${customerName}</p>
      <p><b>Điện thoại:</b> ${customerPhone}</p>
      ${customerEmail ? `<p><b>Email:</b> ${customerEmail}</p>` : ""}
      ${customerNote ? `<p><b>Ghi chú:</b> ${customerNote}</p>` : ""}
      <p><b>Sản phẩm:</b></p>
      <ul>${itemsHtml}</ul>
      <p><b>Tạm tính:</b> ${total.toLocaleString("vi-VN")}₫</p>
      <p>Xem chi tiết trong trang quản trị: /admin/orders/${order.id}</p>
    `,
  });

  revalidatePath("/admin/orders");
  revalidatePath("/admin");

  return { ok: true, message: "Đã gửi yêu cầu đặt hàng thành công." };
}

export async function updateOrderStatus(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const status = str(formData, "status");
  await prisma.order.update({ where: { id }, data: { status } });
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);
  revalidatePath("/admin");
  return { ok: true, message: "Đã cập nhật trạng thái." };
}

export async function deleteOrder(id: string) {
  await prisma.order.delete({ where: { id } });
  revalidatePath("/admin/orders");
  revalidatePath("/admin");
}
