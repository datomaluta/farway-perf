import Image from "next/image";
import Link from "next/link";

import type { Story } from "@/content/stories";
import { formatDate } from "@/lib/format";

import { ArrowRightIcon } from "../icons";

export function Hero({ story }: { story: Story }) {
  return (
    <section className="relative flex min-h-[78svh] items-end text-white" aria-label="Cover story">
      <Image
        src={story.image.src}
        alt={story.image.alt}
        fill
        preload
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10" />
      <div className="relative container-page animate-fade-up pt-32 pb-14 sm:pb-20">
        <p className="font-hand text-3xl text-white/90">Cover story</p>
        <h1 className="mt-2 max-w-3xl font-display text-4xl leading-[1.05] font-bold text-balance sm:text-6xl lg:text-7xl">
          {story.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-pretty text-white/85 sm:text-xl">{story.dek}</p>
        <p className="mt-5 text-sm text-white/75">
          By {story.author} · {formatDate(story.publishedAt)} · {story.readMinutes} min read
        </p>
        <Link
          href={`/stories/${story.slug}`}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/85"
        >
          Read the story
          <ArrowRightIcon />
        </Link>
      </div>
    </section>
  );
}
