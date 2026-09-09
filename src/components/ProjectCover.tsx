import Image from "next/image";

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
}) {
  const words = name
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .toUpperCase()
    .split(/\s+/)
    .filter(Boolean);
  const stacked = words.length > 1;
  const hero = size === "hero";

  return (
    <div
      className={`relative isolate overflow-hidden bg-[#ececec] ${className}`}
      style={{ containerType: "size" }}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-0 flex items-center overflow-hidden ${
          stacked ? "justify-start pl-[6%] pr-[4%]" : "justify-center"
        }`}
      >
        <span
          className={`select-none font-extrabold uppercase tracking-[-0.07em] text-black/[0.2] transition-colors duration-300 group-hover:text-black/[0.26] ${
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
      <Image
        src={src}
        alt={alt ?? name}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className="relative z-10 h-full w-full object-contain"
      />
    </div>
  );
}
