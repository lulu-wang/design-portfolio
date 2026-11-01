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
                className={`block h-full w-full object-center ${
                  screen.src.includes("path-learning")
                    ? "object-cover"
                    : "object-contain"
                }`}
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
  const pathLearning = Boolean(
    screens?.some((screen) => screen.src.includes("path-learning")),
  );

  return (
    <div
      className={`relative isolate overflow-hidden bg-[#f6f6f4] ${className}`}
      style={
        pathLearning
          ? {
              containerType: "size",
              background:
                "radial-gradient(90% 70% at 8% 12%, #F0D9F7 0%, transparent 52%), radial-gradient(80% 60% at 96% 88%, #D7CFFE 0%, transparent 48%), radial-gradient(60% 46% at 92% 8%, #B6D8FE 0%, transparent 42%), linear-gradient(165deg, #F7FBF4 0%, #E3F5DF 58%, #D7EED0 100%)",
            }
          : { containerType: "size" }
      }
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-0 flex items-center overflow-hidden ${
          stacked ? "justify-start pl-[6%] pr-[4%]" : "justify-center"
        }`}
      >
        <span
          className={`font-display select-none font-bold uppercase tracking-[-0.06em] transition-colors duration-300 ${
            pathLearning
              ? "text-[#388068]/25 group-hover:text-[#388068]/35"
              : "text-foreground/[0.16] group-hover:text-foreground/[0.22]"
          } ${
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
