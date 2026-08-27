import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/client";
import { JobApplicationStatusForm } from "@/components/admin/job-application-status-form";
import { JOB_APPLICATION_STATUS_LABELS, type JobApplicationStatus } from "@/lib/data/job-applications";

export default async function AdminJobApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const application = await prisma.jobApplication.findUnique({ where: { id } });
  if (!application) notFound();

  return (
    <div>
      <h1 className="font-serif-display text-2xl text-ink">Chi tiết hồ sơ ứng tuyển</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Gửi lúc {application.createdAt.toLocaleString("vi-VN")}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-serif-display text-lg text-ink">Thông tin ứng viên</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex gap-2">
              <dt className="w-32 shrink-0 text-muted-foreground">Họ và tên</dt>
              <dd className="text-ink">{application.applicantName}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-32 shrink-0 text-muted-foreground">Email</dt>
              <dd className="text-ink">{application.applicantEmail}</dd>
            </div>
            {application.applicantPhone ? (
              <div className="flex gap-2">
                <dt className="w-32 shrink-0 text-muted-foreground">Điện thoại</dt>
                <dd className="text-ink">{application.applicantPhone}</dd>
              </div>
            ) : null}
            {application.position ? (
              <div className="flex gap-2">
                <dt className="w-32 shrink-0 text-muted-foreground">Vị trí ứng tuyển</dt>
                <dd className="text-ink">{application.position}</dd>
              </div>
            ) : null}
          </dl>
          <div className="mt-4 border-t border-border pt-4">
            <p className="text-sm font-medium text-ink">Nội dung</p>
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ink/75">{application.message}</p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-serif-display text-lg text-ink">Trạng thái xử lý</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Hiện tại: {JOB_APPLICATION_STATUS_LABELS[application.status as JobApplicationStatus] ?? application.status}
          </p>
          <div className="mt-4">
            <JobApplicationStatusForm applicationId={application.id} currentStatus={application.status} />
          </div>
        </div>
      </div>
    </div>
  );
}
