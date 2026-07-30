import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Arrow from "@/components/Arrow";
import Footer from "@/components/Footer";
import CaseSection from "@/components/CaseSection";
import CaseBleed from "@/components/CaseBleed";
import CaseGallery from "@/components/CaseGallery";
import Wireframe from "@/components/Wireframe";
import RichText from "@/components/RichText";
import BrandStyle from "@/components/BrandStyle";
import { projects } from "@/data/site";

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
    description: project.description.replace(/\*\*|_/g, ""),
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
  const personas = cs.research.personas ?? [cs.research.persona];
  const sectionOffset = cs.define ? 1 : 0;
  const onboardingOffset = cs.onboarding ? 1 : 0;
  const styleOffset = cs.branding ? 1 : 0;
  const testOffset = cs.testing ? 1 : 0;
  const padIdx = (n: number) => String(n + sectionOffset).padStart(2, "0");

  const metaLine = [cs.meta.role, cs.meta.timeline, cs.meta.team, cs.meta.platform]
    .filter(Boolean)
    .join("  ·  ");
  const toolsLine =
    cs.meta.tools.length > 0 ? cs.meta.tools.join("  ·  ") : null;

  const body = "font-secondary text-[15px] leading-[1.55] text-foreground/65 md:text-base md:leading-[1.6]";
  const bodyMuted = "font-secondary text-[15px] leading-[1.55] text-foreground/50 md:text-base md:leading-[1.6]";
  const subhead = "text-base font-bold tracking-tight md:text-lg";

  return (
    <>
      <main className="mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
        <section className="pt-8 sm:pt-10 md:pt-14">
          <Link
            href="/projects"
            className="arrow-link inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <Arrow className="h-2.5 rotate-180" /> All projects
          </Link>

          <div className="mt-10 max-w-3xl sm:mt-12">
            <h1 className="animate-rise text-[2.1rem] font-bold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl md:leading-[1.02]">
              {project.name}
            </h1>

            <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
              {project.tags.map((tag, i) => (
                <span
                  key={tag.label}
                  className={`animate-rise rounded-full px-3.5 py-1.5 text-xs font-medium sm:text-[13px] ${
                    tag.variant === "outline"
                      ? "border-[1.5px] border-black/90 bg-transparent text-foreground"
                      : tag.variant === "solid"
                        ? "border-[1.5px] border-foreground bg-foreground text-background"
                        : "border-[1.5px] border-lavender bg-lavender text-foreground"
                  }`}
                  style={{ animationDelay: `${140 + i * 70}ms` }}
                >
                  {tag.label}
                </span>
              ))}
            </div>

            <p
              className="page-subtitle animate-rise mt-6 max-w-3xl sm:mt-8 md:max-w-4xl [&_strong]:text-foreground [&_em]:text-foreground/80"
              style={{ animationDelay: `${220 + project.tags.length * 70}ms` }}
            >
              <RichText>{cs.tagline}</RichText>
              {cs.presentation && (
                <>
                  {" "}
                  <a
                    href={cs.presentation.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground"
                  >
                    View case study presentation
                  </a>
                </>
              )}
            </p>

            <p
              className="animate-rise mt-6 text-sm leading-relaxed text-foreground/45 md:text-[15px]"
              style={{ animationDelay: `${280 + project.tags.length * 70}ms` }}
            >
              {metaLine}
            </p>
            {toolsLine && (
              <p
                className="animate-rise mt-2 text-sm leading-relaxed text-foreground/45 md:text-[15px]"
                style={{ animationDelay: `${320 + project.tags.length * 70}ms` }}
              >
                <span className="text-foreground/30">Tools</span>
                <span className="mx-2.5 text-foreground/20">·</span>
                {toolsLine}
              </p>
            )}
          </div>
        </section>
      </main>

      <CaseBleed>
        <div
          className="animate-rise mt-10 overflow-hidden bg-[#ececec] sm:mt-14"
          style={{ animationDelay: "280ms" }}
        >
          <Image
            src={project.image}
            alt={`${project.name} preview`}
            width={2390}
            height={1580}
            className="h-auto w-full object-contain"
            sizes="100vw"
            priority
          />
        </div>
      </CaseBleed>

      <main className="mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
        <CaseSection
          index="00"
          label="Overview"
          title="Overview"
          intro={cs.overview}
          first
        />

        <CaseSection
          index="01"
          label="Problem"
          title={cs.problem.statement}
        >
          <div className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-6">
            {cs.problem.points.slice(0, 3).map((point) => (
              <p key={point} className={`${body} [&_strong]:text-foreground`}>
                <RichText>{point}</RichText>
              </p>
            ))}
          </div>
        </CaseSection>

        <CaseSection
          index="02"
          label="Goals"
          title="Goals"
          intro={cs.goals}
        />

        <CaseSection
          index="03"
          label="Research"
          title="Research"
          intro={cs.research.intro}
        >
          <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6">
            {cs.research.methods.map((method) => (
              <div key={method.title}>
                <h3 className={subhead}>{method.title}</h3>
                <p className={`mt-2 ${bodyMuted} [&_strong]:text-foreground`}>
                  <RichText>{method.description}</RichText>
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {cs.research.insights.map((insight) => (
              <div key={insight.label}>
                <div className="text-4xl font-bold tracking-tight sm:text-5xl">
                  {insight.stat}
                </div>
                <p className="mt-2 text-sm text-foreground/50 md:text-[15px]">
                  {insight.label}
                </p>
              </div>
            ))}
          </div>

          {cs.research.quotes && cs.research.quotes.length > 0 && (
            <ul className="mt-12 max-w-2xl space-y-4">
              {cs.research.quotes.slice(0, 3).map((quote) => (
                <li key={quote} className={`${bodyMuted} italic`}>
                  &ldquo;{quote}&rdquo;
                </li>
              ))}
            </ul>
          )}

          <div className="mt-12 space-y-10">
            {personas.map((persona) => (
              <div key={persona.name} className="max-w-2xl">
                <h3 className={subhead}>{persona.name}</h3>
                <p className="mt-1 text-sm text-foreground/40">{persona.role}</p>
                <p className={`mt-3 italic ${body}`}>
                  &ldquo;{persona.quote}&rdquo;
                </p>
                <div className="mt-4 grid gap-6 sm:grid-cols-2">
                  <ul className="space-y-1.5">
                    {persona.goals.slice(0, 2).map((g) => (
                      <li key={g} className={body}>
                        {g}
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-1.5">
                    {persona.frustrations.slice(0, 2).map((f) => (
                      <li key={f} className={bodyMuted}>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CaseSection>

        {cs.define && (
          <CaseSection
            index="04"
            label="Process"
            title="Process"
            intro={cs.define.intro}
          >
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <ol className="space-y-2.5">
                {cs.define.steps.map((step) => (
                  <li key={step} className={`${body} [&_strong]:text-foreground`}>
                    <RichText>{step}</RichText>
                  </li>
                ))}
              </ol>
              <ul className="space-y-2.5">
                {cs.define.timeline.map((item) => (
                  <li
                    key={item}
                    className={`${bodyMuted} [&_strong]:text-foreground`}
                  >
                    <RichText>{item}</RichText>
                  </li>
                ))}
              </ul>
            </div>
          </CaseSection>
        )}

        <CaseSection
          index={padIdx(4)}
          label="Architecture"
          title="Architecture"
          intro={cs.ia.intro}
        >
          {cs.ia.sitemap && cs.ia.sitemap.length > 0 && (
            <ul className="mt-8 max-w-xl space-y-2">
              {cs.ia.sitemap.map((item) => (
                <li key={item} className={body}>
                  {item}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
            {cs.ia.flow.map((step, i) => (
              <div key={step} className="flex items-center gap-2.5">
                <div className="rounded-full bg-white px-4 py-2 text-sm font-medium md:text-[15px]">
                  {step}
                </div>
                {i < cs.ia.flow.length - 1 && (
                  <Arrow className="hidden h-2.5 text-muted sm:block" />
                )}
              </div>
            ))}
          </div>
        </CaseSection>

        <CaseSection
          index={padIdx(5)}
          label="Wireframes"
          title="Wireframes"
          intro={cs.wireframes.lowFi}
        >
          {!cs.wireframes.images?.length && (
            <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6">
              {(cs.wireframes.lowFiVariants ?? ["dashboard", "list", "detail"]).map(
                (variant, i) => (
                  <Wireframe key={i} variant={variant} />
                ),
              )}
            </div>
          )}
        </CaseSection>
      </main>

      {cs.wireframes.images && cs.wireframes.images.length > 0 && (
        <CaseBleed>
          <CaseGallery
            items={cs.wireframes.images}
            layout={cs.wireframes.layout ?? "masonry"}
            tone="muted"
          />
        </CaseBleed>
      )}

      {cs.onboarding && (
        <>
          <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
            <CaseSection
              index={padIdx(6)}
              label="Onboarding"
              title="Onboarding quiz"
              intro={cs.onboarding.intro}
            >
              {cs.onboarding.insights && cs.onboarding.insights.length > 0 && (
                <div className="mt-8 grid gap-6 sm:grid-cols-3 sm:gap-6">
                  {cs.onboarding.insights.map((insight) => (
                    <div key={insight.title}>
                      <h3 className={subhead}>{insight.title}</h3>
                      <p
                        className={`mt-2 ${bodyMuted} [&_strong]:text-foreground`}
                      >
                        <RichText>{insight.description}</RichText>
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {cs.onboarding.quotes && cs.onboarding.quotes.length > 0 && (
                <ul className="mt-10 max-w-2xl space-y-3">
                  {cs.onboarding.quotes.slice(0, 2).map((quote) => (
                    <li key={quote} className={`${bodyMuted} italic`}>
                      &ldquo;{quote}&rdquo;
                    </li>
                  ))}
                </ul>
              )}
            </CaseSection>
          </div>

          <CaseBleed>
            <CaseGallery
              items={cs.onboarding.images}
              layout={cs.onboarding.layout ?? "phones"}
              tone="dark"
            />
          </CaseBleed>
        </>
      )}

      <div className="mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
        <CaseSection
          index={padIdx(6 + onboardingOffset)}
          label="Visual Design"
          title="Visual design"
          intro={cs.wireframes.hiFi}
        />

        {cs.branding && (
          <CaseSection
            index={padIdx(7 + onboardingOffset)}
            label="Style"
            title="Style"
            intro={cs.branding.intro}
          >
            <BrandStyle
              branding={cs.branding}
              subhead={subhead}
              body={body}
              bodyMuted={bodyMuted}
            />
          </CaseSection>
        )}
      </div>

      <CaseBleed>
        {cs.visuals && cs.visuals.images.length > 0 ? (
          <CaseGallery
            items={cs.visuals.images}
            layout={cs.visuals.layout ?? "phones"}
            tone="dark"
          />
        ) : (
          <div className="mt-12 overflow-hidden bg-[#ececec]">
            <Image
              src={project.image}
              alt={`${project.name} high fidelity designs`}
              width={2390}
              height={1580}
              className="h-auto w-full object-contain"
              sizes="100vw"
            />
          </div>
        )}
      </CaseBleed>

      <main className="mx-auto max-w-6xl px-5 sm:px-6 md:px-10">
        <CaseSection
          index={padIdx(7 + onboardingOffset + styleOffset)}
          label="Solution"
          title="Solution"
          intro={cs.solution.intro}
        >
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {cs.solution.features.map((feature) => (
              <div key={feature.title}>
                <h3 className={subhead}>{feature.title}</h3>
                <p className={`mt-2 ${bodyMuted} [&_strong]:text-foreground`}>
                  <RichText>{feature.description}</RichText>
                </p>
              </div>
            ))}
          </div>
        </CaseSection>

        {cs.testing && (
          <CaseSection
            index={padIdx(8 + onboardingOffset + styleOffset)}
            label="Test"
            title="Testing"
            intro={cs.testing.intro}
          >
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <ul className="space-y-2.5">
                {cs.testing.findings.map((item) => (
                  <li key={item} className={`${body} [&_strong]:text-foreground`}>
                    <RichText>{item}</RichText>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2.5">
                {cs.testing.iterations.map((item) => (
                  <li
                    key={item}
                    className={`${bodyMuted} [&_strong]:text-foreground`}
                  >
                    <RichText>{item}</RichText>
                  </li>
                ))}
              </ul>
            </div>
          </CaseSection>
        )}

        <CaseSection
          index={padIdx(8 + onboardingOffset + styleOffset + testOffset)}
          label="Impact"
          title="Impact"
        >
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {cs.outcomes.map((outcome) => (
              <div key={outcome.label}>
                <div className="text-4xl font-bold tracking-tight sm:text-5xl">
                  {outcome.stat}
                </div>
                <p className="mt-2 text-sm text-foreground/50 md:text-[15px]">
                  {outcome.label}
                </p>
              </div>
            ))}
          </div>
        </CaseSection>

        <CaseSection
          index={padIdx(9 + onboardingOffset + styleOffset + testOffset)}
          label="Conclusion"
          title="Reflection"
          intro={cs.reflection}
        >
          {cs.conclusion && (
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <ul className="space-y-2.5">
                {cs.conclusion.challenges.map((item) => (
                  <li key={item} className={`${body} [&_strong]:text-foreground`}>
                    <RichText>{item}</RichText>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2.5">
                {cs.conclusion.learnings.map((item) => (
                  <li key={item} className={`${body} [&_strong]:text-foreground`}>
                    <RichText>{item}</RichText>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2.5">
                {cs.conclusion.nextSteps.map((item) => (
                  <li
                    key={item}
                    className={`${bodyMuted} [&_strong]:text-foreground`}
                  >
                    <RichText>{item}</RichText>
                  </li>
                ))}
              </ul>
              <p className={`${body} [&_strong]:text-foreground`}>
                <RichText>{cs.conclusion.proud}</RichText>
              </p>
            </div>
          )}
        </CaseSection>

        <section className="border-t border-black/[0.07] py-14 sm:py-16">
          <Link href={`/projects/${nextProject.slug}`} className="group block">
            <p className="text-sm text-foreground/40">Next</p>
            <div className="mt-2 flex items-center justify-between gap-6">
              <h2 className="text-2xl font-bold tracking-tight transition-opacity group-hover:opacity-60 sm:text-3xl md:text-4xl">
                {nextProject.name}
              </h2>
              <Arrow className="h-3.5 shrink-0 transition-transform group-hover:translate-x-2 sm:h-4" />
            </div>
          </Link>
        </section>

        <Footer />
      </main>
    </>
  );
}
