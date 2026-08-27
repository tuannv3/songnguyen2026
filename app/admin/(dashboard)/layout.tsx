import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { getSession } from "@/lib/auth/session";
import { logout } from "@/lib/cms/actions/auth";

const navItems = [
  { href: "/admin", label: "Tổng quan" },
  { href: "/admin/orders", label: "Đơn hàng" },
  { href: "/admin/job-applications", label: "Hồ sơ ứng tuyển" },
  { href: "/admin/newsletter", label: "Đăng ký nhận tin" },
  { href: "/admin/hero-slides", label: "Slide trang chủ" },
  { href: "/admin/home-stats", label: "Chỉ số thống kê" },
  { href: "/admin/home-content", label: "Hình ảnh trang chủ" },
  { href: "/admin/products", label: "Sản phẩm" },
  { href: "/admin/news", label: "Tin tức" },
  { href: "/admin/careers", label: "Tuyển dụng" },
  { href: "/admin/about", label: "Giới thiệu" },
  { href: "/admin/corporate-gifts", label: "Quà tặng doanh nghiệp" },
  { href: "/admin/settings", label: "Liên hệ & Cài đặt" },
];

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-muted/40">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card md:flex">
        <div className="border-b border-border px-6 py-5">
          <p className="font-serif-display text-lg text-ink">Song Nguyên</p>
          <p className="text-xs text-muted-foreground">Trang quản trị</p>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink/80 transition-colors hover:bg-muted hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-border p-3">
          <p className="truncate px-3 py-1 text-xs text-muted-foreground">{session.email}</p>
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:bg-muted hover:text-destructive"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Đăng xuất
            </button>
          </form>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-border bg-card px-4 py-4 md:hidden">
          <p className="font-serif-display text-lg text-ink">Song Nguyên — Quản trị</p>
          <form action={logout}>
            <button type="submit" aria-label="Đăng xuất" className="cursor-pointer text-ink/70">
              <LogOut className="h-5 w-5" aria-hidden="true" />
            </button>
          </form>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-10">{children}</main>
      </div>
    </div>
  );
}
