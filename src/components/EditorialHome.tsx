import Image from "next/image";
import Link from "next/link";
import Arrow from "@/components/Arrow";
import Footer from "@/components/Footer";
import HomeGallery from "@/components/HomeGallery";
import WorkPanels from "@/components/WorkPanels";
import { illustrations } from "@/data/illustrations";
import { experience, projects } from "@/data/site";

const phones = [
  {
    src: "/images/projects/path-learning/hifi/04-syllabus.png",
    alt: "Path Learning syllabus",
    className: "left-[6%] w-[28%] -rotate-[7deg] sm:left-[10%]",
  },
  {
    src: "/images/projects/netflix-community/phone/02-hub.png",
    alt: "Netflix Community discussion hub",
    className: "left-1/2 z-10 w-[30%] -translate-x-1/2",
  },
  {
    src: "/images/projects/path-learning/hifi/08-lesson.png",
    alt: "Path Learning lesson",
    className: "right-[6%] w-[28%] rotate-[7deg] sm:right-[10%]",
  },
];

const steps = [
  {
    n: "01",
    title: "Research",
    body: "Interviews, competitive review, and a clear problem before any screens.",
  },
  {
    n: "02",
    title: "Architect",
    body: "Flows, information architecture, and the job the product has to do.",
  },
  {
    n: "03",
    title: "Design",
    body: "Visual systems, prototypes, and testing with the people who will use it.",
  },
  {
    n: "04",
    title: "Build",
    body: "Interfaces that ship, from Figma through working product code.",
  },
];

const facts = [
  { label: "Role", value: "Designer & artist" },
  { label: "Focus", value: "Product, brand, development" },
  { label: "Previously", value: "Meta, Microsoft, Finary" },
  { label: "Based", value: "California" },
];

function galleryPieces(ids: string[]) {
  return ids
    .map((id) => illustrations.find((item) => item.id === id))
    .filter((item): item is (typeof illustrations)[number] => Boolean(item));
}

const homeIllustrations = galleryPieces(["27", "24", "14", "23", "25", "03"]);
const homePhotos = galleryPieces(["p25", "p01", "p02"]);

