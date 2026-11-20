import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page grid min-h-[60vh] place-content-center text-center">
      <p className="kicker">Off the map</p>
      <h1 className="mt-2 font-display text-4xl font-bold">This page doesn&apos;t exist.</h1>
      <p className="mt-3 text-muted">The road ends here. Head back and pick another trail.</p>
      <Link
        href="/"
        className="mx-auto mt-6 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink"
      >
        Back to all stories
      </Link>
    </div>
  );
}
