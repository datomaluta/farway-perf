"use client";

import { useEffect, useState } from "react";

import { Archive } from "@/components/home/archive";
import { Destinations } from "@/components/home/destinations";
import { EditorsPicks } from "@/components/home/editors-picks";
import { Hero } from "@/components/home/hero";
import { Newsletter } from "@/components/home/newsletter";
import { VideoOfTheWeek } from "@/components/home/video";
import type { Story } from "@/content/stories";

export default function HomePage() {
  const [stories, setStories] = useState<Story[] | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    fetch("/api/stories")
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(setStories)
      .catch(() => setError(true));
  }, [attempt]);

  if (error) {
    return (
      <div className="container-page grid min-h-[70vh] place-content-center text-center">
        <p className="font-display text-2xl font-bold">We couldn&apos;t load the stories.</p>
        <button
          type="button"
          className="mx-auto mt-5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink"
          onClick={() => {
            setError(false);
            setAttempt((n) => n + 1);
          }}
        >
          Try again
        </button>
      </div>
    );
  }

  if (!stories) {
    return (
      <div className="grid min-h-[70vh] place-items-center" role="status">
        <i className="fa-solid fa-circle-notch fa-spin text-3xl text-accent" aria-hidden="true" />
        <span className="sr-only">Loading stories…</span>
      </div>
    );
  }

  return (
    <>
      <Hero story={stories[0]} />
      <EditorsPicks stories={stories.slice(1, 7)} />
      <Archive stories={stories} />
      <VideoOfTheWeek />
      <Destinations stories={stories} />
      <Newsletter />
    </>
  );
}
