"use client";

import { useActionState } from "react";
import { AdminInput } from "@/components/admin/admin-input";
import { BilingualField } from "@/components/admin/bilingual-field";
import { FormMessage } from "@/components/admin/form-message";
import { SaveButton } from "@/components/admin/save-button";
import { updateHomeStats } from "@/lib/cms/actions/home-stats";

type Defaults = {
  stat1Value: string;
  stat1LabelVi: string;
  stat1LabelEn: string;
  stat2Value: string;
  stat2LabelVi: string;
  stat2LabelEn: string;
  stat3Value: string;
  stat3LabelVi: string;
  stat3LabelEn: string;
  stat4Value: string;
  stat4LabelVi: string;
  stat4LabelEn: string;
};

export function HomeStatsForm({ defaults }: { defaults: Defaults }) {
  const [state, formAction] = useActionState(updateHomeStats, null);

  const groups = [1, 2, 3, 4] as const;

  return (
    <form action={formAction} className="space-y-6">
      {groups.map((n) => (
        <div key={n} className="space-y-3 rounded-xl border border-border p-4">
          <p className="text-sm font-medium text-ink">Chỉ số {n}</p>
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Con số hiển thị (ví dụ: 5+, 80+, 98%, 6)
            </label>
            <AdminInput name={`stat${n}Value`} defaultValue={defaults[`stat${n}Value` as keyof Defaults]} className="max-w-xs" required />
          </div>
          <BilingualField
            label="Mô tả"
            nameVi={`stat${n}LabelVi`}
            nameEn={`stat${n}LabelEn`}
            defaultValueVi={defaults[`stat${n}LabelVi` as keyof Defaults]}
            defaultValueEn={defaults[`stat${n}LabelEn` as keyof Defaults]}
            required
          />
        </div>
      ))}

      <FormMessage state={state} />
      <SaveButton />
    </form>
  );
}
