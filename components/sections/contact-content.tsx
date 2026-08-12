"use client";

import { MapPin, Phone, Mail, Clock, MapPinned } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-provider";
import { pick } from "@/lib/i18n/types";
import type { getSiteSettings } from "@/lib/cms/settings";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { InquiryForm } from "@/components/sections/inquiry-form";
import { FacebookIcon, InstagramIcon, YoutubeIcon, ZaloIcon } from "@/components/icons/social";

export function ContactContent({ settings }: { settings: Awaited<ReturnType<typeof getSiteSettings>> }) {
  const { dict, locale } = useLanguage();

  const socials = [
    { icon: FacebookIcon, label: "Facebook", href: settings.facebookUrl },
    { icon: InstagramIcon, label: "Instagram", href: settings.instagramUrl },
    ...(settings.youtubeUrl ? [{ icon: YoutubeIcon, label: "YouTube", href: settings.youtubeUrl }] : []),
    { icon: ZaloIcon, label: "Zalo", href: settings.zaloUrl },
  ];

  const info = [
    ...(pick(settings.address, locale)
      ? [{ icon: MapPin, label: dict.footer.addressLabel, value: pick(settings.address, locale) }]
      : []),
    ...(settings.phone ? [{ icon: Phone, label: dict.footer.hotlineLabel, value: settings.phone }] : []),
    ...(settings.email ? [{ icon: Mail, label: dict.footer.emailLabel, value: settings.email }] : []),
    { icon: Clock, label: dict.footer.workingHours, value: pick(settings.workingHours, locale) },
  ];

  return (
    <>
      <PageHero
        eyebrow={dict.contact.eyebrow}
        title={dict.contact.heading}
        description={dict.contact.subheading}
      />

      <section className="py-16 md:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="font-serif-display text-2xl text-ink">{dict.contact.infoHeading}</h2>
            <ul className="mt-6 space-y-5">
              {info.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex gap-3.5">
                  <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {label}
                    </p>
                    <p className="mt-0.5 text-sm text-ink">{value}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink/60 transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>

            <div className="mt-8 flex aspect-video items-center justify-center rounded-2xl border border-dashed border-border bg-muted/60 text-center">
              <div className="flex flex-col items-center gap-2 px-6 text-muted-foreground">
                <MapPinned className="h-6 w-6" aria-hidden="true" />
                <p className="text-xs leading-relaxed">{dict.contact.mapNote}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-10">
            <h2 className="font-serif-display text-2xl text-ink">{dict.contact.formHeading}</h2>
            <div className="mt-6">
              <InquiryForm showSubject />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
