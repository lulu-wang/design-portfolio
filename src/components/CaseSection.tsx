import RichText from "./RichText";

export default function CaseSection({
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
    <section className="scroll-mt-28 py-10 sm:py-14">
      {title && (
        <h2 className="max-w-[40rem] text-[23px] font-normal leading-[1.3] text-black">
          <RichText>{title}</RichText>
        </h2>
      )}
      {intro && (
        <p
          className={`max-w-[40rem] text-[16px] leading-[1.47] text-black ${
            title ? "mt-4" : ""
          }`}
        >
          <RichText>{intro}</RichText>
        </p>
      )}
      {children}
    </section>
  );
}
