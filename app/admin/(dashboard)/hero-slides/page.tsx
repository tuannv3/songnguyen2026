import Link from "next/link";
import Image from "next/image";
import { ArrowUp, ArrowDown, Pencil, Trash2, Plus } from "lucide-react";
import { prisma } from "@/lib/db/client";
import { deleteHeroSlide, reorderHeroSlide } from "@/lib/cms/actions/hero-slides";
import { AdminTable } from "@/components/admin/admin-table";
import { Button } from "@/components/ui/button";

export default async function AdminHeroSlidesPage() {
  const slides = await prisma.heroSlide.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif-display text-2xl text-ink">Slide trang chủ</h1>
          <p className="mt-1 text-sm text-muted-foreground">Thứ tự hiển thị theo danh sách bên dưới.</p>
        </div>
        <Button href="/admin/hero-slides/new" size="sm">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Thêm slide
        </Button>
      </div>

      <div className="mt-6">
        <AdminTable headers={["Ảnh", "Tiêu đề", "Thứ tự", "Thao tác"]}>
          {slides.map((slide, index) => (
            <tr key={slide.id}>
              <td className="px-4 py-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-muted">
                  {slide.image ? (
                    <Image src={slide.image} alt="" fill className="object-cover" />
                  ) : (
                    <div className="h-full w-full" style={{ backgroundColor: slide.bottleColor1 }} />
                  )}
                </div>
              </td>
              <td className="max-w-xs px-4 py-3 text-ink">{slide.titleVi}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <form action={reorderHeroSlide.bind(null, slide.id, "up")}>
                    <button
                      type="submit"
                      disabled={index === 0}
                      aria-label="Đưa lên trên"
                      className="rounded p-1 text-ink/60 hover:bg-muted disabled:opacity-30"
                    >
                      <ArrowUp className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </form>
                  <form action={reorderHeroSlide.bind(null, slide.id, "down")}>
                    <button
                      type="submit"
                      disabled={index === slides.length - 1}
                      aria-label="Đưa xuống dưới"
                      className="rounded p-1 text-ink/60 hover:bg-muted disabled:opacity-30"
                    >
                      <ArrowDown className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </form>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <Link href={`/admin/hero-slides/${slide.id}`} className="text-primary hover:underline" aria-label="Sửa">
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <form action={deleteHeroSlide.bind(null, slide.id)}>
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
