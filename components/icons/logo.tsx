type LogoMarkProps = {
  className?: string;
};

/**
 * Recreated placeholder monogram inspired by the Song Nguyên brand mark
 * (interlocking S/N in a calligraphic serif). Swap for the official logo
 * file in /public when available.
 */
export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M40.5 12c-6-2.6-13.4-1-16.7 3.6-3 4.2-1.7 8.7 4.3 11.4 4 1.8 9.4 2.4 11.4 5.7 2.3 3.8-.3 8.2-5 9.7-5.2 1.7-11.4-.2-14-4.3"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M18 47V19.5c0-1.4 1.6-2.2 2.7-1.3l20.6 16.8V17"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5 13.2l1.1 2.7 2.7 1.1-2.7 1.1-1.1 2.7-1.1-2.7-2.7-1.1 2.7-1.1 1.1-2.7z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Logo({
  className,
  markClassName,
  variant = "full",
}: {
  className?: string;
  markClassName?: string;
  variant?: "full" | "mark";
}) {
  if (variant === "mark") {
    return <LogoMark className={markClassName ?? "h-9 w-9"} />;
  }

  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <LogoMark className={markClassName ?? "h-9 w-9 shrink-0"} />
      <span className="flex flex-col leading-none">
        <span className="font-serif-display text-lg tracking-[0.2em] uppercase">
          Song Nguyên
        </span>
        <span className="text-[0.6rem] tracking-[0.35em] uppercase text-current/70 opacity-70">
          Essential Oils
        </span>
      </span>
    </span>
  );
}
