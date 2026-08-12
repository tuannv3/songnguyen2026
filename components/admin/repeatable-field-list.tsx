"use client";

import { useState, type ReactNode } from "react";
import { Plus, Trash2 } from "lucide-react";

export function RepeatableFieldList<T extends Record<string, string>>({
  name,
  label,
  defaultItems,
  emptyItem,
  renderFields,
}: {
  name: string;
  label: string;
  defaultItems: T[];
  emptyItem: T;
  renderFields: (props: { index: number; item: T; fieldName: (key: keyof T & string) => string }) => ReactNode;
}) {
  const [items, setItems] = useState<T[]>(defaultItems.length > 0 ? defaultItems : [emptyItem]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="block text-sm font-medium text-ink">{label}</span>
        <button
          type="button"
          onClick={() => setItems((prev) => [...prev, emptyItem])}
          className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          Thêm dòng
        </button>
      </div>
      <div className="mt-3 space-y-4">
        {items.map((item, index) => (
          <div key={index} className="relative rounded-xl border border-border p-4">
            {items.length > 1 ? (
              <button
                type="button"
                onClick={() => setItems((prev) => prev.filter((_, i) => i !== index))}
                aria-label="Xoá dòng"
                className="absolute right-3 top-3 cursor-pointer text-muted-foreground transition-colors hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : null}
            <div className="pr-8">{renderFields({ index, item, fieldName: (key) => `${name}.${index}.${key}` })}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
