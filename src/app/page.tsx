import Link from "next/link";
import Arrow from "@/components/Arrow";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import ContactForm from "@/components/ContactForm";
import HomeHero from "@/components/HomeHero";
import { projects } from "@/data/site";

export default function Home() {
  return (
    <main>
      <HomeHero />

      <section className="page-wrap pb-24 sm:pb-32">
        <div className="flex items-baseline justify-between gap-6">
          <h2 className="font-title text-[1.45rem] font-bold tracking-[-0.03em] sm:text-[1.65rem]">
            Selected work
          </h2>
          <Link
            href="/projects"
            className="arrow-link hidden shrink-0 items-center gap-2 text-sm text-foreground/50 transition-opacity hover:opacity-70 sm:inline-flex"
          >
            View all work <Arrow className="h-2.5" />
          </Link>
        </div>
        <p className="page-subtitle mt-2 max-w-xl">
          Product design, brand, and research across meetings, health,
          learning, streaming, and apparel.
        </p>
        <div className="mt-10 grid gap-12 sm:grid-cols-2 sm:gap-8 lg:mt-12 lg:gap-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
        <Link
          href="/projects"
          className="arrow-link mt-10 inline-flex items-center gap-2 text-sm text-foreground/50 sm:hidden"
        >
          View all work <Arrow className="h-2.5" />
        </Link>
      </section>

      <section id="contact" className="page-wrap scroll-mt-28 pb-8">
        <h2 className="font-title text-[1.45rem] font-bold tracking-[-0.03em] sm:text-[1.65rem]">
          Let&rsquo;s talk
        </h2>
        <p className="page-subtitle mt-3 max-w-xl">
          Have a project or a role in mind? Fill out the form, and I&rsquo;ll
          get back to you soon.
        </p>
        <ContactForm />
      </section>

      <div className="page-wrap">
        <Footer />
      </div>
    </main>
  );
}
