export default function CaseSection({
  index,
  label,
  title,
  intro,
  children,
  first = false,
}: {
  index: string;
  label: string;
  title?: string;
  intro?: string;
  children?: React.ReactNode;
  first?: boolean;
}) {
  return (
    <section
      className={`grid scroll-mt-28 gap-6 py-14 sm:py-16 lg:grid-cols-[160px_1fr] lg:gap-12 ${
        first ? "" : "border-t border-black/[0.07]"
      }`}
    >
      {/* Left rail */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-2">
          <span className="text-xs font-bold tracking-[0.2em] text-foreground/30">
            {index}
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
            {label}
          </span>
        </div>
      </div>

      {/* Content column */}
      <div className="min-w-0">
        {title && (
          <h2 className="max-w-3xl text-2xl font-bold leading-[1.2] tracking-tight sm:text-[28px]">
            {title}
          </h2>
        )}
        {intro && (
          <p
            className={`font-secondary max-w-2xl text-base leading-[29px] text-foreground/70 ${
              title ? "mt-8" : ""
            }`}
          >
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
