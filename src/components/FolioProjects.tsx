import Image from "next/image";
import Link from "next/link";
import { projects, type Project } from "@/data/site";

const blurbs: Record<string, string> = {
  opal: "Meetings, decisions, and tasks in one desktop workspace",
  "canada-online-tutoring": "A clearer site for families choosing a tutor",
  "path-learning": "Skill paths, assignments, and mentor feedback",
  pulsefit: "Simple fitness and diet tracking",
  "netflix-community": "Private circles for spoiler-safe watching",
  yuugen: "Streetwear drawn, printed, and worn",
};

function plainText(text: string) {
  return text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/_([^_]+)_/g, "$1");
}

function blurbFor(project: Project) {
  return (
    blurbs[project.slug] ??
    plainText(project.description).split(".")[0]
  );
}

function PhonePair({
  screens,
}: {
  screens: { src: string; alt: string }[];
}) {
  return (
    <div className="flex h-full items-end justify-center gap-[4%] px-[10%] pb-[8%] pt-[10%]">
      {screens.slice(0, 2).map((screen) => (
        <div
          key={screen.src}
          className="h-[88%] max-w-[34%]"
          style={{ aspectRatio: "393 / 852" }}
        >
          <div className="flex h-full flex-col rounded-[1.35rem] bg-[#161616] p-[5px] shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-[1.05rem] bg-white">
              <Image
                src={screen.src}
                alt={screen.alt}
                fill
                className={`object-center ${
                  screen.src.includes("path-learning")
                    ? "object-cover"
                    : "object-contain"
                }`}
                sizes="220px"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FolioProjects() {
  return (
    <div className="grid grid-cols-1 gap-12 sm:grid-cols-2">
      {projects.map((project, index) => {
        const wide = index === 0;
        const screens = project.previewScreens;
        const fill = project.slug === "yuugen";

        return (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className={`group block ${wide ? "sm:col-span-2" : ""}`}
          >
            <div
              className={`overflow-hidden bg-black/10 ${
                wide ? "aspect-[4/3] sm:aspect-[3/2]" : "aspect-square"
              }`}
            >
              <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                {screens && screens.length > 0 ? (
                  <PhonePair screens={screens} />
                ) : (
                  <div
                    className={`relative h-full w-full ${
                      fill || wide ? "" : "p-[8%]"
                    }`}
                  >
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      priority={index === 0}
                      className={fill || wide ? "object-cover" : "object-contain"}
                      sizes={wide ? "100vw" : "(max-width: 640px) 100vw, 50vw"}
                    />
                  </div>
                )}
              </div>
            </div>
            <h2 className="mt-4 text-[22px] leading-[1.35] text-black sm:text-[24px]">
              {project.name}
            </h2>
            <p className="text-[16px] leading-[1.47] text-black">
              {blurbFor(project)}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
