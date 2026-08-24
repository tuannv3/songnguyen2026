"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";

export function ParagraphImageField({
  existingName,
  newName,
  defaultImageUrl,
}: {
  existingName: string;
  newName: string;
  defaultImageUrl?: string | null;
}) {
  const [preview, setPreview] = useState<string | null>(defaultImageUrl ?? null);
  const [existingValue, setExistingValue] = useState(defaultImageUrl ?? "");

  return (
    <div>
      <label className="block text-xs font-medium text-muted-foreground">
        Hình minh hoạ cho đoạn văn này (tuỳ chọn)
      </label>
      <input type="hidden" name={existingName} value={existingValue} />
      <div className="mt-2 flex items-center gap-3">
        {preview ? (
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border">
            <Image
              src={preview}
              alt=""
              fill
              className="object-cover"
              unoptimized={preview.startsWith("blob:")}
            />
            <button
              type="button"
              onClick={() => {
                setPreview(null);
                setExistingValue("");
              }}
              aria-label="Xoá hình"
              className="absolute right-0.5 top-0.5 cursor-pointer rounded-full bg-black/60 p-0.5 text-white transition-colors hover:bg-black/80"
            >
              <X className="h-3 w-3" aria-hidden="true" />
            </button>
          </div>
        ) : (
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border border-dashed border-border text-muted-foreground">
            <ImagePlus className="h-5 w-5" aria-hidden="true" />
          </div>
        )}
        <label className="cursor-pointer rounded-full border border-border px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:bg-muted">
          Chọn ảnh
          <input
            type="file"
            name={newName}
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              const selected = event.target.files?.[0];
              if (selected) setPreview(URL.createObjectURL(selected));
            }}
          />
        </label>
      </div>
    </div>
  );
}
