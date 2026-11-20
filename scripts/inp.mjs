#!/usr/bin/env node
/**
 * Lab measurement of Interaction to Next Paint (INP) on the home page archive.
 *
 *   node scripts/inp.mjs <url> [--runs 5] [--label name] [--out dir]
 *
 * Lighthouse's navigation run can't measure INP, because nobody clicks anything.
 * This script plays the same interactions a reader would (filter by region, type
 * a search, clear it, load more) on a mobile viewport with a 4x CPU slowdown, and
 * reads INP with Google's web-vitals library. It keeps the median of all runs.
 * A Chrome window opens for each run.
 */
import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { parseArgs } from "node:util";

import * as chromeLauncher from "chrome-launcher";
import puppeteer from "puppeteer-core";

const require = createRequire(import.meta.url);
// The IIFE build isn't in the package's exports map, so find it next to the CJS build.
const webVitalsPath = path.join(
  path.dirname(require.resolve("web-vitals/attribution")),
  "web-vitals.attribution.iife.js",
);

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    runs: { type: "string", default: "5" },
    label: { type: "string", default: "run" },
    out: { type: "string", default: "perf/results" },
  },
});

const url = positionals[0];
if (!url) {
  console.error("Usage: node scripts/inp.mjs <url> [--runs 5]");
  process.exit(1);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const executablePath = process.env.CHROME_PATH ?? chromeLauncher.Launcher.getInstallations()[0];

async function measure() {
  // Headed on purpose: headless Chrome reports late presentation times when the page is
  // otherwise idle, which inflates INP by several hundred milliseconds.
  const browser = await puppeteer.launch({
    executablePath,
    headless: false,
    args: ["--window-size=500,950"],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 412, height: 823, deviceScaleFactor: 1.75, isMobile: true });
    await page.emulateCPUThrottling(4);
    await page.evaluateOnNewDocument(await fs.readFile(webVitalsPath, "utf8"));
    await page.evaluateOnNewDocument(() => {
      window.__inp = null;
      addEventListener("DOMContentLoaded", () => {
        window.webVitals.onINP(
          (metric) => {
            window.__inp = {
              value: metric.value,
              target: metric.attribution.interactionTarget,
              type: metric.attribution.interactionType,
              inputDelay: metric.attribution.inputDelay,
              processing: metric.attribution.processingDuration,
              presentation: metric.attribution.presentationDelay,
            };
          },
          { reportAllChanges: true },
        );
      });
    });

    await page.goto(url, { waitUntil: "load", timeout: 120000 });
    const search = await page.waitForSelector("#stories input[type=search]", { timeout: 60000 });
    await search.scrollIntoView();
    await sleep(1500);

    const clickChip = async (label) => {
      const chips = await page.$$("#stories [aria-label='Filter by region'] button");
      for (const chip of chips) {
        const text = await chip.evaluate((el) => el.textContent ?? "");
        if (text.trim().startsWith(label)) {
          await chip.click();
          await sleep(700);
          return;
        }
      }
      throw new Error(`No chip ${label}`);
    };

    await clickChip("Coast");
    await clickChip("Mountains");
    await clickChip("All");
    await search.click();
    await page.keyboard.type("lisbon", { delay: 150 });
    await sleep(700);
    for (let i = 0; i < "lisbon".length; i++) {
      await page.keyboard.press("Backspace");
      await sleep(150);
    }
    await sleep(700);
    const more = await page.$("#stories ul + div button");
    if (more) {
      await more.click();
      await sleep(700);
    }

    // web-vitals reports INP when the page is hidden.
    await page.evaluate(() => {
      Object.defineProperty(document, "visibilityState", { value: "hidden", configurable: true });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    await sleep(300);
    return await page.evaluate(() => window.__inp);
  } finally {
    await browser.close();
  }
}

const runs = [];
for (let i = 0; i < Number(values.runs); i++) {
  const result = await measure();
  if (!result) throw new Error("INP was not reported");
  runs.push(result);
  console.log(
    `${values.label} INP run ${i + 1}: ${Math.round(result.value)} ms (${result.target})`,
  );
}

const sorted = [...runs].sort((a, b) => a.value - b.value);
const median = sorted[Math.floor(sorted.length / 2)];
const summary = {
  url,
  label: values.label,
  runs: runs.map((r) => Math.round(r.value)),
  inp: Math.round(median.value),
  attribution: {
    target: median.target,
    type: median.type,
    inputDelay: Math.round(median.inputDelay),
    processing: Math.round(median.processing),
    presentation: Math.round(median.presentation),
  },
};

await fs.mkdir(values.out, { recursive: true });
await fs.writeFile(
  path.join(values.out, `${values.label}-inp.json`),
  JSON.stringify(summary, null, 2) + "\n",
);
console.log(JSON.stringify(summary));
