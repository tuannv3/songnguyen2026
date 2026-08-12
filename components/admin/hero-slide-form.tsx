"use client";

import { useActionState } from "react";
import { AdminInput } from "@/components/admin/admin-input";
import { BilingualField } from "@/components/admin/bilingual-field";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { FormMessage } from "@/components/admin/form-message";
import { SaveButton } from "@/components/admin/save-button";
import type { ActionState } from "@/lib/cms/actions/types";

type HeroSlideDefaults = {
  eyebrowVi: string;
  eyebrowEn: string;
  titleVi: string;
  titleEn: string;
  subtitleVi: string;
  subtitleEn: string;
  ctaPrimaryLabelVi: string;
  ctaPrimaryLabelEn: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabelVi: string | null;
  ctaSecondaryLabelEn: string | null;
  ctaSecondaryHref: string | null;
  bottleColor1: string;
  bottleColor2: string;
  glowColor: string;
  image: string | null;
};

const emptyDefaults: HeroSlideDefaults = {
  eyebrowVi: "",
  eyebrowEn: "",
  titleVi: "",
  titleEn: "",
  subtitleVi: "",
  subtitleEn: "",
  ctaPrimaryLabelVi: "",
  ctaPrimaryLabelEn: "",
  ctaPrimaryHref: "/san-pham",
  ctaSecondaryLabelVi: "",
  ctaSecondaryLabelEn: "",
  ctaSecondaryHref: "",
  bottleColor1: "#2F6F65",
  bottleColor2: "#B6924F",
  glowColor: "rgba(47,111,101,0.32)",
  image: null,
};

export function HeroSlideForm({
  action,
  defaults = emptyDefaults,
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  defaults?: HeroSlideDefaults;
}) {
  const [state, formAction] = useActionState(action, null);

  return (
    <form action={formAction} className="space-y-6">
      <ImageUploadField name="image" label="Ảnh minh hoạ (thay cho 2 lọ tinh dầu tượng trưng)" defaultImageUrl={defaults.image} />

      <BilingualField label="Nhãn nhỏ phía trên" nameVi="eyebrowVi" nameEn="eyebrowEn" defaultValueVi={defaults.eyebrowVi} defaultValueEn={defaults.eyebrowEn} required />
      <BilingualField label="Tiêu đề" nameVi="titleVi" nameEn="titleEn" defaultValueVi={defaults.titleVi} defaultValueEn={defaults.titleEn} required />
      <BilingualField label="Mô tả" nameVi="subtitleVi" nameEn="subtitleEn" defaultValueVi={defaults.subtitleVi} defaultValueEn={defaults.subtitleEn} as="textarea" required />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <BilingualField label="Nút chính — nhãn" nameVi="ctaPrimaryLabelVi" nameEn="ctaPrimaryLabelEn" defaultValueVi={defaults.ctaPrimaryLabelVi} defaultValueEn={defaults.ctaPrimaryLabelEn} required />
        <div>
          <label htmlFor="ctaPrimaryHref" className="block text-sm font-medium text-ink">
            Nút chính — đường dẫn
          </label>
          <AdminInput id="ctaPrimaryHref" name="ctaPrimaryHref" defaultValue={defaults.ctaPrimaryHref} placeholder="/san-pham" className="mt-2" required />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <BilingualField label="Nút phụ — nhãn (không bắt buộc)" nameVi="ctaSecondaryLabelVi" nameEn="ctaSecondaryLabelEn" defaultValueVi={defaults.ctaSecondaryLabelVi ?? ""} defaultValueEn={defaults.ctaSecondaryLabelEn ?? ""} />
        <div>
          <label htmlFor="ctaSecondaryHref" className="block text-sm font-medium text-ink">
            Nút phụ — đường dẫn
          </label>
          <AdminInput id="ctaSecondaryHref" name="ctaSecondaryHref" defaultValue={defaults.ctaSecondaryHref ?? ""} placeholder="/ve-chung-toi" className="mt-2" />
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-ink">Màu nền (chỉ dùng khi chưa có ảnh minh hoạ)</p>
        <p className="text-xs text-muted-foreground">Nhập mã màu dạng #rrggbb, ví dụ #2F6F65</p>
        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <AdminInput name="bottleColor1" defaultValue={defaults.bottleColor1} placeholder="#2F6F65" />
          <AdminInput name="bottleColor2" defaultValue={defaults.bottleColor2} placeholder="#B6924F" />
          <AdminInput name="glowColor" defaultValue={defaults.glowColor} placeholder="rgba(47,111,101,0.32)" />
        </div>
      </div>

      <FormMessage state={state} />
      <SaveButton />
    </form>
  );
}
