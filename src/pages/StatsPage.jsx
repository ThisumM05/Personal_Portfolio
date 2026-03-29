import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const GOATCOUNTER_CODE = "thisumm05";
const DASHBOARD_URL = `https://${GOATCOUNTER_CODE}.goatcounter.com`;

// Track daily visits in localStorage so we can chart them over time
function recordTodayVisit() {
  const key = "portfolio_daily_visits";
  const today = new Date().toISOString().slice(0, 10); // "2026-03-29"
  const raw = localStorage.getItem(key);
  const data = raw ? JSON.parse(raw) : {};
  data[today] = (data[today] || 0) + 1;
  // Keep only the last 14 days
  const sorted = Object.keys(data).sort().slice(-14);
  const trimmed = Object.fromEntries(sorted.map((d) => [d, data[d]]));
  localStorage.setItem(key, JSON.stringify(trimmed));
}

function getDailyVisits() {
  const raw = localStorage.getItem("portfolio_daily_visits");
  if (!raw) return [];
  const data = JSON.parse(raw);
  return Object.entries(data)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({
      date: date.slice(5), // "03-29"
      visits: count,
    }));
}

const COLORS = ["#6366f1", "#34d399"];

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
      className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-7 backdrop-blur"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
        {label}
      </p>
      <p className="mt-3 text-5xl font-bold tracking-tight text-white">
        {value ?? <span className="text-2xl text-slate-500">—</span>}
      </p>
      {sub && <p className="mt-1 text-xs text-slate-500">{sub}</p>}
    </motion.div>
  );
}

export default function StatsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    recordTodayVisit();
    setDailyData(getDailyVisits());

    fetch(`https://${GOATCOUNTER_CODE}.goatcounter.com/counter//.json`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalViews = stats?.count ?? null;
  const uniqueVisitors = stats?.count_unique ?? null;

  const returningRaw =
    stats
      ? Math.max(
          0,
          parseInt((stats.count ?? "0").replace(/,/g, ""), 10) -
            parseInt((stats.count_unique ?? "0").replace(/,/g, ""), 10)
        )
      : 0;

  const pieData =
    stats
      ? [
          { name: "Unique visitors", value: parseInt((stats.count_unique ?? "0").replace(/,/g, ""), 10) },
          { name: "Returning views", value: returningRaw },
        ]
      : [];

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

      <main className="mx-auto max-w-5xl px-6 py-14 flex flex-col gap-12">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400 mb-2">
            Analytics
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Portfolio Stats
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Powered by GoatCounter · Privacy-friendly · No cookies
          </p>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          <StatCard
            label="Total Page Views"
            value={loading ? "…" : totalViews}
            sub="All visits since tracking started"
            index={0}
          />
          <StatCard
            label="Unique Visitors"
            value={loading ? "…" : uniqueVisitors}
            sub="Individual people"
            index={1}
          />
        </div>

        {/* Charts row */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Pie chart — unique vs returning */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6 backdrop-blur"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-5">
              Unique vs Returning
            </p>
            {pieData.length > 0 && pieData.some((d) => d.value > 0) ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: 11, color: "#94a3b8" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <NoDataNote loading={loading} />
            )}
          </motion.div>

          {/* Bar chart — your daily visits (local) */}
          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6 backdrop-blur"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
              Your Stats Page Visits
            </p>
            <p className="text-[11px] text-slate-500 mb-4">
              Tracked locally · last 14 days
            </p>
            {dailyData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={dailyData} barSize={16}>
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
                    width={24}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="visits" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <NoDataNote loading={false} message="No local history yet — visit this page daily to build a chart." />
            )}
          </motion.div>
        </div>

        {/* Dashboard CTA */}
        <motion.div
          custom={4}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 px-6 py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-sm font-semibold text-slate-100">
              Full breakdown on GoatCounter
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Referrers (GitHub · CV · direct) · Browsers · Countries · Daily graph
            </p>
          </div>
          <a
            href={DASHBOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full border border-indigo-400/60 bg-indigo-500/20 px-6 py-2.5 text-xs font-semibold text-indigo-100 transition hover:bg-indigo-500/40"
          >
            Open Dashboard →
          </a>
        </motion.div>

        {/* Note when no data */}
        {!loading && !stats && (
          <p className="text-xs text-amber-400/80 -mt-6">
            No GoatCounter data yet — make sure <strong>Public stats</strong> is enabled in GoatCounter Settings, or wait for your first visitor.
          </p>
        )}

      </main>
    </div>
  );
}

function NoDataNote({ loading, message }) {
  return (
    <div className="flex h-[220px] items-center justify-center text-xs text-slate-500 text-center px-4">
      {loading ? "Loading…" : (message ?? "No data yet. Enable Public Stats in GoatCounter settings.")}
    </div>
  );
}
