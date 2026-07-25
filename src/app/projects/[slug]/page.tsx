import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Arrow from "@/components/Arrow";
import Footer from "@/components/Footer";
import CaseSection from "@/components/CaseSection";
import Wireframe from "@/components/Wireframe";
import { projects } from "@/data/site";

const tagClass = {
  outline: "border-[1.5px] border-black/90 text-foreground bg-transparent",
  solid: "border-[1.5px] border-foreground bg-foreground text-background",
  lavender: "border-[1.5px] border-lavender bg-lavender text-foreground",
} as const;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project — Lulu Wang" };
  return {
    title: `${project.name} — Lulu Wang`,
    description: project.description,
  };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const cs = project.caseStudy;
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const meta = [
    { label: "Role", value: cs.meta.role },
    { label: "Timeline", value: cs.meta.timeline },
    { label: "Team", value: cs.meta.team },
    { label: "Platform", value: cs.meta.platform },
    { label: "Tools", value: cs.meta.tools.join(", ") },
  ];

  return (
    <main className="mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
      {/* Hero */}
      <section className="pt-8 sm:pt-10 md:pt-12">
        <Link
          href="/projects"
          className="arrow-link inline-flex items-center gap-2 text-xs font-bold tracking-widest text-muted transition-colors hover:text-foreground"
        >
          <Arrow className="h-2.5 rotate-180" /> ALL PROJECTS
        </Link>

        <div className="mt-8 max-w-4xl sm:mt-10">
          <h1
            className="animate-rise text-[2.1rem] font-bold uppercase leading-[0.95] tracking-tight sm:text-4xl md:text-5xl"
            style={{ animationDelay: "40ms" }}
          >
            {project.name}
          </h1>

          <div className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
            {project.tags.map((tag, i) => (
              <span
                key={tag.label}
                className={`animate-rise rounded-full px-[18px] py-2 text-xs font-medium sm:text-[13px] ${tagClass[tag.variant]}`}
                style={{ animationDelay: `${140 + i * 70}ms` }}
              >
                {tag.label}
              </span>
            ))}
          </div>

          <p
            className="font-secondary animate-rise mt-8 max-w-3xl text-base leading-[29px] text-foreground/70 sm:mt-10"
            style={{
              animationDelay: `${220 + project.tags.length * 70}ms`,
            }}
          >
            {cs.tagline}
          </p>
        </div>

        <div
          className="animate-rise mt-10 overflow-hidden rounded-xl bg-white sm:mt-12"
          style={{
            animationDelay: `${320 + project.tags.length * 70}ms`,
          }}
        >
          <Image
            src={project.image}
            alt={`${project.name} preview`}
            width={1200}
            height={800}
            className="aspect-[16/10] w-full object-cover sm:aspect-[16/9]"
            priority
          />
        </div>

        {/* Meta bar */}
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-y border-black/[0.07] py-8 sm:grid-cols-3 md:grid-cols-5 md:gap-8">
          {meta.map((item) => (
            <div key={item.label}>
              <dt className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
                {item.label}
              </dt>
              <dd className="mt-2 text-sm font-medium leading-snug">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Overview */}
      <CaseSection
        index="00"
        label="Overview"
        title="Project overview"
        intro={cs.overview}
        first
      />

      {/* Problem */}
      <CaseSection index="01" label="Problem" title={cs.problem.statement}>
        <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {cs.problem.points.map((point, i) => (
            <div key={i}>
              <div className="text-3xl font-bold tracking-tight text-foreground/15">
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                {point}
              </p>
            </div>
          ))}
        </div>
      </CaseSection>

      {/* Goals */}
      <CaseSection
        index="02"
        label="Goals"
        title="What we set out to achieve"
      >
        <ul className="mt-8 space-y-4">
          {cs.goals.map((goal, i) => (
            <li
              key={i}
              className="flex items-start gap-4 border-b border-black/[0.06] pb-4 last:border-0"
            >
              <span className="mt-0.5 text-sm font-bold tabular-nums text-foreground/30">
                0{i + 1}
              </span>
              <span className="text-base leading-[29px] text-foreground/80">
                {goal}
              </span>
            </li>
          ))}
        </ul>
      </CaseSection>

      {/* Research */}
      <CaseSection
        index="03"
        label="Research"
        title="User & market research"
        intro={cs.research.intro}
      >
        {/* Methods */}
        <div className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-3">
          {cs.research.methods.map((method) => (
            <div key={method.title}>
              <h3 className="text-base font-bold">{method.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {method.description}
              </p>
            </div>
          ))}
        </div>

        {/* Key insights */}
        <div className="mt-14 rounded-xl bg-white p-6 sm:p-8">
          <div className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-muted">
            Key insights
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {cs.research.insights.map((insight) => (
              <div key={insight.label}>
                <div className="text-4xl font-bold tracking-tight sm:text-5xl">
                  {insight.stat}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {insight.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Persona */}
        <div className="mt-6 rounded-xl bg-white p-6 sm:p-8">
          <div className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-muted">
            Primary persona
          </div>
          <div className="grid gap-8 md:grid-cols-[220px_1fr] md:gap-10">
            <div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lavender text-xl font-bold">
                {cs.research.persona.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h3 className="mt-4 text-base font-bold">
                {cs.research.persona.name}
              </h3>
              <p className="text-sm text-muted">{cs.research.persona.role}</p>
              <p className="mt-4 border-l-2 border-lavender pl-4 text-sm italic leading-relaxed text-foreground/70">
                “{cs.research.persona.quote}”
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
                  Goals
                </div>
                <ul className="mt-3 space-y-2.5">
                  {cs.research.persona.goals.map((g, i) => (
                    <li
                      key={i}
                      className="flex gap-2.5 text-sm leading-relaxed text-foreground/80"
                    >
                      <span className="text-foreground/40">+</span>
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
                  Frustrations
                </div>
                <ul className="mt-3 space-y-2.5">
                  {cs.research.persona.frustrations.map((f, i) => (
                    <li
                      key={i}
                      className="flex gap-2.5 text-sm leading-relaxed text-foreground/80"
                    >
                      <span className="text-foreground/40">−</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CaseSection>

      {/* Information architecture */}
      <CaseSection
        index="04"
        label="Architecture"
        title="Information architecture & user flow"
        intro={cs.ia.intro}
      >
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {cs.ia.flow.map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <div className="flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-medium">
                <span className="text-xs font-bold text-foreground/30">
                  {i + 1}
                </span>
                {step}
              </div>
              {i < cs.ia.flow.length - 1 && (
                <Arrow className="hidden h-3 text-muted sm:block" />
              )}
            </div>
          ))}
        </div>
      </CaseSection>

      {/* Low-fidelity wireframes */}
      <CaseSection
        index="05"
        label="Wireframes"
        title="Low-fidelity wireframes"
        intro={cs.wireframes.lowFi}
      >
        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6">
          {cs.wireframes.lowFiVariants.map((variant, i) => (
            <Wireframe
              key={i}
              variant={variant}
              label={`Screen ${String(i + 1).padStart(2, "0")}`}
            />
          ))}
        </div>
      </CaseSection>

      {/* High-fidelity designs */}
      <CaseSection
        index="06"
        label="Visual Design"
        title="High-fidelity designs"
        intro={cs.wireframes.hiFi}
      >
        <div className="mt-12 overflow-hidden rounded-xl bg-white">
          <Image
            src={project.image}
            alt={`${project.name} high fidelity designs`}
            width={1200}
            height={800}
            className="w-full object-cover"
          />
        </div>
      </CaseSection>

      {/* Solution / key features */}
      <CaseSection
        index="07"
        label="Solution"
        title="The final solution"
        intro={cs.solution.intro}
      >
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl bg-black/[0.07] sm:grid-cols-3">
          {cs.solution.features.map((feature, i) => (
            <div key={feature.title} className="bg-background p-6 sm:p-7">
              <div className="text-sm font-bold text-foreground/30">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-4 text-base font-bold">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </CaseSection>

      {/* Outcomes */}
      <CaseSection index="08" label="Impact" title="Outcomes & impact">
        <div className="mt-10 grid gap-10 sm:grid-cols-3">
          {cs.outcomes.map((outcome) => (
            <div key={outcome.label}>
              <div className="text-5xl font-bold tracking-tight sm:text-6xl">
                {outcome.stat}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {outcome.label}
              </p>
            </div>
          ))}
        </div>
      </CaseSection>

      {/* Reflection */}
      <CaseSection
        index="09"
        label="Reflection"
        title="What I learned"
        intro={cs.reflection}
      />

      {/* Next project */}
      <section className="border-t border-black/[0.07] py-14 sm:py-16">
        <Link href={`/projects/${nextProject.slug}`} className="group block">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
            Next project
          </div>
          <div className="mt-4 flex items-center justify-between gap-6">
            <h2 className="text-2xl font-bold uppercase tracking-tight transition-opacity group-hover:opacity-60 sm:text-3xl md:text-4xl">
              {nextProject.name}
            </h2>
            <Arrow className="h-4 shrink-0 transition-transform group-hover:translate-x-2 sm:h-5" />
          </div>
        </Link>
      </section>

      <Footer />
    </main>
  );
}
