import type { CSSProperties } from "react";

export function BotanicalPattern({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5">
        <path d="M200 360C120 320 90 250 110 180C125 128 170 90 200 40" />
        <path d="M200 40C230 90 275 128 290 180C310 250 280 320 200 360" />
        <path d="M200 40C200 130 200 260 200 360" />
        {Array.from({ length: 7 }).map((_, i) => {
          const y = 70 + i * 38;
          const w = 60 - i * 4;
          return (
            <g key={i}>
              <path d={`M200 ${y} C ${200 - w} ${y + 10}, ${200 - w + 10} ${y + 30}, 200 ${y + 34}`} />
              <path d={`M200 ${y} C ${200 + w} ${y + 10}, ${200 + w - 10} ${y + 30}, 200 ${y + 34}`} />
            </g>
          );
        })}
      </g>
      <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="0.75" opacity="0.2" fill="none" />
    </svg>
  );
}

export function BlobShape({ className, color }: { className?: string; color: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        fill={color}
        d="M45.3,-58.5C57.9,-49.8,66.4,-34.5,70.3,-18.1C74.2,-1.6,73.5,16,66.1,29.9C58.7,43.8,44.6,53.9,29.5,61.2C14.4,68.5,-1.7,73,-17.6,70.4C-33.5,67.8,-49.2,58.1,-59.4,44.3C-69.6,30.5,-74.3,12.6,-72.8,-4.5C-71.3,-21.6,-63.6,-38,-51.2,-47C-38.8,-56,-19.4,-57.6,-1.2,-56.2C17,-54.8,32.7,-67.2,45.3,-58.5Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}
