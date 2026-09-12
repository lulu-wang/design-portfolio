import Link from "next/link";
import Arrow from "@/components/Arrow";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import ContactForm from "@/components/ContactForm";
import HomeHero from "@/components/HomeHero";
import ScrollFillText from "@/components/ScrollFillText";
import { projects } from "@/data/site";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <ScrollFillText />

      <section className="page-wrap py-24 sm:py-32">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Featured Projects
          </h2>
          <Link
            href="/projects"
            className="arrow-link hidden items-center gap-2 text-sm text-foreground/50 transition-opacity hover:opacity-70 sm:inline-flex"
          >
            View All Work <Arrow className="h-2.5" />
          </Link>
        </div>
        <div className="mt-10 grid gap-12 sm:grid-cols-2 sm:gap-8 lg:gap-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
        <Link
          href="/projects"
          className="arrow-link mt-10 inline-flex items-center gap-2 text-sm text-foreground/50 sm:hidden"
        >
          View All Work <Arrow className="h-2.5" />
        </Link>
      </section>

      <section id="contact" className="page-wrap scroll-mt-28 pb-8">
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Let&rsquo;s talk.
        </h2>
        <p className="page-subtitle mt-5 max-w-xl">
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
