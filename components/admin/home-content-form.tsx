"use client";

import { useActionState } from "react";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { FormMessage } from "@/components/admin/form-message";
import { SaveButton } from "@/components/admin/save-button";
import { updateHomeContent } from "@/lib/cms/actions/home-content";

export function HomeContentForm({
  philosophyImage,
  scienceImage,
}: {
  philosophyImage: string | null;
  scienceImage: string | null;
}) {
  const [state, formAction] = useActionState(updateHomeContent, null);

  return (
    <form action={formAction} className="space-y-6">
      <ImageUploadField
        name="philosophyImage"
        label="Hình minh hoạ mục 'Triết lý thương hiệu' (thay cho hình vẽ mặc định)"
        defaultImageUrl={philosophyImage}
      />
      <ImageUploadField
        name="scienceImage"
        label="Hình minh hoạ mục 'Khoa học & Thiên nhiên' (thay cho hình lọ minh hoạ mặc định)"
        defaultImageUrl={scienceImage}
      />
      <p className="text-xs text-muted-foreground">
        Không chọn ảnh mới thì giữ nguyên hình hiện tại. Nếu chưa từng tải ảnh, mục sẽ hiển thị hình vẽ minh hoạ mặc định.
      </p>

      <FormMessage state={state} />
      <SaveButton />
    </form>
  );
}
