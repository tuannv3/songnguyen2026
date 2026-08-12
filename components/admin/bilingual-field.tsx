import { AdminInput } from "@/components/admin/admin-input";
import { AdminTextarea } from "@/components/admin/admin-textarea";

export function BilingualField({
  label,
  nameVi,
  nameEn,
  defaultValueVi,
  defaultValueEn,
  as = "input",
  required,
}: {
  label: string;
  nameVi: string;
  nameEn: string;
  defaultValueVi?: string;
  defaultValueEn?: string;
  as?: "input" | "textarea";
  required?: boolean;
}) {
  const Field = as === "textarea" ? AdminTextarea : AdminInput;
  return (
    <div>
      <span className="block text-sm font-medium text-ink">{label}</span>
      <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Tiếng Việt
          </span>
          <Field name={nameVi} defaultValue={defaultValueVi} required={required} />
        </div>
        <div>
          <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
            English
          </span>
          <Field name={nameEn} defaultValue={defaultValueEn} required={required} />
        </div>
      </div>
    </div>
  );
}
