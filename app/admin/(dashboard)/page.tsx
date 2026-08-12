import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db/client";

const cards = [
  { href: "/admin/hero-slides", label: "Slide trang chủ", countKey: "heroSlides" as const },
  { href: "/admin/products", label: "Sản phẩm", countKey: "products" as const },
  { href: "/admin/news", label: "Tin tức", countKey: "newsPosts" as const },
  { href: "/admin/careers", label: "Tin tuyển dụng", countKey: "jobPostings" as const },
];

export default async function AdminDashboardPage() {
  const [heroSlides, products, newsPosts, jobPostings] = await Promise.all([
    prisma.heroSlide.count(),
    prisma.product.count(),
    prisma.newsPost.count(),
    prisma.jobPosting.count(),
  ]);
  const counts = { heroSlides, products, newsPosts, jobPostings };

  return (
    <div>
      <h1 className="font-serif-display text-2xl text-ink">Tổng quan</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Quản lý nội dung hiển thị trên website Song Nguyên Essential Oils.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 shadow-soft transition-colors hover:border-primary/40"
          >
            <div>
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <p className="font-serif-display mt-1 text-3xl text-ink">{counts[card.countKey]}</p>
            </div>
            <ArrowRight
              className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-border bg-card p-5 shadow-soft">
        <p className="text-sm font-medium text-ink">Nội dung khác</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link href="/admin/about" className="text-sm text-primary hover:underline">
            Trang Giới thiệu
          </Link>
          <Link href="/admin/corporate-gifts" className="text-sm text-primary hover:underline">
            Trang Quà tặng doanh nghiệp
          </Link>
          <Link href="/admin/settings" className="text-sm text-primary hover:underline">
            Liên hệ & Cài đặt
          </Link>
        </div>
      </div>
    </div>
  );
}
