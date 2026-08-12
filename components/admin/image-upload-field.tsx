"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus } from "lucide-react";

export function ImageUploadField({
  name,
  label,
  defaultImageUrl,
}: {
  name: string;
  label: string;
  defaultImageUrl?: string | null;
}) {
  const [preview, setPreview] = useState<string | null>(defaultImageUrl ?? null);

  return (
    <div>
      <label className="block text-sm font-medium text-ink">{label}</label>
      <div className="mt-2 flex items-center gap-4">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted">
          {preview ? (
            <Image
              src={preview}
              alt=""
              width={96}
              height={96}
              className="h-full w-full object-cover"
              unoptimized={preview.startsWith("blob:")}
            />
          ) : (
            <ImagePlus className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
          )}
        </div>
        <label className="cursor-pointer rounded-full border border-border px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-muted">
          Chọn ảnh
          <input
            type="file"
            name={name}
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) setPreview(URL.createObjectURL(file));
            }}
          />
        </label>
      </div>
    </div>
  );
}
