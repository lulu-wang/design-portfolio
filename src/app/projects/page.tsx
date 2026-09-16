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
        <h1 className="animate-rise font-title text-[clamp(2.35rem,5vw,4.15rem)] font-bold leading-[1.12] tracking-[-0.045em]">
          Projects
        </h1>
        <p
          className="page-subtitle animate-rise mt-6 max-w-3xl sm:mt-8"
          style={{ animationDelay: "80ms" }}
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
