import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ScoreGauge } from "@/components/case-study/score-gauge";
import { ArrowRightIcon } from "@/components/icons";
import { results, steps, type LabRun, type StepResult } from "@/content/case-study";
import { links } from "@/lib/site";
import {
  formatBytes,
  formatChange,
  formatMs,
  statusLabel,
  statusOf,
  type Status,
} from "@/lib/perf";

import filmstrip from "@/assets/case-study/filmstrip-mobile.png";

export const metadata: Metadata = {
  title: "Performance case study",
  description:
    "How a slow Next.js travel magazine went from failing Core Web Vitals to a fast, fully green PageSpeed report, one measured fix at a time.",
  alternates: { canonical: "/case-study" },
};

const byId = new Map(results.steps.map((r) => [r.id, r]));
const first = results.steps[0];
const last = results.steps[results.steps.length - 1];

const weight = (run: LabRun, type = "total") => run.resources[type]?.bytes ?? 0;
const requests = (run: LabRun) => run.resources.total?.requests ?? 0;

function StatusDot({ status }: { status: Status }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs whitespace-nowrap text-muted">
      <span
        className="size-2 rounded-full"
        style={{ background: `var(--status-${status})` }}
        aria-hidden="true"
      />
      {statusLabel[status]}
    </span>
  );
}

type MetricRow = {
  name: string;
  hint: string;
  before: number;
  after: number;
  format: (v: number) => string;
  metric?: "lcp" | "fcp" | "cls" | "inp" | "tbt" | "si";
};

const metricRows: MetricRow[] = [
  {
    name: "Largest Contentful Paint",
    hint: "When the main content (here, the cover photo) has rendered",
    before: first.mobile.metrics.lcp,
    after: last.mobile.metrics.lcp,
    format: formatMs,
    metric: "lcp",
  },
  {
    name: "Interaction to Next Paint",
    hint: "How quickly the page responds to taps and typing (lab, scripted)",
    before: first.inp.value,
    after: last.inp.value,
    format: formatMs,
    metric: "inp",
  },
  {
    name: "Cumulative Layout Shift",
    hint: "How much the page jumps around while loading (desktop, where it was worst)",
    before: first.desktop.metrics.cls,
    after: last.desktop.metrics.cls,
    format: (v) => v.toFixed(2),
    metric: "cls",
  },
  {
    name: "First Contentful Paint",
    hint: "When the first text or image appears",
    before: first.mobile.metrics.fcp,
    after: last.mobile.metrics.fcp,
    format: formatMs,
    metric: "fcp",
  },
  {
    name: "Total Blocking Time",
    hint: "How long the main thread was too busy to respond",
    before: first.mobile.metrics.tbt,
    after: last.mobile.metrics.tbt,
    format: formatMs,
    metric: "tbt",
  },
  {
    name: "Speed Index",
    hint: "How quickly the visible page fills in",
    before: first.mobile.metrics.si,
    after: last.mobile.metrics.si,
    format: formatMs,
    metric: "si",
  },
  {
    name: "Page weight",
    hint: "Everything transferred on load",
    before: weight(first.mobile),
    after: weight(last.mobile),
    format: formatBytes,
  },
  {
    name: "JavaScript",
    hint: "Compressed script bytes, first party and third party",
    before: weight(first.mobile, "script"),
    after: weight(last.mobile, "script"),
    format: formatBytes,
  },
  {
    name: "Requests",
    hint: "Network requests on load",
    before: requests(first.mobile),
    after: requests(last.mobile),
    format: (v) => String(v),
  },
];

