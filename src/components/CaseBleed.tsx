/**
 * Full-width media band for case studies (Onur-style).
 * Place as a sibling outside the max-w-6xl text column.
 */
export default function CaseBleed({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden">
      <div className="mx-auto max-w-[1400px]">{children}</div>
    </div>
  );
}
