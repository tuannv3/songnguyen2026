import { prisma } from "@/lib/db/client";

const TZ = "Asia/Ho_Chi_Minh";
const SITE_HOSTS = new Set(["tinhdausongnguyen.com", "www.tinhdausongnguyen.com", "localhost"]);

export type SeriesPoint = { label: string; count: number };
export type ReferrerStat = { source: string; count: number };

/** Today's date as YYYY-MM-DD in Vietnam time, with no external date library. */
function todayVN(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date());
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(`${dateStr}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function addMonths(monthStr: string, months: number): string {
  const [y, m] = monthStr.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1 + months, 1));
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

export async function getAnalyticsSummary() {
  const [total, todayRows, monthRows, yearRows] = await Promise.all([
    prisma.pageView.count(),
    prisma.$queryRaw<{ count: bigint }[]>`
      SELECT count(*) AS count FROM "PageView"
      WHERE "createdAt" >= (date_trunc('day', now() AT TIME ZONE ${TZ}) AT TIME ZONE ${TZ})
    `,
    prisma.$queryRaw<{ count: bigint }[]>`
      SELECT count(*) AS count FROM "PageView"
      WHERE "createdAt" >= (date_trunc('month', now() AT TIME ZONE ${TZ}) AT TIME ZONE ${TZ})
    `,
    prisma.$queryRaw<{ count: bigint }[]>`
      SELECT count(*) AS count FROM "PageView"
      WHERE "createdAt" >= (date_trunc('year', now() AT TIME ZONE ${TZ}) AT TIME ZONE ${TZ})
    `,
  ]);

  return {
    total,
    today: Number(todayRows[0]?.count ?? 0),
    thisMonth: Number(monthRows[0]?.count ?? 0),
    thisYear: Number(yearRows[0]?.count ?? 0),
  };
}

export async function getDailySeries(days = 30): Promise<SeriesPoint[]> {
  const rows = await prisma.$queryRaw<{ label: string; count: bigint }[]>`
    SELECT to_char(date_trunc('day', "createdAt" AT TIME ZONE ${TZ}), 'YYYY-MM-DD') AS label,
           count(*)::int AS count
    FROM "PageView"
    WHERE "createdAt" >= ((date_trunc('day', now() AT TIME ZONE ${TZ}) - make_interval(days => ${days - 1})) AT TIME ZONE ${TZ})
    GROUP BY label
    ORDER BY label ASC
  `;
  const counts = new Map(rows.map((r) => [r.label, Number(r.count)]));

  const today = todayVN();
  const start = addDays(today, -(days - 1));
  const points: SeriesPoint[] = [];
  let cursor = start;
  for (let i = 0; i < days; i++) {
    points.push({ label: cursor, count: counts.get(cursor) ?? 0 });
    cursor = addDays(cursor, 1);
  }
  return points;
}

export async function getMonthlySeries(): Promise<SeriesPoint[]> {
  const rows = await prisma.$queryRaw<{ label: string; count: bigint }[]>`
    SELECT to_char(date_trunc('month', "createdAt" AT TIME ZONE ${TZ}), 'YYYY-MM') AS label,
           count(*)::int AS count
    FROM "PageView"
    WHERE "createdAt" >= (date_trunc('year', now() AT TIME ZONE ${TZ}) AT TIME ZONE ${TZ})
    GROUP BY label
    ORDER BY label ASC
  `;
  const counts = new Map(rows.map((r) => [r.label, Number(r.count)]));

  const currentMonth = todayVN().slice(0, 7);
  const yearStart = `${currentMonth.slice(0, 4)}-01`;
  const points: SeriesPoint[] = [];
  let cursor = yearStart;
  while (cursor <= currentMonth) {
    points.push({ label: cursor, count: counts.get(cursor) ?? 0 });
    cursor = addMonths(cursor, 1);
  }
  return points;
}

export async function getYearlySeries(): Promise<SeriesPoint[]> {
  const rows = await prisma.$queryRaw<{ label: string; count: bigint }[]>`
    SELECT to_char(date_trunc('year', "createdAt" AT TIME ZONE ${TZ}), 'YYYY') AS label,
           count(*)::int AS count
    FROM "PageView"
    GROUP BY label
    ORDER BY label ASC
  `;
  return rows.map((r) => ({ label: r.label, count: Number(r.count) }));
}

export async function getTopReferrers(limit = 10): Promise<ReferrerStat[]> {
  const rows = await prisma.pageView.groupBy({
    by: ["referrer"],
    _count: { referrer: true },
  });

  const totals = new Map<string, number>();
  for (const row of rows) {
    const count = row._count.referrer;
    const raw = row.referrer.trim();
    let source: string;
    if (!raw) {
      source = "Trực tiếp / Không xác định";
    } else {
      try {
        const hostname = new URL(raw).hostname.replace(/^www\./, "");
        source = SITE_HOSTS.has(hostname) ? "Điều hướng nội bộ" : hostname;
      } catch {
        source = "Trực tiếp / Không xác định";
      }
    }
    totals.set(source, (totals.get(source) ?? 0) + count);
  }

  return Array.from(totals.entries())
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}
