import Image from "next/image";

export type CaseMediaItem = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  statusBar?: "light" | "dark";
};

type Layout = "masonry" | "phones" | "full" | "pair" | "stack";

function statusBarStyle(item: CaseMediaItem): {
  bg: string;
  bottomBg: string;
  theme: "light" | "dark";
} {
  if (item.statusBar === "dark") {
    return { bg: "#0D0D0D", bottomBg: "#0D0D0D", theme: "dark" };
  }
  if (item.statusBar === "light") {
    return { bg: "#FFFFFF", bottomBg: "#FFFFFF", theme: "light" };
  }
  const src = item.src;
  if (
    src.includes("path-learning/screens/01-splash") ||
    src.includes("path-learning/screens/02-signup")
  ) {
    return { bg: "#E3F5DF", bottomBg: "#E3F5DF", theme: "light" };
  }
  if (src.includes("path-learning/screens/03-login")) {
    return { bg: "#D7CFFE", bottomBg: "#D7CFFE", theme: "light" };
  }
  if (
    src.includes("path-learning/screens/04-interests") ||
    src.includes("path-learning/screens/06-path")
  ) {
    return { bg: "#C3E7BB", bottomBg: "#C3E7BB", theme: "light" };
  }
  if (src.includes("path-learning")) {
    return { bg: "#FFFFFF", bottomBg: "#FFFFFF", theme: "light" };
  }
  if (src.includes("netflix-community")) {
    return { bg: "#0A0A0A", bottomBg: "#0A0A0A", theme: "dark" };
  }
  if (src.includes("pulsefit/final/22.png")) {
    return { bg: "#1D1F1F", bottomBg: "#2B3537", theme: "dark" };
  }
  // Workout detail is dark at the top and white at the bottom
  if (src.includes("pulsefit/final/15.png")) {
    return { bg: "#0D0D0D", bottomBg: "#FFFFFF", theme: "dark" };
  }
  if (/pulsefit\/final\/(01|10|11|23|24)\.png/.test(src)) {
    return { bg: "#0D0D0D", bottomBg: "#0D0D0D", theme: "dark" };
  }
  return { bg: "#FFFFFF", bottomBg: "#FFFFFF", theme: "light" };
}

