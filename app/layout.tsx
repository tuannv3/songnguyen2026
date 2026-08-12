import type { Metadata } from "next";
import { Cormorant_Garamond, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/language-provider";
import { CartProvider } from "@/lib/cart/cart-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { ContactPopup } from "@/components/contact/contact-popup";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const bodyFont = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Song Nguyên Essential Oils | Tinh dầu cao cấp thiên nhiên",
    template: "%s | Song Nguyên Essential Oils",
  },
  description:
    "Song Nguyên Essential Oils — nhà sản xuất và cung cấp tinh dầu thiên nhiên cao cấp, chiết xuất nguyên chất, đồng hành cùng sức khỏe và sự thư thái của bạn.",
  keywords: [
    "tinh dầu",
    "tinh dầu thiên nhiên",
    "tinh dầu cao cấp",
    "Song Nguyên",
    "essential oils",
    "quà tặng doanh nghiệp",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${cormorant.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LanguageProvider>
          <CartProvider>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
            <CartDrawer />
            <ContactPopup />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
