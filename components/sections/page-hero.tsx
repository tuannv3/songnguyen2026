import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink py-20 md:py-28">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 10%, rgba(182,146,79,0.16), transparent 45%), linear-gradient(160deg, #0f2420 10%, #163832 100%)",
        }}
        aria-hidden="true"
      />
      <Container className="relative text-center">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent-light">
          {eyebrow}
        </p>
        <h1 className="font-serif-display mx-auto max-w-3xl text-4xl leading-tight text-white text-balance md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70">
            {description}
          </p>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
