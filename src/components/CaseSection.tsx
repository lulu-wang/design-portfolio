import RichText from "./RichText";

export default function CaseSection({
  index,
  label,
  title,
  intro,
  children,
}: {
  index?: string;
  label?: string;
  title?: string;
  intro?: string;
  children?: React.ReactNode;
  first?: boolean;
}) {
  return (
    <section className="scroll-mt-24 px-6 py-16 sm:px-10 sm:py-24 lg:px-14">
      {(index || label) && (
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#151515]/45">
          {[index, label].filter(Boolean).join(" / ")}
        </p>
      )}

      <div className="min-w-0">
        {title && (
          <h2 className="mt-5 max-w-4xl text-[clamp(2.4rem,5vw,4.4rem)] font-medium leading-[0.95] tracking-[-0.045em] text-[#151515] [&_em]:italic [&_strong]:font-medium">
            <RichText>{title}</RichText>
          </h2>
        )}
        {intro && (
          <p className="ml-auto mt-8 max-w-xl text-right text-[15px] leading-relaxed text-[#151515]/75 sm:text-[16px] [&_em]:text-[#151515]/70 [&_strong]:text-[#151515]">
            <RichText>{intro}</RichText>
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
