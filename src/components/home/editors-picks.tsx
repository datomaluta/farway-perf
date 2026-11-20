"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import type { Story } from "@/content/stories";
import { formatDate } from "@/lib/format";

import { ChevronLeftIcon, ChevronRightIcon } from "../icons";
import { SectionHeading } from "../section-heading";
import { Reveal } from "./reveal";

/** A carousel built on CSS scroll snapping: swipe on touch, arrows on larger screens. */
export function EditorsPicks({ stories }: { stories: Story[] }) {
  const track = useRef<HTMLUListElement>(null);

  function scroll(direction: -1 | 1) {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  return (
    <Reveal className="container-page pt-20" labelledBy="picks-title">
      <SectionHeading kicker="Hand-picked" title="Editor's picks" id="picks-title">
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Previous stories"
            className="grid size-11 place-items-center rounded-full bg-card ring-1 ring-line transition-colors hover:bg-surface"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Next stories"
            className="grid size-11 place-items-center rounded-full bg-card ring-1 ring-line transition-colors hover:bg-surface"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </SectionHeading>
      <ul
        ref={track}
        className="-mx-4 mt-8 no-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:scroll-px-0 sm:px-0"
      >
        {stories.map((story) => (
          <li
            key={story.slug}
            className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
          >
            <article className="group h-full overflow-hidden rounded-2xl bg-card ring-1 ring-line">
              <Link href={`/stories/${story.slug}`} className="block">
                <div className="overflow-hidden">
                  <Image
                    src={story.image.src}
                    alt={story.image.alt}
                    width={story.image.width}
                    height={story.image.height}
                    sizes="(min-width: 1280px) 400px, (min-width: 1024px) 31vw, (min-width: 640px) 47vw, 85vw"
                    className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold tracking-wider text-accent uppercase">
                    {story.place}, {story.country}
                  </p>
                  <h3 className="mt-2 font-display text-xl leading-snug font-bold">
                    {story.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted">{story.dek}</p>
                  <p className="mt-4 text-xs text-muted">
                    {formatDate(story.publishedAt)} · {story.readMinutes} min read
                  </p>
                </div>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
