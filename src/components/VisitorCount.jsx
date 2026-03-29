import { useEffect, useState } from "react";

// Replace YOUR_CODE with your GoatCounter site code (e.g. "thanuja")
const GOATCOUNTER_CODE = "thisumm05";

export function VisitorCount() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    if (GOATCOUNTER_CODE === "YOUR_CODE") return; // not configured yet

    fetch(`https://${GOATCOUNTER_CODE}.goatcounter.com/counter//.json`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.count) setCount(data.count);
      })
      .catch(() => {}); // silently fail — don't break the portfolio
  }, []);

  if (!count) return null;

  return (
    <span className="flex items-center gap-1.5">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
      {count} visits
    </span>
  );
}
