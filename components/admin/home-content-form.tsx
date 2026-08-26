"use client";

import { useActionState } from "react";
import { AdminInput } from "@/components/admin/admin-input";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { BilingualField } from "@/components/admin/bilingual-field";
import { RepeatableFieldList } from "@/components/admin/repeatable-field-list";
import { FormMessage } from "@/components/admin/form-message";
import { SaveButton } from "@/components/admin/save-button";
import { updateHomeContent } from "@/lib/cms/actions/home-content";

type TestimonialRow = {
  name: string;
  roleVi: string;
  roleEn: string;
  quoteVi: string;
  quoteEn: string;
  rating: string;
};

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
  testimonialsHeadingVi: string;
  testimonialsHeadingEn: string;
  testimonials: unknown;
};

export function HomeContentForm({ defaults }: { defaults: Defaults }) {
  const [state, formAction] = useActionState(updateHomeContent, null);

  const testimonials =
    (
      defaults.testimonials as
        | { name: string; roleVi: string; roleEn: string; quoteVi: string; quoteEn: string; rating: number }[]
        | null
    )?.map((t) => ({
      name: t.name,
      roleVi: t.roleVi,
      roleEn: t.roleEn,
      quoteVi: t.quoteVi,
      quoteEn: t.quoteEn,
      rating: String(t.rating ?? 5),
    })) ?? [];

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

      <div className="border-t border-border pt-6">
        <h2 className="font-serif-display text-lg text-ink">Mục &quot;Khách hàng nói gì&quot;</h2>
        <div className="mt-4 space-y-4">
          <BilingualField
            label="Tiêu đề"
            nameVi="testimonialsHeadingVi"
            nameEn="testimonialsHeadingEn"
            defaultValueVi={defaults.testimonialsHeadingVi}
            defaultValueEn={defaults.testimonialsHeadingEn}
          />
          <RepeatableFieldList
            name="testimonials"
            label="Đánh giá của khách hàng"
            defaultItems={testimonials}
            emptyItem={{ name: "", roleVi: "", roleEn: "", quoteVi: "", quoteEn: "", rating: "5" }}
            renderFields={({ item, fieldName }) => (
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
                  <div>
                    <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Tên khách hàng
                    </label>
                    <AdminInput name={fieldName("name")} defaultValue={item.name} placeholder="Nguyễn Thu Hà" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Số sao (1-5)
                    </label>
                    <AdminInput
                      name={fieldName("rating")}
                      type="number"
                      min={1}
                      max={5}
                      defaultValue={item.rating}
                      className="w-24"
                    />
                  </div>
                </div>
                <BilingualField label="Chức danh" nameVi={fieldName("roleVi")} nameEn={fieldName("roleEn")} defaultValueVi={item.roleVi} defaultValueEn={item.roleEn} />
                <BilingualField label="Nội dung đánh giá" nameVi={fieldName("quoteVi")} nameEn={fieldName("quoteEn")} defaultValueVi={item.quoteVi} defaultValueEn={item.quoteEn} as="textarea" />
              </div>
            )}
          />
        </div>
      </div>

      <FormMessage state={state} />
      <SaveButton />
    </form>
  );
}
