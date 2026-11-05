import type { Metadata } from "next";
import Link from "next/link";
import Arrow from "@/components/Arrow";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page not found — Lulu Wang",
};

export default function NotFound() {
  return (
    <main className="flex flex-col">
      <section className="bg-[#F7F4EF] page-inset pb-20 pt-32 sm:pb-28 sm:pt-36">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-foreground/45">
          Missing
        </p>
        <h1 className="mt-5 text-[clamp(3rem,7vw,5.5rem)] font-medium leading-[0.92] tracking-[-0.05em]">
          404
        </h1>
        <p className="mt-6 max-w-4xl text-[16px] leading-relaxed text-foreground/60 sm:text-[18px]">
          This page doesn’t exist, or it’s been moved somewhere quieter.
        </p>
        <Link
          href="/"
          className="arrow-link mt-10 inline-flex items-center gap-2 text-[15px]"
        >
          Back home <Arrow className="h-2.5" />
        </Link>
      </section>
      <Footer />
    </main>
  );
}
