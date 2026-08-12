"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Languages, ShoppingBag } from "lucide-react";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n/language-provider";
import { useCart } from "@/lib/cart/cart-provider";
import { Logo } from "@/components/icons/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const navItems = [
  { href: "/", key: "home" as const },
  { href: "/san-pham", key: "products" as const },
  { href: "/qua-tang-doanh-nghiep", key: "corporateGifts" as const },
  { href: "/ve-chung-toi", key: "about" as const },
  { href: "/tin-tuc", key: "news" as const },
  { href: "/tuyen-dung", key: "careers" as const },
  { href: "/lien-he", key: "contact" as const },
];

export function SiteHeader() {
  const { dict, locale, toggleLocale } = useLanguage();
  const { totalCount, open: openCart } = useCart();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        scrolled || mobileOpen
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-soft"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Link
          href="/"
          className="text-ink shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          aria-label="Song Nguyên Essential Oils"
        >
          <Logo />
        </Link>

        <nav className="hidden items-center xl:flex" aria-label="Primary">
          {navItems.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "whitespace-nowrap rounded-full px-3 py-2 text-[0.83rem] font-medium tracking-wide transition-colors",
                  active
                    ? "text-primary"
                    : "text-ink/75 hover:text-primary hover:bg-primary/5"
                )}
                aria-current={active ? "page" : undefined}
              >
                {dict.nav[item.key]}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <button
            type="button"
            onClick={toggleLocale}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-semibold tracking-wide text-ink/75 transition-colors hover:border-primary hover:text-primary cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Switch language"
          >
            <Languages className="h-3.5 w-3.5" aria-hidden="true" />
            {locale === "vi" ? "VI" : "EN"}
          </button>
          <button
            type="button"
            onClick={openCart}
            aria-label={dict.cart.openCart}
            className="relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-ink/75 transition-colors hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            {totalCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[0.65rem] font-semibold text-on-accent">
                {totalCount}
              </span>
            ) : null}
          </button>
          <Button href="/lien-he" size="sm">
            {dict.nav.cta}
          </Button>
        </div>

        <div className="flex items-center gap-1 xl:hidden">
          <button
            type="button"
            onClick={openCart}
            aria-label={dict.cart.openCart}
            className="relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-ink transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            {totalCount > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[0.65rem] font-semibold text-on-accent">
                {totalCount}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2 text-ink cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? dict.common.close : "Menu"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      <div
        id="mobile-nav"
        className={clsx(
          "overflow-hidden bg-background xl:hidden transition-[max-height] duration-300 ease-out",
          mobileOpen ? "max-h-[32rem] border-b border-border" : "max-h-0"
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {navItems.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  "rounded-xl px-4 py-3 text-base font-medium",
                  active ? "bg-primary/10 text-primary" : "text-ink/80"
                )}
              >
                {dict.nav[item.key]}
              </Link>
            );
          })}
          <div className="mt-2 flex items-center gap-3 px-4">
            <button
              type="button"
              onClick={toggleLocale}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-semibold tracking-wide text-ink/75 cursor-pointer"
            >
              <Languages className="h-3.5 w-3.5" aria-hidden="true" />
              {locale === "vi" ? "VI" : "EN"}
            </button>
            <Button href="/lien-he" size="sm" className="flex-1" onClick={() => setMobileOpen(false)}>
              {dict.nav.cta}
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
