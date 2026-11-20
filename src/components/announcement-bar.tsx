import Link from "next/link";

import { promo } from "@/content/promo";

import { Dismissible } from "./dismissible";

/** Rendered on the server, so the bar is in the first paint and never pushes the page down. */
export function AnnouncementBar() {
  return (
    <div className="bg-accent text-accent-ink">
      <Dismissible
        label="Dismiss announcement"
        className="container-page flex items-center justify-between gap-3 py-2.5 text-sm"
      >
        <p>
          {promo.text}{" "}
          <Link href={promo.href} className="font-semibold whitespace-nowrap underline">
            {promo.cta}
          </Link>
        </p>
      </Dismissible>
    </div>
  );
}
