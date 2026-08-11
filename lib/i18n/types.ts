export type Locale = "vi" | "en";

export type Bilingual = {
  vi: string;
  en: string;
};

export function pick(value: Bilingual, locale: Locale): string {
  return value[locale];
}
