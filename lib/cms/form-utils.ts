/** Reads a required text field, trimmed. */
export function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

/** Reads an optional text field; returns undefined instead of an empty string. */
export function optStr(formData: FormData, key: string): string | undefined {
  const value = str(formData, key);
  return value.length > 0 ? value : undefined;
}

export function num(formData: FormData, key: string): number {
  return Number(formData.get(key) ?? 0);
}

export function file(formData: FormData, key: string): File | null {
  const value = formData.get(key);
  return value instanceof File && value.size > 0 ? value : null;
}

/**
 * Parses fields submitted by RepeatableFieldList, named `${name}.${index}.${key}`,
 * back into an ordered array of row objects.
 */
export function parseRepeatableField<T extends string>(
  formData: FormData,
  name: string,
  keys: readonly T[]
): Record<T, string>[] {
  const prefix = `${name}.`;
  const indices = new Set<number>();
  for (const key of formData.keys()) {
    if (!key.startsWith(prefix)) continue;
    const rest = key.slice(prefix.length);
    const dotIndex = rest.indexOf(".");
    if (dotIndex === -1) continue;
    const index = Number(rest.slice(0, dotIndex));
    if (!Number.isNaN(index)) indices.add(index);
  }
  return Array.from(indices)
    .sort((a, b) => a - b)
    .map((index) => {
      const row = {} as Record<T, string>;
      for (const key of keys) {
        row[key] = String(formData.get(`${name}.${index}.${key}`) ?? "").trim();
      }
      return row;
    });
}
