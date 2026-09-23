import Image from "next/image";

type PreviewScreen = { src: string; alt: string };

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
        >
          <div className="absolute inset-0 rounded-[18%] bg-[#111] p-[5.5%] shadow-[0_14px_28px_rgba(0,0,0,0.22)] ring-1 ring-white/10">
            <div className="h-full w-full overflow-hidden rounded-[13%] bg-white">
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
      className={`relative isolate overflow-hidden bg-[#f2f3f5] ${className}`}
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
      {pair && screens ? (
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
