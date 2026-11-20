"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Slider, { type CustomArrowProps } from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import type { Story } from "@/content/stories";
import { formatDate } from "@/lib/format";

import { SectionHeading } from "../section-heading";
import { Reveal } from "./reveal";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";

function Arrow({ onClick, direction }: CustomArrowProps & { direction: "prev" | "next" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous stories" : "Next stories"}
      className={`absolute top-1/3 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-card text-ink shadow-md ring-1 ring-line transition-colors hover:bg-surface sm:grid ${
        direction === "prev" ? "-left-4" : "-right-4"
      }`}
    >
      {direction === "prev" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </button>
  );
}

function useSlidesToShow() {
  const [count, setCount] = useState(3);
  useEffect(() => {
    const update = () => setCount(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return count;
}

export function EditorsPicks({ stories }: { stories: Story[] }) {
  const slidesToShow = useSlidesToShow();

  return (
    <Reveal className="container-page pt-20" labelledBy="picks-title">
      <SectionHeading kicker="Hand-picked" title="Editor's picks" id="picks-title" />
      <div className="picks relative mt-8">
        <Slider
          dots
          infinite
          speed={500}
          slidesToShow={slidesToShow}
          slidesToScroll={1}
          prevArrow={<Arrow direction="prev" />}
          nextArrow={<Arrow direction="next" />}
        >
          {stories.map((story) => (
            <div key={story.slug} className="px-2.5">
              <article className="group overflow-hidden rounded-2xl bg-card ring-1 ring-line">
                <Link href={`/stories/${story.slug}`} className="block">
                  <Image
                    src={story.image.src}
                    alt={story.image.alt}
                    width={story.image.width}
                    height={story.image.height}
                    sizes="(min-width: 1280px) 400px, (min-width: 1024px) 31vw, (min-width: 640px) 47vw, 92vw"
                    className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
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
            </div>
          ))}
        </Slider>
      </div>
    </Reveal>
  );
}
