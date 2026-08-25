"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "@/lib/cart/cart-provider";
import { useLanguage } from "@/lib/i18n/language-provider";
import { pick } from "@/lib/i18n/types";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/sections/page-hero";
import { createOrder } from "@/lib/cms/actions/orders";

export function CheckoutContent() {
  const { lines, totalPrice, clear } = useCart();
  const { dict, locale } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setStatus("sending");

    const result = await createOrder({
      customerName: String(formData.get("name") ?? ""),
      customerPhone: String(formData.get("phone") ?? ""),
      customerEmail: String(formData.get("email") ?? ""),
      customerNote: String(formData.get("note") ?? ""),
      items: lines.map((line) => ({
        slug: line.product.slug,
        name: pick(line.product.name, locale),
        quantity: line.quantity,
        priceFrom: line.product.priceFrom,
      })),
    });

    if (result.ok) {
      setStatus("sent");
      clear();
    } else {
      setStatus("error");
      setErrorMessage(result.message);
    }
  }

  if (status === "sent") {
    return (
      <section className="py-24">
        <Container className="mx-auto flex max-w-lg flex-col items-center gap-4 text-center">
          <CheckCircle2 className="h-12 w-12 text-primary" aria-hidden="true" />
          <h1 className="font-serif-display text-2xl text-ink">{dict.checkout.successHeading}</h1>
          <p className="text-sm text-muted-foreground">{dict.checkout.successBody}</p>
          <Link
            href="/san-pham"
            className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-on-primary transition-colors hover:bg-primary-dark"
          >
            {dict.cart.browseProducts}
          </Link>
        </Container>
      </section>
    );
  }

  if (lines.length === 0) {
    return (
      <section className="py-24">
        <Container className="mx-auto flex max-w-lg flex-col items-center gap-4 text-center">
          <p className="text-ink">{dict.cart.empty}</p>
          <Link
            href="/san-pham"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-on-primary transition-colors hover:bg-primary-dark"
          >
            {dict.cart.browseProducts}
          </Link>
        </Container>
      </section>
    );
  }

  return (
    <>
      <PageHero eyebrow={dict.checkout.eyebrow} title={dict.checkout.heading} description={dict.checkout.subheading} />

      <section className="py-16 md:py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="font-serif-display text-lg text-ink">{dict.checkout.orderSummary}</h2>
            <ul className="mt-4 space-y-3">
              {lines.map((line) => (
                <li
                  key={line.product.slug}
                  className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-4 text-sm"
                >
                  <div>
                    <p className="font-medium text-ink">{pick(line.product.name, locale)}</p>
                    <p className="text-muted-foreground">
                      {dict.cart.quantity}: {line.quantity}
                    </p>
                  </div>
                  <p className="shrink-0 font-medium text-primary">
                    {(line.product.priceFrom * line.quantity).toLocaleString("vi-VN")}₫
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="text-sm font-medium text-ink">{dict.cart.subtotal}</span>
              <span className="font-serif-display text-xl text-primary">{totalPrice.toLocaleString("vi-VN")}₫</span>
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">{dict.cart.subtotalNote}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="checkout-name" className="text-sm font-medium text-ink">
                {dict.common.name} <span className="text-destructive">*</span>
              </label>
              <input
                id="checkout-name"
                name="name"
                type="text"
                required
                className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="checkout-phone" className="text-sm font-medium text-ink">
                {dict.common.phone} <span className="text-destructive">*</span>
              </label>
              <input
                id="checkout-phone"
                name="phone"
                type="tel"
                required
                className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="checkout-email" className="text-sm font-medium text-ink">
                {dict.common.email}
              </label>
              <input
                id="checkout-email"
                name="email"
                type="email"
                className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="checkout-note" className="text-sm font-medium text-ink">
                {dict.checkout.noteLabel}
              </label>
              <textarea
                id="checkout-note"
                name="note"
                rows={4}
                className="resize-none rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary"
              />
            </div>

            {status === "error" ? <p className="text-sm text-destructive">{errorMessage}</p> : null}

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-on-primary transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60"
            >
              {status === "sending" ? dict.common.sending : dict.checkout.submitButton}
            </button>
          </form>
        </Container>
      </section>
    </>
  );
}
