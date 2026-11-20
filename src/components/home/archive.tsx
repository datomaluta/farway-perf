"use client";

import { AnimatePresence, motion } from "framer-motion";
import _ from "lodash";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";

import { regions, type Region, type Story } from "@/content/stories";

import { SectionHeading } from "../section-heading";
import { Reveal } from "./reveal";

const PAGE_SIZE = 12;

const guideIcons = {
  "getting-there": "fa-solid fa-route",
  "where-to-stay": "fa-solid fa-bed",
  "when-to-go": "fa-regular fa-calendar",
};

export function Archive({ stories }: { stories: Story[] }) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<Region | "all">("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const entries = _.orderBy(
    _.flatMap(stories, (story) => [
      {
        key: story.slug,
        kind: "Story",
        guide: null,
        title: story.title,
        summary: story.dek,
        href: `/stories/${story.slug}`,
        story,
        publishedAt: story.publishedAt,
        readMinutes: story.readMinutes,
      },
      ..._.map(story.guides, (guide) => ({
        key: `${story.slug}-${guide.id}`,
        kind: "Guide",
        guide: guide.id,
        title: guide.title,
        summary: guide.summary,
        href: `/stories/${story.slug}#${guide.id}`,
        story,
        publishedAt: guide.publishedAt,
        readMinutes: 2,
      })),
    ]),
    ["publishedAt"],
    ["desc"],
  );

  const counts = _.countBy(entries, (entry) => entry.story.region);
  const words = _.words(_.toLower(query));
  const matches = _.filter(entries, (entry) => {
    if (region !== "all" && entry.story.region !== region) return false;
    const haystack = _.toLower(
      [entry.title, entry.summary, entry.story.place, entry.story.country].join(" "),
    );
    return _.every(words, (word) => _.includes(haystack, word));
  });
  const shown = _.take(matches, visible);

  return (
    <Reveal id="stories" className="container-page pt-20" labelledBy="archive-title">
      <SectionHeading kicker="The archive" title="Stories & guides" id="archive-title">
        <label className="relative w-full sm:w-72">
          <span className="sr-only">Search stories and guides</span>
          <i
            className="fa-solid fa-magnifying-glass pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-sm text-muted"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(PAGE_SIZE);
            }}
            placeholder="Search places, guides…"
            className="h-11 w-full rounded-full border border-line bg-card pr-4 pl-10 text-sm outline-none placeholder:text-muted focus:border-accent"
          />
        </label>
      </SectionHeading>

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by region">
        {[{ value: "all" as const, label: "All" }, ...regions].map((option) => {
          const count = option.value === "all" ? entries.length : (counts[option.value] ?? 0);
          const active = region === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setRegion(option.value);
                setVisible(PAGE_SIZE);
              }}
              className={`h-9 rounded-full px-4 text-sm font-medium ring-1 transition-colors ${
                active ? "bg-ink text-bg ring-ink" : "bg-card text-ink ring-line hover:bg-surface"
              }`}
            >
              {option.label} <span className="opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {matches.length} results
      </p>

      {matches.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-line px-6 py-14 text-center">
          <i className="fa-regular fa-map text-3xl text-muted" aria-hidden="true" />
          <p className="mt-3 font-semibold">Nothing matches “{query}”</p>
          <p className="mt-1 text-sm text-muted">Try a place name, or clear the filters.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setRegion("all");
            }}
            className="mt-5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink hover:bg-accent-hover"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <motion.ul layout className="mt-8 grid gap-4 md:grid-cols-2">
          <AnimatePresence>
            {shown.map((entry) => (
              <motion.li
                key={entry.key}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
              >
                <Link
                  href={entry.href}
                  className="flex gap-4 rounded-2xl bg-card p-3 ring-1 ring-line transition-colors hover:bg-surface"
                >
                  {entry.guide ? (
                    <span className="grid size-20 shrink-0 place-items-center rounded-xl bg-surface text-2xl text-accent sm:size-28">
                      <i className={guideIcons[entry.guide]} aria-hidden="true" />
                    </span>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={entry.story.image.src}
                      alt=""
                      className="size-20 shrink-0 rounded-xl object-cover sm:size-28"
                    />
                  )}
                  <div className="min-w-0 py-1">
                    <p className="text-xs font-semibold tracking-wider text-accent uppercase">
                      {entry.kind} · {entry.story.place}
                    </p>
                    <h3 className="mt-1 leading-snug font-semibold">{entry.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted">{entry.summary}</p>
                    <p className="mt-2 text-xs text-muted">
                      {moment(entry.publishedAt).format("MMM D, YYYY")} · {entry.readMinutes} min
                      read
                    </p>
                  </div>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}

      {matches.length > visible && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-full px-6 py-3 text-sm font-semibold ring-1 ring-line transition-colors hover:bg-surface"
          >
            Show more ({matches.length - visible} left)
          </button>
        </div>
      )}
    </Reveal>
  );
}
