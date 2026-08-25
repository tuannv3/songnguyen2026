"use client";

import { useActionState } from "react";
import { AdminInput } from "@/components/admin/admin-input";
import { AdminTextarea } from "@/components/admin/admin-textarea";
import { BilingualField } from "@/components/admin/bilingual-field";
import { RepeatableFieldList } from "@/components/admin/repeatable-field-list";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { ParagraphImageField } from "@/components/admin/paragraph-image-field";
import { MultiImageUploadField } from "@/components/admin/multi-image-upload-field";
import { FormMessage } from "@/components/admin/form-message";
import { SaveButton } from "@/components/admin/save-button";
import { updateAboutContent } from "@/lib/cms/actions/about";

type StorySectionRow = {
  headingVi: string;
  headingEn: string;
  bodyVi: string[];
  bodyEn: string[];
  image: string | null;
  captionVi: string;
  captionEn: string;
};

type Defaults = {
  eyebrowVi: string;
  eyebrowEn: string;
  headingVi: string;
  headingEn: string;
  subheadingVi: string;
  subheadingEn: string;

  storyHeadingVi: string;
  storyHeadingEn: string;
  storySubheadingVi: string;
  storySubheadingEn: string;
  storySections: unknown;

  visionTaglineVi: string;
  visionTaglineEn: string;
  visionSubtitleVi: string;
  visionSubtitleEn: string;
  visionPoints: unknown;

  missionHeadingVi: string;
  missionHeadingEn: string;
  missionBodyVi: string;
  missionBodyEn: string;
  missionIntroVi: string;
  missionIntroEn: string;
  missionGoals: unknown;
  missionImage: string | null;
  missionImageCaptionVi: string;
  missionImageCaptionEn: string;

  valuesHeadingVi: string;
  valuesHeadingEn: string;
  values: unknown;

  promiseHeadingVi: string;
  promiseHeadingEn: string;
  promiseLines: unknown;
  promiseClosingVi: string;
  promiseClosingEn: string;

  timelineHeadingVi: string;
  timelineHeadingEn: string;
  timeline: unknown;

  certHeadingVi: string;
  certHeadingEn: string;
  certBodyVi: string;
  certBodyEn: string;
  certImages: unknown;
};

