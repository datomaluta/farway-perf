import Link from "next/link";

import { navLinks, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[2fr_1fr_1fr]">
        <div className="max-w-sm">
          <p className="flex items-center gap-2 font-display text-2xl font-bold">
            <i className="fa-regular fa-compass text-accent" aria-hidden="true" />
            {site.name}
          </p>
          <p className="mt-3 text-sm text-muted">{site.description}</p>
        </div>
        <nav aria-label="Footer">
          <p className="text-sm font-semibold">Explore</p>
          <ul className="mt-3 grid gap-2 text-sm text-muted">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-sm font-semibold">About</p>
          <ul className="mt-3 grid gap-2 text-sm text-muted">
            <li>
              <Link href="/credits" className="hover:text-ink">
                Photo credits
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="container-page py-6 text-xs text-muted">
          Farway is a fictional magazine, built as a web performance case study. Photos from
          Unsplash.
        </p>
      </div>
    </footer>
  );
}
