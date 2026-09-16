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
      <h1 className="font-title max-w-xl text-[clamp(2.35rem,5vw,4.15rem)] font-bold leading-[1.12] tracking-[-0.045em]">
        {title}
      </h1>
      {description && (
        <p className="font-secondary mt-6 max-w-md text-base leading-[29px] text-muted sm:mt-8">
          {description}
        </p>
      )}
      <Link
        href={actionHref}
        className="arrow-link mt-8 inline-flex items-center gap-3 text-sm text-foreground/50 transition-opacity hover:opacity-70 sm:mt-10"
      >
        {actionLabel} →
      </Link>
    </section>
  );
}
