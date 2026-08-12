"use client";

import { useActionState } from "react";
import { AdminInput } from "@/components/admin/admin-input";
import { AdminSelect } from "@/components/admin/admin-select";
import { BilingualField } from "@/components/admin/bilingual-field";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { RepeatableFieldList } from "@/components/admin/repeatable-field-list";
import { FormMessage } from "@/components/admin/form-message";
import { SaveButton } from "@/components/admin/save-button";
import type { ActionState } from "@/lib/cms/actions/types";

type ProductDefaults = {
  slug: string;
  nameVi: string;
  nameEn: string;
  category: string;
  badge: string | null;
  priceFrom: number;
  volume: string;
  bottleColor: string;
  bottleVariant: string | null;
  shopeeUrl: string | null;
  accentColor: string;
  shortDescriptionVi: string;
  shortDescriptionEn: string;
  descriptionVi: string;
  descriptionEn: string;
  benefits: unknown;
  howToUseVi: string;
  howToUseEn: string;
  ingredientsVi: string;
  ingredientsEn: string;
  originVi: string;
  originEn: string;
  extractionVi: string;
  extractionEn: string;
  cautionVi: string;
  cautionEn: string;
  image: string | null;
};

const emptyDefaults: ProductDefaults = {
  slug: "",
  nameVi: "",
  nameEn: "",
  category: "single",
  badge: "",
  priceFrom: 0,
  volume: "",
  bottleColor: "#2F6F65",
  bottleVariant: "",
  shopeeUrl: "",
  accentColor: "#DCE7DE",
  shortDescriptionVi: "",
  shortDescriptionEn: "",
  descriptionVi: "",
  descriptionEn: "",
  benefits: [],
  howToUseVi: "",
  howToUseEn: "",
  ingredientsVi: "",
  ingredientsEn: "",
  originVi: "",
  originEn: "",
  extractionVi: "",
  extractionEn: "",
  cautionVi: "",
  cautionEn: "",
  image: null,
};

