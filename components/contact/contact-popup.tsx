"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n/language-provider";
import { ZaloIcon, MessengerIcon } from "@/components/icons/social";

const CONTACT_LINKS = {
  phone: "tel:+84900000000",
  zalo: "https://zalo.me/0900000000",
  messenger: "https://m.me/songnguyenessentialoils",
};

export function ContactPopup() {
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
    { key: "phone", label: dict.contactPopup.phone, href: CONTACT_LINKS.phone, Icon: Phone, external: false },
    { key: "zalo", label: dict.contactPopup.zalo, href: CONTACT_LINKS.zalo, Icon: ZaloIcon, external: true },
    {
      key: "messenger",
      label: dict.contactPopup.messenger,
      href: CONTACT_LINKS.messenger,
      Icon: MessengerIcon,
      external: true,
    },
  ];

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
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
            "flex items-center gap-2.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
          )}
          style={{ transitionDelay: open ? `${(items.length - index) * 50}ms` : "0ms" }}
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
        className="inline-flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-primary text-on-primary shadow-lift transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
