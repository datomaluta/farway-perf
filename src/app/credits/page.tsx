import type { Metadata } from "next";
import Link from "next/link";

import { stories } from "@/content/stories";

export const metadata: Metadata = {
  title: "Photo credits",
  description: "The photographers behind every image on Farway.",
};

export default function CreditsPage() {
  return (
    <div className="container-page max-w-3xl pt-12 sm:pt-16">
      <p className="kicker">Thank you</p>
      <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Photo credits</h1>
      <p className="mt-4 text-muted">
        Farway is a fictional magazine, but the photographs are real. Every image comes from
        Unsplash and is used under the{" "}
        <a href="https://unsplash.com/license" className="underline hover:text-ink">
          Unsplash licence
        </a>
        .
      </p>
      <ul className="mt-10 divide-y divide-line border-y border-line">
        {stories.map((story) => (
          <li
            key={story.slug}
            className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4"
          >
            <Link href={`/stories/${story.slug}`} className="font-semibold hover:text-accent">
              {story.title}
            </Link>
            <span className="text-sm text-muted">
              Photo by{" "}
              <a
                href={`https://unsplash.com/@${story.image.credit.username}`}
                className="underline hover:text-ink"
              >
                {story.image.credit.name}
              </a>{" "}
              ·{" "}
              <a
                href={`https://unsplash.com/photos/${story.image.credit.photoId}`}
                className="underline hover:text-ink"
              >
                original
              </a>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