export function AboutContentForm({ defaults }: { defaults: Defaults }) {
  const [state, formAction] = useActionState(updateAboutContent, null);

  const storySections =
    (defaults.storySections as StorySectionRow[] | null)?.map((s) => ({
      headingVi: s.headingVi,
      headingEn: s.headingEn,
      bodyVi: s.bodyVi.join("\n"),
      bodyEn: s.bodyEn.join("\n"),
      imageExisting: s.image ?? "",
      captionVi: s.captionVi,
      captionEn: s.captionEn,
    })) ?? [];

  const visionPoints = (defaults.visionPoints as { vi: string; en: string }[] | null) ?? [];
  const missionGoals = (defaults.missionGoals as { vi: string; en: string }[] | null) ?? [];
  const promiseLines = (defaults.promiseLines as { vi: string; en: string }[] | null) ?? [];

  const values = (defaults.values as { titleVi: string; bodyVi: string; titleEn: string; bodyEn: string }[] | null) ?? [];
  const timeline =
    (defaults.timeline as
      | { yearVi: string; yearEn: string; titleVi: string; bodyVi: string; titleEn: string; bodyEn: string }[]
      | null) ?? [];
  const certImages = (defaults.certImages as string[] | null) ?? [];

  return (
    <form action={formAction} className="space-y-6">
      <BilingualField label="Nhãn nhỏ" nameVi="eyebrowVi" nameEn="eyebrowEn" defaultValueVi={defaults.eyebrowVi} defaultValueEn={defaults.eyebrowEn} />
      <BilingualField label="Tiêu đề trang" nameVi="headingVi" nameEn="headingEn" defaultValueVi={defaults.headingVi} defaultValueEn={defaults.headingEn} />
      <BilingualField label="Mô tả" nameVi="subheadingVi" nameEn="subheadingEn" defaultValueVi={defaults.subheadingVi} defaultValueEn={defaults.subheadingEn} as="textarea" />

      <div className="border-t border-border pt-6">
        <h2 className="font-serif-display text-lg text-ink">Câu chuyện thương hiệu</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Mỗi phần gồm tiêu đề, nội dung (mỗi dòng là một đoạn văn) và một hình minh hoạ kèm chú thích tuỳ chọn.
        </p>
        <div className="mt-4 space-y-4">
          <BilingualField label="Tiêu đề mục 'Câu chuyện'" nameVi="storyHeadingVi" nameEn="storyHeadingEn" defaultValueVi={defaults.storyHeadingVi} defaultValueEn={defaults.storyHeadingEn} />
          <BilingualField label="Câu giới thiệu ngắn" nameVi="storySubheadingVi" nameEn="storySubheadingEn" defaultValueVi={defaults.storySubheadingVi} defaultValueEn={defaults.storySubheadingEn} />
        </div>

        <div className="mt-4">
          <RepeatableFieldList
            name="storySections"
            label="Các phần trong câu chuyện"
            defaultItems={storySections}
            emptyItem={{ headingVi: "", headingEn: "", bodyVi: "", bodyEn: "", imageExisting: "", captionVi: "", captionEn: "" }}
            renderFields={({ index, item, fieldName }) => (
              <div className="space-y-3">
                <BilingualField label="Tiêu đề phần" nameVi={fieldName("headingVi")} nameEn={fieldName("headingEn")} defaultValueVi={item.headingVi} defaultValueEn={item.headingEn} />
                <div>
                  <span className="block text-sm font-medium text-ink">Nội dung (mỗi dòng là một đoạn văn)</span>
                  <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">Tiếng Việt</span>
                      <AdminTextarea name={fieldName("bodyVi")} defaultValue={item.bodyVi} rows={5} />
                    </div>
                    <div>
                      <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">English</span>
                      <AdminTextarea name={fieldName("bodyEn")} defaultValue={item.bodyEn} rows={5} />
                    </div>
                  </div>
                </div>
                <ParagraphImageField
                  existingName={fieldName("imageExisting")}
                  newName={`storySections.${index}.imageNew`}
                  defaultImageUrl={item.imageExisting}
                />
                <BilingualField label="Chú thích hình" nameVi={fieldName("captionVi")} nameEn={fieldName("captionEn")} defaultValueVi={item.captionVi} defaultValueEn={item.captionEn} />
              </div>
            )}
          />
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h2 className="font-serif-display text-lg text-ink">Tầm nhìn</h2>
        <div className="mt-4 space-y-4">
          <BilingualField label="Câu tagline" nameVi="visionTaglineVi" nameEn="visionTaglineEn" defaultValueVi={defaults.visionTaglineVi} defaultValueEn={defaults.visionTaglineEn} />
          <BilingualField label="Câu phụ đề" nameVi="visionSubtitleVi" nameEn="visionSubtitleEn" defaultValueVi={defaults.visionSubtitleVi} defaultValueEn={defaults.visionSubtitleEn} />
          <RepeatableFieldList
            name="visionPoints"
            label="Các điểm tầm nhìn"
            defaultItems={visionPoints}
            emptyItem={{ vi: "", en: "" }}
            renderFields={({ item, fieldName }) => (
              <BilingualField label="Nội dung" nameVi={fieldName("vi")} nameEn={fieldName("en")} defaultValueVi={item.vi} defaultValueEn={item.en} />
            )}
          />
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h2 className="font-serif-display text-lg text-ink">Sứ mệnh</h2>
        <div className="mt-4 space-y-4">
          <BilingualField label="Tiêu đề mục 'Sứ mệnh'" nameVi="missionHeadingVi" nameEn="missionHeadingEn" defaultValueVi={defaults.missionHeadingVi} defaultValueEn={defaults.missionHeadingEn} />
          <BilingualField label="Tuyên ngôn sứ mệnh" nameVi="missionBodyVi" nameEn="missionBodyEn" defaultValueVi={defaults.missionBodyVi} defaultValueEn={defaults.missionBodyEn} as="textarea" />
          <BilingualField label="Đoạn giới thiệu thêm" nameVi="missionIntroVi" nameEn="missionIntroEn" defaultValueVi={defaults.missionIntroVi} defaultValueEn={defaults.missionIntroEn} as="textarea" />
          <RepeatableFieldList
            name="missionGoals"
            label="Những điều chúng tôi mong muốn"
            defaultItems={missionGoals}
            emptyItem={{ vi: "", en: "" }}
            renderFields={({ item, fieldName }) => (
              <BilingualField label="Nội dung" nameVi={fieldName("vi")} nameEn={fieldName("en")} defaultValueVi={item.vi} defaultValueEn={item.en} />
            )}
          />
          <ParagraphImageField existingName="missionImageExisting" newName="missionImage" defaultImageUrl={defaults.missionImage} />
          <BilingualField label="Chú thích hình" nameVi="missionImageCaptionVi" nameEn="missionImageCaptionEn" defaultValueVi={defaults.missionImageCaptionVi} defaultValueEn={defaults.missionImageCaptionEn} />
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <BilingualField label="Tiêu đề mục 'Giá trị cốt lõi'" nameVi="valuesHeadingVi" nameEn="valuesHeadingEn" defaultValueVi={defaults.valuesHeadingVi} defaultValueEn={defaults.valuesHeadingEn} />
        <div className="mt-4">
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
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <h2 className="font-serif-display text-lg text-ink">Lời hứa</h2>
        <div className="mt-4 space-y-4">
          <BilingualField label="Tiêu đề mục 'Lời hứa'" nameVi="promiseHeadingVi" nameEn="promiseHeadingEn" defaultValueVi={defaults.promiseHeadingVi} defaultValueEn={defaults.promiseHeadingEn} />
          <RepeatableFieldList
            name="promiseLines"
            label="Các dòng lời hứa"
            defaultItems={promiseLines}
            emptyItem={{ vi: "", en: "" }}
            renderFields={({ item, fieldName }) => (
              <BilingualField label="Nội dung" nameVi={fieldName("vi")} nameEn={fieldName("en")} defaultValueVi={item.vi} defaultValueEn={item.en} />
            )}
          />
          <BilingualField label="Đoạn kết" nameVi="promiseClosingVi" nameEn="promiseClosingEn" defaultValueVi={defaults.promiseClosingVi} defaultValueEn={defaults.promiseClosingEn} as="textarea" />
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <BilingualField label="Tiêu đề mục 'Các dấu mốc'" nameVi="timelineHeadingVi" nameEn="timelineHeadingEn" defaultValueVi={defaults.timelineHeadingVi} defaultValueEn={defaults.timelineHeadingEn} />
        <div className="mt-4">
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
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <BilingualField label="Tiêu đề mục 'Chứng nhận'" nameVi="certHeadingVi" nameEn="certHeadingEn" defaultValueVi={defaults.certHeadingVi} defaultValueEn={defaults.certHeadingEn} />
        <div className="mt-4 space-y-4">
          <BilingualField label="Nội dung chứng nhận" nameVi="certBodyVi" nameEn="certBodyEn" defaultValueVi={defaults.certBodyVi} defaultValueEn={defaults.certBodyEn} as="textarea" />
          <MultiImageUploadField name="certImages" label="Ảnh chứng chỉ/kiểm định (có thể thêm nhiều ảnh)" defaultImages={certImages} />
        </div>
      </div>

      <FormMessage state={state} />
      <SaveButton />
    </form>
  );
}