function StatusBar({
  theme,
}: {
  theme: "light" | "dark";
}) {
  const dark = theme === "dark";
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 top-0 z-10 flex h-[22px] items-center px-[5.5%] sm:h-6 ${
        dark ? "text-white" : "text-black"
      }`}
    >
      <span className="w-[23%] text-[9px] font-semibold tabular-nums tracking-tight sm:text-[10px]">
        9:41
      </span>
      <div className="flex flex-1 justify-center">
        <div
          className={`h-2 w-[30%] max-w-[56px] rounded-full sm:h-2.5 ${
            dark ? "bg-black ring-1 ring-white/20" : "bg-black"
          }`}
        />
      </div>
      <div className="flex w-[23%] items-center justify-end gap-[3px] sm:gap-[4px]">
        <svg
          viewBox="0 0 17 12"
          className="h-[8px] w-[11px] sm:h-[9px] sm:w-[12px]"
          fill="currentColor"
        >
          <rect x="0" y="7" width="3" height="5" rx="0.6" />
          <rect x="4.5" y="5" width="3" height="7" rx="0.6" />
          <rect x="9" y="2.5" width="3" height="9.5" rx="0.6" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.6" />
        </svg>
        <svg
          viewBox="0 0 16 12"
          className="h-[8px] w-[11px] sm:h-[9px] sm:w-[12px]"
          fill="currentColor"
        >
          <path d="M8 9.2a1.35 1.35 0 1 1 0 2.7 1.35 1.35 0 0 1 0-2.7Zm0-3.4c1.7 0 3.28.66 4.47 1.85l-1.2 1.2A4.7 4.7 0 0 0 8 7.4a4.7 4.7 0 0 0-3.27 1.35L3.53 7.55A6.35 6.35 0 0 1 8 5.8Zm0-3.4c2.6 0 5.02 1.02 6.82 2.82L13.6 6.45A7.7 7.7 0 0 0 8 4.05a7.7 7.7 0 0 0-5.6 2.4L1.18 5.22A10.05 10.05 0 0 1 8 2.4Z" />
        </svg>
        <svg
          viewBox="0 0 27 13"
          className="h-[8px] w-[19px] sm:h-[9px] sm:w-[21px]"
          fill="currentColor"
        >
          <rect
            x="0.6"
            y="0.6"
            width="22"
            height="11.8"
            rx="2.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <rect x="2.2" y="2.2" width="18.6" height="8.6" rx="1.4" />
          <rect x="23.4" y="4.2" width="2.2" height="4.6" rx="0.8" />
        </svg>
      </div>
    </div>
  );
}

function PhoneFrame({
  item,
  roomy = false,
}: {
  item: CaseMediaItem;
  roomy?: boolean;
}) {
  const { bg, bottomBg, theme } = statusBarStyle(item);
  const dark = theme === "dark";
  // PulseFit exports mix 864 and 1076-tall crops; pin them to one iPhone
  // viewport so shorter screens don't sit above a black gap in the grid.
  const nativeChrome = item.src.includes("path-learning/screens");
  const fillFrame =
    item.src.includes("pulsefit") ||
    item.src.includes("netflix-community/phone") ||
    nativeChrome;

  return (
    <figure className={`mx-auto w-full ${roomy ? "max-w-[220px] sm:max-w-[240px] md:max-w-[260px]" : ""}`}>
      {/* Onur-style device shell — thin dark bezel, soft lift */}
      <div className="rounded-[2.6rem] bg-[#111] p-[10px] shadow-[0_28px_56px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.08] sm:rounded-[2.85rem] sm:p-[11px]">
        <div
          className={`relative overflow-hidden rounded-[2.05rem] leading-none sm:rounded-[2.25rem] ${
            fillFrame
              ? nativeChrome
                ? "aspect-[393/852]"
                : "aspect-[375/864]"
              : ""
          }`}
          style={{ backgroundColor: bottomBg || bg }}
        >
          {nativeChrome ? null : <StatusBar theme={theme} />}
          {fillFrame ? (
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 50vw, (max-width: 1536px) 33vw, 25vw"
            />
          ) : (
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width ?? 390}
              height={item.height ?? 896}
              className="relative block h-auto w-full"
              style={{ height: "auto", width: "100%" }}
              sizes="(max-width: 768px) 50vw, (max-width: 1536px) 33vw, 25vw"
            />
          )}
          {nativeChrome ? null : (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center pb-2.5 pt-1"
          >
            <div
              className={`h-[5px] w-[32%] max-w-[118px] rounded-full ${
                dark && bottomBg !== "#FFFFFF" ? "bg-white/25" : "bg-black/20"
              }`}
            />
          </div>
          )}
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

function GalleryHeading({
  heading,
  onDark,
}: {
  heading?: string;
  onDark: boolean;
}) {
  if (!heading) return null;
  return (
    <p
      className={`mb-10 text-center font-display text-[13px] font-medium uppercase tracking-[0.18em] sm:mb-12 ${
        onDark ? "text-white/45" : "text-foreground/40"
      }`}
    >
      {heading}
    </p>
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
  roomy = false,
  flush = false,
  heading,
}: {
  items: CaseMediaItem[];
  layout?: Layout;
  tone?: "muted" | "dark" | "plain";
  roomy?: boolean;
  flush?: boolean;
  heading?: string;
}) {
  if (!items.length) return null;

  const dark = tone === "dark";
  const surface =
    tone === "dark"
      ? "bg-[#111]"
      : tone === "plain"
        ? "bg-transparent"
        : "bg-[#ececec]";
  const captionClass = dark ? "text-white/45" : "text-muted";

  if (layout === "full" || layout === "stack") {
    return (
      <div
        className={`${flush ? "mt-0" : "mt-10 sm:mt-12"} ${
          dark
            ? `${surface} px-5 py-12 sm:px-8 sm:py-16 md:px-10`
            : "flex justify-center px-5 sm:px-8"
        }`}
      >
        <div className="mx-auto w-full max-w-5xl sm:max-w-6xl">
          <GalleryHeading heading={heading} onDark={dark} />
          <div className="space-y-4 sm:space-y-5">
            {items.map((item) => (
              <figure key={item.src} className={`overflow-hidden ${dark ? "" : surface}`}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width ?? 1600}
                  height={item.height ?? 1000}
                  className="mx-auto h-auto w-full max-w-full object-contain"
                  sizes="(max-width: 768px) 100vw, 1024px"
                />
                {item.caption && (
                  <figcaption
                    className={`px-4 py-3 text-center text-xs tracking-wide sm:px-6 ${captionClass}`}
                  >
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
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
      <div
        className={`${surface} ${
          roomy
            ? `${flush ? "mt-0" : "mt-12 sm:mt-16"} px-8 py-20 sm:px-14 sm:py-28 md:px-20 md:py-32 lg:px-28`
            : `${flush ? "mt-0" : "mt-12 sm:mt-16"} px-5 py-16 sm:px-8 sm:py-24 md:px-10 md:py-28 lg:px-14`
        }`}
      >
        <GalleryHeading heading={heading} onDark={dark} />
        <div
          className={`mx-auto grid items-start ${
            roomy
              ? "grid-cols-1 justify-items-center gap-x-12 gap-y-16 sm:grid-cols-2 sm:gap-x-16 sm:gap-y-20 md:grid-cols-3 md:gap-x-20 md:gap-y-24"
              : "grid-cols-2 justify-items-stretch gap-x-6 gap-y-14 sm:gap-x-10 sm:gap-y-16 md:grid-cols-3 md:gap-x-12 md:gap-y-20 2xl:grid-cols-4 2xl:gap-x-14 2xl:gap-y-24"
          }`}
        >
          {items.map((item) => (
            <PhoneFrame key={item.src} item={item} roomy={roomy} />
          ))}
        </div>
      </div>
    );
  }

  // masonry — mass presentation of wireframes / screens
  return (
    <div
      className={`${flush ? "mt-0" : "mt-12 sm:mt-16"} px-4 py-8 sm:px-6 sm:py-12 md:px-10 ${surface}`}
    >
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
