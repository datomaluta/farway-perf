"use client";

import { SectionHeading } from "../section-heading";
import { Reveal } from "./reveal";

export const featuredVideo = {
  id: "GOAEIMx39-w",
  title: "The World Outside My Window: time-lapse of Earth from the ISS",
  credit: "Time-lapse by David Peterson, made from NASA imagery",
};

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
        <div className="aspect-video overflow-hidden rounded-2xl bg-black ring-1 ring-line">
          <iframe
            className="size-full"
            src={`https://www.youtube.com/embed/${featuredVideo.id}`}
            title={featuredVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </Reveal>
  );
}
