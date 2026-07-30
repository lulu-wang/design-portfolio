import RichText from "./RichText";

export default function CaseSection({
  index,
  label,
  title,
  intro,
  children,
  first = false,
}: {
  index?: string;
  label?: string;
  title?: string;
  intro?: string;
  children?: React.ReactNode;
  first?: boolean;
}) {
  return (
    <section
      className={`grid scroll-mt-28 gap-6 py-12 sm:py-16 lg:grid-cols-[140px_1fr] lg:gap-12 ${
        first ? "" : "border-t border-black/[0.07]"
      }`}
    >
      {(index || label) && (
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-1.5">
            {index && (
              <span className="text-[11px] font-bold tracking-[0.18em] text-foreground/30">
                {index}
              </span>
            )}
            {label && (
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                {label}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="min-w-0">
        {title && (
          <h2 className="max-w-3xl text-[1.45rem] font-bold leading-[1.2] tracking-tight sm:text-[1.75rem] sm:leading-[1.15] md:text-[2rem] md:leading-[1.12] [&_strong]:font-extrabold [&_em]:font-medium [&_em]:italic">
            <RichText>{title}</RichText>
          </h2>
        )}
        {intro && (
          <p
            className={`font-secondary max-w-2xl text-[15px] leading-[1.55] text-foreground/65 md:max-w-3xl md:text-base md:leading-[1.6] lg:text-[17px] lg:leading-[1.6] [&_strong]:text-foreground [&_em]:text-foreground/75 ${
              title ? "mt-5 sm:mt-6" : ""
            }`}
          >
            <RichText>{intro}</RichText>
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
