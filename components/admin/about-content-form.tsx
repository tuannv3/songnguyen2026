"use client";

import { useActionState } from "react";
import { AdminInput } from "@/components/admin/admin-input";
import { BilingualField } from "@/components/admin/bilingual-field";
import { RepeatableFieldList } from "@/components/admin/repeatable-field-list";
import { FormMessage } from "@/components/admin/form-message";
import { SaveButton } from "@/components/admin/save-button";
import { updateAboutContent } from "@/lib/cms/actions/about";

type Defaults = {
  eyebrowVi: string;
  eyebrowEn: string;
  headingVi: string;
  headingEn: string;
  subheadingVi: string;
  subheadingEn: string;
  storyHeadingVi: string;
  storyHeadingEn: string;
  storyBodyVi: unknown;
  storyBodyEn: unknown;
  missionHeadingVi: string;
  missionHeadingEn: string;
  missionBodyVi: string;
  missionBodyEn: string;
  valuesHeadingVi: string;
  valuesHeadingEn: string;
  values: unknown;
  timelineHeadingVi: string;
  timelineHeadingEn: string;
  timeline: unknown;
  certHeadingVi: string;
  certHeadingEn: string;
  certBodyVi: string;
  certBodyEn: string;
};

export function AboutContentForm({ defaults }: { defaults: Defaults }) {
  const [state, formAction] = useActionState(updateAboutContent, null);

  const storyBodyVi = (defaults.storyBodyVi as string[] | null) ?? [];
  const storyBodyEn = (defaults.storyBodyEn as string[] | null) ?? [];
  const storyBody = storyBodyVi.map((vi, i) => ({ vi, en: storyBodyEn[i] ?? "" }));
  const values = (defaults.values as { titleVi: string; bodyVi: string; titleEn: string; bodyEn: string }[] | null) ?? [];
  const timeline =
    (defaults.timeline as
      | { yearVi: string; yearEn: string; titleVi: string; bodyVi: string; titleEn: string; bodyEn: string }[]
      | null) ?? [];

  return (
    <form action={formAction} className="space-y-6">
      <BilingualField label="Nhãn nhỏ" nameVi="eyebrowVi" nameEn="eyebrowEn" defaultValueVi={defaults.eyebrowVi} defaultValueEn={defaults.eyebrowEn} />
      <BilingualField label="Tiêu đề trang" nameVi="headingVi" nameEn="headingEn" defaultValueVi={defaults.headingVi} defaultValueEn={defaults.headingEn} />
      <BilingualField label="Mô tả" nameVi="subheadingVi" nameEn="subheadingEn" defaultValueVi={defaults.subheadingVi} defaultValueEn={defaults.subheadingEn} as="textarea" />

      <BilingualField label="Tiêu đề mục 'Hành trình'" nameVi="storyHeadingVi" nameEn="storyHeadingEn" defaultValueVi={defaults.storyHeadingVi} defaultValueEn={defaults.storyHeadingEn} />
      <RepeatableFieldList
        name="storyBody"
        label="Nội dung hành trình (từng đoạn)"
        defaultItems={storyBody}
        emptyItem={{ vi: "", en: "" }}
        renderFields={({ item, fieldName }) => (
          <BilingualField label="Đoạn văn" nameVi={fieldName("vi")} nameEn={fieldName("en")} defaultValueVi={item.vi} defaultValueEn={item.en} as="textarea" />
        )}
      />

      <BilingualField label="Tiêu đề mục 'Sứ mệnh'" nameVi="missionHeadingVi" nameEn="missionHeadingEn" defaultValueVi={defaults.missionHeadingVi} defaultValueEn={defaults.missionHeadingEn} />
      <BilingualField label="Nội dung sứ mệnh" nameVi="missionBodyVi" nameEn="missionBodyEn" defaultValueVi={defaults.missionBodyVi} defaultValueEn={defaults.missionBodyEn} as="textarea" />

      <BilingualField label="Tiêu đề mục 'Giá trị cốt lõi'" nameVi="valuesHeadingVi" nameEn="valuesHeadingEn" defaultValueVi={defaults.valuesHeadingVi} defaultValueEn={defaults.valuesHeadingEn} />
      <RepeatableFieldList
        name="values"
        label="Giá trị cốt lõi"
        defaultItems={values}
        emptyItem={{ titleVi: "", bodyVi: "", titleEn: "", bodyEn: "" }}
        renderFields={({ item, fieldName }) => (
          <div className="space-y-3">
            <BilingualField label="Tiêu đề" nameVi={fieldName("titleVi")} nameEn={fieldName("titleEn")} defaultValueVi={item.titleVi} defaultValueEn={item.titleEn} />
            <BilingualField label="Nội dung" nameVi={fieldName("bodyVi")} nameEn={fieldName("bodyEn")} defaultValueVi={item.bodyVi} defaultValueEn={item.bodyEn} as="textarea" />
          </div>
        )}
      />

      <BilingualField label="Tiêu đề mục 'Các dấu mốc'" nameVi="timelineHeadingVi" nameEn="timelineHeadingEn" defaultValueVi={defaults.timelineHeadingVi} defaultValueEn={defaults.timelineHeadingEn} />
      <RepeatableFieldList
        name="timeline"
        label="Các dấu mốc"
        defaultItems={timeline}
        emptyItem={{ yearVi: "", yearEn: "", titleVi: "", bodyVi: "", titleEn: "", bodyEn: "" }}
        renderFields={({ item, fieldName }) => (
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">Mốc thời gian (Tiếng Việt)</label>
                <AdminInput name={fieldName("yearVi")} defaultValue={item.yearVi} placeholder="Năm 1" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">Mốc thời gian (English)</label>
                <AdminInput name={fieldName("yearEn")} defaultValue={item.yearEn} placeholder="Year 1" />
              </div>
            </div>
            <BilingualField label="Tiêu đề" nameVi={fieldName("titleVi")} nameEn={fieldName("titleEn")} defaultValueVi={item.titleVi} defaultValueEn={item.titleEn} />
            <BilingualField label="Nội dung" nameVi={fieldName("bodyVi")} nameEn={fieldName("bodyEn")} defaultValueVi={item.bodyVi} defaultValueEn={item.bodyEn} as="textarea" />
          </div>
        )}
      />

      <BilingualField label="Tiêu đề mục 'Chứng nhận'" nameVi="certHeadingVi" nameEn="certHeadingEn" defaultValueVi={defaults.certHeadingVi} defaultValueEn={defaults.certHeadingEn} />
      <BilingualField label="Nội dung chứng nhận" nameVi="certBodyVi" nameEn="certBodyEn" defaultValueVi={defaults.certBodyVi} defaultValueEn={defaults.certBodyEn} as="textarea" />

      <FormMessage state={state} />
      <SaveButton />
    </form>
  );
}
