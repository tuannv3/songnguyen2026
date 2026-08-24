"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";

export function MultiImageUploadField({
  name,
  label,
  defaultImages,
}: {
  name: string;
  label: string;
  defaultImages: string[];
}) {
  const [kept, setKept] = useState<string[]>(defaultImages);
  const [previews, setPreviews] = useState<string[]>([]);

  return (
    <div>
      <label className="block text-sm font-medium text-ink">{label}</label>
      <div className="mt-2 flex flex-wrap gap-3">
        {kept.map((url) => (
          <div key={url} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
            <input type="hidden" name={`${name}Existing`} value={url} />
            <Image src={url} alt="" fill className="object-cover" />
            <button
              type="button"
              onClick={() => setKept((prev) => prev.filter((item) => item !== url))}
              aria-label="Xoá ảnh"
              className="absolute right-1 top-1 inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-ink/70 text-white hover:bg-destructive"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        ))}
        {previews.map((src, index) => (
          <div key={index} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
            <Image src={src} alt="" fill className="object-cover" unoptimized />
          </div>
        ))}
        <label className="flex h-24 w-24 shrink-0 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
          <ImagePlus className="h-5 w-5" aria-hidden="true" />
          <span className="text-xs">Thêm ảnh</span>
          <input
            type="file"
            name={`${name}New`}
            accept="image/*"
            multiple
            className="hidden"
            onChange={(event) => {
              const files = Array.from(event.target.files ?? []);
              setPreviews(files.map((file) => URL.createObjectURL(file)));
            }}
          />
        </label>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Bấm dấu × để xoá ảnh cũ. Có thể chọn nhiều ảnh cùng lúc để thêm mới.
      </p>
    </div>
  );
}
