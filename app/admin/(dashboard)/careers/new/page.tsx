import { createJobPosting } from "@/lib/cms/actions/careers";
import { JobPostingForm } from "@/components/admin/job-posting-form";

export default function NewJobPostingPage() {
  return (
    <div>
      <h1 className="font-serif-display text-2xl text-ink">Thêm tin tuyển dụng</h1>
      <div className="mt-6 max-w-2xl rounded-xl border border-border bg-card p-6 shadow-soft">
        <JobPostingForm action={createJobPosting} />
      </div>
    </div>
  );
}
