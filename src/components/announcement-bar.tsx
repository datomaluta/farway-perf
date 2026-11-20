"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CloseIcon } from "./icons";

interface Promo {
  text: string;
  cta: string;
  href: string;
}

export function AnnouncementBar() {
  const [promo, setPromo] = useState<Promo | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    fetch("/api/promo")
      .then((res) => res.json())
      .then(setPromo)
      .catch(() => {});
  }, []);

  if (!promo || dismissed) return null;

  return (
    <div className="bg-accent text-accent-ink">
      <div className="container-page flex items-center justify-between gap-3 py-2.5 text-sm">
        <p>
          {promo.text}{" "}
          <Link href={promo.href} className="font-semibold whitespace-nowrap underline">
            {promo.cta}
          </Link>
        </p>
        <button
          type="button"
          className="grid size-8 shrink-0 place-items-center rounded-full hover:bg-white/15"
          aria-label="Dismiss announcement"
          onClick={() => setDismissed(true)}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}
