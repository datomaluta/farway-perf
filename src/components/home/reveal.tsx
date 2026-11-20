"use client";

import { motion } from "framer-motion";

/** Fades a section in the first time it scrolls into view. */
export function Reveal({
  children,
  className,
  id,
  labelledBy,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <motion.section
      id={id}
      aria-labelledby={labelledBy}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  );
}
