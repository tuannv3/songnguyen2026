import { prisma } from "@/lib/db/client";
import { SiteSettingsForm } from "@/components/admin/site-settings-form";
import { ChangePasswordForm } from "@/components/admin/change-password-form";

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSettings.findUniqueOrThrow({ where: { id: "singleton" } });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif-display text-2xl text-ink">Liên hệ & Cài đặt</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Thông tin này hiển thị ở chân trang và popup liên hệ trên mọi trang.
        </p>
        <div className="mt-6 max-w-2xl rounded-xl border border-border bg-card p-6 shadow-soft">
          <SiteSettingsForm defaults={settings} />
        </div>
      </div>

      <div>
        <h2 className="font-serif-display text-xl text-ink">Đổi mật khẩu quản trị</h2>
        <div className="mt-4 max-w-md rounded-xl border border-border bg-card p-6 shadow-soft">
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
