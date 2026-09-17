export default function HomeHero() {
  return (
    <section className="flex min-h-svh w-full flex-col lg:h-svh">
      <div className="flex flex-1 items-center py-28 sm:py-32">
        <div className="page-start box-border w-full min-w-0 pr-5 sm:pr-6 md:w-2/3 md:pr-4">
          <h1 className="animate-rise font-title text-[clamp(2.15rem,3.4vw,3.05rem)] font-bold leading-[1.14] tracking-[-0.04em] text-muted">
            <span className="text-foreground">Lulu Wang</span> is a product
            designer based in the Bay Area, previously at{" "}
            <span className="text-foreground">Meta</span> and{" "}
            <span className="text-foreground">Xbox</span>.
          </h1>
          <p
            className="page-subtitle animate-rise mt-8 sm:mt-10"
            style={{ animationDelay: "80ms" }}
          >
            I design products that expand the possibilities of creative
            design, translating complex challenges into intuitive
            experiences that solve meaningful problems.
          </p>
          <p
            className="page-subtitle animate-rise mt-5"
            style={{ animationDelay: "120ms" }}
          >
            Previously, I worked at Meta (Monetization, Messenger) and
            Microsoft (Azure, Xbox).
          </p>
        </div>
      </div>
    </section>
  );
}
