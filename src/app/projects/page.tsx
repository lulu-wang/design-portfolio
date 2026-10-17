import type { Metadata } from "next";
import Footer from "@/components/Footer";
import WorkPanels from "@/components/WorkPanels";
import { projects } from "@/data/site";

export const metadata: Metadata = {
  title: "Projects — Lulu Wang",
  description: "Selected product design and research work by Lulu Wang.",
};

export default function ProjectsPage() {
  return (
    <main className="flex flex-col">
      <section className="bg-[#F7F4EF] px-5 pb-14 pt-32 sm:px-8 sm:pb-16 sm:pt-36 lg:px-12 lg:pb-20">
        <h1 className="font-display text-[clamp(3.2rem,8vw,7rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.06em]">
          Selected work
        </h1>
        <p className="mt-6 max-w-4xl text-[16px] leading-relaxed text-foreground/60 sm:text-[18px]">
          Product design, brand, and research across meetings, health, learning,
          streaming, and apparel.
        </p>
      </section>

      <section>
        <WorkPanels projects={projects} />
      </section>

      <Footer />
    </main>
  );
}
