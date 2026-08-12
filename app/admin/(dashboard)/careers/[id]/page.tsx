import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/client";
import { updateJobPosting } from "@/lib/cms/actions/careers";
import { JobPostingForm } from "@/components/admin/job-posting-form";

export default async function EditJobPostingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await prisma.jobPosting.findUnique({ where: { id } });
  if (!job) notFound();

  return (
    <div>
      <h1 className="font-serif-display text-2xl text-ink">Sửa tin tuyển dụng</h1>
      <div className="mt-6 max-w-2xl rounded-xl border border-border bg-card p-6 shadow-soft">
        <JobPostingForm action={updateJobPosting.bind(null, id)} defaults={job} />
      </div>
    </div>
  );
}
