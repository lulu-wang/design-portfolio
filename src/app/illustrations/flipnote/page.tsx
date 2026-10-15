import type { Metadata } from "next";
import Link from "next/link";
import Arrow from "@/components/Arrow";
import Footer from "@/components/Footer";
import PageReader from "@/components/PageReader";
import { flipnotePages, flipnoteSummary } from "@/data/flipnote";

export const metadata: Metadata = {
  title: "Flipnote — Lulu Wang",
  description: `${flipnoteSummary} Read left to right.`,
};

export default function FlipnotePage() {
  return (
    <main className="pt-28 sm:pt-32">
      <section className="page-wrap pt-6">
        <Link
          href="/illustrations?tab=comics"
          className="arrow-link color-hover inline-flex items-center gap-2 text-sm text-muted"
          style={{ "--hover": "#7C5CF6" } as React.CSSProperties}
        >
          <Arrow className="h-2.5 rotate-180" /> Gallery
        </Link>
        <h1 className="page-heading animate-rise mt-8 text-[clamp(1.65rem,2.8vw,2.15rem)] sm:mt-10">
          Alek & Tain - Flipnote Manga
        </h1>
        <p
          className="animate-rise mt-4 max-w-2xl font-reading text-[16px] font-medium leading-relaxed text-muted sm:mt-5"
          style={{ animationDelay: "80ms" }}
        >
          {flipnoteSummary} Read left to right.
        </p>
      </section>

      <section className="mt-10 pb-8 sm:mt-12 sm:pb-10">
        <PageReader
          pages={flipnotePages}
          label="Alek and Tain pages, read left to right"
        />
      </section>

      <div className="page-wrap">
        <Footer />
      </div>
    </main>
  );
}
