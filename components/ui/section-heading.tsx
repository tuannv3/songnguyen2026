import { clsx } from "clsx";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <p
          className={clsx(
            "mb-3 text-xs font-medium uppercase tracking-[0.3em]",
            tone === "dark" ? "text-accent-light" : "text-accent"
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={clsx(
          "font-serif-display text-3xl leading-tight md:text-4xl text-balance",
          tone === "dark" ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={clsx(
            "mt-4 text-base leading-relaxed",
            tone === "dark" ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
