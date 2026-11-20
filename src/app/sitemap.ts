import type { MetadataRoute } from "next";

import { stories } from "@/content/stories";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/case-study"), changeFrequency: "monthly", priority: 0.9 },
    ...stories.map((story) => ({
      url: absoluteUrl(`/stories/${story.slug}`),
      lastModified: new Date(story.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: [absoluteUrl(story.image.src)],
    })),
    { url: absoluteUrl("/credits"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
