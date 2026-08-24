"use client";

import { useActionState } from "react";
import { AdminInput } from "@/components/admin/admin-input";
import { BilingualField } from "@/components/admin/bilingual-field";
import { RepeatableFieldList } from "@/components/admin/repeatable-field-list";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { ParagraphImageField } from "@/components/admin/paragraph-image-field";
import { FormMessage } from "@/components/admin/form-message";
import { SaveButton } from "@/components/admin/save-button";
import type { ActionState } from "@/lib/cms/actions/types";

type NewsDefaults = {
  slug: string;
  titleVi: string;
  titleEn: string;
  excerptVi: string;
  excerptEn: string;
  contentVi: unknown;
  contentEn: unknown;
  contentImages: unknown;
  date: string;
  authorVi: string;
  authorEn: string;
  categoryVi: string;
  categoryEn: string;
  accentColor: string;
  readingMinutes: number;
  image?: string | null;
};

const emptyDefaults: NewsDefaults = {
  slug: "",
  titleVi: "",
  titleEn: "",
  excerptVi: "",
  excerptEn: "",
  contentVi: [],
  contentEn: [],
  contentImages: [],
  date: new Date().toISOString().slice(0, 10),
  authorVi: "Đội ngũ Song Nguyên",
  authorEn: "Song Nguyên Team",
  categoryVi: "",
  categoryEn: "",
  accentColor: "#2F6F65",
  readingMinutes: 3,
  image: null,
};

export function NewsForm({
  action,
  defaults = emptyDefaults,
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  defaults?: NewsDefaults;
}) {
  const [state, formAction] = useActionState(action, null);
  const contentVi = (defaults.contentVi as string[] | null) ?? [];
  const contentEn = (defaults.contentEn as string[] | null) ?? [];
  const contentImages = (defaults.contentImages as (string | null)[] | null) ?? [];
  const content = contentVi.map((vi, i) => ({
    vi,
    en: contentEn[i] ?? "",
    imageExisting: contentImages[i] ?? "",
  }));

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-ink">
            Slug (đường dẫn URL)
          </label>
          <AdminInput id="slug" name="slug" defaultValue={defaults.slug} placeholder="ten-bai-viet" className="mt-2" required />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-ink">
            Ngày đăng
          </label>
          <AdminInput id="date" name="date" type="date" defaultValue={defaults.date} className="mt-2" required />
        </div>
      </div>

      <BilingualField label="Tiêu đề" nameVi="titleVi" nameEn="titleEn" defaultValueVi={defaults.titleVi} defaultValueEn={defaults.titleEn} required />
      <BilingualField label="Tóm tắt" nameVi="excerptVi" nameEn="excerptEn" defaultValueVi={defaults.excerptVi} defaultValueEn={defaults.excerptEn} as="textarea" required />

      <ImageUploadField name="image" label="Ảnh đại diện bài viết" defaultImageUrl={defaults.image} />

      <RepeatableFieldList
        name="content"
        label="Nội dung bài viết (từng đoạn văn)"
        defaultItems={content}
        emptyItem={{ vi: "", en: "", imageExisting: "" }}
        renderFields={({ index, item, fieldName }) => (
          <div className="space-y-4">
            <BilingualField label="Đoạn văn" nameVi={fieldName("vi")} nameEn={fieldName("en")} defaultValueVi={item.vi} defaultValueEn={item.en} as="textarea" />
            <ParagraphImageField
              existingName={fieldName("imageExisting")}
              newName={`content.${index}.imageNew`}
              defaultImageUrl={item.imageExisting}
            />
          </div>
        )}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <BilingualField label="Tác giả" nameVi="authorVi" nameEn="authorEn" defaultValueVi={defaults.authorVi} defaultValueEn={defaults.authorEn} />
        <BilingualField label="Chuyên mục" nameVi="categoryVi" nameEn="categoryEn" defaultValueVi={defaults.categoryVi} defaultValueEn={defaults.categoryEn} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="readingMinutes" className="block text-sm font-medium text-ink">
            Thời gian đọc (phút)
          </label>
          <AdminInput id="readingMinutes" name="readingMinutes" type="number" min={1} defaultValue={defaults.readingMinutes} className="mt-2" />
        </div>
        <div>
          <label htmlFor="accentColor" className="block text-sm font-medium text-ink">
            Màu chủ đạo
          </label>
          <AdminInput id="accentColor" name="accentColor" defaultValue={defaults.accentColor} placeholder="#2F6F65" className="mt-2" />
        </div>
      </div>

      <FormMessage state={state} />
      <SaveButton />
    </form>
  );
}