function PhoneFrame({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  return (
    <div className={`absolute bottom-0 ${className}`}>
      <div className="rounded-[1.05rem] bg-[#161616] p-[3px] shadow-[0_24px_50px_rgba(60,30,10,0.18)] ring-1 ring-black/10 sm:rounded-[2rem] sm:p-2">
        <div className="aspect-[393/852] overflow-hidden rounded-[0.85rem] bg-white sm:rounded-[1.55rem]">
          <Image
            src={src}
            alt={alt}
            width={393}
            height={852}
            className="h-full w-full object-cover object-top"
            sizes="220px"
          />
        </div>
      </div>
    </div>
  );
}

export default function EditorialHome() {
  return (
    <main className="flex flex-col">
      <section className="relative h-[100svh] overflow-hidden bg-[#1A1A1A]">
        <Image
          src="/images/about-01.jpg"
          alt="Lulu Wang photographing in San Francisco"
          fill
          priority
          className="object-cover object-[center_28%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30" />

        <p className="absolute left-8 top-1/2 hidden -translate-y-1/2 text-[11px] font-medium uppercase tracking-[0.28em] text-white/75 [writing-mode:vertical-rl] rotate-180 sm:left-12 sm:block lg:left-24">
          Product designer
        </p>
        <div className="absolute inset-x-0 bottom-0 page-inset pb-8 sm:pb-10 lg:pb-12">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/75">
            California
          </p>
          <h1 className="animate-rise mt-3 font-display text-[clamp(3.4rem,11.6vw,10.75rem)] font-extrabold uppercase leading-[0.78] tracking-[-0.06em] text-white">
            Lulu Wang
          </h1>
        </div>
      </section>

      <section className="bg-[#F7F4EF] page-inset py-16 sm:py-20 lg:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="font-display text-[clamp(1.55rem,2.35vw,2.15rem)] font-medium leading-[1.25] tracking-[-0.035em] text-foreground">
              Lulu Wang is a designer and artist in California. She shapes
              user experience and the look of products and brands, with a
              background building software as an engineer at Meta and Xbox.
            </p>
            <dl className="mt-12 grid max-w-xl grid-cols-2 gap-x-8 gap-y-8">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/45">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 text-[15px] leading-snug tracking-[-0.01em] sm:text-base">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative hidden aspect-[4/5] w-full max-w-[540px] justify-self-end overflow-hidden lg:col-span-6 lg:block">
            <Image
              src="/images/about-02.jpg"
              alt="Lulu Wang with cherry blossoms"
              fill
              className="object-cover object-[center_20%]"
              sizes="540px"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#F7F4EF] pb-16 sm:pb-20 lg:pb-28">
        <div className="page-inset flex items-end justify-between gap-6">
          <h2 className="text-[11px] font-medium uppercase tracking-[0.28em] text-foreground/45">
            Gallery
          </h2>
          <Link
            href="/illustrations"
            className="arrow-link inline-flex shrink-0 items-center gap-2 text-[13px]"
          >
            View gallery <Arrow className="h-2.5" />
          </Link>
        </div>
        <div className="mt-8 flex flex-col gap-10 sm:gap-14">
          <HomeGallery items={homeIllustrations} />
          <HomeGallery items={homePhotos} />
        </div>
      </section>

      <section className="bg-white page-inset py-14 sm:py-20 lg:py-24">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-foreground/45">
          Previously
        </p>
        <ul className="mt-6">
          {experience.map((job) => (
            <li
              key={job.company}
              className="flex flex-col gap-3 py-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:py-5"
            >
              <a
                href={`#experience-${job.company.toLowerCase()}`}
                className="color-hover font-display text-[clamp(2.35rem,13vw,7.4rem)] font-extrabold uppercase leading-none tracking-[-0.06em] sm:text-[clamp(3rem,8.2vw,7.4rem)] sm:leading-[0.84]"
                style={{ "--hover": job.hover } as React.CSSProperties}
              >
                {job.company}
              </a>
              <div className="text-right sm:mb-2">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-foreground/70">
                  {job.when}
                </p>
                <p className="mt-1 text-[13px] text-foreground/45">{job.where}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-5 font-display text-[clamp(2rem,5.5vw,4.6rem)] font-medium lowercase leading-none tracking-[-0.05em] text-foreground/25">
          california
        </p>
      </section>

      <section className="bg-[#F3D4C3] page-inset pt-6 pb-14 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-20">
        <div className="relative mx-auto aspect-[10/7] w-full max-w-4xl">
          {phones.map((phone) => (
            <PhoneFrame key={phone.src} {...phone} />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 sm:mt-10">
          <h2 className="font-display text-[clamp(2.7rem,14vw,9.2rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.065em]">
            Portfolio
          </h2>
          <Link
            href="/projects"
            className="arrow-link mb-1 inline-flex shrink-0 items-center gap-2 text-sm sm:mb-3"
          >
            View all <Arrow className="h-2.5" />
          </Link>
        </div>
      </section>

      <section className="bg-[#C9D4C8] page-inset py-16 text-[#1A2420] sm:py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className="font-display text-[clamp(3.4rem,6vw,5.6rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.06em]">
              Process
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-[#1A2420]/70">
              Research through a shipped interface. The same loop on every
              project, whether the surface is a phone, a desktop, or a brand.
            </p>
          </div>
          <ol className="flex flex-col gap-8 lg:col-span-8 lg:gap-10">
            {steps.map((step) => (
              <li
                key={step.n}
                className="grid grid-cols-[auto_1fr] gap-x-6 sm:grid-cols-[4.5rem_10rem_1fr] sm:items-baseline sm:gap-x-8"
              >
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#1A2420]/50">
                  {step.n}
                </span>
                <h3 className="font-display text-[1.7rem] font-semibold tracking-[-0.04em] sm:text-[2rem]">
                  {step.title}
                </h3>
                <p className="col-start-2 mt-2 text-[15px] leading-relaxed text-[#1A2420]/70 sm:col-start-3 sm:mt-0">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#2A2A2A]" id="work">
        <div className="flex items-baseline justify-between page-inset py-6 sm:py-8">
          <h2 className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/55">
            Selected work
          </h2>
          <Link
            href="/projects"
            className="arrow-link inline-flex items-center gap-2 text-[13px] text-white/60"
          >
            All work <Arrow className="h-2.5" />
          </Link>
        </div>
        <WorkPanels projects={projects} />
      </section>

      <section
        id="background"
        className="page-inset scroll-mt-28 bg-white py-16 sm:py-20 lg:py-28"
      >
        <div className="flex items-baseline justify-between gap-6">
          <h2 className="text-[11px] font-medium uppercase tracking-[0.28em] text-foreground/50">
            Experience
          </h2>
          <a
            href="/LuluWangPMResume26.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-foreground/50"
          >
            Full resume
          </a>
        </div>
        <div className="mt-12">
          {experience.map((job) => (
            <article
              key={`${job.company}-${job.when}`}
              id={`experience-${job.company.toLowerCase()}`}
              className="scroll-mt-28 py-10 sm:py-12"
            >
              <div className="grid gap-4 lg:grid-cols-12 lg:gap-8">
                <p
                  className="color-hover font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold uppercase leading-[0.9] tracking-[-0.05em] lg:col-span-4"
                  style={{ "--hover": job.hover } as React.CSSProperties}
                >
                  {job.company}
                </p>
                <div className="lg:col-span-8">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <h3 className="font-reading text-[18px] font-medium tracking-[-0.01em] sm:text-[20px]">
                      <mark
                        className="highlight-word !whitespace-normal"
                        style={
                          {
                            "--hl": job.highlight.color,
                            "--hl-hover": job.highlight.hover,
                            "--hl-ink": job.highlight.ink ?? "var(--foreground)",
                          } as React.CSSProperties
                        }
                      >
                        {job.role}
                      </mark>
                    </h3>
                    <p className="shrink-0 text-[13px] text-foreground/50">
                      {job.when} · {job.where}
                    </p>
                  </div>
                  <p className="font-reading mt-5 max-w-2xl text-[15px] font-normal leading-[1.6] text-foreground/65 sm:text-[16px]">
                    {job.summary}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
