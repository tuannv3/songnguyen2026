"use client";

import { useActionState } from "react";
import { BilingualField } from "@/components/admin/bilingual-field";
import { RepeatableFieldList } from "@/components/admin/repeatable-field-list";
import { FormMessage } from "@/components/admin/form-message";
import { SaveButton } from "@/components/admin/save-button";
import { updateCareersPageContent } from "@/lib/cms/actions/careers";

type Defaults = {
  eyebrowVi: string;
  eyebrowEn: string;
  headingVi: string;
  headingEn: string;
  subheadingVi: string;
  subheadingEn: string;
  whyJoinHeadingVi: string;
  whyJoinHeadingEn: string;
  benefits: unknown;
  openPositionsHeadingVi: string;
  openPositionsHeadingEn: string;
  noOpeningsVi: string;
  noOpeningsEn: string;
};

export function CareersPageContentForm({ defaults }: { defaults: Defaults }) {
  const [state, formAction] = useActionState(updateCareersPageContent, null);
  const benefits =
    (defaults.benefits as { titleVi: string; bodyVi: string; titleEn: string; bodyEn: string }[] | null) ?? [];

  return (
    <form action={formAction} className="space-y-6">
      <BilingualField label="Nhãn nhỏ" nameVi="eyebrowVi" nameEn="eyebrowEn" defaultValueVi={defaults.eyebrowVi} defaultValueEn={defaults.eyebrowEn} />
      <BilingualField label="Tiêu đề trang" nameVi="headingVi" nameEn="headingEn" defaultValueVi={defaults.headingVi} defaultValueEn={defaults.headingEn} />
      <BilingualField label="Mô tả" nameVi="subheadingVi" nameEn="subheadingEn" defaultValueVi={defaults.subheadingVi} defaultValueEn={defaults.subheadingEn} as="textarea" />
      <BilingualField label="Tiêu đề mục 'Vì sao chọn chúng tôi'" nameVi="whyJoinHeadingVi" nameEn="whyJoinHeadingEn" defaultValueVi={defaults.whyJoinHeadingVi} defaultValueEn={defaults.whyJoinHeadingEn} />

      <RepeatableFieldList
        name="benefits"
        label="Lý do nên gia nhập"
        defaultItems={benefits}
        emptyItem={{ titleVi: "", bodyVi: "", titleEn: "", bodyEn: "" }}
        renderFields={({ item, fieldName }) => (
          <div className="space-y-3">
            <BilingualField label="Tiêu đề" nameVi={fieldName("titleVi")} nameEn={fieldName("titleEn")} defaultValueVi={item.titleVi} defaultValueEn={item.titleEn} />
            <BilingualField label="Nội dung" nameVi={fieldName("bodyVi")} nameEn={fieldName("bodyEn")} defaultValueVi={item.bodyVi} defaultValueEn={item.bodyEn} as="textarea" />
          </div>
        )}
      />

      <BilingualField label="Tiêu đề mục 'Vị trí đang tuyển'" nameVi="openPositionsHeadingVi" nameEn="openPositionsHeadingEn" defaultValueVi={defaults.openPositionsHeadingVi} defaultValueEn={defaults.openPositionsHeadingEn} />
      <BilingualField label="Thông báo khi chưa có vị trí" nameVi="noOpeningsVi" nameEn="noOpeningsEn" defaultValueVi={defaults.noOpeningsVi} defaultValueEn={defaults.noOpeningsEn} as="textarea" />

      <FormMessage state={state} />
      <SaveButton />
    </form>
  );
}
