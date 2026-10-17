import type { Metadata } from "next";
import Link from "next/link";
import Arrow from "@/components/Arrow";
import Footer from "@/components/Footer";
import PageReader from "@/components/PageReader";
import { arcfellPages, arcfellSummary } from "@/data/arcfell";

export const metadata: Metadata = {
  title: "Arcfell — Lulu Wang",
  description: `${arcfellSummary} Read left to right.`,
};

export default function ArcfellPage() {
  return (
    <main className="flex flex-col">
      <section className="bg-[#F7F4EF] px-5 pb-12 pt-32 sm:px-8 sm:pt-36 lg:px-12">
        <Link
          href="/illustrations?tab=comics"
          className="arrow-link inline-flex items-center gap-2 text-[13px] text-foreground/50"
        >
          <Arrow className="h-2.5 rotate-180" /> Gallery
        </Link>
        <h1 className="mt-8 font-display text-[clamp(2.6rem,6vw,5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.055em]">
          Arcfell
        </h1>
        <p className="mt-5 max-w-4xl text-[16px] leading-relaxed text-foreground/65">
          {arcfellSummary} Read left to right.
        </p>
      </section>

      <section className="bg-[#2A2A2A] py-8 sm:py-10">
        <PageReader pages={arcfellPages} label="Arcfell pages, read left to right" />
      </section>

      <Footer />
    </main>
  );
}
