import { useEffect, useState } from "react";
// Navigate to this section via /#stats
import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const GOATCOUNTER_CODE = "thisumm05";
const DASHBOARD_URL = `https://${GOATCOUNTER_CODE}.goatcounter.com`;

export function Stats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://${GOATCOUNTER_CODE}.goatcounter.com/counter//.json`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <motion.section
      id="stats"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <SectionHeader
        eyebrow="Analytics"
        title="Portfolio Stats"
        kicker="Live visitor data — only visible to you via /#stats"
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {/* Total Visits */}
        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Total Page Views
          </p>
          <p className="mt-3 text-5xl font-bold tracking-tight text-white">
            {loading ? (
              <span className="text-slate-500 text-2xl">Loading…</span>
            ) : stats?.count ? (
              stats.count
            ) : (
              <span className="text-slate-500 text-2xl">—</span>
            )}
          </p>
          <p className="mt-1 text-xs text-slate-500">Since tracking started</p>
        </div>

        {/* Unique Visitors */}
        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Unique Visitors
          </p>
          <p className="mt-3 text-5xl font-bold tracking-tight text-white">
            {loading ? (
              <span className="text-slate-500 text-2xl">Loading…</span>
            ) : stats?.count_unique ? (
              stats.count_unique
            ) : (
              <span className="text-slate-500 text-2xl">—</span>
            )}
          </p>
          <p className="mt-1 text-xs text-slate-500">Individual people</p>
        </div>
      </div>

      {/* Note about public stats */}
      {!stats && !loading && (
        <p className="mt-4 text-xs text-amber-400/80">
          No data yet — make sure <strong>Public stats</strong> is enabled in
          your GoatCounter settings, or visit your portfolio a few times first.
        </p>
      )}

      {/* Link to full dashboard */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-indigo-500/20 bg-indigo-500/5 px-5 py-4">
        <div>
          <p className="text-sm font-medium text-slate-200">
            Full breakdown available on GoatCounter
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            Referrers (GitHub vs CV vs direct), browsers, countries, daily graph
          </p>
        </div>
        <a
          href={DASHBOARD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full border border-indigo-400/60 bg-indigo-500/20 px-5 py-2 text-xs font-semibold text-indigo-100 transition hover:bg-indigo-500/40"
        >
          Open Dashboard →
        </a>
      </div>

      <p className="mt-4 text-[11px] text-slate-600 text-center">
        Powered by GoatCounter · Privacy-friendly analytics · No cookies
      </p>
    </motion.section>
  );
}
