import Link from "next/link";

function Highlight({
  color,
  hover,
  ink,
  children,
}: {
  color: string;
  hover: string;
  ink?: string;
  children: React.ReactNode;
}) {
  return (
    <mark
      className="highlight-word"
      style={
        {
          "--hl": color,
          "--hl-hover": hover,
          "--hl-ink": ink ?? "var(--foreground)",
        } as React.CSSProperties
      }
    >
      {children}
    </mark>
  );
}

export default function HomeHero() {
  return (
    <section className="flex min-h-svh w-full flex-col lg:h-svh">
      <div className="flex flex-1 items-center py-28 sm:py-32">
        <div className="page-start box-border w-full min-w-0 pr-5 sm:pr-6 md:w-[72%] md:pr-8 lg:w-3/4">
          <h1 className="animate-rise font-display text-[clamp(2.35rem,4.2vw,4.05rem)] font-semibold leading-[1.12] tracking-[-0.045em] text-foreground">
            <Link
              href="/about"
              className="name-mark"
              style={{ "--hover": "#7C5CF6" } as React.CSSProperties}
            >
              Lulu Wang
            </Link>{" "}
            is a product designer based in the Bay Area, previously at{" "}
            <span
              className="color-hover"
              style={{ "--hover": "#4A90E2" } as React.CSSProperties}
            >
              Meta
            </span>{" "}
            and{" "}
            <span
              className="color-hover"
              style={{ "--hover": "#6B9A12" } as React.CSSProperties}
            >
              Xbox
            </span>
            .
          </h1>
          <p
            className="page-subtitle animate-rise mt-8 max-w-[40rem] sm:mt-10"
            style={{ animationDelay: "80ms" }}
          >
            I design products that expand the possibilities of{" "}
            <Highlight
              color="color-mix(in srgb, #7C5CF6 28%, white)"
              hover="#7C5CF6"
              ink="#ffffff"
            >
              creative design
            </Highlight>
            , translating{" "}
            <Highlight color="#B6D8FE" hover="#4A90E2" ink="#ffffff">
              complex challenges
            </Highlight>{" "}
            into{" "}
            <Highlight
              color="color-mix(in srgb, #C8F53A 38%, white)"
              hover="#C8F53A"
              ink="#161616"
            >
              intuitive experiences
            </Highlight>{" "}
            that solve meaningful problems.
          </p>
        </div>
      </div>
    </section>
  );
}
