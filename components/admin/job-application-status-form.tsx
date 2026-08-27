"use client";

import { useActionState } from "react";
import { updateJobApplicationStatus } from "@/lib/cms/actions/job-applications";
import { FormMessage } from "@/components/admin/form-message";
import { SaveButton } from "@/components/admin/save-button";
import { JOB_APPLICATION_STATUSES, JOB_APPLICATION_STATUS_LABELS } from "@/lib/data/job-applications";

export function JobApplicationStatusForm({ applicationId, currentStatus }: { applicationId: string; currentStatus: string }) {
  const [state, formAction] = useActionState(updateJobApplicationStatus.bind(null, applicationId), null);

  return (
    <form action={formAction} className="space-y-4">
      <select
        name="status"
        defaultValue={currentStatus}
        className="w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {JOB_APPLICATION_STATUSES.map((status) => (
          <option key={status} value={status}>
            {JOB_APPLICATION_STATUS_LABELS[status]}
          </option>
        ))}
      </select>
      <FormMessage state={state} />
      <SaveButton label="Cập nhật trạng thái" />
    </form>
  );
}
