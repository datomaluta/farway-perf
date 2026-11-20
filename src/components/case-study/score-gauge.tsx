import { statusLabel, statusOf } from "@/lib/perf";

const R = 42;
const CIRCUMFERENCE = 2 * Math.PI * R;

/** A Lighthouse-style score ring, colored by the score's band and labelled in words. */
export function ScoreGauge({ score, caption }: { score: number; caption: string }) {
  const status = statusOf("score", score);
  return (
    <figure className="flex flex-col items-center gap-2 text-center">
      <div className="relative size-28 sm:size-32">
        <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden="true">
          <circle cx="50" cy="50" r={R} fill="none" strokeWidth="8" className="stroke-line" />
          <circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${(score / 100) * CIRCUMFERENCE} ${CIRCUMFERENCE}`}
            style={{ stroke: `var(--status-${status})` }}
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center font-display text-4xl font-bold tabular-nums sm:text-5xl">
          {score}
        </span>
      </div>
      <figcaption className="text-sm">
        <span className="font-semibold">{caption}</span>
        <span className="block text-xs text-muted">{statusLabel[status]}</span>
      </figcaption>
    </figure>
  );
}
