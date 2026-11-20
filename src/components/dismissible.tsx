"use client";

import { useState } from "react";

import { CloseIcon } from "./icons";

/** Server-rendered content with a client-side close button. */
export function Dismissible({
  children,
  className,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label: string;
}) {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className={className}>
      {children}
      <button
        type="button"
        className="grid size-8 shrink-0 place-items-center rounded-full hover:bg-white/15"
        aria-label={label}
        onClick={() => setOpen(false)}
      >
        <CloseIcon />
      </button>
    </div>
  );
}
