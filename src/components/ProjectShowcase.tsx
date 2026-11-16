import Link from "next/link";
import type { Project } from "@/data/site";
import { InteractivePhones, InteractiveStill } from "@/components/InteractivePreview";

function plainText(text: string) {
  return text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/_([^_]+)_/g, "$1");
}

const stages: Record<string, { wash: string; stage: string; ink: string }> = {
  "path-learning": { wash: "#E5F5DC", stage: "#2C5A42", ink: "#1A2A1C" },
  "canada-online-tutoring": { wash: "#E3F1F6", stage: "#1A3C4E", ink: "#102833" },
  opal: { wash: "#E4DCF8", stage: "#3C3266", ink: "#241C3A" },
  pulsefit: { wash: "#E8F0D6", stage: "#3A4A28", ink: "#1A1E14" },
  "netflix-community": { wash: "#F3E4E1", stage: "#3A2424", ink: "#1C1414" },
  yuugen: { wash: "#E7E0D4", stage: "#171717", ink: "#161616" },
  "alma-healthcare": { wash: "#E4D6FB", stage: "#4E3F7C", ink: "#2A2148" },
  pace: { wash: "#E7F6C8", stage: "#243018", ink: "#1A2414" },
};

export function projectTone(slug: string) {
  return stages[slug] ?? { wash: "#F4F0E8", stage: "#2A2A2A", ink: "#161616" };
}

export default function ProjectShowcase({ projects }: { projects: Project[] }) {
  return (
    <div className="flex flex-col gap-3 bg-[#F3F0E8] px-3 pb-6 sm:gap-4 sm:px-5 sm:pb-8 lg:px-8">
      {projects.map((project, index) => {
        const tone = projectTone(project.slug);
        const screens = project.previewScreens ?? [];
        const photo = project.slug === "yuugen";

        return (
          <article
            key={project.slug}
            className="group grid overflow-hidden rounded-[1.25rem] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]"
          >
            <Link
              href={`/projects/${project.slug}`}
              className="flex flex-col justify-between gap-10 px-6 py-8 sm:px-10 sm:py-12 lg:px-12 lg:py-14"
              style={{ background: tone.wash, color: tone.ink }}
            >
              <div>
                <p className="text-[13px] tracking-[-0.02em] opacity-70">
                  ({String(index + 1).padStart(2, "0")})
                </p>
                <h2 className="mt-8 text-[clamp(2.5rem,4.4vw,4.3rem)] font-medium leading-[0.95] tracking-[-0.045em]">
                  {project.name}
                </h2>
                <p className="mt-5 text-[15px] leading-snug opacity-80 sm:text-[16px]">
                  {plainText(project.description)}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <li
                      key={tag.label}
                      className="rounded-full border border-current/30 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em]"
                    >
                      {tag.label}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-[12px] font-medium uppercase tracking-[0.16em]">
                Read full case study
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  {" "}
                  →
                </span>
              </p>
            </Link>
            <div className="relative h-full min-h-[22rem]" style={{ background: tone.stage }}>
              {screens.length >= 2 ? (
                <InteractivePhones slug={project.slug} screens={screens} />
              ) : (
                <Link href={`/projects/${project.slug}`} className="block h-full">
                  <InteractiveStill src={project.image} alt={project.name} photo={photo} />
                </Link>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
