import type { Metadata } from "next";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import Arrow from "@/components/Arrow";
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
          Product design, UX, and research across health, learning, and
          community.
        </p>
      </section>

      <Link
        href="/prototypes/meeting-decision-extractor"
        className="animate-rise group mb-12 flex items-center justify-between gap-6 rounded-[20px] border border-black/[0.08] bg-white px-6 py-5 sm:mb-14 sm:px-8 sm:py-6"
      >
        <div>
          <p className="text-[13px] font-medium tracking-[0.14em] text-foreground/40 uppercase">
            Live prototype
          </p>
          <h2 className="mt-2 text-xl font-extrabold tracking-tight sm:text-2xl">
            Opal — Meeting notes
          </h2>
          <p className="mt-1.5 max-w-xl text-[15px] leading-relaxed text-muted">
            Transcript, task extraction, and a board where you can create and
            edit work from the meeting.
          </p>
        </div>
        <Arrow className="h-3.5 shrink-0 transition-transform group-hover:translate-x-2 sm:h-4" />
      </Link>

      <section className="grid gap-12 pb-10 sm:grid-cols-2 sm:gap-8 lg:gap-10">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </section>

      <Footer />
    </main>
  );
}