/** What changed against the previous step, for the step cards. */
function deltas(prev: StepResult, cur: StepResult) {
  const items: { label: string; from: string; to: string }[] = [];
  const add = (label: string, a: number, b: number, fmt: (v: number) => string, min: number) => {
    // Skip changes that are within noise or that look identical once formatted.
    if (Math.abs(a - b) < min || fmt(a) === fmt(b)) return;
    items.push({ label, from: fmt(a), to: fmt(b) });
  };
  add("Mobile score", prev.mobile.score, cur.mobile.score, String, 2);
  add("LCP", prev.mobile.metrics.lcp, cur.mobile.metrics.lcp, formatMs, 150);
  add("FCP", prev.mobile.metrics.fcp, cur.mobile.metrics.fcp, formatMs, 150);
  add("TBT", prev.mobile.metrics.tbt, cur.mobile.metrics.tbt, formatMs, 40);
  add("CLS", prev.mobile.metrics.cls, cur.mobile.metrics.cls, (v) => v.toFixed(2), 0.02);
  add("INP", prev.inp.value, cur.inp.value, formatMs, 40);
  add("Page weight", weight(prev.mobile), weight(cur.mobile), formatBytes, 20 * 1024);
  add(
    "JavaScript",
    weight(prev.mobile, "script"),
    weight(cur.mobile, "script"),
    formatBytes,
    10 * 1024,
  );
  return items;
}

