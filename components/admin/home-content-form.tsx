"use client";

import { useActionState } from "react";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { BilingualField } from "@/components/admin/bilingual-field";
import { FormMessage } from "@/components/admin/form-message";
import { SaveButton } from "@/components/admin/save-button";
import { updateHomeContent } from "@/lib/cms/actions/home-content";

type Defaults = {
  philosophyImage: string | null;
  philosophyHeadingVi: string;
  philosophyHeadingEn: string;
  philosophyBodyVi: string;
  philosophyBodyEn: string;
  philosophyPoint1Vi: string;
  philosophyPoint1En: string;
  philosophyPoint2Vi: string;
  philosophyPoint2En: string;
  philosophyPoint3Vi: string;
  philosophyPoint3En: string;
  scienceImage: string | null;
};

export function HomeContentForm({ defaults }: { defaults: Defaults }) {
  const [state, formAction] = useActionState(updateHomeContent, null);

  return (
    <form action={formAction} className="space-y-6">
      <div className="border-b border-border pb-6">
        <h2 className="font-serif-display text-lg text-ink">Mục &quot;Triết lý thương hiệu&quot;</h2>
        <div className="mt-4 space-y-4">
          <ImageUploadField name="philosophyImage" label="Hình minh hoạ" defaultImageUrl={defaults.philosophyImage} />
          <BilingualField
            label="Tiêu đề"
            nameVi="philosophyHeadingVi"
            nameEn="philosophyHeadingEn"
            defaultValueVi={defaults.philosophyHeadingVi}
            defaultValueEn={defaults.philosophyHeadingEn}
          />
          <BilingualField
            label="Nội dung"
            nameVi="philosophyBodyVi"
            nameEn="philosophyBodyEn"
            defaultValueVi={defaults.philosophyBodyVi}
            defaultValueEn={defaults.philosophyBodyEn}
            as="textarea"
          />
          <BilingualField
            label="Điểm nhấn 1"
            nameVi="philosophyPoint1Vi"
            nameEn="philosophyPoint1En"
            defaultValueVi={defaults.philosophyPoint1Vi}
            defaultValueEn={defaults.philosophyPoint1En}
          />
          <BilingualField
            label="Điểm nhấn 2"
            nameVi="philosophyPoint2Vi"
            nameEn="philosophyPoint2En"
            defaultValueVi={defaults.philosophyPoint2Vi}
            defaultValueEn={defaults.philosophyPoint2En}
          />
          <BilingualField
            label="Điểm nhấn 3"
            nameVi="philosophyPoint3Vi"
            nameEn="philosophyPoint3En"
            defaultValueVi={defaults.philosophyPoint3Vi}
            defaultValueEn={defaults.philosophyPoint3En}
          />
        </div>
      </div>

      <ImageUploadField
        name="scienceImage"
        label="Hình minh hoạ mục 'Khoa học & Thiên nhiên' (thay cho hình lọ minh hoạ mặc định)"
        defaultImageUrl={defaults.scienceImage}
      />
      <p className="text-xs text-muted-foreground">
        Không chọn ảnh mới thì giữ nguyên hình hiện tại. Nếu chưa từng tải ảnh, mục sẽ hiển thị hình vẽ minh hoạ mặc định.
      </p>

      <FormMessage state={state} />
      <SaveButton />
    </form>
  );
}
