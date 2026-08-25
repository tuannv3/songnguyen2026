export type OrderStatus = "new" | "contacted" | "confirmed" | "completed" | "cancelled";

export const ORDER_STATUSES: OrderStatus[] = ["new", "contacted", "confirmed", "completed", "cancelled"];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  new: "Mới",
  contacted: "Đã liên hệ",
  confirmed: "Đã xác nhận",
  completed: "Hoàn tất",
  cancelled: "Đã huỷ",
};

export const ORDER_STATUS_TONE: Record<OrderStatus, "accent" | "primary" | "neutral"> = {
  new: "accent",
  contacted: "accent",
  confirmed: "primary",
  completed: "primary",
  cancelled: "neutral",
};

export type OrderItem = {
  slug: string;
  name: string;
  quantity: number;
  priceFrom: number;
};
