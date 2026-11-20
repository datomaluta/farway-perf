"use client";

import { useState } from "react";

import { Reveal } from "./reveal";
import { CheckCircleIcon, SendIcon } from "../icons";

export function Newsletter() {
  const [sent, setSent] = useState(false);

  return (
    <Reveal id="newsletter" className="container-page pt-20" labelledBy="newsletter-title">
      <div className="rounded-3xl bg-ink px-6 py-12 text-bg sm:px-12 sm:py-16">
        <div className="max-w-2xl">
          <p className="font-hand text-2xl text-accent">Every Sunday</p>
          <h2 id="newsletter-title" className="mt-1 font-display text-3xl font-bold sm:text-4xl">
            The Sunday dispatch
          </h2>
          <p className="mt-3 opacity-80">
            One long read, three short guides and a photo worth framing. No ads, no tracking pixels,
            unsubscribe in one click.
          </p>
          {sent ? (
            <p className="mt-8 flex items-center gap-2 font-semibold" role="status">
              <CheckCircleIcon className="text-accent" />
              Thanks, you&apos;re on the list. (This is a demo, so no email was sent.)
            </p>
          ) : (
            <form
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <label className="flex-1">
                <span className="sr-only">Email address</span>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-full bg-bg px-5 text-ink outline-none placeholder:text-muted focus-visible:ring-2 focus-visible:ring-accent"
                />
              </label>
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 font-semibold text-accent-ink transition-colors hover:bg-accent-hover"
              >
                Subscribe
                <SendIcon />
              </button>
            </form>
          )}
        </div>
      </div>
    </Reveal>
  );
}
