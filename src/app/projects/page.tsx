import type { Metadata } from "next";
import ProjectRow from "@/components/ProjectRow";
import Footer from "@/components/Footer";
import { projects } from "@/data/site";

export const metadata: Metadata = {
  title: "Projects — Lulu Wang",
  description: "Selected product design and research work by Lulu Wang.",
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
      <section className="pt-12 pb-12 sm:pt-14 sm:pb-16 md:pt-20 md:pb-24">
        <h1 className="animate-rise text-[2.75rem] font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
          Projects
        </h1>
        <p
          className="font-secondary animate-rise mt-8 max-w-2xl text-base leading-[29px] text-muted sm:mt-10"
          style={{ animationDelay: "120ms" }}
        >
          A selection of product design, UX, and research work spanning
          fintech, social, and data-rich experiences.
        </p>
      </section>

      <section className="pb-10">
        {projects.map((project, i) => (
          <ProjectRow key={project.slug} project={project} index={i} showView />
        ))}
      </section>

      <Footer />
    </main>
  );
}
