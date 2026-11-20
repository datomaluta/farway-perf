"use client";

import Link from "next/link";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";

import type { Story } from "@/content/stories";

export default function DestinationsMap({ stories }: { stories: Story[] }) {
  return (
    <MapContainer
      bounds={stories.map((story) => story.coords)}
      boundsOptions={{ padding: [32, 32] }}
      minZoom={1}
      scrollWheelZoom={false}
      className="size-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stories.map((story) => (
        <CircleMarker
          key={story.slug}
          center={story.coords}
          radius={8}
          pathOptions={{ color: "#ffffff", weight: 2, fillColor: "#0d6b5b", fillOpacity: 1 }}
        >
          <Popup>
            <span className="block text-xs text-neutral-500">
              {story.place}, {story.country}
            </span>
            <Link href={`/stories/${story.slug}`} className="font-semibold">
              {story.title}
            </Link>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
