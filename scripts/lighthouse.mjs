#!/usr/bin/env node
/**
 * Runs Lighthouse several times against one URL and keeps the median run.
 *
 *   node scripts/lighthouse.mjs <url> [--form mobile|desktop] [--runs 5] [--label name] [--out dir]
 *
 * Writes <out>/<label>-<form>.json (summary of the median run plus every run's score)
 * and <out>/<label>-<form>.report.json (the full Lighthouse result of the median run).
 * Mobile uses Lighthouse's default config (Moto G Power, simulated slow 4G, 4x CPU),
 * desktop uses its desktop preset. Both are the same settings PageSpeed Insights uses.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";

import * as chromeLauncher from "chrome-launcher";
import lighthouse, { desktopConfig } from "lighthouse";

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    form: { type: "string", default: "mobile" },
    runs: { type: "string", default: "5" },
    label: { type: "string", default: "run" },
    out: { type: "string", default: "perf/results" },
  },
});

const url = positionals[0];
if (!url) {
  console.error("Usage: node scripts/lighthouse.mjs <url> [--form mobile|desktop] [--runs 5]");
  process.exit(1);
}

const runs = Number(values.runs);
const config = values.form === "desktop" ? desktopConfig : undefined;
const chromePath = process.env.CHROME_PATH;

const results = [];
for (let i = 0; i < runs; i++) {
  // A fresh Chrome per run, so nothing is cached between runs.
  const chrome = await chromeLauncher.launch({
    chromePath,
    chromeFlags: ["--headless=new", "--no-first-run", "--disable-extensions"],
  });
  try {
    const result = await lighthouse(
      url,
      { port: chrome.port, output: "json", logLevel: "error", onlyCategories: ["performance"] },
      config,
    );
    const lhr = result.lhr;
    if (lhr.runtimeError) throw new Error(lhr.runtimeError.message);
    results.push(lhr);
    console.log(
      `${values.label} ${values.form} run ${i + 1}/${runs}: ${Math.round(lhr.categories.performance.score * 100)}`,
    );
  } finally {
    await chrome.kill();
  }
}

// Median run by performance score, the way PageSpeed Insights and Lighthouse CI pick one.
const sorted = [...results].sort(
  (a, b) => a.categories.performance.score - b.categories.performance.score,
);
const median = sorted[Math.floor(sorted.length / 2)];

const audit = (id) => median.audits[id];
const ms = (id) => Math.round(audit(id).numericValue);
const resources = Object.fromEntries(
  audit("resource-summary").details.items.map((item) => [
    item.resourceType,
    { requests: item.requestCount, bytes: item.transferSize },
  ]),
);

const summary = {
  url,
  label: values.label,
  form: values.form,
  lighthouseVersion: median.lighthouseVersion,
  fetchTime: median.fetchTime,
  runs: results.map((r) => Math.round(r.categories.performance.score * 100)),
  score: Math.round(median.categories.performance.score * 100),
  metrics: {
    fcp: ms("first-contentful-paint"),
    lcp: ms("largest-contentful-paint"),
    tbt: ms("total-blocking-time"),
    cls: Number(audit("cumulative-layout-shift").numericValue.toFixed(3)),
    si: ms("speed-index"),
  },
  resources,
};

await fs.mkdir(values.out, { recursive: true });
const base = path.join(values.out, `${values.label}-${values.form}`);
await fs.writeFile(`${base}.json`, JSON.stringify(summary, null, 2) + "\n");
await fs.writeFile(`${base}.report.json`, JSON.stringify(median));
console.log(JSON.stringify({ score: summary.score, ...summary.metrics }));
