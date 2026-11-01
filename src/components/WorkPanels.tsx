import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/site";
import { titleHover } from "@/components/ProjectCard";

function plainText(text: string) {
  return text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/_([^_]+)_/g, "$1");
}

const grounds: Record<string, { bg: string; fg: string }> = {
  opal: { bg: "#EEEAF6", fg: "#1A1724" },
  "path-learning": {
    bg: "radial-gradient(90% 70% at 8% 12%, #F0D9F7 0%, transparent 52%), radial-gradient(80% 60% at 96% 88%, #D7CFFE 0%, transparent 48%), radial-gradient(60% 46% at 92% 8%, #B6D8FE 0%, transparent 42%), linear-gradient(165deg, #F7FBF4 0%, #E3F5DF 58%, #D7EED0 100%)",
    fg: "#1A2418",
  },
  pulsefit: { bg: "#C9D3B8", fg: "#1A1E14" },
  "netflix-community": { bg: "#D2C6C4", fg: "#1C1414" },
  yuugen: { bg: "#1A1A1A", fg: "#FFFFFF" },
  "canada-online-tutoring": { bg: "#E7F0F4", fg: "#002538" },
};

const spans = [
  "lg:col-span-7 lg:min-h-[44rem]",
  "lg:col-span-5 lg:min-h-[44rem]",
  "lg:col-span-4 lg:min-h-[38rem]",
  "lg:col-span-4 lg:min-h-[38rem]",
  "lg:col-span-4 lg:min-h-[38rem]",
  "lg:col-span-12 lg:min-h-[36rem]",
];

const panelPhones: Record<string, { src: string; alt: string }[]> = {
  "path-learning": [
    {
      src: "/images/projects/path-learning/hifi/01-splash.png",
      alt: "Path Learning splash — Explore and Master New Skills",
    },
    {
      src: "/images/projects/path-learning/hifi/04-syllabus.png",
      alt: "Path Learning home — Today's Syllabus",
    },
  ],
  pulsefit: [
    {
      src: "/images/projects/pulsefit/final/15.png",
      alt: "PulseFit workout detail",
    },
    {
      src: "/images/projects/pulsefit/final/16.png",
      alt: "PulseFit nutrition",
    },
  ],
};

function PanelPhones({ screens }: { screens: { src: string; alt: string }[] }) {
  const single = screens.length === 1;

  return (
    <div className="relative z-10 flex h-full min-h-0 items-end justify-center gap-[4%] px-1 pt-5">
      {screens.map((screen) => (
        <div
          key={screen.src}
          className={`h-[96%] ${single ? "max-w-[54%]" : "max-w-[44%]"}`}
          style={{ aspectRatio: "393 / 852" }}
        >
          <div
            className={`flex h-full flex-col bg-[#161616] shadow-[0_18px_36px_rgba(0,0,0,0.28)] ${
              screen.src.includes("path-learning")
                ? "rounded-[1rem] p-[3px] sm:rounded-[1.45rem] sm:p-[6px]"
                : "rounded-[1.45rem] p-[6px]"
            }`}
          >
            <div
              className={`relative min-h-0 flex-1 overflow-hidden bg-white ${
                screen.src.includes("path-learning")
                  ? "rounded-[0.8rem] sm:rounded-[1.1rem]"
                  : "rounded-[1.1rem]"
              }`}
            >
              <Image
                src={screen.src}
                alt={screen.alt}
                fill
                className={`object-center ${
                  screen.src.includes("path-learning")
                    ? "object-cover"
                    : "object-contain"
                }`}
                sizes={single ? "240px" : "180px"}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function WorkPanels({ projects }: { projects: Project[] }) {
  return (
    <div className="grid lg:grid-cols-12">
      {projects.map((project, index) => {
        const tone = grounds[project.slug] ?? { bg: "#F7F4EF", fg: "#161616" };
        const photo = project.slug === "yuugen";
        const subtitle = plainText(project.description).split(".")[0] + ".";
        const hover = titleHover[project.slug] ?? tone.fg;

        return (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className={`group relative grid min-h-[30rem] grid-rows-[auto_1fr_auto] overflow-hidden p-5 sm:min-h-[34rem] sm:p-7 ${spans[index] ?? "lg:col-span-4"}`}
            style={
              {
                background: tone.bg,
                color: tone.fg,
                "--hover": hover,
              } as React.CSSProperties
            }
          >
            {photo ? (
              <>
                <Image
                  src={project.image}
                  alt=""
                  fill
                  className="object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/25" />
              </>
            ) : null}

            <div className="relative z-10 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.22em] opacity-70">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{project.tags[0]?.label}</span>
            </div>

            {photo ? (
              <div className="relative z-10" />
            ) : panelPhones[project.slug] ? (
              <PanelPhones screens={panelPhones[project.slug]} />
            ) : project.slug === "canada-online-tutoring" ? (
              <div className="relative z-10 min-h-[16rem] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-contain object-center transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
            ) : (
              <div className="relative z-10 min-h-[14rem]">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-contain object-center transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}

            <div className="relative z-10 pt-6">
              <h3 className="font-display text-[clamp(2.15rem,3.6vw,3.7rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.055em] transition-colors duration-300 group-hover:text-[var(--hover)]">
                {project.name}
              </h3>
              <p className="mt-3 max-w-md text-[14px] leading-relaxed opacity-70 sm:text-[15px]">
                {subtitle}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
