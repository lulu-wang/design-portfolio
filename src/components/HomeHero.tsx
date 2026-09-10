"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { Bolt, Sparkle, ArrowOut } from "@/components/Stickers";

export default function HomeHero() {
  const pin = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const update = () => {
    const el = pin.current;
    if (!el) return;
    const vh = window.innerHeight || 1;
    const t = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / vh));
    setProgress(t);
  };

  useLenis(update);
  useEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const opacity = 0.68 + progress * 0.32;
  const solid = progress > 0.85;

  return (
    <div ref={pin} className="relative">
      <div className="pointer-events-none sticky top-0 z-20 flex h-[100svh] items-center justify-center">
        <div
          className="w-[min(42vw,248px)] overflow-hidden rounded-[20px] sm:w-[260px]"
          style={{
            opacity,
            mixBlendMode: solid ? "normal" : "multiply",
            boxShadow: `0 18px 50px rgba(0,0,0,${progress * 0.16})`,
          }}
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

      <div className="-mt-[100svh]">
        <section className="relative z-10 flex min-h-[100svh] flex-col justify-between px-5 pb-8 pt-24 sm:px-8 sm:pb-10 md:px-12">
          <div className="flex flex-1 flex-col items-center justify-center">
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

        <section className="relative z-10 flex min-h-[100svh] items-center">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-5 sm:px-8 md:flex-row md:items-center md:gap-12 md:px-12 lg:gap-16">
            <div className="flex min-w-0 flex-1 justify-end">
              <div className="max-w-sm md:text-right">
                <p className="text-[12px] font-medium tracking-[0.16em] text-foreground/40">
                  /Intro
                </p>
                <h2 className="mt-3 text-[1.05rem] font-medium leading-[1.55] tracking-tight text-foreground sm:text-[1.125rem] sm:leading-[1.55]">
                  I&rsquo;m Lulu, a product designer based in the Bay Area,
                  previously building at Meta and Xbox.
                </h2>
              </div>
            </div>

            <div
              className="hidden w-[min(42vw,248px)] shrink-0 sm:w-[260px] md:block"
              aria-hidden
            />

            <div className="flex min-w-0 flex-1 justify-start">
              <div className="max-w-sm">
                <p className="text-[12px] font-medium tracking-[0.16em] text-foreground/40">
                  /About
                </p>
                <div className="mt-3 space-y-4 text-[0.95rem] leading-[1.65] text-foreground/70">
                  <p>
                    I&rsquo;m a product designer and developer with a focus on
                    clear systems, careful interaction, and experiences that
                    still feel human.
                  </p>
                  <p>
                    Over the years I&rsquo;ve shipped products used by millions,
                    then moved into design to work closer to the problem —
                    research, interface, and the craft in between.
                  </p>
                  <p>
                    Product design, research, visual systems, and engineering.
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
          </div>
        </section>
      </div>
    </div>
  );
}
