import summary from "../../perf/summary.json";

export interface LabRun {
  score: number;
  runs: number[];
  metrics: { fcp: number; lcp: number; tbt: number; cls: number; si: number };
  resources: Record<string, { requests: number; bytes: number }>;
}

export interface StepResult {
  id: string;
  mobile: LabRun;
  desktop: LabRun;
  inp: { value: number; runs: number[] };
  lighthouseVersion: string;
  measuredAt: string;
}

export interface LiveResult {
  /** PageSpeed Insights run on the deployed site */
  url: string;
  /** Shareable PageSpeed Insights report */
  reportUrl: string;
  measuredAt: string;
  mobile: { score: number; metrics: LabRun["metrics"] };
  desktop: { score: number; metrics: LabRun["metrics"] };
}

export const results = summary as {
  steps: StepResult[];
  live: { before: LiveResult; after: LiveResult } | null;
};

export interface Step {
  id: string;
  /** Short name for tables and charts */
  label: string;
  title: string;
  commit: string;
  problem: string;
  fix: string;
}

export const steps: Step[] = [
  {
    id: "00-before",
    label: "Before",
    title: "The starting point",
    commit: "f2cc18d",
    problem:
      "A client-rendered home page that fetched its stories from an API route after the JavaScript loaded, 2400px JPEGs straight from the CMS, three Google Fonts with display=block, Font Awesome, Leaflet and a YouTube player loaded up front, and moment, lodash, react-slick and framer-motion in the bundle.",
    fix: "Every one of these is a pattern I regularly find on client sites. The before version is deployed as-is, so the numbers can be checked.",
  },
  {
    id: "01-images",
    label: "Images",
    title: "Serve photos through next/image",
    commit: "05e4c74",
    problem:
      "Every photo was a 2400px JPEG of up to 1.3 MB, no matter how small it was displayed. The home page downloaded 5.5 MB of images, all competing with the cover photo.",
    fix: "Responsive srcset with a sizes value per layout, AVIF and WebP, lazy loading below the fold and a preloaded cover image. Same photos, a fraction of the bytes.",
  },
  {
    id: "02-server-render",
    label: "SSR",
    title: "Render stories on the server",
    commit: "4cf0413",
    problem:
      "The page shipped an empty shell and a spinner. Stories arrived from /api/stories only after React had loaded and run, so the browser couldn't even discover the cover image until then.",
    fix: "The home and story pages are now static HTML built at deploy time, with the cover image and its preload hint in the first response. The stories API is gone. First Contentful Paint got later on paper, because the first paint used to be an empty header and a spinner; now it is the real page.",
  },
  {
    id: "03-next-font",
    label: "Fonts",
    title: "Self-host fonts with next/font",
    commit: "4fba0e1",
    problem:
      "A render-blocking stylesheet from fonts.googleapis.com chained to font files on another origin, with display=block hiding all text until they arrived.",
    fix: "next/font downloads the fonts at build time, serves them from the same origin and generates size-adjusted fallbacks, so text renders immediately. Desktop improved, but on slow mobile the three preloaded font files now competed with the cover photo and LCP got worse. Step 11 deals with that.",
  },
  {
    id: "04-svg-icons",
    label: "Icons",
    title: "Inline SVG instead of Font Awesome",
    commit: "bd9674e",
    problem:
      "The full Font Awesome stylesheet and two icon fonts, about 200 KB from a CDN, blocked rendering to draw fifteen icons.",
    fix: "Fifteen small inline SVG components. No extra requests, nothing render-blocking, and the icons inherit color and size from the text.",
  },
  {
    id: "05-lazy-map",
    label: "Map",
    title: "Load the map when it's needed",
    commit: "95a414a",
    problem:
      "Leaflet's stylesheet blocked rendering from unpkg, and its JavaScript and map tiles loaded on page load for a map near the bottom of the page.",
    fix: "An IntersectionObserver loads Leaflet, its CSS and the tiles only when the map is about to scroll into view. The page reserves its height, so nothing moves.",
  },
  {
    id: "06-video-facade",
    label: "Video",
    title: "A facade for the YouTube player",
    commit: "be2e5f5",
    problem:
      "The YouTube iframe pulled in about 1 MB of third-party scripts, styles and ad-related requests on every visit, for a video most readers never play.",
    fix: "A thumbnail and a play button stand in for the player. The real iframe (from youtube-nocookie.com) loads when the reader clicks.",
  },
  {
    id: "07-no-moment-lodash",
    label: "Libraries",
    title: "Drop moment and lodash",
    commit: "117977d",
    problem:
      "moment with all its locales and the whole of lodash were bundled to format dates and filter a list.",
    fix: "Intl.DateTimeFormat for dates and plain array methods for the archive filters.",
  },
  {
    id: "08-css-carousel",
    label: "Carousel",
    title: "A CSS scroll-snap carousel",
    commit: "acb3ce9",
    problem:
      "react-slick and its theme stylesheet powered a carousel of six cards, and a resize listener re-rendered it on every window change.",
    fix: "Native CSS scroll snapping with two buttons: swipeable on touch, keyboard and screen reader friendly, and about 30 lines of code.",
  },
  {
    id: "09-css-animations",
    label: "Animations",
    title: "CSS animations instead of framer-motion",
    commit: "b8b4d56",
    problem:
      "framer-motion ran the fade-ins and animated the archive list's layout on every filter click and keystroke, which made those interactions slow.",
    fix: "A CSS entrance animation, scroll-driven reveals with animation-timeline: view() where supported, and no layout animation on the list.",
  },
  {
    id: "10-announcement-ssr",
    label: "Promo bar",
    title: "Render the promo bar on the server",
    commit: "08b2be4",
    problem:
      "Once the content was server-rendered, the client-fetched announcement bar became visible: it appeared after load and pushed the whole page down.",
    fix: "The bar is part of the server HTML, with a tiny client component for the close button. No more layout shift.",
  },
  {
    id: "11-font-weights",
    label: "Font weights",
    title: "Load only the font weights in use",
    commit: "ade8132",
    problem:
      "Since step 3, three variable font files with every weight were preloaded, competing with the cover image for bandwidth on slow connections.",
    fix: "The display face is loaded in bold only, and the decorative handwritten font is no longer preloaded.",
  },
  {
    id: "12-fetch-priority",
    label: "Priority",
    title: "Fetch the cover image first",
    commit: "55fc1cd",
    problem:
      "PageSpeed Insights on the live site pointed out that the cover image, the LCP element, was requested at low priority. In Next.js 16 the preload prop adds a preload link but no fetchpriority hint.",
    fix: 'fetchPriority="high" and eager loading on the cover images. The lab numbers stay within run-to-run noise (the simulated load is limited by bandwidth, not by request order), but on a real connection the browser now fetches the cover before the carousel photos, and the PageSpeed warning is gone.',
  },
];
