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
          Arcfell
        </h1>
        <p
          className="animate-rise mt-4 max-w-2xl font-reading text-[16px] font-medium leading-relaxed text-muted sm:mt-5"
          style={{ animationDelay: "80ms" }}
        >
          {arcfellSummary} Read left to right.
        </p>
      </section>

      <section className="mt-10 pb-8 sm:mt-12 sm:pb-10">
        <PageReader pages={arcfellPages} label="Arcfell pages, read left to right" />
      </section>

      <div className="page-wrap">
        <Footer />
      </div>
    </main>
  );
}
