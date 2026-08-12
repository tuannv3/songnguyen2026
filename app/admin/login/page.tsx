import { Logo } from "@/components/icons/logo";
import { LoginForm } from "@/components/admin/login-form";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-soft">
        <div className="flex flex-col items-center text-center">
          <Logo />
          <h1 className="font-serif-display mt-4 text-xl text-ink">Đăng nhập quản trị</h1>
          <p className="mt-1 text-sm text-muted-foreground">Song Nguyên Essential Oils</p>
        </div>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
