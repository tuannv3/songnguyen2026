import Link from "next/link";
import { Eye, Trash2 } from "lucide-react";
import { prisma } from "@/lib/db/client";
import { deleteOrder } from "@/lib/cms/actions/orders";
import { AdminTable } from "@/components/admin/admin-table";
import { Badge } from "@/components/ui/badge";
import { ORDER_STATUS_LABELS, ORDER_STATUS_TONE, type OrderItem, type OrderStatus } from "@/lib/data/orders";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" } });
  const newCount = orders.filter((o) => o.status === "new").length;

  return (
    <div>
      <div>
        <h1 className="font-serif-display text-2xl text-ink">Đơn hàng</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {orders.length} yêu cầu đặt hàng{newCount > 0 ? ` — ${newCount} đơn mới` : ""}
        </p>
      </div>

      <div className="mt-6">
        <AdminTable headers={["Khách hàng", "Điện thoại", "Sản phẩm", "Tạm tính", "Trạng thái", "Ngày gửi", "Thao tác"]}>
          {orders.map((order) => {
            const items = order.items as OrderItem[];
            const total = items.reduce((sum, item) => sum + item.priceFrom * item.quantity, 0);
            const status = order.status as OrderStatus;
            return (
              <tr key={order.id}>
                <td className="px-4 py-3 text-ink">{order.customerName}</td>
                <td className="px-4 py-3 text-ink/70">{order.customerPhone}</td>
                <td className="max-w-xs px-4 py-3 text-ink/70">
                  {items.map((item) => `${item.name} ×${item.quantity}`).join(", ")}
                </td>
                <td className="px-4 py-3 text-ink/70">{total.toLocaleString("vi-VN")}₫</td>
                <td className="px-4 py-3">
                  <Badge tone={ORDER_STATUS_TONE[status] ?? "neutral"}>
                    {ORDER_STATUS_LABELS[status] ?? order.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-ink/70">{order.createdAt.toLocaleDateString("vi-VN")}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/orders/${order.id}`} aria-label="Xem chi tiết" className="text-primary hover:underline">
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <form action={deleteOrder.bind(null, order.id)}>
                      <button type="submit" aria-label="Xoá" className="cursor-pointer text-destructive/80 hover:text-destructive">
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            );
          })}
        </AdminTable>
        {orders.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">Chưa có yêu cầu đặt hàng nào.</p>
        ) : null}
      </div>
    </div>
  );
}
