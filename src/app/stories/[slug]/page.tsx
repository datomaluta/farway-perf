import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { stories } from "@/content/stories";
import { formatDate } from "@/lib/format";
import { GuideIcon } from "@/components/icons";

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/stories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.dek,
    alternates: { canonical: `/stories/${story.slug}` },
    openGraph: {
      type: "article",
      title: story.title,
      description: story.dek,
      publishedTime: story.publishedAt,
      authors: [story.author],
      images: [
        {
          url: story.image.src,
          width: story.image.width,
          height: story.image.height,
          alt: story.image.alt,
        },
      ],
    },
  };
}

export default async function StoryPage({ params }: PageProps<"/stories/[slug]">) {
  const { slug } = await params;
  const story = stories.find((s) => s.slug === slug);
  if (!story) notFound();
  const more = stories.filter((s) => s.slug !== slug).slice(0, 3);

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
          By {story.author} · {formatDate(story.publishedAt, "long")} · {story.readMinutes} min read
        </p>
      </header>

      <figure className="container-page mt-10 max-w-6xl">
        <Image
          src={story.image.src}
          alt={story.image.alt}
          width={story.image.width}
          height={story.image.height}
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1152px) 1088px, calc(100vw - 2rem)"
          className="h-auto w-full rounded-3xl"
        />
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
                  <GuideIcon id={guide.id} />
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
              <Image
                src={s.image.src}
                alt={s.image.alt}
                width={s.image.width}
                height={s.image.height}
                sizes="(min-width: 768px) 30vw, 92vw"
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
    </article>
  );
}
