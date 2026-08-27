import Link from "next/link";
import { Eye, Trash2 } from "lucide-react";
import { prisma } from "@/lib/db/client";
import { deleteJobApplication } from "@/lib/cms/actions/job-applications";
import { AdminTable } from "@/components/admin/admin-table";
import { Badge } from "@/components/ui/badge";
import {
  JOB_APPLICATION_STATUS_LABELS,
  JOB_APPLICATION_STATUS_TONE,
  type JobApplicationStatus,
} from "@/lib/data/job-applications";

export default async function AdminJobApplicationsPage() {
  const applications = await prisma.jobApplication.findMany({ orderBy: { createdAt: "desc" } });
  const newCount = applications.filter((a) => a.status === "new").length;

  return (
    <div>
      <div>
        <h1 className="font-serif-display text-2xl text-ink">Hồ sơ ứng tuyển</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {applications.length} hồ sơ{newCount > 0 ? ` — ${newCount} hồ sơ mới` : ""}
        </p>
      </div>

      <div className="mt-6">
        <AdminTable headers={["Họ tên", "Email", "Điện thoại", "Vị trí", "Trạng thái", "Ngày gửi", "Thao tác"]}>
          {applications.map((application) => {
            const status = application.status as JobApplicationStatus;
            return (
              <tr key={application.id}>
                <td className="px-4 py-3 text-ink">{application.applicantName}</td>
                <td className="px-4 py-3 text-ink/70">{application.applicantEmail}</td>
                <td className="px-4 py-3 text-ink/70">{application.applicantPhone || "—"}</td>
                <td className="px-4 py-3 text-ink/70">{application.position || "—"}</td>
                <td className="px-4 py-3">
                  <Badge tone={JOB_APPLICATION_STATUS_TONE[status] ?? "neutral"}>
                    {JOB_APPLICATION_STATUS_LABELS[status] ?? application.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-ink/70">{application.createdAt.toLocaleDateString("vi-VN")}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/job-applications/${application.id}`} aria-label="Xem chi tiết" className="text-primary hover:underline">
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <form action={deleteJobApplication.bind(null, application.id)}>
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
        {applications.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">Chưa có hồ sơ ứng tuyển nào.</p>
        ) : null}
      </div>
    </div>
  );
}
