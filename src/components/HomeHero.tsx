import Image from "next/image";

export default function HomeHero() {
  return (
    <section className="flex min-h-svh flex-col md:h-svh">
      <div className="page-wrap flex flex-1 items-center py-28 sm:py-32">
        <div className="grid w-full items-center gap-10 md:grid-cols-[minmax(0,1fr)_220px] md:gap-16 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-20">
          <div className="min-w-0 max-w-[46rem]">
            <h1 className="animate-rise font-title text-[clamp(2.35rem,5vw,4.15rem)] font-bold leading-[1.12] tracking-[-0.045em] text-muted">
              <span className="text-foreground">Lulu Wang</span> is a product
              designer based in the Bay Area, previously at{" "}
              <span className="text-foreground">Meta</span> and{" "}
              <span className="text-foreground">Xbox</span>.
            </h1>
            <p
              className="page-subtitle animate-rise mt-8 max-w-2xl sm:mt-10"
              style={{ animationDelay: "80ms" }}
            >
              I design products that expand the possibilities of creative
              design, translating complex challenges into simple, intuitive
              experiences that solve meaningful problems for people.
            </p>
            <p
              className="page-subtitle animate-rise mt-5 max-w-2xl"
              style={{ animationDelay: "120ms" }}
            >
              Previously, I worked at Meta (Monetization, Messenger) and
              Microsoft (Azure, Xbox).
            </p>
          </div>
          <div
            className="animate-rise w-[160px] overflow-hidden rounded-2xl sm:w-[200px] md:w-full"
            style={{ animationDelay: "100ms" }}
          >
            <Image
              src="/images/portrait.png"
              alt="Portrait of Lulu Wang"
              width={640}
              height={800}
              priority
              className="aspect-[4/5] h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
