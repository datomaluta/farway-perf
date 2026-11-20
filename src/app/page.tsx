import type { Metadata } from "next";

import { Archive } from "@/components/home/archive";
import { Destinations } from "@/components/home/destinations";
import { EditorsPicks } from "@/components/home/editors-picks";
import { Hero } from "@/components/home/hero";
import { Newsletter } from "@/components/home/newsletter";
import { VideoOfTheWeek } from "@/components/home/video";
import { stories } from "@/content/stories";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
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
