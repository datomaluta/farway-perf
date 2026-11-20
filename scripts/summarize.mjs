#!/usr/bin/env node
/**
 * Merges the per-step measurement files in perf/results into perf/summary.json,
 * which the /case-study page reads at build time.
 *
 *   node scripts/summarize.mjs [resultsDir] [summaryFile]
 *
 * Expects, for every step id: <id>-mobile.json, <id>-desktop.json and <id>-inp.json
 * (written by scripts/lighthouse.mjs and scripts/inp.mjs with --label <id>).
 * Live PageSpeed Insights numbers are kept from the existing summary if present.
 */
import fs from "node:fs/promises";
import path from "node:path";

const dir = process.argv[2] ?? "perf/results";
const outFile = process.argv[3] ?? "perf/summary.json";

const files = await fs.readdir(dir);
const ids = [
  ...new Set(files.filter((f) => f.endsWith("-mobile.json")).map((f) => f.slice(0, -12))),
].sort();

const read = async (file) => JSON.parse(await fs.readFile(path.join(dir, file), "utf8"));
const lab = ({ score, runs, metrics, resources }) => ({ score, runs, metrics, resources });

const steps = [];
for (const id of ids) {
  const mobile = await read(`${id}-mobile.json`);
  const desktop = await read(`${id}-desktop.json`);
  const inp = await read(`${id}-inp.json`);
  steps.push({
    id,
    mobile: lab(mobile),
    desktop: lab(desktop),
    inp: { value: inp.inp, runs: inp.runs, attribution: inp.attribution },
    lighthouseVersion: mobile.lighthouseVersion,
    measuredAt: mobile.fetchTime,
  });
}

let live = null;
try {
  live = JSON.parse(await fs.readFile(outFile, "utf8")).live ?? null;
} catch {}

await fs.writeFile(outFile, JSON.stringify({ steps, live }, null, 2) + "\n");
console.log(`Wrote ${steps.length} steps to ${outFile}`);
