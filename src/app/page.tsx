import Link from "next/link";
import Arrow from "@/components/Arrow";
import ProjectRow from "@/components/ProjectRow";
import Footer from "@/components/Footer";
import { projects } from "@/data/site";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
      {/* Hero */}
      <section className="flex flex-col justify-center pt-32 pb-24 sm:pt-28 sm:pb-32 md:pt-36 md:pb-44">
        <div className="max-w-md">
          <h1 className="animate-rise text-[2.75rem] font-bold uppercase leading-[1.12] tracking-tight sm:text-5xl sm:leading-[0.95] md:text-6xl">
            <span className="block sm:inline">Hi,</span>{" "}
            <span className="mt-1 block sm:mt-0 sm:inline">
              I&rsquo;m{" "}
              <span className="font-cursive inline-block align-baseline text-[1.15em] font-medium normal-case text-foreground">
                Lulu Wang
              </span>
            </span>
          </h1>
          <p
            className="font-secondary animate-rise mt-10 max-w-md text-[17px] leading-[34px] text-[#5c5c5c] sm:mt-10 sm:text-lg sm:leading-[29px]"
            style={{ animationDelay: "160ms" }}
          >
            Product designer &amp; developer{" "}
            <span className="font-cursive text-[1.35em] text-foreground">
              inspired
            </span>{" "}
            to push the{" "}
            <span className="hl bg-lavender">boundaries</span> of design.
            <br className="hidden sm:block" />
            <span className="mt-3 block sm:mt-0 sm:inline">
              Previously at Meta.
            </span>
          </p>
          <Link
            href="/projects"
            className="arrow-link animate-rise mt-8 inline-flex items-center gap-3 text-sm font-bold tracking-widest text-foreground transition-opacity hover:opacity-60 sm:mt-12"
            style={{ animationDelay: "300ms" }}
          >
            VIEW PROJECTS <Arrow />
          </Link>
        </div>
      </section>

      {/* Selected projects */}
      <section className="pb-6">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-bold uppercase tracking-tight sm:text-xl md:text-2xl">
            Selected Projects
          </h2>
          <Link
            href="/projects"
            className="arrow-link flex shrink-0 items-center gap-1.5 text-xs font-bold tracking-widest transition-opacity hover:opacity-60"
          >
            VIEW ALL <Arrow className="h-2.5" />
          </Link>
        </div>

        <div className="mt-6 sm:mt-8">
          {projects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
