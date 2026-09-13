import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import { projects } from "@/data/site";

export const metadata: Metadata = {
  title: "Projects — Lulu Wang",
  description: "Selected product design and research work by Lulu Wang.",
};

export default function ProjectsPage() {
  return (
    <main className="page-wrap pt-28 sm:pt-32">
      <section className="pt-6 pb-12 sm:pb-16 md:pb-20">
        <p className="animate-rise text-[13px] font-medium uppercase tracking-[0.18em] text-foreground/40">
          /Work
        </p>
        <h1 className="animate-rise mt-4 text-[clamp(3rem,10vw,6rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em]">
          Projects
        </h1>
        <p
          className="page-subtitle animate-rise mt-8 max-w-3xl"
          style={{ animationDelay: "120ms" }}
        >
          Product design, brand, and research across meetings, health, learning,
          streaming, and apparel.
        </p>
      </section>

      <section className="grid gap-12 pb-10 sm:grid-cols-2 sm:gap-8 lg:gap-10">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </section>

      <Footer />
    </main>
  );
}
