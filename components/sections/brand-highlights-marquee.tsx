"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/language-provider";
import { highlights } from "@/lib/data/highlights";
import { BotanicalPattern } from "@/components/icons/botanical";

const track = [...highlights, ...highlights];

export function BrandHighlightsMarquee() {
  const { locale } = useLanguage();

  return (
    <section className="border-y border-border bg-muted/40 py-10" aria-label="Brand highlights">
      <div
        className="marquee-group relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="marquee-track animate-marquee flex w-max gap-5">
          {track.map((item, index) => (
            <div
              key={`${item.title.vi}-${index}`}
              aria-hidden={index >= highlights.length}
              className="flex w-56 shrink-0 flex-col items-center gap-3 rounded-2xl border border-border bg-card px-5 py-6 text-center shadow-soft sm:w-64"
            >
              <div
                className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full"
                style={{ backgroundColor: `${item.accentColor}1f` }}
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt=""
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <BotanicalPattern
                    className="h-11 w-11"
                    style={{ color: item.accentColor }}
                  />
                )}
              </div>
              <p className="font-serif-display text-base leading-snug text-ink">
                {item.title[locale]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
