import Image from "next/image";

type PreviewScreen = { src: string; alt: string };

function CoverDesktop({
  src,
  alt,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority: boolean;
}) {
  return (
    <div className="relative z-10 flex h-full w-full items-center justify-center px-[8%] py-[7%]">
      <div className="w-full max-w-[92%]">
        <div className="relative rounded-[2.4cqw] bg-[#1a1a1a] p-[1.15cqw] shadow-[0_16px_36px_rgba(0,0,0,0.16)] ring-1 ring-black/10">
          <div
            aria-hidden
            className="absolute top-[0.38cqw] left-1/2 z-20 h-[0.42cqw] w-[0.42cqw] -translate-x-1/2 rounded-full bg-[#3d3d3d] ring-1 ring-black/40"
          />
          <div className="overflow-hidden rounded-[1.35cqw] bg-white">
            <Image
              src={src}
              alt={alt}
              width={1024}
              height={665}
              priority={priority}
              className="block h-auto w-full"
              sizes={sizes}
            />
          </div>
        </div>
        <div aria-hidden className="relative mx-auto -mt-px h-[1.7cqw] w-[106%]">
          <div className="absolute inset-x-0 top-0 h-full rounded-b-[1.5cqw] bg-gradient-to-b from-[#ececea] to-[#c9c9c6] shadow-[0_8px_16px_rgba(0,0,0,0.08)]" />
          <div className="absolute top-0 left-1/2 h-[0.42cqw] w-[16%] -translate-x-1/2 rounded-b-[0.5cqw] bg-[#b7b7b4]" />
        </div>
      </div>
    </div>
  );
}

function CoverPhones({
  screens,
  sizes,
  hero,
  priority,
}: {
  screens: PreviewScreen[];
  sizes: string;
  hero: boolean;
  priority: boolean;
}) {
  return (
    <div
      className={`relative z-10 flex h-full w-full items-center justify-center ${
        hero ? "gap-[6%] px-[8%]" : "gap-[5%] px-[7%]"
      }`}
    >
      {screens.slice(0, 2).map((screen) => (
        <div
          key={screen.src}
          className={`relative aspect-[393/852] ${hero ? "h-[84%]" : "h-[86%]"}`}
          style={{ containerType: "size" }}
        >
          <div className="absolute inset-0 rounded-[13.5cqw] bg-[#111] p-[3.4cqw] shadow-[0_14px_28px_rgba(0,0,0,0.22)] ring-1 ring-white/10">
            <div className="h-full w-full overflow-hidden rounded-[10.4cqw] bg-white">
              <Image
                src={screen.src}
                alt={screen.alt}
                width={393}
                height={852}
                priority={priority}
                className="block h-full w-full object-cover object-top"
                sizes={sizes}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProjectCover({
  name,
  src,
  alt,
  sizes,
  priority = false,
  width = 2390,
  height = 1580,
  className = "",
  size = "card",
  screens,
  device,
}: {
  name: string;
  src: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  className?: string;
  size?: "card" | "hero";
  screens?: PreviewScreen[];
  device?: "desktop";
}) {
  const words = name
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .toUpperCase()
    .split(/\s+/)
    .filter(Boolean);
  const stacked = words.length > 1;
  const hero = size === "hero";
  const pair = Boolean(screens && screens.length >= 2);

  return (
    <div
      className={`relative isolate overflow-hidden bg-[#f6f6f4] ${className}`}
      style={{ containerType: "size" }}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-0 flex items-center overflow-hidden ${
          stacked ? "justify-start pl-[6%] pr-[4%]" : "justify-center"
        }`}
      >
        <span
          className={`font-display select-none font-bold uppercase tracking-[-0.06em] text-foreground/[0.16] transition-colors duration-300 group-hover:text-foreground/[0.22] ${
            stacked
              ? `text-left ${
                  hero
                    ? "text-[min(48cqh,24cqi)] leading-[0.78]"
                    : "text-[min(42cqh,22cqi)] leading-[0.78]"
                }`
              : `text-center whitespace-nowrap ${
                  hero
                    ? "text-[min(78cqh,34cqi)] leading-none"
                    : "text-[min(70cqh,30cqi)] leading-none"
                }`
          }`}
        >
          {stacked
            ? words.map((word) => (
                <span key={word} className="block">
                  {word}
                </span>
              ))
            : words[0]}
        </span>
      </div>
      {device === "desktop" ? (
        <CoverDesktop
          src={src}
          alt={alt ?? name}
          sizes={sizes}
          priority={priority}
        />
      ) : pair && screens ? (
        <CoverPhones
          screens={screens}
          sizes={sizes ?? "(max-width: 768px) 50vw, 25vw"}
          hero={hero}
          priority={priority}
        />
      ) : (
        <Image
          src={src}
          alt={alt ?? name}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className="relative z-10 h-full w-full object-contain"
        />
      )}
    </div>
  );
}
