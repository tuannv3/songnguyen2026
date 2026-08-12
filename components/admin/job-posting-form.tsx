"use client";

import { useActionState } from "react";
import { AdminInput } from "@/components/admin/admin-input";
import { BilingualField } from "@/components/admin/bilingual-field";
import { RepeatableFieldList } from "@/components/admin/repeatable-field-list";
import { FormMessage } from "@/components/admin/form-message";
import { SaveButton } from "@/components/admin/save-button";
import type { ActionState } from "@/lib/cms/actions/types";

type JobPostingDefaults = {
  slug: string;
  titleVi: string;
  titleEn: string;
  locationVi: string;
  locationEn: string;
  typeVi: string;
  typeEn: string;
  summaryVi: string;
  summaryEn: string;
  requirements: unknown;
};

const emptyDefaults: JobPostingDefaults = {
  slug: "",
  titleVi: "",
  titleEn: "",
  locationVi: "TP. Hồ Chí Minh",
  locationEn: "Ho Chi Minh City",
  typeVi: "Toàn thời gian",
  typeEn: "Full-time",
  summaryVi: "",
  summaryEn: "",
  requirements: [],
};

export function JobPostingForm({
  action,
  defaults = emptyDefaults,
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  defaults?: JobPostingDefaults;
}) {
  const [state, formAction] = useActionState(action, null);
  const requirements = (defaults.requirements as { vi: string; en: string }[] | null) ?? [];

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-ink">
          Slug (đường dẫn URL)
        </label>
        <AdminInput id="slug" name="slug" defaultValue={defaults.slug} placeholder="nhan-vien-kinh-doanh" className="mt-2" required />
      </div>

      <BilingualField label="Vị trí tuyển dụng" nameVi="titleVi" nameEn="titleEn" defaultValueVi={defaults.titleVi} defaultValueEn={defaults.titleEn} required />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <BilingualField label="Địa điểm" nameVi="locationVi" nameEn="locationEn" defaultValueVi={defaults.locationVi} defaultValueEn={defaults.locationEn} />
        <BilingualField label="Hình thức" nameVi="typeVi" nameEn="typeEn" defaultValueVi={defaults.typeVi} defaultValueEn={defaults.typeEn} />
      </div>

      <BilingualField label="Mô tả công việc" nameVi="summaryVi" nameEn="summaryEn" defaultValueVi={defaults.summaryVi} defaultValueEn={defaults.summaryEn} as="textarea" required />

      <RepeatableFieldList
        name="requirements"
        label="Yêu cầu ứng viên"
        defaultItems={requirements}
        emptyItem={{ vi: "", en: "" }}
        renderFields={({ item, fieldName }) => (
          <BilingualField label="Yêu cầu" nameVi={fieldName("vi")} nameEn={fieldName("en")} defaultValueVi={item.vi} defaultValueEn={item.en} />
        )}
      />

      <FormMessage state={state} />
      <SaveButton />
    </form>
  );
}
