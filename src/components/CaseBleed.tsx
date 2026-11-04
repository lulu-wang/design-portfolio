/**
 * Media band for case studies, kept inside the centered column
 * so the project color shows in the side gutters.
 */
export default function CaseBleed({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto w-full max-w-6xl">{children}</div>;
}
