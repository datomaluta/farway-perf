const short = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});
const long = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/** Formats an ISO date (YYYY-MM-DD) as "Nov 14, 2026", or "November 14, 2026" when long. */
export function formatDate(isoDate: string, style: "short" | "long" = "short") {
  return (style === "long" ? long : short).format(new Date(isoDate));
}
