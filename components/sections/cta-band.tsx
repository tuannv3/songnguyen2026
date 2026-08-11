"use client";

import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-provider";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function CtaBand() {
  const { dict } = useLanguage();

  return (
    <section className="border-t border-border bg-muted/50 py-16 md:py-20">
      <Container className="flex flex-col items-center gap-6 text-center">
        <h2 className="font-serif-display max-w-2xl text-3xl leading-tight text-ink text-balance md:text-4xl">
          {dict.home.ctaBandHeading}
        </h2>
        <p className="max-w-xl text-muted-foreground">{dict.home.ctaBandBody}</p>
        <Button href="/lien-he" size="lg">
          {dict.home.ctaBandButton}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Container>
    </section>
  );
}
