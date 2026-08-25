import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/client";
import { OrderStatusForm } from "@/components/admin/order-status-form";
import { ORDER_STATUS_LABELS, type OrderItem, type OrderStatus } from "@/lib/data/orders";

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) notFound();

  const items = order.items as OrderItem[];
  const total = items.reduce((sum, item) => sum + item.priceFrom * item.quantity, 0);

  return (
    <div>
      <h1 className="font-serif-display text-2xl text-ink">Chi tiết đơn hàng</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Gửi lúc {order.createdAt.toLocaleString("vi-VN")}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-serif-display text-lg text-ink">Thông tin khách hàng</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex gap-2">
                <dt className="w-28 shrink-0 text-muted-foreground">Họ và tên</dt>
                <dd className="text-ink">{order.customerName}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-28 shrink-0 text-muted-foreground">Điện thoại</dt>
                <dd className="text-ink">{order.customerPhone}</dd>
              </div>
              {order.customerEmail ? (
                <div className="flex gap-2">
                  <dt className="w-28 shrink-0 text-muted-foreground">Email</dt>
                  <dd className="text-ink">{order.customerEmail}</dd>
                </div>
              ) : null}
              {order.customerNote ? (
                <div className="flex gap-2">
                  <dt className="w-28 shrink-0 text-muted-foreground">Ghi chú</dt>
                  <dd className="text-ink">{order.customerNote}</dd>
                </div>
              ) : null}
            </dl>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
            <h2 className="font-serif-display text-lg text-ink">Sản phẩm</h2>
            <ul className="mt-4 space-y-3">
              {items.map((item) => (
                <li key={item.slug} className="flex items-center justify-between text-sm">
                  <span className="text-ink">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-ink/70">{(item.priceFrom * item.quantity).toLocaleString("vi-VN")}₫</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm font-medium text-ink">Tạm tính</span>
              <span className="font-serif-display text-xl text-primary">{total.toLocaleString("vi-VN")}₫</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-serif-display text-lg text-ink">Trạng thái xử lý</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Hiện tại: {ORDER_STATUS_LABELS[order.status as OrderStatus] ?? order.status}
          </p>
          <div className="mt-4">
            <OrderStatusForm orderId={order.id} currentStatus={order.status} />
          </div>
        </div>
      </div>
    </div>
  );
}
