"use client";

import moment from "moment";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import type { Story } from "@/content/stories";

const guideIcons = {
  "getting-there": "fa-solid fa-route",
  "where-to-stay": "fa-solid fa-bed",
  "when-to-go": "fa-regular fa-calendar",
};

export default function StoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [more, setMore] = useState<Story[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "missing" | "error">("loading");

  useEffect(() => {
    fetch(`/api/stories/${slug}`)
      .then((res) => {
        if (res.status === 404) {
          setStatus("missing");
          return null;
        }
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data: Story | null) => {
        if (!data) return;
        setStory(data);
        setStatus("ready");
        document.title = `${data.title} | Farway`;
        return fetch("/api/stories")
          .then((res) => res.json())
          .then((all: Story[]) => setMore(all.filter((s) => s.slug !== slug).slice(0, 3)));
      })
      .catch(() => setStatus("error"));
  }, [slug]);

  if (status === "loading") {
    return (
      <div className="grid min-h-[70vh] place-items-center" role="status">
        <i className="fa-solid fa-circle-notch fa-spin text-3xl text-accent" aria-hidden="true" />
        <span className="sr-only">Loading story…</span>
      </div>
    );
  }

  if (status !== "ready" || !story) {
    return (
      <div className="container-page grid min-h-[60vh] place-content-center text-center">
        <p className="kicker">{status === "missing" ? "Off the map" : "Something went wrong"}</p>
        <h1 className="mt-2 font-display text-3xl font-bold">
          {status === "missing" ? "We couldn't find that story." : "The story didn't load."}
        </h1>
        <Link
          href="/"
          className="mx-auto mt-6 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink"
        >
          Back to all stories
        </Link>
      </div>
    );
  }

  return (
    <article>
      <header className="container-page max-w-4xl pt-12 text-center sm:pt-16">
        <p className="kicker">
          {story.place}, {story.country}
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight font-bold text-balance sm:text-6xl">
          {story.title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-pretty text-muted">{story.dek}</p>
        <p className="mt-5 text-sm text-muted">
          By {story.author} · {moment(story.publishedAt).format("MMMM D, YYYY")} ·{" "}
          {story.readMinutes} min read
        </p>
      </header>

      <figure className="container-page mt-10 max-w-6xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={story.image.src} alt={story.image.alt} className="h-auto w-full rounded-3xl" />
        <figcaption className="mt-3 text-center text-xs text-muted">
          Photo by{" "}
          <a
            href={`https://unsplash.com/@${story.image.credit.username}`}
            className="underline hover:text-ink"
          >
            {story.image.credit.name}
          </a>{" "}
          on Unsplash
        </figcaption>
      </figure>

      <div className="container-page mt-12 max-w-2xl">
        <div className="grid gap-6 text-lg leading-relaxed">
          {story.body.map((paragraph, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.8] first-letter:font-bold first-letter:text-accent"
                  : undefined
              }
            >
              {paragraph}
            </p>
          ))}
        </div>

        <section aria-labelledby="guide-title" className="mt-14 rounded-3xl bg-surface p-6 sm:p-8">
          <h2 id="guide-title" className="font-display text-2xl font-bold">
            Plan your trip
          </h2>
          <div className="mt-6 grid gap-6">
            {story.guides.map((guide) => (
              <div key={guide.id} id={guide.id} className="flex gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-card text-accent">
                  <i className={guideIcons[guide.id]} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold">{guide.title}</h3>
                  <p className="mt-1 text-muted">{guide.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {more.length > 0 && (
        <section aria-labelledby="more-title" className="container-page mt-20">
          <h2 id="more-title" className="font-display text-3xl font-bold">
            Keep reading
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {more.map((s) => (
              <Link
                key={s.slug}
                href={`/stories/${s.slug}`}
                className="group overflow-hidden rounded-2xl bg-card ring-1 ring-line"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.image.src}
                  alt={s.image.alt}
                  className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-5">
                  <p className="text-xs font-semibold tracking-wider text-accent uppercase">
                    {s.place}, {s.country}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold">{s.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
