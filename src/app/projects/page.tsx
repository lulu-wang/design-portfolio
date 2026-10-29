import type { Metadata } from "next";
import Footer from "@/components/Footer";
import FolioProjects from "@/components/FolioProjects";

export const metadata: Metadata = {
  title: "Projects — Lulu Wang",
  description: "Selected product design and research work by Lulu Wang.",
};

export default function ProjectsPage() {
  return (
    <main className="folio flex min-h-svh flex-col bg-white pt-[4.5rem] text-black md:pt-[5.5rem]">
      <section className="folio-wrap flex-1 py-16 sm:py-20 lg:py-24">
        <h1 className="text-[28px] leading-[1.3]">Selected work</h1>
        <div className="mt-10">
          <FolioProjects />
        </div>
      </section>
      <Footer />
    </main>
  );
}
