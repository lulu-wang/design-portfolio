import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageReader from "@/components/PageReader";
import { arcfellPages, arcfellSummary } from "@/data/arcfell";

export const metadata: Metadata = {
  title: "Arcfell — Lulu Wang",
  description: `${arcfellSummary} Read left to right.`,
};

export default function ArcfellPage() {
  return (
    <main className="folio flex flex-col bg-white pt-[4.5rem] text-black md:pt-[5.5rem]">
      <section className="folio-wrap pb-10 pt-14 sm:pt-20">
        <Link
          href="/illustrations?tab=comics"
          className="text-[16px] hover:opacity-60"
        >
          Gallery
        </Link>
        <h1 className="mt-8 text-[clamp(1.75rem,4vw,2.65rem)] font-normal leading-[1.15]">
          Arcfell
        </h1>
        <p className="mt-4 max-w-[40rem] text-[16px] leading-[1.47]">
          {arcfellSummary} Read left to right.
        </p>
      </section>

      <section className="bg-black/10 py-8 sm:py-10">
        <PageReader pages={arcfellPages} label="Arcfell pages, read left to right" />
      </section>

      <Footer />
    </main>
  );
}
