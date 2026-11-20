"use client";

import { useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributeFilter: ["class"] });
  return () => observer.disconnect();
};

export function ThemeToggle() {
  const dark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("dark"),
    () => null,
  );

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-surface"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <i className={dark ? "fa-solid fa-sun" : "fa-solid fa-moon"} aria-hidden="true" />
    </button>
  );
}

/** Runs before first paint so the saved or system theme applies without a flash. */
export const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d)}catch(e){}})()`;
