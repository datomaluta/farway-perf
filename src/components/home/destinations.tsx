"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import type { Story } from "@/content/stories";

import { MapIcon } from "../icons";
import { SectionHeading } from "../section-heading";
import { Reveal } from "./reveal";

function MapPlaceholder() {
  return (
    <div className="grid size-full place-content-center justify-items-center gap-2 text-muted">
      <MapIcon className="text-3xl" />
      <p className="text-sm">Loading map…</p>
    </div>
  );
}

// Leaflet (and its stylesheet) is only downloaded once the map is about to scroll into view.
const DestinationsMap = dynamic(() => import("./destinations-map"), {
  ssr: false,
  loading: MapPlaceholder,
});

export function Destinations({ stories }: { stories: Story[] }) {
  const box = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Reveal id="map" className="container-page pt-20" labelledBy="map-title">
      <SectionHeading kicker="Where we've been" title="Destinations" id="map-title">
        <p className="max-w-sm text-sm text-muted">
          Every story on Farway starts somewhere on this map. Tap a pin to read it.
        </p>
      </SectionHeading>
      <div
        ref={box}
        className="relative z-0 mt-8 h-[420px] overflow-hidden rounded-2xl bg-surface ring-1 ring-line"
      >
        {near ? <DestinationsMap stories={stories} /> : <MapPlaceholder />}
      </div>
    </Reveal>
  );
}
