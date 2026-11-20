"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { regions, type Region, type Story } from "@/content/stories";
import { formatDate } from "@/lib/format";

import { SectionHeading } from "../section-heading";
import { Reveal } from "./reveal";
import { MapIcon, SearchIcon, GuideIcon } from "../icons";

const PAGE_SIZE = 12;

export function Archive({ stories }: { stories: Story[] }) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<Region | "all">("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const entries = stories
    .flatMap((story) => [
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
      ...story.guides.map((guide) => ({
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
    ])
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  const counts: Partial<Record<Region, number>> = {};
  for (const entry of entries) {
    counts[entry.story.region] = (counts[entry.story.region] ?? 0) + 1;
  }
  const words = query.toLowerCase().split(/s+/).filter(Boolean);
  const matches = entries.filter((entry) => {
    if (region !== "all" && entry.story.region !== region) return false;
    const haystack = [entry.title, entry.summary, entry.story.place, entry.story.country]
      .join(" ")
      .toLowerCase();
    return words.every((word) => haystack.includes(word));
  });
  const shown = matches.slice(0, visible);

  return (
    <Reveal id="stories" className="container-page pt-20" labelledBy="archive-title">
      <SectionHeading kicker="The archive" title="Stories & guides" id="archive-title">
        <label className="relative w-full sm:w-72">
          <span className="sr-only">Search stories and guides</span>
          <SearchIcon className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-sm text-muted" />
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
          <MapIcon className="text-3xl text-muted" />
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
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {shown.map((entry) => (
            <li key={entry.key} className="animate-fade-in">
              <Link
                href={entry.href}
                className="flex gap-4 rounded-2xl bg-card p-3 ring-1 ring-line transition-colors hover:bg-surface"
              >
                {entry.guide ? (
                  <span className="grid size-20 shrink-0 place-items-center rounded-xl bg-surface text-2xl text-accent sm:size-28">
                    <GuideIcon id={entry.guide} />
                  </span>
                ) : (
                  <Image
                    src={entry.story.image.src}
                    alt=""
                    width={112}
                    height={112}
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
                    {formatDate(entry.publishedAt)} · {entry.readMinutes} min read
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
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
