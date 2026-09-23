import Link from "next/link";
import ProjectCover from "./ProjectCover";
import type { Project } from "@/data/site";

function plainText(text: string) {
  return text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/_([^_]+)_/g, "$1");
}

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const subtitle = plainText(project.description).split(".")[0] + ".";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="animate-rise group block"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <ProjectCover
        name={project.name}
        src={project.image}
        alt={project.name}
        screens={project.previewScreens}
        width={720}
        height={480}
        className="aspect-[239/158] rounded-[20px] transition duration-500 group-hover:opacity-90"
        sizes="(max-width: 768px) 50vw, 25vw"
      />
      <h3 className="mt-4 font-title text-[1.3rem] font-bold tracking-[-0.03em] sm:text-[1.45rem]">
        {project.name}
      </h3>
      <p className="mt-1.5 max-w-md text-[15px] leading-relaxed text-muted">
        {subtitle}
      </p>
      <p className="mt-2.5 text-[13px] leading-relaxed text-foreground/35">
        {project.tags.map((tag) => tag.label).join(" · ")}
      </p>
    </Link>
  );
}
