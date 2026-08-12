import { createNewsPost } from "@/lib/cms/actions/news";
import { NewsForm } from "@/components/admin/news-form";

export default function NewNewsPostPage() {
  return (
    <div>
      <h1 className="font-serif-display text-2xl text-ink">Thêm bài viết</h1>
      <div className="mt-6 max-w-2xl rounded-xl border border-border bg-card p-6 shadow-soft">
        <NewsForm action={createNewsPost} />
      </div>
    </div>
  );
}
