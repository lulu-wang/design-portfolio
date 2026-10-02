import Link from "next/link";
import ProjectCover from "./ProjectCover";
import type { Project } from "@/data/site";

function plainText(text: string) {
  return text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/_([^_]+)_/g, "$1");
}

export const titleHover: Record<string, string> = {
  opal: "#7C5CF6",
  "path-learning": "#388068",
  pulsefit: "#6B9A12",
  "netflix-community": "#E50914",
  yuugen: "#C45C6A",
};

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const subtitle = plainText(project.description).split(".")[0] + ".";
  const hover = titleHover[project.slug] ?? "#161616";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="animate-rise group block"
      style={
        {
          animationDelay: `${index * 90}ms`,
          "--hover": hover,
        } as React.CSSProperties
      }
    >
      <ProjectCover
        name={project.name}
        src={project.image}
        alt={project.name}
        screens={project.previewScreens}
        width={720}
        height={480}
        className="aspect-[239/158] rounded-[28px] transition duration-500 group-hover:opacity-95"
        sizes="(max-width: 768px) 50vw, 25vw"
      />
      <h3 className="mt-5 font-display text-[1.35rem] font-semibold tracking-[-0.03em] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-[var(--hover)] sm:text-[1.5rem]">
        {project.name}
      </h3>
      <p className="font-reading mt-1.5 max-w-md text-[15px] leading-relaxed text-muted">
        {subtitle}
      </p>
      <p className="font-reading mt-2.5 text-[12px] font-medium tracking-[-0.01em] text-foreground/30">
        {project.tags.map((tag) => tag.label).join(" · ")}
      </p>
    </Link>
  );
}