export default function CaseStudyPage() {
  const live = results.live;
  const lcpBefore = live ? live.before.mobile.metrics.lcp : first.mobile.metrics.lcp;
  const lcpAfter = live ? live.after.mobile.metrics.lcp : last.mobile.metrics.lcp;

  return (
    <div className="pb-8">
      <header className="container-page max-w-4xl pt-12 text-center sm:pt-16">
        <p className="kicker">Case study</p>
        <h1 className="mt-3 font-display text-4xl leading-tight font-bold text-balance sm:text-6xl">
          Making a slow Next.js site fast, one measured fix at a time
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-pretty text-muted">
          Farway started out like many sites I&apos;m asked to speed up: it looked fine, but it took{" "}
          {formatMs(lcpBefore)} to show its cover photo on a mid-range phone. Twelve focused changes
          later, the same page, with the same design and content, loads in {formatMs(lcpAfter)}.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm font-semibold">
          <a
            href={links.before}
            className="rounded-full px-5 py-2.5 ring-1 ring-line transition-colors hover:bg-surface"
          >
            Open the before version
          </a>
          <Link
            href="/"
            className="rounded-full bg-accent px-5 py-2.5 text-accent-ink transition-colors hover:bg-accent-hover"
          >
            Open the after version
          </Link>
          <a
            href={links.repo}
            className="rounded-full px-5 py-2.5 ring-1 ring-line transition-colors hover:bg-surface"
          >
            Source and commit history
          </a>
        </div>
      </header>

      {/* Headline scores */}
      <section aria-labelledby="scores-title" className="container-page mt-14 max-w-5xl">
        <h2 id="scores-title" className="sr-only">
          Lighthouse performance scores
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {(["mobile", "desktop"] as const).map((form) => {
            const before = live ? live.before[form].score : first[form].score;
            const after = live ? live.after[form].score : last[form].score;
            return (
              <div key={form} className="rounded-3xl bg-card p-6 ring-1 ring-line sm:p-8">
                <p className="text-center text-sm font-semibold tracking-wider text-muted uppercase">
                  {form === "mobile" ? "Mobile" : "Desktop"} performance
                </p>
                <div className="mt-6 flex items-center justify-center gap-4 sm:gap-8">
                  <ScoreGauge score={before} caption="Before" />
                  <ArrowRightIcon className="shrink-0 text-2xl text-muted" />
                  <ScoreGauge score={after} caption="After" />
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-center text-xs text-muted">
          {live ? (
            <>
              PageSpeed Insights on the live deployments, November 2026:{" "}
              <a href={live.before.reportUrl} className="underline hover:text-ink">
                before report
              </a>
              ,{" "}
              <a href={live.after.reportUrl} className="underline hover:text-ink">
                after report
              </a>
              .
            </>
          ) : (
            "Lighthouse lab runs, median of five."
          )}{" "}
          Details in the methodology below.
        </p>
      </section>

      {/* Before / after metrics */}
      <section aria-labelledby="metrics-title" className="container-page mt-20 max-w-5xl">
        <p className="kicker">The numbers</p>
        <h2 id="metrics-title" className="mt-1 font-display text-3xl font-bold sm:text-4xl">
          Core Web Vitals and page weight
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Lab measurements of the home page on a Moto G Power–class phone and a slow 4G connection,
          as PageSpeed Insights simulates it. CLS is from the desktop run.
        </p>
        <div className="mt-8 overflow-x-auto rounded-2xl ring-1 ring-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface text-xs tracking-wider text-muted uppercase">
              <tr>
                <th scope="col" className="px-3 py-3 font-semibold sm:px-4">
                  Metric
                </th>
                <th scope="col" className="px-3 py-3 text-right font-semibold sm:px-4">
                  Before
                </th>
                <th scope="col" className="px-3 py-3 text-right font-semibold sm:px-4">
                  After
                </th>
                <th scope="col" className="px-3 py-3 text-right font-semibold sm:px-4">
                  Change
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line bg-card">
              {metricRows.map((row) => (
                <tr key={row.name}>
                  <th scope="row" className="px-3 py-3.5 font-normal sm:px-4">
                    <span className="block font-semibold">{row.name}</span>
                    <span className="hidden text-xs text-muted sm:block">{row.hint}</span>
                  </th>
                  <td className="px-3 py-3.5 text-right align-top tabular-nums sm:px-4">
                    <span className="block">{row.format(row.before)}</span>
                    {row.metric && <StatusDot status={statusOf(row.metric, row.before)} />}
                  </td>
                  <td className="px-3 py-3.5 text-right align-top tabular-nums sm:px-4">
                    <span className="block font-semibold">{row.format(row.after)}</span>
                    {row.metric && <StatusDot status={statusOf(row.metric, row.after)} />}
                  </td>
                  <td className="px-3 py-3.5 text-right align-top font-semibold tabular-nums sm:px-4">
                    {formatChange(row.before, row.after)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Filmstrip */}
      <section aria-labelledby="filmstrip-title" className="container-page mt-20 max-w-5xl">
        <p className="kicker">Side by side</p>
        <h2 id="filmstrip-title" className="mt-1 font-display text-3xl font-bold sm:text-4xl">
          What a phone user sees
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Both versions loading on a phone-sized screen with Chrome throttled to slow 4G and a 4×
          slower CPU, recorded frame by frame on the same timeline.
        </p>
        <div className="mt-8 overflow-x-auto rounded-2xl bg-card p-3 ring-1 ring-line">
          <Image
            src={filmstrip}
            alt="Filmstrip comparison: the before version shows a blank page and a spinner for several seconds, while the after version shows the full cover story almost immediately."
            sizes="(min-width: 1024px) 1000px, 100vw"
            className="h-auto w-full min-w-[640px]"
          />
        </div>
      </section>

      {/* Score progression */}
      <section aria-labelledby="progress-title" className="container-page mt-20 max-w-5xl">
        <p className="kicker">Step by step</p>
        <h2 id="progress-title" className="mt-1 font-display text-3xl font-bold sm:text-4xl">
          Mobile score after each change
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Every change is its own commit, built and measured the same way: five Lighthouse runs,
          median kept. Hover a bar for the details.
        </p>
        <ol className="mt-8 grid gap-2.5">
          {steps.map((step, i) => {
            const r = byId.get(step.id);
            if (!r) return null;
            const status = statusOf("score", r.mobile.score);
            return (
              <li
                key={step.id}
                className="group relative grid grid-cols-[6.5rem_1fr] items-center gap-3 sm:grid-cols-[9rem_1fr]"
              >
                <span className="truncate text-sm text-muted">
                  <span className="tabular-nums">{String(i).padStart(2, "0")}</span> {step.label}
                </span>
                <span className="flex items-center gap-2">
                  <span
                    className="h-6 rounded-r-[4px] transition-opacity group-hover:opacity-80"
                    style={{
                      width: `${r.mobile.score}%`,
                      background: `var(--status-${status})`,
                    }}
                  />
                  <span className="text-sm font-semibold tabular-nums">{r.mobile.score}</span>
                </span>
                <span className="pointer-events-none absolute top-full left-28 z-10 mt-1 hidden rounded-xl bg-ink px-3 py-2 text-xs text-bg shadow-lg group-hover:block sm:left-40">
                  <span className="block font-semibold">{step.title}</span>
                  LCP {formatMs(r.mobile.metrics.lcp)} · TBT {formatMs(r.mobile.metrics.tbt)} · CLS{" "}
                  {r.mobile.metrics.cls.toFixed(2)} · {formatBytes(weight(r.mobile))}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      {/* The fixes */}
      <section aria-labelledby="fixes-title" className="container-page mt-20 max-w-3xl">
        <p className="kicker">The fixes</p>
        <h2 id="fixes-title" className="mt-1 font-display text-3xl font-bold sm:text-4xl">
          What changed, and why it mattered
        </h2>
        <ol className="mt-8 grid gap-6">
          {steps.map((step, i) => {
            const cur = byId.get(step.id);
            const prev = i > 0 ? byId.get(steps[i - 1].id) : undefined;
            const changes = cur && prev ? deltas(prev, cur) : [];
            return (
              <li key={step.id} className="rounded-3xl bg-card p-6 ring-1 ring-line sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-2xl font-bold">
                    <span className="mr-2 text-accent tabular-nums">
                      {String(i).padStart(2, "0")}
                    </span>
                    {step.title}
                  </h3>
                  <a
                    href={`${links.repo}/commit/${step.commit}`}
                    className="font-mono text-xs text-muted underline hover:text-ink"
                  >
                    {step.commit}
                  </a>
                </div>
                <p className="mt-4">
                  <span className="font-semibold">
                    {i === 0 ? "What was there. " : "Problem. "}
                  </span>
                  {step.problem}
                </p>
                <p className="mt-2 text-muted">
                  <span className="font-semibold text-ink">{i === 0 ? "Why. " : "Fix. "}</span>
                  {step.fix}
                </p>
                {changes.length > 0 && (
                  <dl className="mt-5 flex flex-wrap gap-2">
                    {changes.map((c) => (
                      <div
                        key={c.label}
                        className="rounded-full bg-surface px-3 py-1.5 text-xs tabular-nums"
                      >
                        <dt className="inline font-semibold">{c.label}</dt>{" "}
                        <dd className="inline text-muted">
                          {c.from} → <span className="text-ink">{c.to}</span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      {/* Methodology */}
      <section aria-labelledby="method-title" className="container-page mt-20 max-w-3xl">
        <p className="kicker">How it was measured</p>
        <h2 id="method-title" className="mt-1 font-display text-3xl font-bold sm:text-4xl">
          Methodology
        </h2>
        <ul className="mt-6 grid list-disc gap-3 pl-5 text-muted marker:text-accent">
          <li>
            Each step is a commit. It was built with <code>next build</code>, served with{" "}
            <code>next start</code> and measured with Lighthouse {last.lighthouseVersion}: five runs
            per form factor, the median run by score kept, a fresh Chrome profile for every run.
          </li>
          <li>
            Mobile uses Lighthouse&apos;s default emulation (Moto G Power, slow 4G, 4× CPU
            slowdown); desktop uses its desktop preset. These are the same settings PageSpeed
            Insights uses.
          </li>
          <li>
            Lighthouse can&apos;t measure INP because a page load has no interactions, so a script
            plays the reader&apos;s part on the archive (filter by region, type a search, clear it,
            load more) with a 4× CPU slowdown and reads INP with Google&apos;s web-vitals library.
            Median of five runs.
          </li>
          <li>
            {live
              ? "The headline scores are PageSpeed Insights runs against the two live deployments: the before branch and main."
              : "PageSpeed Insights numbers for the live deployments are in the README."}{" "}
            Farway has no real visitors, so there is no field (CrUX) data: every number here is lab
            data.
          </li>
          <li>
            The scripts are in the repository: <code>npm run perf:lighthouse -- &lt;url&gt;</code>{" "}
            and <code>npm run perf:inp -- &lt;url&gt;</code>.
          </li>
        </ul>
      </section>
    </div>
  );
}
