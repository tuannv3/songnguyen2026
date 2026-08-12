"use client";

import { useActionState } from "react";
import { AdminInput } from "@/components/admin/admin-input";
import { FormMessage } from "@/components/admin/form-message";
import { SaveButton } from "@/components/admin/save-button";
import { changePassword } from "@/lib/cms/actions/auth";

export function ChangePasswordForm() {
  const [state, formAction] = useActionState(changePassword, null);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="currentPassword" className="block text-sm font-medium text-ink">
          Mật khẩu hiện tại
        </label>
        <AdminInput id="currentPassword" name="currentPassword" type="password" autoComplete="current-password" required className="mt-2" />
      </div>
      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-ink">
          Mật khẩu mới (tối thiểu 8 ký tự)
        </label>
        <AdminInput id="newPassword" name="newPassword" type="password" autoComplete="new-password" required minLength={8} className="mt-2" />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-ink">
          Xác nhận mật khẩu mới
        </label>
        <AdminInput id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" required minLength={8} className="mt-2" />
      </div>
      <FormMessage state={state} />
      <SaveButton label="Đổi mật khẩu" />
    </form>
  );
}
