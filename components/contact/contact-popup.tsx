"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n/language-provider";
import type { getSiteSettings } from "@/lib/cms/settings";
import { ZaloIcon, MessengerIcon } from "@/components/icons/social";

export function ContactPopup({ settings }: { settings: Awaited<ReturnType<typeof getSiteSettings>> }) {
  const { dict } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onClickOutside);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const items = [
    ...(settings.phone
      ? [
          {
            key: "phone",
            label: dict.contactPopup.phone,
            href: `tel:${settings.phone}`,
            Icon: Phone,
            external: false,
          },
        ]
      : []),
    { key: "zalo", label: dict.contactPopup.zalo, href: settings.zaloUrl, Icon: ZaloIcon, external: true },
    {
      key: "messenger",
      label: dict.contactPopup.messenger,
      href: settings.messengerUrl,
      Icon: MessengerIcon,
      external: true,
    },
  ];

  return (
    <div
      ref={containerRef}
      className={clsx(
        "fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3",
        !open && "pointer-events-none"
      )}
    >
      {items.map(({ key, label, href, Icon, external }, index) => (
        <a
          key={key}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          tabIndex={open ? 0 : -1}
          aria-hidden={!open}
          inert={!open ? true : undefined}
          className={clsx(
            "flex items-center gap-2.5",
            open ? "animate-icon-pop" : "pointer-events-none translate-y-2 scale-[0.4] opacity-0"
          )}
          style={open ? { animationDelay: `${(items.length - index) * 60}ms` } : undefined}
        >
          <span className="rounded-full bg-ink px-3 py-1.5 text-xs font-medium text-white shadow-soft">
            {label}
          </span>
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-card text-primary shadow-lift transition-transform hover:scale-105">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
        </a>
      ))}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? dict.contactPopup.close : dict.contactPopup.label}
        className={clsx(
          "pointer-events-auto inline-flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-primary text-on-primary shadow-lift transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          !open && "animate-pulse-ring"
        )}
      >
        {open ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
