import type { SeriesPoint, ReferrerStat } from "@/lib/cms/analytics";

function formatDayLabel(label: string): string {
  const [, m, d] = label.split("-");
  return `${d}/${m}`;
}

function formatMonthLabel(label: string): string {
  const [y, m] = label.split("-");
  return `Th${Number(m)}/${y.slice(2)}`;
}

export function AnalyticsBarList({
  items,
  formatLabel,
  emptyText,
}: {
  items: { label: string; count: number }[];
  formatLabel?: (label: string) => string;
  emptyText: string;
}) {
  const max = Math.max(1, ...items.map((i) => i.count));

  if (items.every((i) => i.count === 0)) {
    return <p className="text-sm text-muted-foreground">{emptyText}</p>;
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-3 text-sm">
          <span className="w-16 shrink-0 text-xs text-muted-foreground">
            {formatLabel ? formatLabel(item.label) : item.label}
          </span>
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${(item.count / max) * 100}%` }}
            />
          </div>
          <span className="w-10 shrink-0 text-right text-xs font-medium text-ink">{item.count}</span>
        </div>
      ))}
    </div>
  );
}

export function ReferrerBarList({ items, emptyText }: { items: ReferrerStat[]; emptyText: string }) {
  const max = Math.max(1, ...items.map((i) => i.count));

  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">{emptyText}</p>;
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.source} className="flex items-center gap-3 text-sm">
          <span className="w-40 shrink-0 truncate text-ink" title={item.source}>
            {item.source}
          </span>
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-accent"
              style={{ width: `${(item.count / max) * 100}%` }}
            />
          </div>
          <span className="w-10 shrink-0 text-right text-xs font-medium text-ink">{item.count}</span>
        </div>
      ))}
    </div>
  );
}

export { formatDayLabel, formatMonthLabel };
