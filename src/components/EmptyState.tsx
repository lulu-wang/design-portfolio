import Link from "next/link";

export default function EmptyState({
  title,
  description,
  actionLabel = "Back home",
  actionHref = "/",
}: {
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <section className="flex min-h-[50vh] flex-col items-start justify-center py-16 sm:min-h-[55vh] sm:py-24">
      <h1 className="max-w-xl text-5xl font-extrabold uppercase leading-[0.9] tracking-[-0.04em] sm:text-7xl">
        {title}
      </h1>
      {description && (
        <p className="font-secondary mt-6 max-w-md text-base leading-[29px] text-muted sm:mt-8">
          {description}
        </p>
      )}
      <Link
        href={actionHref}
        className="arrow-link mt-8 inline-flex items-center gap-3 text-sm font-semibold tracking-widest uppercase transition-opacity hover:opacity-60 sm:mt-10"
      >
        {actionLabel} →
      </Link>
    </section>
  );
}
