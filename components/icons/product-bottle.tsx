type ProductBottleProps = {
  color: string;
  className?: string;
  variant?: "dropper" | "diffuser";
};

export function ProductBottle({ color, className, variant = "dropper" }: ProductBottleProps) {
  if (variant === "diffuser") {
    return (
      <svg viewBox="0 0 200 240" className={className} xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="222" rx="52" ry="8" fill="black" opacity="0.06" />
        <path d="M56 150c0-34 16-58 44-58s44 24 44 58v40a16 16 0 0 1-16 16H72a16 16 0 0 1-16-16v-40z" fill={color} opacity="0.16" />
        <path d="M64 150c0-30 14-50 36-50s36 20 36 50v36a12 12 0 0 1-12 12H76a12 12 0 0 1-12-12v-36z" fill={color} opacity="0.9" />
        <rect x="70" y="86" width="60" height="18" rx="4" fill={color} />
        <rect x="86" y="66" width="28" height="24" rx="3" fill={color} opacity="0.9" />
        <g opacity="0.85">
          <path d="M100 60c-2-10-10-16-10-16" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M100 56c3-9 12-13 12-13" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M100 52c-1-8 4-15 4-15" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>
        <rect x="76" y="168" width="48" height="4" rx="2" fill="white" opacity="0.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 240" className={className} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="222" rx="46" ry="8" fill="black" opacity="0.06" />
      <path
        d="M78 44h44v26c14 8 22 22 22 44v78a20 20 0 0 1-20 20H76a20 20 0 0 1-20-20v-78c0-22 8-36 22-44V44z"
        fill={color}
        opacity="0.92"
      />
      <path
        d="M78 44h44v26c14 8 22 22 22 44v6H56v-6c0-22 8-36 22-44V44z"
        fill={color}
      />
      <rect x="72" y="18" width="56" height="30" rx="6" fill="currentColor" className="text-ink" opacity="0.88" />
      <rect x="86" y="8" width="28" height="16" rx="3" fill="currentColor" className="text-ink" />
      <rect x="66" y="128" width="68" height="46" rx="4" fill="white" opacity="0.9" />
      <rect x="74" y="140" width="52" height="3" rx="1.5" fill={color} opacity="0.55" />
      <rect x="74" y="149" width="40" height="3" rx="1.5" fill={color} opacity="0.4" />
      <rect x="74" y="158" width="44" height="3" rx="1.5" fill={color} opacity="0.4" />
    </svg>
  );
}
