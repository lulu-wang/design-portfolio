import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import CaseSection from "@/components/CaseSection";
import CaseBleed from "@/components/CaseBleed";
import CaseGallery from "@/components/CaseGallery";
import ProjectCover from "@/components/ProjectCover";
import Wireframe from "@/components/Wireframe";
import RichText from "@/components/RichText";
import BrandStyle from "@/components/BrandStyle";
import { projects, type Project } from "@/data/site";

export default function ProjectCaseStudy({ project }: { project: Project }) {
  const slug = project.slug;
  const cs = project.caseStudy;
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const personas = cs.research
    ? (cs.research.personas ?? (cs.research.persona ? [cs.research.persona] : []))
    : [];

  const toolsLine =
    cs.meta.tools.length > 0 ? cs.meta.tools.join("  ·  ") : null;
  const presentationExternal = Boolean(
    cs.presentation && /^https?:\/\//.test(cs.presentation.href),
  );

  const body = "text-[16px] leading-[1.47] text-black";
  const bodyMuted = "text-[16px] leading-[1.47] text-black";
  const subhead = "text-[16px] leading-[1.35] text-black";

  const meta = [
    { label: "Role", value: cs.meta.role },
    { label: "Timeline", value: cs.meta.timeline },
    { label: "Team", value: cs.meta.team },
    { label: "Platform", value: cs.meta.platform },
  ].filter((item) => item.value);

  return (
    <div className="folio bg-white text-black">
      <main className="folio-wrap pt-[4.5rem] md:pt-[5.5rem]">
        <section className="pb-4 pt-14 sm:pt-20">
          <Link href="/projects" className="text-[16px] hover:opacity-60">
            All projects
          </Link>

          <h1 className="mt-10 max-w-[16ch] text-[clamp(2rem,4vw,2.65rem)] font-normal leading-[1.12]">
            {project.name}
          </h1>
          <p className="mt-4 max-w-[36rem] text-[16px] leading-[1.47]">
            <RichText>{cs.tagline}</RichText>
            {cs.presentation && (
              <>
                {" "}
                <a
                  href={cs.presentation.href}
                  {...(presentationExternal
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className="underline underline-offset-4 hover:opacity-60"
                >
                  View {cs.presentation.label}
                </a>
              </>
            )}
          </p>

          <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="text-[23px] leading-[1.3]">{item.label}</dt>
                <dd className="mt-2 text-[16px] leading-[1.47]">{item.value}</dd>
              </div>
            ))}
          </dl>
          {toolsLine && (
            <p className="mt-8 text-[16px] leading-[1.47]">
              Tools · {toolsLine}
            </p>
          )}
        </section>

        <div className="mt-12 overflow-hidden bg-black/10">
          <ProjectCover
            name={project.name}
            src={project.image}
            alt={`${project.name} preview`}
            screens={project.previewScreens}
            width={2390}
            height={1580}
            className="aspect-[4/3] sm:aspect-[3/2]"
            sizes="100vw"
            priority
            size="hero"
            plain
          />
        </div>
        <CaseSection
          label="Overview"
          title="Overview"
          intro={cs.overview}
          first
        />

        {cs.problem && (
          <CaseSection
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
        )}

        {cs.goals && (
          <CaseSection
            label="Goals"
            title="Goals"
            intro={cs.goals}
          />
        )}

        {cs.research && (
        <CaseSection
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
                <div className="text-[28px] leading-none">
                  {insight.stat}
                </div>
                <p className="mt-2 text-[16px] leading-[1.47]">
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
        )}

        {cs.areas && (
          <CaseSection
            label="Redesign"
            title="Areas to redesign"
            intro={cs.areas.intro}
          >
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {cs.areas.items.map((item) => (
                <div key={item.title}>
                  <h3 className={subhead}>{item.title}</h3>
                  <p className={`mt-2 ${bodyMuted} [&_strong]:text-foreground`}>
                    <RichText>{item.description}</RichText>
                  </p>
                </div>
              ))}
            </div>
          </CaseSection>
        )}

        {cs.define && (
          <CaseSection
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

        {cs.ia && (
          <CaseSection
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
                  <div className="bg-black/10 px-4 py-2 text-[16px]">
                    {step}
                  </div>
                  {i < (cs.ia?.flow.length ?? 0) - 1 && (
                    <span className="hidden text-[16px] sm:block" aria-hidden>
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CaseSection>
        )}

        {cs.wireframes?.lowFi && (
          <CaseSection
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
        )}
      </main>

      {cs.wireframes?.images && cs.wireframes.images.length > 0 && (
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
          <div className="folio-wrap">
            <CaseSection
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

      <div className="folio-wrap">
        {cs.branding && (
          <CaseSection
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

        {cs.wireframes?.hiFi && (
          <CaseSection
            label="Hi-Fidelity"
            title="Hi-fidelity prototypes"
            intro={cs.wireframes.hiFi}
          />
        )}
        {cs.visuals && (cs.visuals.title || cs.visuals.intro) && (
          <CaseSection
            label={cs.visuals.label ?? "Collection"}
            title={cs.visuals.title ?? "Collection"}
            intro={cs.visuals.intro}
          />
        )}
      </div>

      {(cs.visuals?.banner ||
        (cs.visuals?.beforeImages?.length ?? 0) > 0 ||
        (cs.visuals?.images.length ?? 0) > 0 ||
        (cs.visuals?.galleries?.length ?? 0) > 0 ||
        cs.wireframes?.hiFi) && (
        <CaseBleed>
          {cs.visuals?.banner && (
            <figure className="bg-white px-5 py-10 sm:px-8 sm:py-14 md:px-12">
              {cs.visuals.banner.heading && (
                <h3 className="mx-auto mb-8 max-w-5xl text-center text-[23px] font-normal leading-[1.3] text-black sm:mb-10">
                  {cs.visuals.banner.heading}
                </h3>
              )}
              <Image
                src={cs.visuals.banner.src}
                alt={cs.visuals.banner.alt}
                width={cs.visuals.banner.width ?? 1600}
                height={cs.visuals.banner.height ?? 800}
                className="mx-auto h-auto w-full max-w-5xl object-contain"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
              {cs.visuals.banner.caption && (
                <figcaption className="mx-auto mt-3 max-w-5xl text-center text-xs tracking-wide text-muted">
                  {cs.visuals.banner.caption}
                </figcaption>
              )}
            </figure>
          )}
          {cs.visuals?.beforeImages && cs.visuals.beforeImages.length > 0 && (
            <CaseGallery
              items={cs.visuals.beforeImages}
              layout="pair"
              tone="muted"
              flush
            />
          )}
          {cs.visuals &&
          ((cs.visuals.images.length ?? 0) > 0 ||
            (cs.visuals.galleries?.length ?? 0) > 0) ? (
            <>
              {cs.visuals.galleryTitle && (
                <h3 className="px-5 pt-12 text-center text-[23px] font-normal leading-[1.3] text-black sm:px-8 sm:pt-16">
                  {cs.visuals.galleryTitle}
                </h3>
              )}
              {cs.visuals.images.length > 0 && (
                <CaseGallery
                  items={cs.visuals.images}
                  layout={cs.visuals.layout ?? "phones"}
                  tone={cs.visuals.tone ?? "dark"}
                  roomy={cs.visuals.roomy}
                  flush={Boolean(cs.visuals.banner)}
                  heading={cs.visuals.heading}
                />
              )}
              {cs.visuals.galleries?.map((gallery, index) => (
                <CaseGallery
                  key={gallery.heading ?? gallery.images[0]?.src ?? index}
                  items={gallery.images}
                  layout={gallery.layout ?? "full"}
                  tone={gallery.tone ?? cs.visuals?.tone ?? "dark"}
                  roomy={gallery.roomy}
                  flush
                  heading={gallery.heading}
                />
              ))}
            </>
          ) : (
            <div className="mt-12 overflow-hidden bg-[#f6f6f4]">
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
      )}

      <main className="folio-wrap">
        {cs.solution && (
          <CaseSection
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
        )}

        {cs.testing && (
          <CaseSection
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

        {cs.outcomes && cs.outcomes.length > 0 && (
          <CaseSection
            label="Impact"
            title="Impact"
          >
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              {cs.outcomes.map((outcome) => (
                <div key={outcome.label}>
                  <div className="text-[28px] leading-none">
                    {outcome.stat}
                  </div>
                  <p className="mt-2 text-[16px] leading-[1.47]">
                    {outcome.label}
                  </p>
                </div>
              ))}
            </div>
          </CaseSection>
        )}

        {cs.reflection && (
          <CaseSection
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
        )}

        <section className="py-14 sm:py-20">
          <Link href={`/projects/${nextProject.slug}`} className="block hover:opacity-60">
            <p className="text-[16px]">Next</p>
            <h2 className="mt-2 text-[clamp(1.75rem,3vw,2.65rem)] font-normal leading-[1.15]">
              {nextProject.name}
            </h2>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
