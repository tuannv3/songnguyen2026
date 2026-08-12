import type { ReactNode } from "react";
import { CartProvider } from "@/lib/cart/cart-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { ContactPopup } from "@/components/contact/contact-popup";
import { getSiteSettings } from "@/lib/cms/settings";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <CartProvider>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter settings={settings} />
      <CartDrawer />
      <ContactPopup settings={settings} />
    </CartProvider>
  );
}
