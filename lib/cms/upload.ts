import "server-only";
import { put } from "@vercel/blob";

/** Uploads an admin-provided image file to Vercel Blob and returns its public URL. */
export async function uploadImage(file: File, folder: string) {
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const pathname = `${folder}/${crypto.randomUUID()}.${extension}`;
  const blob = await put(pathname, file, {
    access: "public",
    addRandomSuffix: false,
  });
  return blob.url;
}

/** Returns the uploaded file's URL if a new file was provided, otherwise keeps the existing value. */
export async function resolveImageField(
  file: File | null,
  folder: string,
  currentValue: string | null
): Promise<string | null> {
  if (file && file.size > 0) {
    return uploadImage(file, folder);
  }
  return currentValue;
}
