"use client";

import Image from "next/image";
import { useState } from "react";

import { SectionHeading } from "../section-heading";
import { Reveal } from "./reveal";

export const featuredVideo = {
  id: "GOAEIMx39-w",
  title: "The World Outside My Window: time-lapse of Earth from the ISS",
  credit: "Time-lapse by David Peterson, made from NASA imagery",
};

/**
 * A lightweight stand-in for the YouTube player. The real iframe (and the ~1 MB of
 * YouTube scripts that come with it) only loads when the reader presses play.
 */
function VideoFacade() {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className="size-full"
        src={`https://www.youtube-nocookie.com/embed/${featuredVideo.id}?autoplay=1`}
        title={featuredVideo.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block size-full"
      aria-label={`Play video: ${featuredVideo.title}`}
    >
      <Image
        src={`https://i.ytimg.com/vi/${featuredVideo.id}/hqdefault.jpg`}
        alt=""
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
      />
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid h-14 w-20 place-items-center rounded-2xl bg-[#ff0033] text-white shadow-lg transition-transform group-hover:scale-110">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
            <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l11-6.86a1 1 0 0 0 0-1.7l-11-6.86A1 1 0 0 0 8 5.14Z" />
          </svg>
        </span>
      </span>
    </button>
  );
}

export function VideoOfTheWeek() {
  return (
    <Reveal id="video" className="container-page pt-20" labelledBy="video-title">
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <SectionHeading
            kicker="Video of the week"
            title="The planet from 400 km up"
            id="video-title"
          />
          <p className="mt-4 text-muted">
            Coastlines, storms, city lights and auroras, filmed from the International Space
            Station. Two and a half minutes that make every trip on this page look very small.
          </p>
          <p className="mt-4 text-sm text-muted">{featuredVideo.credit}</p>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-black ring-1 ring-line">
          <VideoFacade />
        </div>
      </div>
    </Reveal>
  );
}
