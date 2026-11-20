"use client";

import dynamic from "next/dynamic";

import type { Story } from "@/content/stories";

import { SectionHeading } from "../section-heading";
import { Reveal } from "./reveal";

// Leaflet touches `window` when it loads, so it can't render on the server.
const DestinationsMap = dynamic(() => import("./destinations-map"), { ssr: false });

export function Destinations({ stories }: { stories: Story[] }) {
  return (
    <Reveal id="map" className="container-page pt-20" labelledBy="map-title">
      <SectionHeading kicker="Where we've been" title="Destinations" id="map-title">
        <p className="max-w-sm text-sm text-muted">
          Every story on Farway starts somewhere on this map. Tap a pin to read it.
        </p>
      </SectionHeading>
      <div className="relative z-0 mt-8 h-[420px] overflow-hidden rounded-2xl bg-surface ring-1 ring-line">
        <DestinationsMap stories={stories} />
      </div>
    </Reveal>
  );
}
