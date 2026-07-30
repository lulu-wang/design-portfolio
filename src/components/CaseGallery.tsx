import Image from "next/image";

export type CaseMediaItem = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

type Layout = "masonry" | "phones" | "full" | "pair" | "stack";

function PhoneFrame({
  item,
}: {
  item: CaseMediaItem;
}) {
  return (
    <figure className="mx-auto w-full max-w-[260px] sm:max-w-[280px]">
      {/* Onur-style device shell — thin dark bezel, soft lift */}
      <div className="rounded-[2.35rem] bg-[#111] p-[9px] shadow-[0_24px_48px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.08]">
        <div className="relative overflow-hidden rounded-[1.85rem] bg-white">
          {/* dynamic island sits in the top status padding */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-center pt-3"
          >
            <div className="h-[22px] w-[72px] rounded-full bg-black" />
          </div>
          <Image
            src={item.src}
            alt={item.alt}
            width={item.width ?? 390}
            height={item.height ?? 896}
            className="h-auto w-full object-cover"
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 260px"
          />
        </div>
      </div>
      {item.caption && (
        <figcaption className="mt-4 text-center text-sm tracking-wide text-white/50">
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Large visual gallery for case studies — Onur-style breakout imagery.
 * Escapes the text column so wireframes and final designs can breathe.
 */
export default function CaseGallery({
  items,
  layout = "masonry",
  tone = "muted",
}: {
  items: CaseMediaItem[];
  layout?: Layout;
  tone?: "muted" | "dark" | "plain";
}) {
  if (!items.length) return null;

  const surface =
    tone === "dark"
      ? "bg-[#111]"
      : tone === "plain"
        ? "bg-transparent"
        : "bg-[#ececec]";

  if (layout === "full" || layout === "stack") {
    return (
      <div className="mt-10 flex justify-center px-5 sm:mt-12 sm:px-8">
        <div className="w-full max-w-3xl space-y-4 sm:max-w-4xl">
          {items.map((item) => (
            <figure key={item.src} className={`overflow-hidden ${surface}`}>
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width ?? 1600}
                height={item.height ?? 1000}
                className="mx-auto h-auto w-full max-w-full object-contain"
                sizes="(max-width: 768px) 100vw, 896px"
              />
              {item.caption && (
                <figcaption className="px-4 py-3 text-center text-xs tracking-wide text-muted sm:px-6">
                  {item.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    );
  }

  if (layout === "pair") {
    return (
      <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5">
        {items.map((item) => (
          <figure key={item.src} className={`overflow-hidden ${surface}`}>
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width ?? 900}
              height={item.height ?? 1200}
              className="h-auto w-full object-contain"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            {item.caption && (
              <figcaption className="px-4 py-3 text-xs tracking-wide text-muted">
                {item.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    );
  }

  if (layout === "phones") {
    return (
      <div className={`mt-12 sm:mt-16 ${surface} px-5 py-12 sm:px-8 sm:py-16 md:px-12 md:py-20`}>
        <div className="mx-auto grid max-w-6xl grid-cols-2 items-start justify-items-center gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-14">
          {items.map((item) => (
            <PhoneFrame key={item.src} item={item} />
          ))}
        </div>
      </div>
    );
  }

  // masonry — mass presentation of wireframes / screens
  return (
    <div className={`mt-12 px-4 py-8 sm:mt-16 sm:px-6 sm:py-12 md:px-10 ${surface}`}>
      <div className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4 lg:gap-5">
        {items.map((item) => (
          <figure key={item.src} className="mb-3 break-inside-avoid sm:mb-4 lg:mb-5">
            <div className="overflow-hidden bg-white shadow-sm ring-1 ring-black/[0.06]">
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width ?? 600}
                height={item.height ?? 900}
                className="h-auto w-full object-contain"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
            {item.caption && (
              <figcaption className="mt-2 text-[11px] tracking-wide text-muted sm:text-xs">
                {item.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}
