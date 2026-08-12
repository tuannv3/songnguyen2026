"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-provider";
import { pick } from "@/lib/i18n/types";
import type { getSiteSettings } from "@/lib/cms/settings";
import { Logo } from "@/components/icons/logo";
import { Container } from "@/components/ui/container";
import { FacebookIcon, InstagramIcon, YoutubeIcon, ZaloIcon } from "@/components/icons/social";

const navItems = [
  { href: "/", key: "home" as const },
  { href: "/san-pham", key: "products" as const },
  { href: "/qua-tang-doanh-nghiep", key: "corporateGifts" as const },
  { href: "/ve-chung-toi", key: "about" as const },
  { href: "/tin-tuc", key: "news" as const },
  { href: "/tuyen-dung", key: "careers" as const },
  { href: "/lien-he", key: "contact" as const },
];

export function SiteFooter({ settings }: { settings: Awaited<ReturnType<typeof getSiteSettings>> }) {
  const { dict, locale } = useLanguage();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const socials = [
    { icon: FacebookIcon, label: "Facebook", href: settings.facebookUrl },
    { icon: InstagramIcon, label: "Instagram", href: settings.instagramUrl },
    ...(settings.youtubeUrl ? [{ icon: YoutubeIcon, label: "YouTube", href: settings.youtubeUrl }] : []),
    { icon: ZaloIcon, label: "Zalo", href: settings.zaloUrl },
  ];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  }

  return (
    <footer className="bg-ink text-white/85">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr]">
          <div>
            <Link href="/" className="text-white inline-flex" aria-label="Song Nguyên Essential Oils">
              <Logo />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              {pick(settings.footerAbout, locale)}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-accent hover:text-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif-display text-lg text-white">{dict.footer.quickLinks}</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/60 transition-colors hover:text-accent-light">
                    {dict.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif-display text-lg text-white">{dict.footer.contactHeading}</h3>
            <ul className="mt-5 space-y-3 text-sm text-white/60">
              {pick(settings.address, locale) ? (
                <li className="flex gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" aria-hidden="true" />
                  <span>{pick(settings.address, locale)}</span>
                </li>
              ) : null}
              {settings.phone ? (
                <li className="flex gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" aria-hidden="true" />
                  <span>{settings.phone}</span>
                </li>
              ) : null}
              {settings.email ? (
                <li className="flex gap-2.5">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" aria-hidden="true" />
                  <span>{settings.email}</span>
                </li>
              ) : null}
              <li className="flex gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent-light" aria-hidden="true" />
                <span>{pick(settings.workingHours, locale)}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif-display text-lg text-white">{dict.footer.newsletterHeading}</h3>
            <p className="mt-5 text-sm text-white/60">{dict.footer.newsletterText}</p>
            {submitted ? (
              <p role="status" className="mt-4 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent-light">
                {dict.common.sentSuccess}
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2.5" noValidate>
                <label htmlFor="footer-email" className="sr-only">
                  {dict.footer.newsletterPlaceholder}
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={dict.footer.newsletterPlaceholder}
                  className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-accent"
                />
                <button
                  type="submit"
                  className="w-full cursor-pointer rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-on-accent transition-colors hover:bg-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  {dict.footer.newsletterButton}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Song Nguyên Essential Oils. {dict.footer.rightsReserved}
          </p>
          <p>{dict.footer.legalNote}</p>
        </div>
      </Container>
    </footer>
  );
}
