import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ProjectShowcase from "@/components/ProjectShowcase";
import { projects } from "@/data/site";

export const metadata: Metadata = {
  title: "Projects — Lulu Wang",
  description: "Selected product design and research work by Lulu Wang.",
};

export default function ProjectsPage() {
  return (
    <main className="flex flex-col bg-[#F3F0E8]">
      <section className="page-inset bg-[#F3F0E8] pb-8 pt-32 sm:pb-10 sm:pt-36">
        <h1 className="text-[clamp(3rem,7vw,5.5rem)] font-medium leading-[0.92] tracking-[-0.05em]">
          Selected work
        </h1>
        <p className="mt-5 text-[16px] leading-relaxed text-foreground/65 sm:text-[18px]">
          Product design, brand, and research across finance, health, learning,
          meetings, streaming, and apparel.
        </p>
      </section>

      <ProjectShowcase projects={projects} />

      <Footer />
    </main>
  );
}