export function ProductForm({
  action,
  defaults = emptyDefaults,
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  defaults?: ProductDefaults;
}) {
  const [state, formAction] = useActionState(action, null);
  const benefits = (defaults.benefits as { vi: string; en: string }[] | null) ?? [];

  return (
    <form action={formAction} className="space-y-6">
      <ImageUploadField name="image" label="Ảnh sản phẩm" defaultImageUrl={defaults.image} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-ink">
            Slug (đường dẫn URL)
          </label>
          <AdminInput id="slug" name="slug" defaultValue={defaults.slug} placeholder="tinh-dau-sa-chanh" className="mt-2" required />
        </div>
        <div>
          <label htmlFor="priceFrom" className="block text-sm font-medium text-ink">
            Giá từ (VNĐ)
          </label>
          <AdminInput id="priceFrom" name="priceFrom" type="number" min={0} defaultValue={defaults.priceFrom} className="mt-2" required />
        </div>
      </div>

      <BilingualField label="Tên sản phẩm" nameVi="nameVi" nameEn="nameEn" defaultValueVi={defaults.nameVi} defaultValueEn={defaults.nameEn} required />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-ink">
            Danh mục
          </label>
          <AdminSelect id="category" name="category" defaultValue={defaults.category} className="mt-2">
            <option value="single">Tinh dầu đơn</option>
            <option value="blend">Tinh dầu phối hương</option>
            <option value="gift">Bộ quà tặng doanh nghiệp</option>
            <option value="accessory">Phụ kiện khuếch tán</option>
            <option value="car">Treo xe & khuếch tán</option>
          </AdminSelect>
        </div>
        <div>
          <label htmlFor="badge" className="block text-sm font-medium text-ink">
            Nhãn nổi bật
          </label>
          <AdminSelect id="badge" name="badge" defaultValue={defaults.badge ?? ""} className="mt-2">
            <option value="">Không có</option>
            <option value="bestseller">Bán chạy</option>
            <option value="new">Mới</option>
            <option value="featured">Nổi bật</option>
          </AdminSelect>
        </div>
        <div>
          <label htmlFor="bottleVariant" className="block text-sm font-medium text-ink">
            Kiểu minh hoạ (khi chưa có ảnh)
          </label>
          <AdminSelect id="bottleVariant" name="bottleVariant" defaultValue={defaults.bottleVariant ?? ""} className="mt-2">
            <option value="">Mặc định</option>
            <option value="dropper">Chai nhỏ giọt</option>
            <option value="diffuser">Máy khuếch tán</option>
            <option value="car">Treo xe</option>
          </AdminSelect>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="volume" className="block text-sm font-medium text-ink">
            Dung tích
          </label>
          <AdminInput id="volume" name="volume" defaultValue={defaults.volume} placeholder="10ml / 30ml" className="mt-2" required />
        </div>
        <div>
          <label htmlFor="shopeeUrl" className="block text-sm font-medium text-ink">
            Link Shopee (không bắt buộc)
          </label>
          <AdminInput id="shopeeUrl" name="shopeeUrl" type="url" defaultValue={defaults.shopeeUrl ?? ""} placeholder="https://shopee.vn/..." className="mt-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="bottleColor" className="block text-sm font-medium text-ink">
            Màu chai (khi chưa có ảnh)
          </label>
          <AdminInput id="bottleColor" name="bottleColor" defaultValue={defaults.bottleColor} placeholder="#2F6F65" className="mt-2" />
        </div>
        <div>
          <label htmlFor="accentColor" className="block text-sm font-medium text-ink">
            Màu nền thẻ sản phẩm
          </label>
          <AdminInput id="accentColor" name="accentColor" defaultValue={defaults.accentColor} placeholder="#DCE7DE" className="mt-2" />
        </div>
      </div>

      <BilingualField label="Mô tả ngắn" nameVi="shortDescriptionVi" nameEn="shortDescriptionEn" defaultValueVi={defaults.shortDescriptionVi} defaultValueEn={defaults.shortDescriptionEn} as="textarea" required />
      <BilingualField label="Mô tả chi tiết" nameVi="descriptionVi" nameEn="descriptionEn" defaultValueVi={defaults.descriptionVi} defaultValueEn={defaults.descriptionEn} as="textarea" required />

      <RepeatableFieldList
        name="benefits"
        label="Công dụng chính"
        defaultItems={benefits}
        emptyItem={{ vi: "", en: "" }}
        renderFields={({ item, fieldName }) => (
          <BilingualField label="Công dụng" nameVi={fieldName("vi")} nameEn={fieldName("en")} defaultValueVi={item.vi} defaultValueEn={item.en} />
        )}
      />

      <BilingualField label="Hướng dẫn sử dụng" nameVi="howToUseVi" nameEn="howToUseEn" defaultValueVi={defaults.howToUseVi} defaultValueEn={defaults.howToUseEn} as="textarea" />
      <BilingualField label="Thành phần" nameVi="ingredientsVi" nameEn="ingredientsEn" defaultValueVi={defaults.ingredientsVi} defaultValueEn={defaults.ingredientsEn} as="textarea" />
      <BilingualField label="Xuất xứ nguyên liệu" nameVi="originVi" nameEn="originEn" defaultValueVi={defaults.originVi} defaultValueEn={defaults.originEn} />
      <BilingualField label="Phương pháp chưng cất" nameVi="extractionVi" nameEn="extractionEn" defaultValueVi={defaults.extractionVi} defaultValueEn={defaults.extractionEn} />
      <BilingualField label="Lưu ý" nameVi="cautionVi" nameEn="cautionEn" defaultValueVi={defaults.cautionVi} defaultValueEn={defaults.cautionEn} as="textarea" />

      <FormMessage state={state} />
      <SaveButton />
    </form>
  );
}
