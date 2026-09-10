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
        width={720}
        height={480}
        className="aspect-[239/158] rounded-[20px] transition duration-500 group-hover:opacity-90"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <h3 className="mt-5 text-2xl font-extrabold tracking-tight sm:text-[1.75rem]">
        {project.name}
      </h3>
      <p className="mt-1.5 max-w-md text-[15px] leading-relaxed text-muted">
        {subtitle}
      </p>
    </Link>
  );
}
