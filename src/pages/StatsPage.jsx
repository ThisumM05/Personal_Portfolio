import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

const GOATCOUNTER_CODE = "thisumm05";
const DASHBOARD_URL = `https://${GOATCOUNTER_CODE}.goatcounter.com`;

// ─── local visit tracking (stats-page views by you) ────────────────────────
function recordTodayVisit() {
  const key = "gc_stats_daily";
  const today = new Date().toISOString().slice(0, 10);
  const data = JSON.parse(localStorage.getItem(key) || "{}");
  data[today] = (data[today] || 0) + 1;
  const trimmed = Object.fromEntries(
    Object.keys(data)
      .sort()
      .slice(-14)
      .map((d) => [d, data[d]]),
  );
  localStorage.setItem(key, JSON.stringify(trimmed));
}

function getDailyVisits() {
  const data = JSON.parse(localStorage.getItem("gc_stats_daily") || "{}");
  return Object.entries(data)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date: date.slice(5), views: count }));
}

// Parse GoatCounter count strings like "1,234" → 1234
function parseCount(str) {
  if (str == null) return null;
  const n = parseInt(String(str).replace(/,/g, ""), 10);
  return isNaN(n) ? null : n;
}

const tooltipStyle = {
  contentStyle: {
    background: "#0f172a",
    border: "1px solid #334155",
    borderRadius: 8,
    fontSize: 12,
    color: "#e2e8f0",
  },
  cursor: { fill: "rgba(99,102,241,0.10)" },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.45 },
  }),
};

function StatCard({ label, value, sub, index }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-7 backdrop-blur flex flex-col gap-2"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
        {label}
      </p>
      <p className="text-5xl font-bold tracking-tight text-white leading-none">
        {value === "…" ? (
          <span className="text-2xl text-slate-500 animate-pulse">
            Loading…
          </span>
        ) : value != null ? (
          typeof value === "number" ? (
            value.toLocaleString()
          ) : (
            value
          )
        ) : (
          <span className="text-2xl text-slate-600">—</span>
        )}
      </p>
      {sub && <p className="text-xs text-slate-500">{sub}</p>}
    </motion.div>
  );
}

function ChartCard({ title, sub, index, children }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6 backdrop-blur"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
        {title}
      </p>
      {sub && <p className="text-[11px] text-slate-600 mt-0.5 mb-4">{sub}</p>}
      {children}
    </motion.div>
  );
}

export default function StatsPage() {
  const [gcData, setGcData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    recordTodayVisit();
    setDailyData(getDailyVisits());

    // TOTAL = GoatCounter aggregate key across all paths
    fetch(`https://${GOATCOUNTER_CODE}.goatcounter.com/counter/TOTAL.json`)
      .then((res) => {
        if (!res.ok) throw new Error("non-ok");
        return res.json();
      })
      .then((data) => {
        setGcData(data);
        setLoading(false);
      })
      .catch(() => {
        setApiError(true);
        setLoading(false);
      });
  }, []);

  const totalViews = loading ? "…" : parseCount(gcData?.count);
  const uniqueVisitors = loading ? "…" : parseCount(gcData?.count_unique);
  const totalChecks = dailyData.reduce((s, d) => s + d.views, 0) || null;

  const monthlyData = (() => {
    const data = JSON.parse(localStorage.getItem("gc_stats_daily") || "{}");
    const months = {};
    Object.entries(data).forEach(([date, count]) => {
      const m = date.slice(0, 7);
      months[m] = (months[m] || 0) + count;
    });
    return Object.entries(months)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([m, v]) => ({ month: m.slice(5), views: v }));
  })();

  const noGcData = apiError || (!loading && gcData == null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← Back to Portfolio
            </Link>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Stats
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-14 flex flex-col gap-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400 mb-2">
            Analytics
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Portfolio Stats
          </h1>
          <p className="mt-1.5 text-sm text-slate-400">
            Powered by GoatCounter · Privacy-friendly · No cookies
          </p>
        </motion.div>

        {/* Warning when GoatCounter data unavailable */}
        {noGcData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-sm text-amber-300"
          >
            <p className="font-semibold">GoatCounter data unavailable</p>
            <p className="text-xs text-amber-400/70 mt-1">
              Go to GoatCounter → Settings → enable{" "}
              <strong>Public stats</strong> → Save. Then refresh this page.
            </p>
          </motion.div>
        )}

        {/* Stat Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            label="Total Page Views"
            value={totalViews}
            sub="All visits since tracking started"
            index={0}
          />
          <StatCard
            label="Unique Visitors"
            value={uniqueVisitors}
            sub="Individual people"
            index={1}
          />
          <StatCard
            label="Times You Checked Stats"
            value={totalChecks}
            sub="Tracked locally in this browser"
            index={2}
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Daily bar — how often you check stats */}
          <ChartCard
            title="Your Daily Stats Checks"
            sub="Last 14 days · stored in your browser only"
            index={3}
          >
            {dailyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={dailyData} barSize={14}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1e293b"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10, fill: "#64748b" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 10, fill: "#64748b" }}
                    axisLine={false}
                    tickLine={false}
                    width={20}
                  />
                  <Tooltip {...tooltipStyle} />
                  <Bar dataKey="views" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Empty text="Visit this page daily to build up a chart." />
            )}
          </ChartCard>

          {/* Monthly line chart */}
          <ChartCard
            title="Monthly Trend"
            sub="Grouped from your daily local history"
            index={4}
          >
            {monthlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={monthlyData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1e293b"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 10, fill: "#64748b" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 10, fill: "#64748b" }}
                    axisLine={false}
                    tickLine={false}
                    width={20}
                  />
                  <Tooltip {...tooltipStyle} />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#34d399"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#34d399" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <Empty text="Not enough history yet — check back over multiple days." />
            )}
          </ChartCard>
        </div>

        {/* Dashboard CTA */}
        <motion.div
          custom={5}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 px-6 py-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-sm font-semibold text-slate-100">
              Full breakdown on GoatCounter
            </p>
            <ul className="mt-1.5 text-xs text-slate-400 flex flex-wrap gap-x-4 gap-y-0.5">
              <li>· Referrers (GitHub · CV · direct)</li>
              <li>· Browsers &amp; devices</li>
              <li>· Countries</li>
              <li>· Daily visit graph</li>
            </ul>
          </div>
          <a
            href={DASHBOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full border border-indigo-400/60 bg-indigo-500/20 px-6 py-2.5 text-xs font-semibold text-indigo-100 transition hover:bg-indigo-500/40 text-center"
          >
            Open Dashboard →
          </a>
        </motion.div>
      </main>
    </div>
  );
}

function Empty({ text }) {
  return (
    <div className="flex h-[200px] items-center justify-center text-xs text-slate-600 text-center px-6">
      {text}
    </div>
  );
}
