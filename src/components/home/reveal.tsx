/**
 * Fades a section in as it scrolls into view, using a CSS scroll-driven animation.
 * Browsers without `animation-timeline` support simply show the section.
 */
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
    <section id={id} aria-labelledby={labelledBy} className={`reveal ${className ?? ""}`}>
      {children}
    </section>
  );
}
