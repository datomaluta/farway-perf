export type Status = "good" | "average" | "poor";

/** Thresholds from web.dev and Lighthouse's scoring docs. */
const limits = {
  score: [90, 50],
  lcp: [2500, 4000],
  fcp: [1800, 3000],
  cls: [0.1, 0.25],
  inp: [200, 500],
  tbt: [200, 600],
  si: [3400, 5800],
} as const;

export function statusOf(metric: keyof typeof limits, value: number): Status {
  const [good, poor] = limits[metric];
  if (metric === "score") return value >= good ? "good" : value >= poor ? "average" : "poor";
  return value <= good ? "good" : value <= poor ? "average" : "poor";
}

export const statusLabel: Record<Status, string> = {
  good: "Good",
  average: "Needs work",
  poor: "Poor",
};

export function formatMs(ms: number) {
  return ms < 1000 ? `${Math.round(ms)} ms` : `${(ms / 1000).toFixed(1)} s`;
}

export function formatBytes(bytes: number) {
  if (bytes < 1000 * 1000) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** "−82%" style change between two values, with a real minus sign. */
export function formatChange(before: number, after: number) {
  if (before === 0) return after === 0 ? "0%" : "new";
  const pct = Math.round(((after - before) / before) * 100);
  return pct === 0 ? "0%" : `${pct > 0 ? "+" : "−"}${Math.abs(pct)}%`;
}
