"use client";

import { useActionState } from "react";
import { login } from "@/lib/cms/actions/auth";
import { AdminInput } from "@/components/admin/admin-input";
import { FormMessage } from "@/components/admin/form-message";
import { SaveButton } from "@/components/admin/save-button";

export function LoginForm() {
  const [state, formAction] = useActionState(login, null);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
          Email
        </label>
        <AdminInput id="email" name="email" type="email" required autoComplete="username" />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
          Mật khẩu
        </label>
        <AdminInput id="password" name="password" type="password" required autoComplete="current-password" />
      </div>
      <FormMessage state={state} />
      <SaveButton label="Đăng nhập" className="w-full justify-center" />
    </form>
  );
}
