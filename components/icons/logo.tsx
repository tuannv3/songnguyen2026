import Image from "next/image";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={`relative block shrink-0 overflow-hidden rounded-lg ${className ?? "h-9 w-9"}`}>
      <Image src="/brand/logo.jpg" alt="" fill sizes="48px" className="object-cover" priority />
    </span>
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
