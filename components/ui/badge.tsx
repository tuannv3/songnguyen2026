import { clsx } from "clsx";
import type { ReactNode } from "react";

export function Badge({
  children,
  tone = "accent",
  className,
}: {
  children: ReactNode;
  tone?: "accent" | "primary" | "neutral";
  className?: string;
}) {
  const toneClasses = {
    accent: "bg-accent/15 text-accent-light border-accent/30",
    primary: "bg-primary/10 text-primary border-primary/25",
    neutral: "bg-muted text-muted-foreground border-border",
  } as const;

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.2em]",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
