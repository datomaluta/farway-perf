export const site = {
  name: "Farway",
  title: "Farway: slow travel stories, field notes and guides",
  description:
    "Farway is a travel magazine about going slowly: long walks, local trains, small boats and the places in between.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
};

/** Where the case study points readers. */
export const links = {
  repo: "https://github.com/datomaluta/farway-perf",
  before: "https://farway-perf-before.vercel.app",
};

export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}

export const navLinks = [
  { href: "/#stories", label: "Stories" },
  { href: "/#map", label: "Destinations" },
  { href: "/#video", label: "Video" },
  { href: "/case-study", label: "Case study" },
];
