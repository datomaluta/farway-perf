"use client";

import Link from "next/link";
import { useState } from "react";

import { navLinks } from "@/lib/site";

import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-display text-2xl font-bold">
          <i className="fa-regular fa-compass text-accent" aria-hidden="true" />
          Farway
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-muted transition-colors hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/#stories"
            className="grid size-10 place-items-center rounded-full transition-colors hover:bg-surface"
            aria-label="Search stories"
          >
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
          </Link>
          <ThemeToggle />
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full transition-colors hover:bg-surface md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <i className={open ? "fa-solid fa-xmark" : "fa-solid fa-bars"} aria-hidden="true" />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line md:hidden">
          <ul className="container-page grid py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-3 text-base font-medium"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
