import Link from "next/link";
import Arrow from "@/components/Arrow";
import ProjectRow from "@/components/ProjectRow";
import Footer from "@/components/Footer";
import { projects } from "@/data/site";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
      <section className="flex flex-col justify-center pt-28 pb-24 sm:pt-32 sm:pb-32 md:pt-40 md:pb-44">
        <div className="max-w-2xl md:max-w-3xl">
          <h1 className="animate-rise text-[2.75rem] font-bold leading-[1.08] tracking-tight sm:text-5xl sm:leading-[1.05] md:text-6xl md:leading-[1.02]">
            Hi, I&rsquo;m{" "}
            <span className="font-cursive inline-block align-baseline text-[1.15em] font-medium normal-case tracking-normal text-foreground">
              Lulu Wang
            </span>
          </h1>
          <p
            className="page-subtitle animate-rise mt-10 max-w-md md:max-w-lg"
            style={{ animationDelay: "160ms" }}
          >
            Product designer &amp; developer{" "}
            <span className="font-cursive text-[1.35em] font-medium normal-case tracking-normal text-foreground">
              inspired
            </span>{" "}
            to push the{" "}
            <span className="hl bg-lavender">boundaries</span> of design.
            Previously at Meta.
          </p>
          <Link
            href="/projects"
            className="arrow-link animate-rise mt-10 inline-flex items-center gap-3 text-lg text-foreground transition-opacity hover:opacity-60 md:text-xl"
            style={{ animationDelay: "300ms" }}
          >
            View projects <Arrow />
          </Link>
        </div>
      </section>

      <section className="pb-6">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            Selected projects
          </h2>
          <Link
            href="/projects"
            className="arrow-link flex shrink-0 items-center gap-1.5 text-base text-foreground/50 transition-opacity hover:opacity-60 md:text-lg"
          >
            View all <Arrow className="h-3" />
          </Link>
        </div>

        <div className="mt-8 sm:mt-10">
          {projects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
