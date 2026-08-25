import { Trash2 } from "lucide-react";
import { prisma } from "@/lib/db/client";
import { deleteSubscriber } from "@/lib/cms/actions/newsletter";
import { AdminTable } from "@/components/admin/admin-table";

export default async function AdminNewsletterPage() {
  const subscribers = await prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="font-serif-display text-2xl text-ink">Đăng ký nhận tin</h1>
      <p className="mt-1 text-sm text-muted-foreground">{subscribers.length} email đã đăng ký</p>

      <div className="mt-6">
        <AdminTable headers={["Email", "Ngày đăng ký", "Thao tác"]}>
          {subscribers.map((subscriber) => (
            <tr key={subscriber.id}>
              <td className="px-4 py-3 text-ink">{subscriber.email}</td>
              <td className="px-4 py-3 text-ink/70">{subscriber.createdAt.toLocaleDateString("vi-VN")}</td>
              <td className="px-4 py-3">
                <form action={deleteSubscriber.bind(null, subscriber.id)}>
                  <button type="submit" aria-label="Xoá" className="cursor-pointer text-destructive/80 hover:text-destructive">
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </AdminTable>
        {subscribers.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">Chưa có ai đăng ký nhận tin.</p>
        ) : null}
      </div>
    </div>
  );
}
