import Image from "next/image";
import Link from "next/link";
import { Bolt, Sparkle, ArrowOut } from "@/components/Stickers";

export default function HomeHero() {
  return (
    <div className="relative">
      <section className="relative flex min-h-[100svh] flex-col justify-between px-5 pb-8 pt-24 sm:px-8 sm:pb-10 md:px-12">
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <div className="w-[min(42vw,248px)] overflow-hidden rounded-[20px] shadow-[0_18px_50px_rgba(0,0,0,0.12)] mix-blend-multiply sm:w-[260px]">
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

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
          <h1 className="animate-rise text-center font-display text-[clamp(3.15rem,13vw,8.25rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.035em]">
            <span className="relative inline-block">
              Product
              <Sparkle className="absolute -left-[0.7em] top-[0.08em] w-[0.42em] sm:-left-[0.55em]" />
            </span>
            <span className="relative mt-[0.02em] block">
              Designer
              <Bolt className="absolute -right-[0.42em] bottom-[-0.08em] w-[0.28em] sm:-right-[0.32em]" />
            </span>
          </h1>
        </div>

        <div className="relative z-30 flex items-end justify-between gap-4 pt-6">
          <p className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            ©2026
          </p>
          <p className="pb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/45 sm:text-xs">
            /Previously at Meta
          </p>
        </div>
      </section>

      <section className="relative flex min-h-[100svh] items-center">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 sm:px-8 md:grid-cols-2 md:items-start md:gap-x-16 md:gap-y-0 md:px-12 lg:gap-x-24">
          <div className="md:pt-6 md:text-right lg:pt-10">
            <p className="text-[12px] font-medium tracking-[0.16em] text-foreground/40">
              /Intro
            </p>
            <h2 className="mt-3 text-[1.15rem] font-medium leading-[1.55] tracking-tight text-foreground sm:text-[1.35rem] sm:leading-[1.5] md:text-[1.5rem] md:leading-[1.45]">
              I&rsquo;m Lulu, a product designer based in the Bay Area,
              previously building at Meta and Xbox.
            </h2>
          </div>

          <div className="md:mt-36 lg:mt-52">
            <p className="text-[12px] font-medium tracking-[0.16em] text-foreground/40">
              /About
            </p>
            <div className="mt-3 space-y-4 text-[1rem] leading-[1.65] text-foreground/70 sm:text-[1.0625rem] sm:leading-[1.65]">
              <p>
                I design products that feel considered in use and coherent
                as systems — lucid structure, unforced interaction, and a
                little humanity in the details.
              </p>
              <p>
                After shipping work used by millions at Meta and Xbox, I
                moved into design to sit closer to the question itself:
                research, visual language, and the craft between them.
              </p>
              <p>
                Product design, illustration, research, visual systems, and
                engineering.
              </p>
              <Link
                href="/projects"
                className="inline-flex items-center gap-3 pt-1 text-sm font-medium text-foreground transition-opacity hover:opacity-60"
              >
                Get Started
                <ArrowOut />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
