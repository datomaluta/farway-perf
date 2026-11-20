export function SectionHeading({
  kicker,
  title,
  id,
  children,
}: {
  kicker: string;
  title: string;
  id?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="kicker">{kicker}</p>
        <h2 id={id} className="mt-1 font-display text-3xl font-bold sm:text-4xl">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
