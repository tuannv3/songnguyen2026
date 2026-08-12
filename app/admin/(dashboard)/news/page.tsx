import Link from "next/link";
import { Pencil, Trash2, Plus } from "lucide-react";
import { prisma } from "@/lib/db/client";
import { deleteNewsPost } from "@/lib/cms/actions/news";
import { AdminTable } from "@/components/admin/admin-table";
import { Button } from "@/components/ui/button";

export default async function AdminNewsPage() {
  const posts = await prisma.newsPost.findMany({ orderBy: { date: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif-display text-2xl text-ink">Tin tức</h1>
          <p className="mt-1 text-sm text-muted-foreground">{posts.length} bài viết</p>
        </div>
        <Button href="/admin/news/new" size="sm">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Thêm bài viết
        </Button>
      </div>

      <div className="mt-6">
        <AdminTable headers={["Tiêu đề", "Chuyên mục", "Ngày đăng", "Thao tác"]}>
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="px-4 py-3 text-ink">{post.titleVi}</td>
              <td className="px-4 py-3 text-ink/70">{post.categoryVi}</td>
              <td className="px-4 py-3 text-ink/70">{post.date}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Link href={`/admin/news/${post.id}`} className="text-primary hover:underline" aria-label="Sửa">
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <form action={deleteNewsPost.bind(null, post.id)}>
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
