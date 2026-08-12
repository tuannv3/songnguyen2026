"use client";

import { useActionState } from "react";
import { AdminInput } from "@/components/admin/admin-input";
import { BilingualField } from "@/components/admin/bilingual-field";
import { FormMessage } from "@/components/admin/form-message";
import { SaveButton } from "@/components/admin/save-button";
import { updateSiteSettings } from "@/lib/cms/actions/settings";

type Defaults = {
  footerAboutVi: string;
  footerAboutEn: string;
  addressVi: string;
  addressEn: string;
  phone: string;
  email: string;
  workingHoursVi: string;
  workingHoursEn: string;
  zaloUrl: string;
  messengerUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string | null;
};

export function SiteSettingsForm({ defaults }: { defaults: Defaults }) {
  const [state, formAction] = useActionState(updateSiteSettings, null);

  return (
    <form action={formAction} className="space-y-6">
      <BilingualField label="Giới thiệu ngắn ở footer" nameVi="footerAboutVi" nameEn="footerAboutEn" defaultValueVi={defaults.footerAboutVi} defaultValueEn={defaults.footerAboutEn} as="textarea" />
      <BilingualField label="Địa chỉ" nameVi="addressVi" nameEn="addressEn" defaultValueVi={defaults.addressVi} defaultValueEn={defaults.addressEn} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-ink">
            Số điện thoại / hotline
          </label>
          <AdminInput id="phone" name="phone" defaultValue={defaults.phone} placeholder="+84900000000" className="mt-2" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink">
            Email liên hệ
          </label>
          <AdminInput id="email" name="email" type="email" defaultValue={defaults.email} placeholder="lienhe@songnguyen.vn" className="mt-2" />
        </div>
      </div>

      <BilingualField label="Giờ làm việc" nameVi="workingHoursVi" nameEn="workingHoursEn" defaultValueVi={defaults.workingHoursVi} defaultValueEn={defaults.workingHoursEn} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="zaloUrl" className="block text-sm font-medium text-ink">
            Link Zalo
          </label>
          <AdminInput id="zaloUrl" name="zaloUrl" type="url" defaultValue={defaults.zaloUrl} className="mt-2" />
        </div>
        <div>
          <label htmlFor="messengerUrl" className="block text-sm font-medium text-ink">
            Link Messenger
          </label>
          <AdminInput id="messengerUrl" name="messengerUrl" type="url" defaultValue={defaults.messengerUrl} className="mt-2" />
        </div>
        <div>
          <label htmlFor="facebookUrl" className="block text-sm font-medium text-ink">
            Link Facebook
          </label>
          <AdminInput id="facebookUrl" name="facebookUrl" type="url" defaultValue={defaults.facebookUrl} className="mt-2" />
        </div>
        <div>
          <label htmlFor="instagramUrl" className="block text-sm font-medium text-ink">
            Link Instagram
          </label>
          <AdminInput id="instagramUrl" name="instagramUrl" type="url" defaultValue={defaults.instagramUrl} className="mt-2" />
        </div>
        <div>
          <label htmlFor="youtubeUrl" className="block text-sm font-medium text-ink">
            Link YouTube (không bắt buộc)
          </label>
          <AdminInput id="youtubeUrl" name="youtubeUrl" type="url" defaultValue={defaults.youtubeUrl ?? ""} className="mt-2" />
        </div>
      </div>

      <FormMessage state={state} />
      <SaveButton />
    </form>
  );
}
