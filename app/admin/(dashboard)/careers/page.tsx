import Link from "next/link";
import { ArrowUp, ArrowDown, Pencil, Trash2, Plus, FileEdit } from "lucide-react";
import { prisma } from "@/lib/db/client";
import { deleteJobPosting, reorderJobPosting } from "@/lib/cms/actions/careers";
import { AdminTable } from "@/components/admin/admin-table";
import { Button } from "@/components/ui/button";

export default async function AdminCareersPage() {
  const jobs = await prisma.jobPosting.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif-display text-2xl text-ink">Tuyển dụng</h1>
          <p className="mt-1 text-sm text-muted-foreground">{jobs.length} tin tuyển dụng</p>
        </div>
        <div className="flex items-center gap-2">
          <Button href="/admin/careers/page-content" variant="outline" size="sm">
            <FileEdit className="h-4 w-4" aria-hidden="true" />
            Nội dung trang
          </Button>
          <Button href="/admin/careers/new" size="sm">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Thêm tin
          </Button>
        </div>
      </div>

      <div className="mt-6">
        <AdminTable headers={["Vị trí", "Địa điểm", "Thứ tự", "Thao tác"]}>
          {jobs.map((job, index) => (
            <tr key={job.id}>
              <td className="px-4 py-3 text-ink">{job.titleVi}</td>
              <td className="px-4 py-3 text-ink/70">{job.locationVi}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <form action={reorderJobPosting.bind(null, job.id, "up")}>
                    <button type="submit" disabled={index === 0} aria-label="Đưa lên trên" className="rounded p-1 text-ink/60 hover:bg-muted disabled:opacity-30">
                      <ArrowUp className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </form>
                  <form action={reorderJobPosting.bind(null, job.id, "down")}>
                    <button type="submit" disabled={index === jobs.length - 1} aria-label="Đưa xuống dưới" className="rounded p-1 text-ink/60 hover:bg-muted disabled:opacity-30">
                      <ArrowDown className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </form>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Link href={`/admin/careers/${job.id}`} className="text-primary hover:underline" aria-label="Sửa">
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <form action={deleteJobPosting.bind(null, job.id)}>
                    <button type="submit" aria-label="Xoá" className="cursor-pointer text-destructive/80 hover:text-destructive">
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      </div>
    </div>
  );
}
