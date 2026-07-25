type Variant = "list" | "detail" | "dashboard";

const bar = "rounded-full bg-black/10";
const block = "rounded-lg bg-black/[0.06]";

function Screen({ variant }: { variant: Variant }) {
  return (
    <div className="flex h-full flex-col gap-3 p-4">
      {/* status bar */}
      <div className="flex items-center justify-between">
        <div className={`h-2 w-10 ${bar}`} />
        <div className={`h-2 w-6 ${bar}`} />
      </div>

      {variant === "dashboard" && (
        <>
          <div className={`h-3 w-24 ${bar}`} />
          <div className={`${block} h-20 w-full`} />
          <div className="grid grid-cols-2 gap-3">
            <div className={`${block} h-16`} />
            <div className={`${block} h-16`} />
          </div>
          <div className={`h-2.5 w-20 ${bar}`} />
          <div className={`${block} h-12 w-full`} />
        </>
      )}

      {variant === "list" && (
        <>
          <div className={`h-3 w-20 ${bar}`} />
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`${block} h-10 w-10 shrink-0 rounded-full`} />
              <div className="flex flex-1 flex-col gap-1.5">
                <div className={`h-2.5 w-3/4 ${bar}`} />
                <div className={`h-2 w-1/2 ${bar}`} />
              </div>
            </div>
          ))}
        </>
      )}

      {variant === "detail" && (
        <>
          <div className={`${block} h-24 w-full`} />
          <div className={`h-3 w-2/3 ${bar}`} />
          <div className={`h-2 w-full ${bar}`} />
          <div className={`h-2 w-5/6 ${bar}`} />
          <div className={`h-2 w-4/6 ${bar}`} />
          <div className="mt-auto flex gap-2">
            <div className={`${block} h-9 flex-1 rounded-full`} />
            <div className="h-9 flex-1 rounded-full bg-black/70" />
          </div>
        </>
      )}
    </div>
  );
}

export default function Wireframe({
  variant,
  label,
}: {
  variant: Variant;
  label?: string;
}) {
  return (
    <figure className="flex flex-col items-center">
      <div className="w-full overflow-hidden rounded-[28px] bg-white p-2 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="mx-auto aspect-[9/16] w-full overflow-hidden rounded-[22px] bg-[#fafafa]">
          <Screen variant={variant} />
        </div>
      </div>
      {label && (
        <figcaption className="mt-3 text-xs uppercase tracking-widest text-muted">
          {label}
        </figcaption>
      )}
    </figure>
  );
}
