"use client";

import Link from "next/link";
import { useEffect } from "react";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart/cart-provider";
import { useLanguage } from "@/lib/i18n/language-provider";
import { pick } from "@/lib/i18n/types";
import { ProductBottle } from "@/components/icons/product-bottle";

export function CartDrawer() {
  const { lines, isOpen, close, removeItem, setQuantity, totalPrice } = useCart();
  const { dict, locale } = useLanguage();

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[70] bg-ink/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={dict.cart.title}
        inert={!isOpen ? true : undefined}
        className={`fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-card shadow-lift transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="font-serif-display text-xl text-ink">{dict.cart.title}</h2>
          <button
            type="button"
            onClick={close}
            aria-label={dict.cart.closeCart}
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <ShoppingBag className="h-7 w-7" aria-hidden="true" />
            </span>
            <div>
              <p className="font-medium text-ink">{dict.cart.empty}</p>
              <p className="mt-1 text-sm text-muted-foreground">{dict.cart.emptyHint}</p>
            </div>
            <Link
              href="/san-pham"
              onClick={close}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-on-primary transition-colors hover:bg-primary-dark"
            >
              {dict.cart.browseProducts}
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6 py-4">
              {lines.map(({ product, quantity }) => (
                <li key={product.slug} className="flex gap-4 border-b border-border py-4 last:border-b-0">
                  <div
                    className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: product.accentColor }}
                  >
                    <ProductBottle
                      color={product.bottleColor}
                      variant={product.bottleVariant ?? "dropper"}
                      className="h-14 w-auto"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <Link
                      href={`/san-pham/${product.slug}`}
                      onClick={close}
                      className="text-sm font-medium text-ink hover:text-primary"
                    >
                      {pick(product.name, locale)}
                    </Link>
                    <p className="mt-0.5 text-sm text-primary">
                      {product.priceFrom.toLocaleString("vi-VN")}₫
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1 rounded-full border border-border">
                        <button
                          type="button"
                          onClick={() => setQuantity(product.slug, quantity - 1)}
                          aria-label={dict.cart.decreaseQuantity}
                          className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-ink/70 transition-colors hover:bg-muted"
                        >
                          <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                        <span className="w-6 text-center text-sm text-ink" aria-label={dict.cart.quantity}>
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(product.slug, quantity + 1)}
                          aria-label={dict.cart.increaseQuantity}
                          className="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-ink/70 transition-colors hover:bg-muted"
                        >
                          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(product.slug)}
                        aria-label={dict.cart.remove}
                        className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-ink">{dict.cart.subtotal}</span>
                <span className="font-serif-display text-xl text-primary">
                  {totalPrice.toLocaleString("vi-VN")}₫
                </span>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">{dict.cart.subtotalNote}</p>
              <Link
                href="/lien-he"
                onClick={close}
                className="mt-4 flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-on-primary transition-colors hover:bg-primary-dark"
              >
                {dict.cart.checkout}
              </Link>
              <button
                type="button"
                onClick={close}
                className="mt-2.5 w-full cursor-pointer text-center text-sm text-ink/70 transition-colors hover:text-primary"
              >
                {dict.cart.continueShopping}
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
