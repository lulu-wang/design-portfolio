import Image from "next/image";

export default function HomeHero() {
  return (
    <section className="flex min-h-svh w-full flex-col lg:h-svh">
      <div className="flex flex-1 items-center py-28 sm:py-32">
        <div className="box-border w-2/3 min-w-0 pl-5 pr-4 sm:pl-6 md:pl-10">
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
            design, translating complex challenges into simple, intuitive
            experiences that solve meaningful problems for people.
          </p>
          <p
            className="page-subtitle animate-rise mt-5"
            style={{ animationDelay: "120ms" }}
          >
            Previously, I worked at Meta (Monetization, Messenger) and
            Microsoft (Azure, Xbox).
          </p>
        </div>
        <div
          className="animate-rise hidden w-1/3 items-center justify-center pr-5 sm:pr-6 md:pr-10 lg:flex"
          style={{ animationDelay: "100ms" }}
        >
          <div className="w-full max-w-[280px] overflow-hidden rounded-2xl xl:max-w-[320px]">
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
