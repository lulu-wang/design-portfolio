import Image from "next/image";
import Link from "next/link";
import Arrow from "@/components/Arrow";
import Footer from "@/components/Footer";
import CaseSection from "@/components/CaseSection";
import CaseBleed from "@/components/CaseBleed";
import CaseGallery from "@/components/CaseGallery";
import { titleHover } from "@/components/ProjectCard";
import { projectTone } from "@/components/ProjectShowcase";
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
  const presentationLinks = cs.presentation
    ? [cs.presentation, ...(cs.presentation.more ?? [])]
    : [];

  const body = "font-reading text-[15px] leading-[1.55] text-foreground/65 md:text-base md:leading-[1.6]";
  const bodyMuted = "font-reading text-[15px] leading-[1.55] text-foreground/50 md:text-base md:leading-[1.6]";
  const subhead = "font-display text-base font-semibold tracking-[-0.03em] md:text-lg";

  const tone = projectTone(slug);
  const screens = project.previewScreens ?? [];

  return (
    <div style={{ background: tone.wash, color: "#151515" }}>
      <header
        className="sticky top-0 z-40 border-b border-[#151515]/20 px-5 py-4 sm:px-8"
        style={{ background: tone.wash }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between text-[11px] font-medium uppercase tracking-[0.18em]">
          <p>
            Case study {String(currentIndex + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </p>
          <Link href="/projects" className="inline-flex items-center gap-2">
            All projects
            <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full border border-current text-[13px]">
              ×
            </span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 pb-16 pt-12 sm:px-10 sm:pt-16">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] opacity-60">
          {project.tags.map((tag) => tag.label).join("  ·  ")}
        </p>
        <div className="mt-8 grid items-end gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.8fr)]">
          <h1 className="text-[clamp(3.2rem,7vw,6.4rem)] font-medium leading-[0.9] tracking-[-0.05em]">
            {project.name}
          </h1>
          <p className="text-right text-[16px] leading-snug sm:text-[18px]">
            <RichText>{cs.tagline}</RichText>
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-6 border-t border-[#151515]/20 pt-5 sm:grid-cols-4">
          {[
            ["Role", cs.meta.role],
            ["Timeline", cs.meta.timeline],
            ["Team", cs.meta.team],
            ["Platform", cs.meta.platform],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] opacity-45">
                {label}
              </p>
              <p className="mt-2 text-[14px] leading-snug">{value}</p>
            </div>
          ))}
        </div>
        {toolsLine && (
          <p className="mt-4 text-[13px] opacity-60">Tools · {toolsLine}</p>
        )}
        {presentationLinks.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {presentationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(/^https?:\/\//.test(link.href)
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className="inline-flex items-center gap-2 rounded-full border border-[#151515] px-4 py-2 text-[12px] font-medium uppercase tracking-[0.14em]"
              >
                View {link.label}
                <Arrow className="h-2.5" />
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-8 sm:py-20" style={{ background: tone.stage }}>
        {screens.length >= 2 ? (
          <div className="flex items-end justify-center gap-3 sm:gap-8">
            {screens.slice(0, 2).map((screen, index) => (
              <div
                key={screen.src}
                className={`w-[46%] max-w-[280px] ${index === 0 ? "-rotate-6" : "rotate-3"}`}
              >
                <div className="rounded-[1.7rem] bg-[#111] p-[7px] shadow-[0_24px_50px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
                  <div className="relative aspect-[393/852] overflow-hidden rounded-[1.3rem] bg-white">
                    <Image
                      src={screen.src}
                      alt={screen.alt}
                      fill
                      priority
                      className="object-cover object-top"
                      sizes="280px"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Image
            src={project.image}
            alt={`${project.name} preview`}
            width={1600}
            height={1000}
            priority
            className="mx-auto h-auto w-full max-w-4xl object-contain"
            sizes="(max-width: 1024px) 100vw, 900px"
          />
        )}
      </div>

      <main className="mx-auto max-w-6xl bg-[#F4F1EA]">
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
                <div className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                  {insight.stat}
                </div>
                <p className="mt-2 text-sm text-foreground/50 md:text-[15px]">
                  {insight.label}
                </p>
              </div>
            ))}
          </div>

          {cs.research.quotes && cs.research.quotes.length > 0 && (
            <div className="-mx-6 mt-16 bg-[#111] px-6 py-16 text-[#F6F3EC] sm:-mx-10 sm:px-10 sm:py-24 lg:-mx-14 lg:px-14">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/45">
                Research insight
              </p>
              <blockquote className="mt-8 max-w-4xl font-serif text-[clamp(1.8rem,4.2vw,3.5rem)] leading-[1.12] tracking-[-0.03em]">
                &ldquo;{cs.research.quotes[0]}&rdquo;
              </blockquote>
              {cs.research.quotes.length > 1 && (
                <ul className="mt-10 max-w-2xl space-y-4 text-[15px] leading-relaxed text-white/70">
                  {cs.research.quotes.slice(1, 3).map((quote) => (
                    <li key={quote}>&ldquo;{quote}&rdquo;</li>
                  ))}
                </ul>
              )}
            </div>
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
            <ol className="mt-12 grid gap-8 border-t border-[#151515]/15 pt-8 sm:grid-cols-2 lg:grid-cols-3">
              {cs.define.steps.map((step, i) => (
                <li key={step}>
                  <p className="text-[12px] font-medium tracking-[0.16em] text-[#151515]/45">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className={`mt-3 ${body} [&_strong]:text-foreground`}>
                    <RichText>{step}</RichText>
                  </p>
                </li>
              ))}
            </ol>
            {cs.define.timeline.length > 0 && (
              <ul className="mt-10 grid gap-3 sm:grid-cols-2">
                {cs.define.timeline.map((item) => (
                  <li
                    key={item}
                    className={`${bodyMuted} [&_strong]:text-foreground`}
                  >
                    <RichText>{item}</RichText>
                  </li>
                ))}
              </ul>
            )}
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
                  <div className="rounded-full bg-white px-4 py-2 text-sm font-medium md:text-[15px]">
                    {step}
                  </div>
                  {i < (cs.ia?.flow.length ?? 0) - 1 && (
                    <Arrow className="hidden h-2.5 text-muted sm:block" />
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
          <div className="page-inset">
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

      <div className="page-inset">
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

        {cs.visuals && (cs.visuals.title || cs.visuals.intro) && (
          <CaseSection
            label={cs.visuals.label ?? "Collection"}
            title={cs.visuals.title ?? "Collection"}
            intro={cs.visuals.intro}
          />
        )}
      </div>

      {(cs.visuals?.galleries?.filter((gallery) => gallery.before).length ?? 0) > 0 && (
        <CaseBleed>
          {cs.visuals?.galleries
            ?.filter((gallery) => gallery.before)
            .map((gallery, index) => (
              <CaseGallery
                key={gallery.heading ?? gallery.images[0]?.src ?? index}
                items={gallery.images}
                layout={gallery.layout ?? "full"}
                tone={gallery.tone ?? cs.visuals?.tone ?? "dark"}
                roomy={gallery.roomy}
                wide={gallery.wide}
                scroll={gallery.scroll}
                heading={gallery.heading}
              />
            ))}
        </CaseBleed>
      )}

      {cs.wireframes?.hiFi && (
        <div className="page-inset">
          <CaseSection
            label="Hi-Fidelity"
            title="Hi-fidelity prototypes"
            intro={cs.wireframes.hiFi}
          />
        </div>
      )}

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
          {cs.visuals?.bridge && cs.visuals.bridge.images.length > 0 && (
            <section className="bg-[#111] px-5 py-12 sm:px-8 sm:py-16">
              <h3 className="mx-auto mb-8 max-w-5xl text-center text-[23px] font-normal leading-[1.3] text-white sm:mb-12">
                {cs.visuals.bridge.heading}
              </h3>
              <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 sm:gap-14">
                {cs.visuals.bridge.images.map((item) => (
                  <figure key={item.src} className="w-full">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={item.width ?? 1600}
                      height={item.height ?? 2400}
                      className="mx-auto h-auto w-full object-contain"
                      sizes="(max-width: 1024px) 100vw, 1024px"
                    />
                    {item.caption && (
                      <figcaption className="mt-4 text-center text-[16px] leading-[1.47] text-white/70">
                        {item.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </section>
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
                  scroll={cs.visuals.scroll}
                  flush={Boolean(cs.visuals.banner)}
                  heading={cs.visuals.heading}
                />
              )}
              {cs.visuals.galleries
                ?.filter((gallery) => !gallery.before)
                .map((gallery, index) => (
                <CaseGallery
                  key={gallery.heading ?? gallery.images[0]?.src ?? index}
                  items={gallery.images}
                  layout={gallery.layout ?? "full"}
                  tone={gallery.tone ?? cs.visuals?.tone ?? "dark"}
                  roomy={gallery.roomy}
                  wide={gallery.wide}
                  scroll={gallery.scroll}
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

      <main className="mx-auto max-w-6xl bg-[#F4F1EA]">
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
                  <div className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                    {outcome.stat}
                  </div>
                  <p className="mt-2 text-sm text-foreground/50 md:text-[15px]">
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

        <section className="px-6 py-14 sm:px-10 sm:py-20 lg:px-14">
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group block"
            style={
              {
                "--hover": titleHover[nextProject.slug] ?? "#7C5CF6",
              } as React.CSSProperties
            }
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-foreground/45">
              Next
            </p>
            <div className="mt-4 flex items-end justify-between gap-6">
            <h2 className="mt-4 text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[0.92] tracking-[-0.05em] transition-opacity duration-300 group-hover:opacity-60">
              {nextProject.name}
            </h2>
              <Arrow className="mb-2 h-3.5 shrink-0 transition-transform group-hover:translate-x-2 sm:h-4" />
            </div>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
