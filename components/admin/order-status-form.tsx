"use client";

import { useActionState } from "react";
import { updateOrderStatus } from "@/lib/cms/actions/orders";
import { FormMessage } from "@/components/admin/form-message";
import { SaveButton } from "@/components/admin/save-button";
import { ORDER_STATUSES, ORDER_STATUS_LABELS } from "@/lib/data/orders";

export function OrderStatusForm({ orderId, currentStatus }: { orderId: string; currentStatus: string }) {
  const [state, formAction] = useActionState(updateOrderStatus.bind(null, orderId), null);

  return (
    <form action={formAction} className="space-y-4">
      <select
        name="status"
        defaultValue={currentStatus}
        className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {ORDER_STATUSES.map((status) => (
          <option key={status} value={status}>
            {ORDER_STATUS_LABELS[status]}
          </option>
        ))}
      </select>
      <FormMessage state={state} />
      <SaveButton label="Cập nhật trạng thái" />
    </form>
  );
}
