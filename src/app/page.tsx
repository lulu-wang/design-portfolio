import Link from "next/link";
import Arrow from "@/components/Arrow";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import HomeHero from "@/components/HomeHero";
import BackgroundSection from "@/components/BackgroundSection";
import { projects } from "@/data/site";

export default function Home() {
  return (
    <main>
      <HomeHero />

      <section className="page-wrap pb-28 sm:pb-36">
        <div className="flex items-baseline justify-between gap-6">
          <h2 className="section-label">
            Selected work
          </h2>
          <Link
            href="/projects"
            className="arrow-link color-hover hidden shrink-0 items-center gap-2 text-sm text-foreground/45 sm:inline-flex"
            style={{ "--hover": "#7C5CF6" } as React.CSSProperties}
          >
            View all work <Arrow className="h-2.5" />
          </Link>
        </div>
        <div className="mt-8 grid gap-10 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-14 lg:mt-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
        <Link
          href="/projects"
          className="arrow-link color-hover mt-12 inline-flex items-center gap-2 text-sm text-foreground/45 sm:hidden"
          style={{ "--hover": "#7C5CF6" } as React.CSSProperties}
        >
          View all work <Arrow className="h-2.5" />
        </Link>
      </section>

      <BackgroundSection />

      <div className="page-wrap">
        <Footer />
      </div>
    </main>
  );
}
