import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/client";
import { updateNewsPost } from "@/lib/cms/actions/news";
import { NewsForm } from "@/components/admin/news-form";

export default async function EditNewsPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.newsPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div>
      <h1 className="font-serif-display text-2xl text-ink">Sửa bài viết</h1>
      <div className="mt-6 max-w-2xl rounded-xl border border-border bg-card p-6 shadow-soft">
        <NewsForm action={updateNewsPost.bind(null, id)} defaults={post} />
      </div>
    </div>
  );
}
