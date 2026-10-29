import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageReader from "@/components/PageReader";
import { flipnotePages, flipnoteSummary } from "@/data/flipnote";

export const metadata: Metadata = {
  title: "Flipnote — Lulu Wang",
  description: `${flipnoteSummary} Read left to right.`,
};

export default function FlipnotePage() {
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
          Alek & Tain
        </h1>
        <p className="mt-4 max-w-[40rem] text-[16px] leading-[1.47]">
          {flipnoteSummary} Read left to right.
        </p>
      </section>

      <section className="bg-black/10 py-8 sm:py-10">
        <PageReader
          pages={flipnotePages}
          label="Alek and Tain pages, read left to right"
        />
      </section>

      <Footer />
    </main>
  );
}
