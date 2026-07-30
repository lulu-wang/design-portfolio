import Image from "next/image";
import Link from "next/link";
import Arrow from "./Arrow";
import type { Project } from "@/data/site";

const tagClass: Record<Project["tags"][number]["variant"], string> = {
  outline:
    "border-[1.5px] border-black/90 bg-transparent text-foreground group-hover:border-white/80 group-hover:text-white",
  solid:
    "border-[1.5px] border-foreground bg-foreground text-background group-hover:border-white group-hover:bg-white group-hover:text-foreground",
  lavender:
    "border-[1.5px] border-lavender bg-lavender text-foreground group-hover:border-lavender",
};

function plainText(text: string) {
  return text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/_([^_]+)_/g, "$1");
}

export default function ProjectRow({
  project,
  index,
  showView = false,
}: {
  project: Project;
  index: number;
  showView?: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="animate-rise group -mx-7 block rounded-xl px-7 transition-colors duration-300 hover:bg-foreground sm:-mx-9 sm:px-9"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <article className="grid grid-cols-1 items-start gap-6 py-8 sm:gap-10 sm:py-10 md:grid-cols-[minmax(0,260px)_1fr] md:gap-14 lg:grid-cols-[minmax(0,300px)_1fr]">
        <div className="overflow-hidden rounded-md">
          <Image
            src={project.image}
            alt={project.name}
            width={720}
            height={480}
            className="aspect-[239/158] h-auto w-full bg-[#ececec] object-contain transition duration-500 group-hover:scale-[1.02] group-hover:opacity-90"
          />
        </div>

        <div className="min-w-0 pt-0.5">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-lg font-bold tracking-tight transition-colors duration-300 group-hover:text-white sm:text-xl md:text-[22px]">
              {project.name}
            </h3>
            {showView && (
              <span className="arrow-link flex shrink-0 items-center gap-1.5 text-sm text-foreground transition-colors duration-300 group-hover:text-white md:text-base">
                View <Arrow className="h-2.5" />
              </span>
            )}
          </div>

          <p className="font-secondary mt-4 max-w-2xl text-base leading-[1.55] text-muted transition-colors duration-300 group-hover:text-white/70 md:max-w-3xl md:text-lg md:leading-[1.55]">
            {plainText(project.description)}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag.label}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors duration-300 sm:text-[13px] ${tagClass[tag.variant]}`}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
