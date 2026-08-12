"use client";

import { useActionState } from "react";
import { BilingualField } from "@/components/admin/bilingual-field";
import { RepeatableFieldList } from "@/components/admin/repeatable-field-list";
import { FormMessage } from "@/components/admin/form-message";
import { SaveButton } from "@/components/admin/save-button";
import { updateCorporateGiftsContent } from "@/lib/cms/actions/corporate-gifts";

type TitleBody = { titleVi: string; bodyVi: string; titleEn: string; bodyEn: string };

type Defaults = {
  eyebrowVi: string;
  eyebrowEn: string;
  headingVi: string;
  headingEn: string;
  subheadingVi: string;
  subheadingEn: string;
  whyHeadingVi: string;
  whyHeadingEn: string;
  giftSetsHeadingVi: string;
  giftSetsHeadingEn: string;
  processHeadingVi: string;
  processHeadingEn: string;
  ctaHeadingVi: string;
  ctaHeadingEn: string;
  ctaBodyVi: string;
  ctaBodyEn: string;
  whyItems: unknown;
  process: unknown;
};

function TitleBodyFields({
  item,
  fieldName,
}: {
  item: TitleBody;
  fieldName: (key: keyof TitleBody) => string;
}) {
  return (
    <div className="space-y-3">
      <BilingualField label="Tiêu đề" nameVi={fieldName("titleVi")} nameEn={fieldName("titleEn")} defaultValueVi={item.titleVi} defaultValueEn={item.titleEn} />
      <BilingualField label="Nội dung" nameVi={fieldName("bodyVi")} nameEn={fieldName("bodyEn")} defaultValueVi={item.bodyVi} defaultValueEn={item.bodyEn} as="textarea" />
    </div>
  );
}

export function CorporateGiftsContentForm({ defaults }: { defaults: Defaults }) {
  const [state, formAction] = useActionState(updateCorporateGiftsContent, null);
  const whyItems = (defaults.whyItems as TitleBody[] | null) ?? [];
  const process = (defaults.process as TitleBody[] | null) ?? [];

  return (
    <form action={formAction} className="space-y-6">
      <BilingualField label="Nhãn nhỏ" nameVi="eyebrowVi" nameEn="eyebrowEn" defaultValueVi={defaults.eyebrowVi} defaultValueEn={defaults.eyebrowEn} />
      <BilingualField label="Tiêu đề trang" nameVi="headingVi" nameEn="headingEn" defaultValueVi={defaults.headingVi} defaultValueEn={defaults.headingEn} />
      <BilingualField label="Mô tả" nameVi="subheadingVi" nameEn="subheadingEn" defaultValueVi={defaults.subheadingVi} defaultValueEn={defaults.subheadingEn} as="textarea" />

      <BilingualField label="Tiêu đề mục 'Vì sao chọn'" nameVi="whyHeadingVi" nameEn="whyHeadingEn" defaultValueVi={defaults.whyHeadingVi} defaultValueEn={defaults.whyHeadingEn} />
      <RepeatableFieldList
        name="whyItems"
        label="Lý do nên chọn"
        defaultItems={whyItems}
        emptyItem={{ titleVi: "", bodyVi: "", titleEn: "", bodyEn: "" }}
        renderFields={({ item, fieldName }) => <TitleBodyFields item={item} fieldName={fieldName} />}
      />

      <BilingualField label="Tiêu đề mục 'Bộ quà tặng gợi ý'" nameVi="giftSetsHeadingVi" nameEn="giftSetsHeadingEn" defaultValueVi={defaults.giftSetsHeadingVi} defaultValueEn={defaults.giftSetsHeadingEn} />

      <BilingualField label="Tiêu đề mục 'Quy trình đặt hàng'" nameVi="processHeadingVi" nameEn="processHeadingEn" defaultValueVi={defaults.processHeadingVi} defaultValueEn={defaults.processHeadingEn} />
      <RepeatableFieldList
        name="process"
        label="Các bước trong quy trình"
        defaultItems={process}
        emptyItem={{ titleVi: "", bodyVi: "", titleEn: "", bodyEn: "" }}
        renderFields={({ item, fieldName }) => <TitleBodyFields item={item} fieldName={fieldName} />}
      />

      <BilingualField label="Tiêu đề kêu gọi hành động" nameVi="ctaHeadingVi" nameEn="ctaHeadingEn" defaultValueVi={defaults.ctaHeadingVi} defaultValueEn={defaults.ctaHeadingEn} />
      <BilingualField label="Nội dung kêu gọi hành động" nameVi="ctaBodyVi" nameEn="ctaBodyEn" defaultValueVi={defaults.ctaBodyVi} defaultValueEn={defaults.ctaBodyEn} as="textarea" />

      <FormMessage state={state} />
      <SaveButton />
    </form>
  );
}
