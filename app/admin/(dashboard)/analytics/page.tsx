import { getAnalyticsSummary, getDailySeries, getMonthlySeries, getYearlySeries, getTopReferrers } from "@/lib/cms/analytics";
import { AnalyticsBarList, ReferrerBarList, formatDayLabel, formatMonthLabel } from "@/components/admin/analytics-bar-list";

export default async function AdminAnalyticsPage() {
  const [summary, daily, monthly, yearly, referrers] = await Promise.all([
    getAnalyticsSummary(),
    getDailySeries(30),
    getMonthlySeries(),
    getYearlySeries(),
    getTopReferrers(10),
  ]);

  return (
    <div>
      <h1 className="font-serif-display text-2xl text-ink">Thống kê truy cập</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Số liệu ghi nhận từ khi tính năng này được bật, tính theo giờ Việt Nam.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
          <p className="text-sm text-muted-foreground">Hôm nay</p>
          <p className="font-serif-display mt-1 text-3xl text-ink">{summary.today}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
          <p className="text-sm text-muted-foreground">Tháng này</p>
          <p className="font-serif-display mt-1 text-3xl text-ink">{summary.thisMonth}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
          <p className="text-sm text-muted-foreground">Năm nay</p>
          <p className="font-serif-display mt-1 text-3xl text-ink">{summary.thisYear}</p>
        </div>
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 shadow-soft">
          <p className="text-sm text-muted-foreground">Tổng cộng</p>
          <p className="font-serif-display mt-1 text-3xl text-ink">{summary.total}</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-serif-display text-lg text-ink">Theo ngày (30 ngày gần nhất)</h2>
          <div className="mt-4 max-h-96 overflow-y-auto pr-1">
            <AnalyticsBarList items={daily} formatLabel={formatDayLabel} emptyText="Chưa có dữ liệu." />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-serif-display text-lg text-ink">Theo tháng (năm nay)</h2>
          <div className="mt-4">
            <AnalyticsBarList items={monthly} formatLabel={formatMonthLabel} emptyText="Chưa có dữ liệu." />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-serif-display text-lg text-ink">Theo năm</h2>
          <div className="mt-4">
            <AnalyticsBarList items={yearly} emptyText="Chưa có dữ liệu." />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-serif-display text-lg text-ink">Nguồn truy cập</h2>
          <p className="mt-1 text-xs text-muted-foreground">Website hoặc nền tảng dẫn khách đến trang của bạn.</p>
          <div className="mt-4">
            <ReferrerBarList items={referrers} emptyText="Chưa có dữ liệu." />
          </div>
        </div>
      </div>
    </div>
  );
}
