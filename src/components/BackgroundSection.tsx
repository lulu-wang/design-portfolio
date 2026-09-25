import { experience } from "@/data/site";

export default function BackgroundSection() {
  return (
    <section id="background" className="page-wrap scroll-mt-28 pb-28 sm:pb-36">
      <div className="flex items-baseline justify-between gap-6">
        <h2 className="section-label">Background</h2>
        <a
          href="/LuluWangPMResume26.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="color-hover hidden shrink-0 text-sm text-foreground/45 sm:inline"
          style={{ "--hover": "#7C5CF6" } as React.CSSProperties}
        >
          Full resume
        </a>
      </div>

      <div className="mt-8">
        {experience.map((job) => (
          <article
            key={`${job.company}-${job.when}`}
            id={`experience-${job.company.toLowerCase()}`}
            className="border-t border-foreground/[0.08] py-12 sm:py-16"
          >
            <p
              className={`font-display text-[clamp(1.9rem,4.7vw,3.55rem)] font-semibold leading-[0.95] tracking-[-0.05em] ${
                job.hover ? "color-hover" : "text-foreground"
              }`}
              style={
                job.hover
                  ? ({ "--hover": job.hover } as React.CSSProperties)
                  : undefined
              }
            >
              {job.company}
            </p>
            <div className="mt-3 flex flex-col gap-1.5 sm:mt-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
              <h3 className="font-reading !font-medium text-[19px] tracking-[-0.01em] text-foreground sm:text-[21px]">
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
              <p className="shrink-0 font-secondary text-[14px] tracking-[-0.01em] text-muted sm:text-right">
                {job.when} · {job.where}
              </p>
            </div>
            <p className="font-reading mt-6 max-w-2xl text-[15px] !font-normal leading-[1.55] text-muted sm:text-[16px] sm:leading-[1.6]">
              {job.summary}
            </p>
          </article>
        ))}
      </div>

      <a
        href="/LuluWangPMResume26.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="color-hover mt-2 inline-block text-sm text-foreground/45 sm:hidden"
        style={{ "--hover": "#7C5CF6" } as React.CSSProperties}
      >
        Full resume
      </a>
    </section>
  );
}
